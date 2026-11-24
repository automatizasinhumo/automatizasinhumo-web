// Los specs de Playwright importan módulos de src/ que nombran D1Database. Los tipos globales de
// Workers chocan con el DOM del navegador (redefinen Element.append), así que solo se toma ese
// nombre, de la versión en módulo del paquete.
type D1Database = import('@cloudflare/workers-types/index').D1Database;
