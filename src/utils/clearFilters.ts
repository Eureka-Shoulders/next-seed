export default function clearFilters(urlSearchParams: URLSearchParams) {
  const toDelete: string[] = [];

  urlSearchParams.forEach((value, key) => {
    if (key === 'select' || key === 'include' || key === 'sort') {
      return;
    }

    toDelete.push(key);
  });

  toDelete.forEach((key) => urlSearchParams.delete(key));
}
