## **Veredicto técnico — 18 de noviembre de 2026**

**La solución adecuada es un Worker compartido con un bucket R2 privado**, organizado por identificador de cliente. No hace falta desplegar un Worker cada vez que se genera una vista previa.

Arquitectura propuesta:

Texto sin formato

`Cloudflare Workers
│
├── Tienda Astro + D1 (existente)
│
└── Worker compartido: webs-preview
│
├── /p/cliente-001/ → R2
├── /p/cliente-002/ → R2
├── /p/cliente-003/ → R2
│
└── Bucket R2: webs-preview
├── p/cliente-001/index.html
├── p/cliente-001/assets/...
├── p/cliente-002/index.html
└── p/cliente-002/assets/...`

El Worker se despliega una vez; después, cada nueva web solo requiere subir archivos a R2.

### **Límites oficiales actuales**

| Recurso | Plan gratuito |
| --- | --- |
| Workers por cuenta | 100 |
| Peticiones al código de Workers | 100.000/día |
| CPU por petición | 10 ms |
| Static Assets por versión de Worker | 20.000 archivos |
| Tamaño máximo por Static Asset | 25 MiB |
| R2 Standard: almacenamiento | 10 GB-mes |
| R2 Standard: escrituras Clase A | 1 millón/mes |
| R2 Standard: lecturas Clase B | 10 millones/mes |
| Salida de datos de R2 | Gratuita |

Fuentes: 

![](https://www.google.com/s2/favicons?domain=https://developers.cloudflare.com&sz=32)

Cloudflare Workers docs+2

**Static Assets no es la mejor opción para esta fábrica:** cada publicación requiere actualizar el conjunto de assets desplegados y existe un límite de 20.000 archivos por versión. R2 permite subir cada web independientemente.

El nivel gratuito de R2 es una cuota incluida en un servicio de facturación por uso, no un límite que garantice gasto cero. Además, Cloudflare requiere activar la suscripción R2, aunque el consumo quede dentro de las cuotas gratuitas. 

![](https://www.google.com/s2/favicons?domain=https://developers.cloudflare.com&sz=32)

Cloudflare R2 docs+1

## **1. Tres repositorios examinados con GitHub**

Metadatos obtenidos del repositorio y del último commit de la rama principal, no de la fecha de última interacción.

| Prioridad | Repositorio | Licencia | Estrellas | Último commit |
| --- | --- | --- | --- | --- |
| 1 | [kotx/render](https://github.com/kotx/render) | MIT | 486 | 18/03/2026 |
| 2 | [t0saki/sitedrop](https://github.com/t0saki/sitedrop) | MIT | 2 | 07/08/2026 |
| 3 | [mattrobenolt/r2-serve](https://github.com/mattrobenolt/r2-serve) | MIT | 3 | 05/05/2026 |

Los tres tienen código y documentación para servir archivos estáticos desde R2, pero no son equivalentes:

- **render:** proxy de R2 con caché, MIME almacenado, `index.html`, peticiones condicionales y 404. Es el más conocido. La separación entre clientes se obtiene mediante prefijos de objetos, sin modificar su motor HTTP.
- **sitedrop:** ya publica múltiples sitios desde un Worker, con D1, versiones atómicas, validación de rutas, MIME y control de caché. Arquitectónicamente es el más completo, pero incorporar su sistema de publicación y su esquema D1 supone más cambios.
- **r2-serve:** servidor reutilizable con índices de directorio, redirecciones, reescrituras, páginas de error y caché invalidable por eventos. Tiene demostraciones públicas, aunque todavía es un proyecto joven.

**Ganador para la adaptación mínima:** `kotx/render`**.** Su código reutilizable está concentrado en `src/index.ts`; no necesitamos incorporar otro sistema de usuarios, publicación o administración.

Matiz: los dos últimos tienen muy poca adopción pública medida por estrellas. No sería riguroso presentarlos como proyectos ampliamente utilizados. `render` aporta la evidencia de adopción más sólida de los tres.

Repositorio adicional descartado: [Erisa/multi-render](https://github.com/Erisa/multi-render) (MIT, 37 estrellas). Su implementación multihost es pertinente, pero está archivado desde 2025, por lo que incumple el requisito de mantenimiento.

## **2. Archivos exactos y adaptación**

Copiar desde `kotx/render`, rama `master`:

| Origen | Destino en tu repositorio |
| --- | --- |
| `src/index.ts` | `workers/webs-preview/src/index.ts` |
| `package.json` | `workers/webs-preview/package.json` |
| `pnpm-lock.yaml` | `workers/webs-preview/pnpm-lock.yaml` |
| `tsconfig.json` | `workers/webs-preview/tsconfig.json` |
| `wrangler.toml` | `workers/webs-preview/wrangler.toml` |
| `.github/workflows/deploy.yml` | `.github/workflows/deploy-webs-preview.yml` |
| `LICENSE` | `licencias/kotx-render.txt` |

Conservar el copyright MIT conforme a `.github/copilot-instructions.md`.

En el `wrangler.toml` copiado:

toml

`name = "webs-preview"
main = "src/index.ts"
compatibility_date = "2026-11-18"
workers_dev = true

[vars]
PATH_PREFIX = ""
INDEX_FILE = "index.html"
NOTFOUND_FILE = ""
DIRECTORY_LISTING = false
CACHE_CONTROL = "public, max-age=60"
LOGGING = true

[[r2_buckets]]
binding = "R2_BUCKET"
bucket_name = "webs-preview"`

Crear el bucket:

Bash

```
npx wrangler r2 bucket create webs-preview
```

**Adaptación mínima del enrutamiento:** en `src/index.ts`, sustituir exclusivamente la línea que calcula `path` dentro de `fetch` por la resolución de identificador y ruta:

TypeScript

```
const url = new URL(request.url);
const m = url.pathname.match(/^\/p\/(s-[a-z0-9-]+)(\/.*)?$/);
const sub = url.hostname.match(/^(s-[a-z0-9-]+)\.automatizasinhumo\.com$/);
const id = m?.[1] ?? sub?.[1];

if (!id) return new Response("Not Found", { status: 404 });

const rest = m ? (m[2] || "/") : url.pathname;
let path = `p/${id}${decodeURIComponent(rest)}`;
```

El código de `render` ya conserva la resolución de índices, metadatos HTTP y 404.

Permite:

- `webs-preview.davidpd89.workers.dev/p/s-123/`
- `s-123.automatizasinhumo.com/`

Para la segunda forma necesitas un registro DNS comodín proxied `*` y una ruta `*.automatizasinhumo.com/*` asociada al mismo Worker. Debes preservar rutas más específicas para los otros subdominios. Cloudflare admite esta configuración. 

![](https://www.google.com/s2/favicons?domain=https://developers.cloudflare.com&sz=32)

Cloudflare Workers docs+1

Prefiero **hostname para las webs completas**: mantiene rutas absolutas como `/assets/main.css`. En `/p/<id>/`, esas referencias requieren adaptación previa de la plantilla.

No utilizaría `cliente.preview.automatizasinhumo.com` en el plan gratuito: Universal SSL no cubre automáticamente ese segundo nivel. 

![](https://www.google.com/s2/favicons?domain=https://developers.cloudflare.com&sz=32)

Cloudflare SSL/TLS docs

También distinguiría dos mecanismos de caché. `render` ya utiliza `caches.default`, cuyas claves incorporan la URL. No actives sin adaptación adicional el nuevo `cache.enabled` de Workers Caching cuando diferentes clientes compartan la ruta `/`: su clave predeterminada **no incluye el hostname**, con riesgo de servir contenido de un cliente a otro. 

![](https://www.google.com/s2/favicons?domain=https://developers.cloudflare.com&sz=32)

Cloudflare Workers docs+1

## **3. Subida desde GitHub Actions**

En `manual/fabrica/fabricar.py`, conservar la generación del directorio `site`, pero sustituir el despliegue `wrangler deploy` por subida a R2. La única función nueva es conectar la salida de la fábrica con Wrangler.

Este paso de GitHub Actions utiliza exclusivamente la CLI oficial:

YAML

```
- name: Subir web a R2
  shell: bash
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    SITE_ID: ${{ env.SITE_ID }}
    SITE_DIR: ${{ env.SITE_DIR }}
  run: |
    test -d "$SITE_DIR"

    find "$SITE_DIR" -type f -print0 |
    while IFS= read -r -d '' f; do
      rel="${f#"$SITE_DIR"/}"
      mime=$(python3 -c 'import mimetypes,sys; print(mimetypes.guess_type(sys.argv[1])[0] or "application/octet-stream")' "$f")

      case "$rel" in
        *.html) cc="no-store" ;;
        *) cc="public, max-age=60" ;;
      esac

      npx wrangler r2 object put \
        "webs-preview/p/$SITE_ID/$rel" \
        --file "$f" \
        --content-type "$mime" \
        --cache-control "$cc" \
        --remote
    done
```

Fuente oficial: [Wrangler R2 object put](https://developers.cloudflare.com/r2/reference/wrangler-commands/). 

![](https://www.google.com/s2/favicons?domain=https://developers.cloudflare.com&sz=32)

Cloudflare R2 docs

El job necesita Node/Wrangler instalados y un token con permiso de escritura en R2. `SITE_DIR` debe contener el directorio `site` generado en el runner.

**Dependencia detectada:** actualmente `fabricar.py` usa `C:/GIT/automatizasinhumo-demos`, externo al repositorio web. GitHub Actions no tendrá ese directorio automáticamente; debe obtenerse mediante checkout autorizado o un artefacto de la fase de fabricación.

Para publicar cambios de una web, conviene evolucionar después hacia prefijos de versión y activación atómica. La subida directa anterior es suficiente para la primera prueba, pero una actualización de varios archivos no es atómica.

## **4. Prueba de aceptación**

Crear dos webs de prueba, `s-qa-a` y `s-qa-b`, con títulos distintos, un CSS cada una y un `index.html` en una subcarpeta. Subirlas mediante el comando anterior.

| Petición | Resultado exigido |
| --- | --- |
| `https://s-qa-a.automatizasinhumo.com/` | 200, título «Web A» |
| `https://s-qa-b.automatizasinhumo.com/` | 200, título «Web B» |
| `https://s-qa-a.automatizasinhumo.com/assets/main.css` | 200, `Content-Type: text/css` |
| `https://s-qa-a.automatizasinhumo.com/contacto/` | 200, HTML de la carpeta |
| `https://s-qa-b.automatizasinhumo.com/inexistente` | 404, sin contenido de A |

Verificación:

Bash

```
curl -i https://s-qa-a.automatizasinhumo.com/
curl -i https://s-qa-b.automatizasinhumo.com/
curl -I https://s-qa-a.automatizasinhumo.com/assets/main.css
curl -I https://s-qa-b.automatizasinhumo.com/inexistente
```

Para caché, repetir dos veces la petición del CSS y examinar los mensajes `Cache MISS` y `Cache HIT` del Worker mediante `wrangler tail webs-preview`. Los HTML llevan `no-store`; no se espera un HIT.

El mismo despliegue `webs-preview` debe atender las dos solicitudes. **Estas son pruebas propuestas, no pruebas ejecutadas:** no he desplegado código ni accedido a tu cuenta Cloudflare.

## **5. Migración sin romper enlaces anteriores**

1. Publicar `webs-preview` sin tocar los Workers existentes.
2. Cambiar `fabricar.py` para que los nuevos clientes publiquen en R2.
3. Cambiar la URL registrada por `vistas-previas.py` para que apunte al Worker compartido.
4. Ejecutar QA y comparar ambas webs.
5. Conservar los Workers antiguos durante el periodo de validez de las vistas previas enviadas; retirarlos progresivamente.

Hay una limitación inevitable: `web-s-123.davidpd89.workers.dev` está asociado al nombre de un Worker. **Eliminar ese Worker rompe el enlace antiguo.** Para conservarlo exactamente, hay que mantener el Worker o un redirector con ese nombre, que también ocupa una plaza. No existe una migración DNS genérica de esos subdominios a un único Worker. 

![](https://www.google.com/s2/favicons?domain=https://developers.cloudflare.com&sz=32)

Cloudflare Workers docs

## **6. D1: reclamar solicitudes de forma atómica**

He encontrado una implementación probada **dentro de tu propio repositorio**:

[src/features/shipping/labelStore.ts](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/features/shipping/labelStore.ts)

La función de reclamación de etiquetas utiliza `UPDATE ... WHERE status = 'quoted' RETURNING`, con un token exclusivo por ejecución.

El fallo actual está en [manual/fabrica/vistas-previas.py](https://github.com/davidpd89/automatizasinhumo-web/blob/main/manual/fabrica/vistas-previas.py): selecciona solicitudes `nueva`, fabrica y solo después cambia el estado. Dos ejecuciones pueden fabricar lo mismo.

Adoptar ese patrón justo antes de llamar a `fabricar()`:

SQL

```
UPDATE solicitudes
SET estado = 'en_preparacion',
    updated_at = datetime('now')
WHERE public_id = ?
  AND estado = 'nueva'
RETURNING public_id, slug, producto,
          nombre, email, telefono, campos, mensaje;
```

La primera ejecución obtiene una fila; la segunda obtiene cero. Solo quien recibe la fila fabrica.

D1 procesa las consultas de una base de datos secuencialmente, y SQLite garantiza la atomicidad de esa sentencia. 

![](https://www.google.com/s2/favicons?domain=https://developers.cloudflare.com&sz=32)

Cloudflare D1 docs+1

Para recuperación automática de trabajos interrumpidos, reutilizar también el patrón `claim_token` de `labelStore.ts`: una migración aditiva, token único por intento y actualización final condicionada al token. Evita que una ejecución antigua sobrescriba el resultado de otra.

**Orden de ejecución recomendado:** reclamación D1 atómica → Worker compartido → subida R2 → QA con dos clientes → cambio de URLs → retirada gradual de Workers antiguos.

Con ello desaparece el crecimiento de Workers por cliente. Los nuevos límites de capacidad pasarán a ser el almacenamiento y las operaciones de R2, las peticiones del Worker y, para dominios propios externos, la gestión de DNS y certificados.
