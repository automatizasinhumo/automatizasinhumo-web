interface LabeledVariant {
  id: string | number;
  label: string;
}

// Etiquetas exactas que escribe el generador del catálogo (manual/catalogo/gen-sql.mjs).
// Cualquier otra etiqueta no se clasifica: mejor no comparar que prometer una modalidad equivocada.
const TEMPLATE_LABEL = 'plantilla + guía';
const SETUP_LABEL = 'te lo montamos';

const normalize = (label: string) => label.trim().toLocaleLowerCase('es');

export function classifyDeliveryModalities<T extends LabeledVariant>(
  variants: readonly T[],
): { template: T | null; setup: T | null } {
  const template = variants.find((variant) => normalize(variant.label).startsWith(TEMPLATE_LABEL)) ?? null;
  const setup = variants.find((variant) => normalize(variant.label) === SETUP_LABEL) ?? null;

  return { template, setup };
}
