interface LabeledVariant {
  id: string | number;
  label: string;
}

// Etiquetas exactas que escribe el generador del catálogo (manual/catalogo/gen-sql.mjs).
// Cualquier otra etiqueta no se clasifica: mejor no comparar que prometer una modalidad equivocada.
const TEMPLATE_LABELS = new Set(['plantilla + guía', 'plantilla + guía (la publicas tú)']);
const SETUP_LABEL = 'te lo montamos';

const normalize = (label: string) => label.trim().toLocaleLowerCase('es');

export function classifyDeliveryModalities<T extends LabeledVariant>(
  variants: readonly T[],
): { template: T | null; setup: T | null } {
  const template = variants.find((variant) => TEMPLATE_LABELS.has(normalize(variant.label))) ?? null;
  const setup = variants.find((variant) => normalize(variant.label) === SETUP_LABEL) ?? null;

  return { template, setup };
}
