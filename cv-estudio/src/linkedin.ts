// Perfil de LinkedIn a partir de lo que escribe la persona (dirección completa o usuario). Criterio único:
// lo usan la conversión al CV y el aviso del formulario, para que no se acepte lo que luego se descarta.
/** LinkedIn: admite la dirección entera o solo el usuario; devuelve usuario y enlace. */
export function perfilLinkedin(v: unknown): { usuario: string; url: string } | null {
	const t = (typeof v === "string" ? v.trim().slice(0, 200) : "").replace(/\s+/g, "");
	if (!t) return null;
	const m = /linkedin\.com\/in\/([^/?#]+)/i.exec(t);
	let usuario = "";
	if (m) {
		try {
			usuario = decodeURIComponent(m[1]);
		} catch {
			return null; // escape roto («%» suelto): se omite el perfil, no la vista previa
		}
	} else usuario = /^@?[\p{L}\p{N}_-]{3,100}$/u.test(t) ? t.replace(/^@/, "") : "";
	return usuario ? { usuario, url: `https://www.linkedin.com/in/${encodeURIComponent(usuario)}` } : null;
}
