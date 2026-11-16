# Traduce los emails al cliente (confirmación, envío, reembolso). Idempotente.
# Uso, desde la raíz del repo:  python manual/i18n/emails_es.py
F = 'src/features/email/orderConfirmation.ts'
R = [
    ("`Thanks for your order!`", "`¡Gracias por tu pedido!`"),
    ("`Order #${num}, ${storeName}`", "`Pedido n.º ${num}, ${storeName}`"),
    ("`Shipping: ${money(order.shipping_cents)}`", "`Envío: ${money(order.shipping_cents)}`"),
    ("`Discount: -${money(order.discount_cents)}`", "`Descuento: -${money(order.discount_cents)}`"),
    ("`Tax: ${money(order.tax_cents)}`", "`IVA: ${money(order.tax_cents)}`"),
    ("`Your download is ready.`", "`Tu descarga está lista.`"),
    (">Your download is ready.<", ">Tu descarga está lista.<"),
    ("`View your order: ${orderUrl}`", "`Ver tu pedido: ${orderUrl}`"),
    ("'View your order'", "'Ver tu pedido'"),
    ("heading: 'Thanks for your order'", "heading: 'Gracias por tu pedido'"),
    ("`Order #${num} is confirmed. We'll email you again when it ships.`",
     "`El pedido n.º ${num} está confirmado. Ahora te llega el formulario con los campos para empezar.`"),
    ("`Questions about this order? Just reply to this email.`", "`¿Dudas sobre el pedido? Responde a este email.`"),
    ("`Your ${storeName} order #${num}`", "`Tu pedido n.º ${num} en ${storeName}`"),
    ("label: 'Shipping'", "label: 'Envío'"), ("label: 'Discount'", "label: 'Descuento'"),
    ("label: 'Tax'", "label: 'IVA'"),
    ("`Your order #${num} has shipped!`", "`¡Tu pedido n.º ${num} está entregado!`"),
    ("`Carrier: ", "`Transportista: "), ("`Tracking: ", "`Seguimiento: "), ("`Track it: ", "`Seguirlo: "),
    ("'Your order is on its way'", "'Tu pedido está en camino'"),
    ("`Order #${num} shipped.`", "`Pedido n.º ${num} enviado.`"),
    ("'Track your package'", "'Seguir el envío'"),
    ("`Your ${storeName} order #${num} has shipped`", "`Tu pedido n.º ${num} en ${storeName} está entregado`"),
    ("'Card refunds usually appear within 5-10 business days, depending on your bank.'",
     "'Los reembolsos con tarjeta suelen aparecer en 5-10 días hábiles, según tu banco.'"),
    ("'The refund was sent back over the same payment method you used.'",
     "'El reembolso se ha hecho por el mismo método de pago que usaste.'"),
    ("`Total refunded so far: ", "`Total reembolsado hasta ahora: "),
    ("`Your order #${num} has been refunded.`", "`Tu pedido n.º ${num} ha sido reembolsado.`"),
    ("`A refund was issued for order #${num}.`", "`Se ha emitido un reembolso del pedido n.º ${num}.`"),
    ("`Refunded: ", "`Reembolsado: "), ("`Still paid: ", "`Pagado restante: "),
    ("label: 'Refunded'", "label: 'Reembolsado'"), ("label: 'Total refunded'", "label: 'Total reembolsado'"),
    ("label: 'Still paid'", "label: 'Pagado restante'"),
    ("'Your order has been refunded'", "'Tu pedido ha sido reembolsado'"),
    ("'A refund is on its way'", "'Tu reembolso está en camino'"),
    ("subheading: `Order #${num}`", "subheading: `Pedido n.º ${num}`"),
    ("emailLabel('Refund')", "emailLabel('Reembolso')"), ("emailLabel('Tracking')", "emailLabel('Seguimiento')"),
    ("`Your ${storeName} order #${num} has been refunded`", "`Tu pedido n.º ${num} en ${storeName} ha sido reembolsado`"),
    ("`A refund for your ${storeName} order #${num}`", "`Reembolso de tu pedido n.º ${num} en ${storeName}`"),
]
s = o = open(F, encoding='utf8').read()
for a, b in R:
    s = s.replace(a, b)
if s != o:
    open(F, 'w', encoding='utf8').write(s)
print('cambios' if s != o else 'sin cambios')
