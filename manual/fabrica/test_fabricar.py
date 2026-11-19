"""Pruebas de la fábrica sin red ni IA real."""
import json
import runpy
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import fabricar as modulo_fabricar
from fabricar import barra_contacto, numero_internacional, poner_datos, poner_datos

PLANTILLA = (
    '<html><head><title>Inicio | Lumen</title></head><body>'
    '<a class="logo">Lumen</a><a href="mailto:hola@lumen.test">hola@lumen.test</a>'
    '<a href="tel:+1 555">Llamar</a><a href="https://wa.me/15550000">WhatsApp</a>'
    '</body></html>'
)
VISTAS = runpy.run_path(str(Path(__file__).with_name('vistas-previas.py')))
pedido_de = VISTAS['pedido_de']
MARCADOR_LOTE = 'Nodos de la página (orden de lectura):\n'


def pedido(**cambios):
    p = {'negocio': 'Peluquería Ana', 'actividad': 'peluquería', 'ciudad': 'Vigo',
         'email': 'ana@example.es', 'telefono': '986 00 00 00', 'whatsapp': '+34 600 00 00 00'}
    p.update(cambios)
    return p


def extraer_lote(usuario):
    return json.loads(usuario.split(MARCADOR_LOTE, 1)[1])


def renderizar(pedido_fabrica, plantilla, ia_simulada):
    with tempfile.TemporaryDirectory() as temporal:
        demos = Path(temporal) / 'demos'
        origen = demos / 'site' / pedido_fabrica['plantilla']
        origen.mkdir(parents=True)
        (origen / 'index.html').write_text(plantilla, encoding='utf-8')
        ruta_pedido = Path(temporal) / 'pedido.json'
        ruta_pedido.write_text(json.dumps(pedido_fabrica, ensure_ascii=False), encoding='utf-8')
        with patch.object(modulo_fabricar, 'DEMOS', demos), \
                patch.object(modulo_fabricar, 'credenciales', return_value=('token-falso', 'cuenta-falsa')), \
                patch.object(modulo_fabricar, 'ia', side_effect=ia_simulada):
            modulo_fabricar.fabricar(ruta_pedido, desplegar=False)
        salida = demos / 'clientes' / pedido_fabrica['id'] / 'site' / 'index.html'
        return salida.read_text(encoding='utf-8')


class BarraContacto(unittest.TestCase):
    def test_whatsapp_no_valido_no_deja_el_de_la_plantilla(self):
        html = '<head></head><a href="https://wa.me/34999999999">WhatsApp</a>'
        out = poner_datos(html, pedido(whatsapp='12'), None)
        self.assertNotIn('wa.me/34999999999', out)
        self.assertIn('href="tel:986000000">Llamar', out)
        self.assertNotIn('WhatsApp', out)

    def test_whatsapp_no_valido_conserva_icono_svg(self):
        html = ('<head></head><a class="btn-whatsapp" aria-label="Abrir WhatsApp" href="https://wa.me/34999999999">'
                '<svg><use href="#whatsapp"></use></svg> WhatsApp</a>')
        out = poner_datos(html, pedido(whatsapp=''), None)
        self.assertIn('<use href="#whatsapp">', out)
        self.assertIn('class="btn-whatsapp"', out)
        self.assertIn('aria-label="Llamar"', out)
        self.assertIn('</svg> Llamar</a>', out)

    def test_whatsapp_valido_cambia_tambien_api_whatsapp(self):
        html = '<head></head><a href="https://api.whatsapp.com/send?phone=15550000">Escríbenos</a><a href="https://wa.me/1555">x</a>'
        out = poner_datos(html, pedido(whatsapp='600 111 222'), None)
        self.assertNotIn('15550000', out)
        self.assertEqual(out.count('href="https://wa.me/34600111222"'), 2)

    def test_whatsapp_sin_prefijo_lleva_34(self):
        self.assertEqual(numero_internacional('600111222'), '34600111222')
        out = barra_contacto(PLANTILLA, pedido(whatsapp='600 111 222'))
        self.assertIn('href="https://wa.me/34600111222"', out)

    def test_whatsapp_con_34_no_lo_duplica(self):
        out = barra_contacto(PLANTILLA, pedido(whatsapp='+34 600 00 00 00'))
        self.assertIn('wa.me/34600000000"', out)
        self.assertNotIn('wa.me/3434', out)

    def test_telefono_corto_no_pone_llamar(self):
        out = barra_contacto(PLANTILLA, pedido(telefono='98600', whatsapp=''))
        self.assertNotIn('>Llamar</a></nav>', out.replace('<a href="mailto:ana@example.es">Escribir</a>', ''))
        self.assertIn('href="mailto:ana@example.es">Escribir</a>', out)

    def test_barra_antes_de_body_y_solo_movil(self):
        out = barra_contacto(PLANTILLA, pedido())
        self.assertIn('href="tel:+34986000000">Llamar</a>', out)
        self.assertLess(out.index('id="ash-contacto"'), out.index('</body>'))
        self.assertIn('@media (max-width:768px)', out)

    def test_sin_datos_validos_no_pone_barra(self):
        out = barra_contacto(PLANTILLA, pedido(telefono='12', whatsapp='', email='no-vale'))
        self.assertNotIn('ash-contacto', out)

    def test_poner_datos_normaliza_whatsapp(self):
        out = poner_datos(PLANTILLA, pedido(whatsapp='600111222'), 'Lumen')
        self.assertIn('wa.me/34600111222', out)


class PonerDatos(unittest.TestCase):
    def test_datos_normales(self):
        out = poner_datos(PLANTILLA, pedido(), 'Lumen')
        self.assertIn('>Peluquería Ana<', out)
        self.assertIn('href="mailto:ana@example.es"', out)
        self.assertIn('href="tel:986000000"', out)
        self.assertIn('wa.me/34600000000', out)
        self.assertIn('<title>Peluquería Ana · peluquería en Vigo</title>', out)
        self.assertNotIn('lumen.test', out)

    def test_nombre_con_html_se_escapa(self):
        out = poner_datos(PLANTILLA, pedido(negocio='<script>alert(1)</script> & "Co"'), 'Lumen')
        self.assertNotIn('<script>', out)
        self.assertIn('&lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;Co&quot;', out)

    def test_ciudad_y_actividad_se_escapan(self):
        out = poner_datos(PLANTILLA, pedido(ciudad='<b>Vigo</b>', actividad='a\\1'), 'Lumen')
        self.assertNotIn('<b>', out)
        self.assertIn('a\\1 en &lt;b&gt;Vigo&lt;/b&gt;', out)

    def test_correo_que_rompe_el_atributo_se_rechaza(self):
        for malo in ('x"onmouseover="alert(1)@a.es', 'a@b.es"><script>', 'sin-arroba', ''):
            with self.subTest(correo=malo), self.assertRaises(ValueError):
                poner_datos(PLANTILLA, pedido(email=malo), 'Lumen')

    def test_noindex_una_sola_vez(self):
        con_robots = PLANTILLA.replace('<head>', '<head><meta name="robots" content="index,follow">')
        out = poner_datos(con_robots, pedido(), 'Lumen')
        self.assertEqual(out.count('name="robots"'), 1)
        self.assertIn('<head><meta name="robots" content="noindex">', out)

    def test_metas_de_la_plantilla_en_cualquier_orden(self):
        metas = ('<meta content="index,follow" name="robots"><meta content="x" property="og:image">'
                 "<link href='https://lumen.test/' rel='canonical'>")
        out = poner_datos(PLANTILLA.replace('<head>', '<head>' + metas), pedido(), 'Lumen')
        self.assertEqual(out.count('robots'), 1)
        self.assertNotIn('og:image', out)
        self.assertNotIn('canonical', out)

    def test_nombre_que_contiene_la_marca_no_se_duplica(self):
        out = poner_datos(PLANTILLA, pedido(negocio='Lumen Ana'), 'Lumen')
        self.assertIn('class="logo">Lumen Ana<', out)
        self.assertNotIn('Ana Ana', out)

    def test_correo_que_contiene_el_de_la_plantilla(self):
        out = poner_datos(PLANTILLA, pedido(email='xhola@lumen.test'), 'Lumen')
        self.assertIn('>xhola@lumen.test<', out)
        self.assertNotIn('xxhola', out)

    def test_telefono_solo_digitos(self):
        out = poner_datos(PLANTILLA, pedido(telefono='600"><img src=x>'), 'Lumen')
        self.assertIn('href="tel:600"', out)
        self.assertNotIn('<img', out)


class ContextoDePagina(unittest.TestCase):
    def test_pedido_de_boda_no_repite_el_nombre_en_nodos_hermanos(self):
        lotes = []

        def ia_simulada(_token, _cuenta, _sistema, usuario):
            lote = extraer_lote(usuario)
            lotes.append(lote)
            respuesta = {}
            for clave, nodo in lote.items():
                if isinstance(nodo, dict) and 'ruta' in nodo:
                    if 'span:nth-of-type(1)' in nodo['ruta']:
                        respuesta[clave] = 'Novia Demo'
                    elif 'span:nth-of-type(2)' in nodo['ruta']:
                        respuesta[clave] = 'Novio Demo'
                    else:
                        respuesta[clave] = nodo['texto']
                else:
                    respuesta[clave] = 'Pareja Demo'
            return json.dumps(respuesta, ensure_ascii=False)

        pedido_fabrica = {
            'id': 'boda-demo',
            'plantilla': 'plantilla-demo',
            'negocio': '',
            'evento': 'Boda Demo',
            'contacto': 'Contacto Demo',
            'actividad': 'Boda',
            'ciudad': 'España',
            'telefono': '600000000',
            'email': 'demo@example.test',
            'descripcion': 'Celebración familiar',
            'servicios': [],
        }
        with patch.object(modulo_fabricar, 'LOTE', 1):
            html = renderizar(
                pedido_fabrica,
                '<html><head><title>Inicio | Marca Demo</title></head>'
                '<body><main><span>Nombre</span><span>Nombre</span></main></body></html>',
                ia_simulada,
            )
        self.assertIn('<span>Novia Demo</span><span>Novio Demo</span>', html)
        self.assertEqual(len(lotes), 2)
        nodos = [next(iter(lote.values())) for lote in lotes]
        self.assertEqual([nodo['texto'] for nodo in nodos], ['Nombre', 'Nombre'])
        self.assertIn('span:nth-of-type(1)', nodos[0]['ruta'])
        self.assertIn('span:nth-of-type(2)', nodos[1]['ruta'])
        self.assertEqual(nodos[0]['siguiente'], 'Nombre')
        self.assertEqual(nodos[1]['anterior'], 'Nombre')

    def test_el_pie_usa_el_nombre_del_evento_antes_que_el_contacto(self):
        pedido_fabrica = pedido_de({
            'public_id': 'boda-demo',
            'nombre': 'Contacto Demo',
            'email': 'demo@example.test',
            'telefono': '600000000',
            'producto': 'Boda',
            'campos': json.dumps({'evento': 'Boda Demo'}),
        }, 'plantilla-demo')

        def ia_simulada(_token, _cuenta, _sistema, usuario):
            lote = extraer_lote(usuario)
            return json.dumps({
                clave: nodo['texto'] if isinstance(nodo, dict) else nodo
                for clave, nodo in lote.items()
            }, ensure_ascii=False)

        html = renderizar(
            pedido_fabrica,
            '<html><head><title>Inicio | Marca Demo</title></head>'
            '<body><footer>© Marca Demo</footer></body></html>',
            ia_simulada,
        )
        self.assertIn('© Boda Demo', html)
        self.assertNotIn('Contacto Demo', html)
        self.assertEqual(modulo_fabricar.nombre_publico({
            'negocio': '',
            'evento': '',
            'contacto': 'Contacto Demo',
        }), 'Contacto Demo')

    def test_nombre_de_espacios_no_tapa_el_evento_y_vale_nombre_comercial(self):
        elegir = VISTAS['nombre_negocio_evento']
        self.assertEqual(elegir({'Nombre del negocio': '   ', 'evento': 'Boda Demo'}), 'Boda Demo')
        self.assertEqual(elegir({'Nombre comercial y logo': 'Peluquería Ana'}), 'Peluquería Ana')


if __name__ == '__main__':
    unittest.main()


PEDIDO_BLOQUEO = {
    'id': 'bloqueo-demo', 'plantilla': 'plantilla-demo', 'negocio': 'Peluquería Ana', 'actividad': 'peluquería',
    'ciudad': 'Vigo', 'telefono': '600000000', 'email': 'ana@example.es', 'descripcion': '', 'servicios': [],
}
PLANTILLA_BLOQUEO = ('<html><head><title>Inicio | Lumen</title></head><body><main>'
                     '<h1>Bienvenido a nuestro estudio creativo</h1><p>Contacta</p></main></body></html>')


def ia_que_adapta(texto=lambda nodo: 'Tu peluquería de confianza en Vigo'):
    def ia_simulada(_t, _c, _s, usuario):
        return json.dumps({k: texto(n) for k, n in extraer_lote(usuario).items()}, ensure_ascii=False)
    return ia_simulada


class BloqueoDePublicacion(unittest.TestCase):
    def test_la_ia_caida_bloquea_la_publicacion(self):
        def ia_caida(*_):
            raise OSError('sin red')
        with self.assertRaises(modulo_fabricar.FabricaBloqueada):
            renderizar(PEDIDO_BLOQUEO, PLANTILLA_BLOQUEO, ia_caida)

    def test_respuesta_fuera_de_esquema_cuenta_como_fallo(self):
        respuestas = iter([json.dumps({'0': ''}), json.dumps({'0': 5}), json.dumps({'x': 'hola'})])
        with self.assertRaises(modulo_fabricar.FabricaBloqueada):
            renderizar(PEDIDO_BLOQUEO, PLANTILLA_BLOQUEO, lambda *_: next(respuestas))

    def test_un_texto_largo_sin_adaptar_bloquea(self):
        def ia_parcial(_t, _c, _s, usuario):
            return json.dumps({k: 'Llámanos' for k, n in extraer_lote(usuario).items() if n['texto'] == 'Contacta'})
        with self.assertRaises(modulo_fabricar.FabricaBloqueada):
            renderizar(PEDIDO_BLOQUEO, PLANTILLA_BLOQUEO, ia_parcial)

    def test_la_marca_en_mayusculas_bloquea(self):
        with self.assertRaises(modulo_fabricar.FabricaBloqueada):
            renderizar(PEDIDO_BLOQUEO, PLANTILLA_BLOQUEO, ia_que_adapta(lambda n: 'ESTUDIO LUMEN'))

    def test_texto_de_relleno_bloquea(self):
        with self.assertRaises(modulo_fabricar.FabricaBloqueada):
            renderizar(PEDIDO_BLOQUEO, PLANTILLA_BLOQUEO, ia_que_adapta(lambda n: 'Lorem ipsum dolor'))

    def test_html_de_la_ia_queda_como_texto(self):
        html = renderizar(PEDIDO_BLOQUEO, PLANTILLA_BLOQUEO, ia_que_adapta(lambda n: '<script>alert(1)</script> Hola'))
        self.assertNotIn('<script>alert', html)
        self.assertIn('&lt;script&gt;', html)

    def test_pedido_completo_se_publica(self):
        html = renderizar(PEDIDO_BLOQUEO, PLANTILLA_BLOQUEO, ia_que_adapta())
        self.assertIn('Tu peluquería de confianza en Vigo', html)
        self.assertNotIn('Lumen', html)

    def test_un_nombre_que_contiene_la_marca_no_bloquea(self):
        self.assertEqual(modulo_fabricar.restos_de_plantilla('<p>Lumen Ana</p>', 'Lumen', 'Lumen Ana'), [])

    def test_la_marca_dentro_de_otra_palabra_no_bloquea(self):
        self.assertEqual(modulo_fabricar.restos_de_plantilla('<p>Aumentamos el volumen de tu cabello</p>', 'Lumen', 'Ana'), [])

    def test_la_marca_unida_con_guion_bajo_bloquea(self):
        self.assertEqual(modulo_fabricar.restos_de_plantilla('<img alt="ESTUDIO_LUMEN">', 'Lumen', 'Ana'),
                         ['marca de la plantilla'])

    def test_un_texto_devuelto_tal_cual_se_reintenta(self):
        textos = [{'texto': 'Bienvenido a nuestro estudio creativo'}]
        respuestas = iter(['{"0": "Bienvenido a nuestro estudio creativo"}', '{"0": "Bienvenida a la peluquería de Ana"}'])
        with patch.object(modulo_fabricar, 'ia', side_effect=lambda *a: next(respuestas)), \
                patch.object(modulo_fabricar, 'validar_respuesta', side_effect=lambda d: d):
            salida = modulo_fabricar.reescribir(textos, pedido(), ('t', 'a'))
        self.assertEqual(salida, {'0': 'Bienvenida a la peluquería de Ana'})

    def test_la_marca_suelta_bloquea_aunque_el_nombre_la_contenga(self):
        self.assertEqual(modulo_fabricar.restos_de_plantilla('<p>Lumen Ana</p><p>ESTUDIO LUMEN</p>', 'Lumen', 'Lumen Ana'),
                         ['marca de la plantilla'])

    def test_un_texto_devuelto_sin_cambios_bloquea(self):
        with self.assertRaises(modulo_fabricar.FabricaBloqueada):
            renderizar(PEDIDO_BLOQUEO, PLANTILLA_BLOQUEO, ia_que_adapta(lambda n: n['texto']))


class PublicacionKV(unittest.TestCase):
    def test_pares_kv_por_fichero_con_caducidad_y_sin_headers(self):
        import base64
        with tempfile.TemporaryDirectory() as t:
            site = Path(t)
            (site / 'css').mkdir()
            (site / 'index.html').write_text('<p>hola</p>', encoding='utf-8')
            (site / 'css' / 'a.css').write_bytes(b'p{}')
            (site / '_headers').write_text('/*\n  X-Robots-Tag: noindex\n', encoding='utf-8')
            pares = modulo_fabricar.pares_kv(site, 'abc-1')
        self.assertEqual([p['key'] for p in pares], ['sites/abc-1/css/a.css', 'sites/abc-1/index.html'])
        self.assertEqual(base64.b64decode(pares[1]['value']), b'<p>hola</p>')
        self.assertTrue(all(p['base64'] and p['expiration_ttl'] == modulo_fabricar.VISTAS_TTL for p in pares))
