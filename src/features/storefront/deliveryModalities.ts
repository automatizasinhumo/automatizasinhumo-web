interface LabeledVariant {
  id: string | number;
  label: string;
}

const TEMPLATE_LABEL = 'plantilla';
const SETUP_LABEL = 'te lo montamos';

const normalize = (label: string) => label.trim().toLocaleLowerCase('es');

export function classifyDeliveryModalities<T extends LabeledVariant>(
  variants: readonly T[],
): { template: T | null; setup: T | null } {
  const setup = variants.find((variant) => normalize(variant.label).includes(SETUP_LABEL)) ?? null;
  const template =
    variants.find((variant) => {
      const label = normalize(variant.label);
      return !label.includes(SETUP_LABEL) && label.includes(TEMPLATE_LABEL);
    }) ?? null;

  return { template, setup };
}
