// Astro emite el HTML en streaming: si un componente lanza a mitad (p. ej. D1 sin cupo),
// la cabecera ya salió con 200 y el navegador recibe la página cortada, sin pie ni scripts
// (los menús no abren). Aquí se lee la página entera antes de enviarla: si el stream falla
// o el documento no llega a cerrarse, se responde 503 con una página completa.

const PAGINA_503 = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Volvemos enseguida · Automatiza sin humo</title>
<style>body{font-family:system-ui,sans-serif;max-width:36rem;margin:15vh auto;padding:0 1.5rem;color:#1c1917;line-height:1.6}a{color:#0f766e;font-weight:600}</style>
</head>
<body>
<main>
<h1>Volvemos enseguida</h1>
<p>Ahora mismo no podemos mostrar esta página entera. Inténtalo de nuevo en unos minutos.</p>
<p><a href="">Reintentar</a> · <a href="/">Ir al inicio</a></p>
</main>
</body>
</html>`;

export function pagina503(): Response {
  return new Response(PAGINA_503, {
    status: 503,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'retry-after': '300',
    },
  });
}

/** Devuelve la respuesta con el HTML ya completo, o un 503 si el render se cortó. */
export async function asegurarPaginaEntera(
  metodo: string,
  res: Response,
  ruta: string,
): Promise<Response> {
  if (metodo !== 'GET' || !res.ok || !res.body) return res;
  if (!(res.headers.get('content-type') ?? '').includes('text/html')) return res;
  let html: string;
  try {
    html = await res.text();
  } catch (error) {
    console.error('PAGINA_CORTADA', ruta, error);
    return pagina503();
  }
  // Los parciales (fragmentos sin <html>) no tienen cierre que comprobar. No se exige que
  // </html> sea lo último: Astro emite detrás los <script> de la página que van fuera del layout.
  if (/<html[\s>]/i.test(html) && !/<\/html>/i.test(html)) {
    console.error('PAGINA_INCOMPLETA', ruta);
    return pagina503();
  }
  const headers = new Headers(res.headers);
  headers.delete('content-length');
  return new Response(html, { status: res.status, statusText: res.statusText, headers });
}
