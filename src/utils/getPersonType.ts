export default function getPersonType(value: string) {
  if (value.length === 11) {
    return { value: 'F', label: 'Física' };
  }
  if (value.length === 14) {
    return { value: 'J', label: 'Jurídica' };
  }

  return null;
}
