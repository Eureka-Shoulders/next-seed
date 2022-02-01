import { validateCNPJ, validateCPF } from '@euk-labs/beltz';

export default function validateCPForCNPJ(value: string) {
  if (value.length === 11) {
    return validateCPF(value);
  }
  if (value.length === 14) {
    return validateCNPJ(value);
  }

  return false;
}
