interface LabeledVariant {
  id: string | number;
  label: string;
}

export function classifyDeliveryModalities<T extends LabeledVariant>(
  variants: readonly T[],
): { template: T | null; setup: T | null } {
  const template = variants.find((variant) => /plantilla/i.test(variant.label)) ?? null;
  const setup =
    variants.find(
      (variant) => /montamos/i.test(variant.label) && variant.id !== template?.id,
    ) ?? null;

  return { template, setup };
}
