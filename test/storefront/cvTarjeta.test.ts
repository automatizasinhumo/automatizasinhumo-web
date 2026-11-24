// Tarjeta imprimible (85 × 55 mm): qué codifica el QR y qué texto lleva el reverso.
import { describe, expect, it } from 'vitest';
import {
	CORTE,
	DESTINOS_QR,
	SANGRADO,
	aUrl,
	contenidoQr,
	iniciales,
	lineasContacto,
	tamanoNombre,
	urlLinkedin,
	vcard,
	type DatosTarjeta,
} from '../../cv-estudio/src/tarjeta-datos';

const lucia: DatosTarjeta = {
	nombre: '  Lucía  Martín Ortega ',
	cargo: 'Responsable; atención, cliente',
	email: 'lucia@correo.es',
	telefono: '+34 600 12 34 56',
	web: 'luciamartin.es',
	linkedin: 'lucia-martin',
	ubicacion: 'Valencia',
};

describe('tarjeta: formato de imprenta', () => {
	it('corte estándar 85 × 55 con 3 mm de sangrado', () => {
		expect(CORTE).toEqual({ w: 85, h: 55 });
		expect(SANGRADO).toBe(3);
	});

	it('cada destino del QR tiene nombre y ayuda; el de la tarjeta online explica que hay que publicarla', () => {
		expect(DESTINOS_QR.map((d) => d.id).sort()).toEqual(['contacto', 'linkedin', 'tarjeta', 'web']);
		for (const d of DESTINOS_QR) expect(d.nombre && d.ayuda).toBeTruthy();
		expect(DESTINOS_QR.find((d) => d.id === 'tarjeta')!.ayuda).toMatch(/publica/i);
	});
});

describe('tarjeta: direcciones', () => {
	it('aUrl completa lo escrito a mano y rechaza lo que no es una dirección', () => {
		expect(aUrl('miweb.es')).toBe('https://miweb.es');
		expect(aUrl(' http://a.b/c ')).toBe('http://a.b/c');
		expect(aUrl('mi web')).toBe('');
		expect(aUrl(undefined)).toBe('');
		expect(aUrl('https://')).toBe('');
		expect(aUrl('http://localhost')).toBe('');
	});

	it('urlLinkedin admite el usuario suelto, con @ o el perfil entero', () => {
		expect(urlLinkedin('lucia-martin')).toBe('https://www.linkedin.com/in/lucia-martin');
		expect(urlLinkedin('@lucia-martin')).toBe('https://www.linkedin.com/in/lucia-martin');
		expect(urlLinkedin('linkedin.com/in/x-y')).toBe('https://linkedin.com/in/x-y');
		expect(urlLinkedin('no vale')).toBe('');
		expect(urlLinkedin('https://ejemplo.es/linkedin.com')).toBe('');
		expect(urlLinkedin('https://es.linkedin.com/in/x')).toBe('https://es.linkedin.com/in/x');
	});
});

describe('tarjeta: contenido del QR', () => {
	it('la vCard escapa los separadores, deja el teléfono en cifras y pone la web', () => {
		const v = vcard(lucia).split('\r\n');
		expect(v[0]).toBe('BEGIN:VCARD');
		expect(v).toContain('N:Martín Ortega;Lucía;;;');
		expect(v).toContain('FN:Lucía Martín Ortega');
		expect(v).toContain('TITLE:Responsable\\; atención\\, cliente');
		expect(v).toContain('TEL;TYPE=CELL:+34600123456');
		expect(v).toContain('URL:https://luciamartin.es');
		expect(v.at(-1)).toBe('END:VCARD');
	});

	it('un teléfono sin cifras no cuenta: ni línea TEL vacía ni QR de contacto solo con eso', () => {
		expect(vcard({ ...lucia, telefono: '---' })).not.toContain('TEL');
		expect(contenidoQr('contacto', { nombre: 'Ana Gil', telefono: '- -' })).toBe('');
		expect(contenidoQr('contacto', { nombre: 'Ana Gil', telefono: '+34 600-000-000' })).toContain('TEL;TYPE=CELL:+34600000000');
	});

	it('sin web, la vCard usa LinkedIn', () => {
		expect(vcard({ ...lucia, web: '' })).toContain('URL:https://www.linkedin.com/in/lucia-martin');
	});

	it('cada destino codifica lo suyo y queda vacío si faltan datos', () => {
		expect(contenidoQr('linkedin', lucia)).toBe('https://www.linkedin.com/in/lucia-martin');
		expect(contenidoQr('web', lucia)).toBe('https://luciamartin.es');
		expect(contenidoQr('tarjeta', lucia)).toBe('');
		expect(contenidoQr('tarjeta', { ...lucia, enlaceTarjeta: 'https://ejemplo.es/c/lucia' })).toBe('https://ejemplo.es/c/lucia');
		expect(contenidoQr('contacto', lucia)).toMatch(/^BEGIN:VCARD/);
		expect(contenidoQr('contacto', { nombre: 'Lucía' })).toBe('');
	});
});

describe('tarjeta: textos', () => {
	it('el reverso lista los contactos en orden y sin https://', () => {
		expect(lineasContacto(lucia)).toEqual([
			{ tipo: 'telefono', texto: '+34 600 12 34 56' },
			{ tipo: 'email', texto: 'lucia@correo.es' },
			{ tipo: 'web', texto: 'luciamartin.es' },
			{ tipo: 'linkedin', texto: 'linkedin.com/in/lucia-martin' },
			{ tipo: 'ubicacion', texto: 'Valencia' },
		]);
		expect(lineasContacto({ nombre: 'X' })).toEqual([]);
	});

	it('iniciales salta partículas («de», «la») y usa mayúsculas', () => {
		expect(iniciales('Lucía Martín Ortega')).toBe('LM');
		expect(iniciales('maría de la osa')).toBe('MO');
		expect(iniciales('')).toBe('');
	});

	it('el cuerpo del nombre baja con nombres largos sin pasar de 9 a 17', () => {
		expect(tamanoNombre('Ana', 200)).toBe(17);
		expect(tamanoNombre('María de los Ángeles Fernández-Villaverde', 120)).toBe(9);
		const medio = tamanoNombre('Lucía Martín Ortega', 180);
		expect(medio).toBeGreaterThan(9);
		expect(medio).toBeLessThan(17);
	});
});
