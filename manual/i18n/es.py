# Traduce al español los textos visibles de la tienda (src/). Idempotente.
# Uso, desde la raíz del repo:  python manual/i18n/es.py
# Tras actualizar desde la plantilla minshop, volver a ejecutarlo.
import re, glob

T = {
 'No products yet.': 'Aún no hay servicios.', 'Search': 'Buscar', 'Sold out': 'Agotado',
 '&larr; Back to shop': '&larr; Volver al catálogo', 'Digital download': 'Entrega digital', 'from': 'desde',
 'Low stock': 'Últimas plazas', 'Share': 'Compartir', 'You may also like': 'También te puede interesar',
 'Prev': 'Anterior', 'Next': 'Siguiente', 'Pagination': 'Paginación', 'Sort': 'Ordenar',
 'Add-ons': 'Extras', 'Add to cart': 'Añadir al carrito', 'Buy now': 'Contratar ahora', 'Option': 'Opción',
 'Account': 'Mi cuenta', 'Cart': 'Carrito', 'Menu': 'Menú', 'Search products': 'Buscar servicios',
 'Primary': 'Principal', 'Footer': 'Pie de página',
 'All products': 'Todos los servicios', 'Shop': 'Catálogo',
 'No products in this category yet.': 'Aún no hay servicios en esta categoría.',
 'Not found': 'No encontrado', 'More from these categories': 'Más de estas categorías',
 'Search products…': 'Buscar servicios…', 'Find something': 'Encuentra tu servicio', 'Search: ${q}': 'Búsqueda: ${q}',
 'Your cart': 'Tu carrito', 'Continue shopping': 'Seguir mirando', 'Out of stock': 'Sin disponibilidad',
 'Update': 'Actualizar', 'Remove': 'Quitar', 'Checkout is currently unavailable.': 'El pago no está disponible ahora mismo.',
 'Ship to': 'Enviar a', 'Quantity': 'Cantidad', 'Pay with card': 'Pagar con tarjeta',
 'Set up card payments': 'Configurar pagos con tarjeta', 'Set up Lightning': 'Configurar Lightning',
 'Pay with Bitcoin': 'Pagar con Bitcoin', 'Set up OpenNode': 'Configurar OpenNode',
 'Demo checkout': 'Pago de prueba', 'Set up': 'Configurar',
 'Your cart is empty.': 'Tu carrito está vacío.', 'Checkout': 'Finalizar compra', 'View full cart': 'Ver carrito completo',
 'Page not found': 'Página no encontrada',
 "The page you're looking for moved, sold out, or never existed.": 'La página que buscas se ha movido o no existe.',
 'Back to shop': 'Volver al catálogo', 'Search the catalog': 'Buscar en el catálogo',
 '⚠️ Demo checkout — not a real payment': '⚠️ Pago de prueba: no se cobra nada',
 'No card is charged. Completing it places a real order tagged': 'No se cobra ninguna tarjeta. Al completarlo se crea un pedido real marcado como',
 'so you can see the full flow.': 'para que veas el flujo completo.', 'Edit address': 'Editar dirección',
 'Shipping': 'Envío', 'Full name': 'Nombre completo', 'Address': 'Dirección',
 'Apartment, suite, etc. (optional)': 'Piso, puerta, etc. (opcional)', 'City': 'Ciudad',
 'State / Province': 'Provincia', 'Postal code': 'Código postal', 'Country': 'País',
 'Continue to shipping →': 'Continuar →', 'Pay with Lightning': 'Pagar con Lightning',
 'Place demo order': 'Hacer pedido de prueba',
 'Name is required.': 'El nombre es obligatorio.', 'Address is required.': 'La dirección es obligatoria.',
 'City is required.': 'La ciudad es obligatoria.', 'Postal code is required.': 'El código postal es obligatorio.',
 'Please choose a shipping option.': 'Elige una opción de envío.',
 'That payment method is temporarily unavailable. Please try again in a moment, or choose another.':
   'Ese método de pago no está disponible ahora mismo. Inténtalo en un momento o elige otro.',
 'Free': 'Gratis', "Sorry, we don't ship to ${addr.country} yet.": 'Lo sentimos, aún no enviamos a ${addr.country}.',
 'Thank you! Your order is confirmed.': '¡Gracias! Tu pedido está confirmado.', 'Item': 'Servicio', 'Qty': 'Cant.',
 'Downloads': 'Descargas', 'Unavailable after refund': 'No disponible tras el reembolso', 'Download': 'Descargar',
 '&larr; Continue shopping': '&larr; Seguir mirando', 'Confirming your order…': 'Confirmando tu pedido…',
 'Card': 'Tarjeta', 'Order confirmed': 'Pedido confirmado', 'Confirming your order': 'Confirmando tu pedido',
 'Your orders': 'Tus pedidos', 'Sign out': 'Cerrar sesión', 'No orders yet.': 'Aún no tienes pedidos.',
 'Start shopping →': 'Ver servicios →', 'Your account': 'Tu cuenta', 'Partially refunded': 'Reembolsado en parte',
 'Sign in': 'Entrar',
 'Check your email — we sent a one-time sign-in link. It expires in 15 minutes.':
   'Revisa tu email: te hemos enviado un enlace de acceso de un solo uso. Caduca en 15 minutos.',
 'Send sign-in link': 'Enviar enlace de acceso', 'you@example.com': 'tu@email.com',
 'Enter a valid email address.': 'Introduce un email válido.',
 'No card is charged. Submitting places a real order tagged': 'No se cobra ninguna tarjeta. Al enviarlo se crea un pedido real marcado como',
 'Email for the order confirmation': 'Email para la confirmación del pedido',
 'Card (test — input ignored)': 'Tarjeta (prueba: no se usa)', 'Simulate outcome': 'Simular resultado',
 'Cancel': 'Cancelar', 'Card number': 'Número de tarjeta', 'Expiry': 'Caducidad', 'Approve payment': 'Aprobar pago',
 'Back to cart': 'Volver al carrito', 'Copy': 'Copiar', 'Copied': 'Copiado',
 'Waiting for payment… this page updates automatically.': 'Esperando el pago… esta página se actualiza sola.',
 'Invoice expired': 'Factura caducada', 'Lightning invoice': 'Factura Lightning', 'Open in wallet →': 'Abrir en la cartera →',
}
ML = {
 "Your payment went through and we're recording your order. This page refreshes automatically — it usually takes just a few seconds.":
   'Tu pago se ha completado y estamos registrando el pedido. Esta página se actualiza sola; suele tardar unos segundos.',
 "Enter your email and we'll send a sign-in link — no password needed. Use the address from your orders to see your order history.":
   'Escribe tu email y te enviamos un enlace de acceso, sin contraseña. Usa el mismo email de tus pedidos para ver tu historial.',
 "This Lightning invoice is no longer payable and you weren't charged. Start a new checkout to try again.":
   'Esta factura Lightning ya no se puede pagar y no se te ha cobrado. Vuelve a iniciar el pago para intentarlo de nuevo.',
}
FILES = ['src/themes/*/*.astro', 'src/features/storefront/controls/*.astro', 'src/pages/products/index.astro',
         'src/pages/categories/*.astro', 'src/pages/search.astro', 'src/pages/cart.astro', 'src/pages/partials/cart.astro',
         'src/pages/404.astro', 'src/pages/checkout.astro', 'src/pages/order/*.astro', 'src/pages/account/*.astro',
         'src/features/payments/checkout/*.astro', 'src/pages/pay/*.astro', 'src/components/Pagination.astro']

n = 0
for pat in FILES:
    for f in glob.glob(pat):
        s = o = open(f, encoding='utf8').read()
        for en, es in T.items():
            e = re.escape(en)
            s = re.sub(r'(>\s*)' + e + r'(\s*<)', lambda m: m.group(1) + es + m.group(2), s)
            s = re.sub(r'((?:placeholder|title|aria-label|alt|label)=")' + e + '"', lambda m: m.group(1) + es + '"', s)
            s = re.sub(r"(?<![\w.\[])'" + e + r"'(?!\s*[:\]])", lambda m: "'" + es.replace("'", "\\'") + "'", s)
            s = re.sub('`' + e + '`', lambda m: '`' + es + '`', s)
        for en, es in ML.items():
            rx = r'\s+'.join(re.escape(w) for w in en.split())
            s = re.sub(rx, lambda m: es, s)
        if s != o:
            open(f, 'w', encoding='utf8').write(s)
            n += 1
            print('ok', f)
print(n, 'ficheros')
