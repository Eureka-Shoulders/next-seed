export default function setFilter(
  field: string,
  value: string | number | Record<string, unknown>,
  urlSearchParams: URLSearchParams
) {
  urlSearchParams.set(field, JSON.stringify(value));
}
