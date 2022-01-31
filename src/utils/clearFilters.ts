export default function clearFilters(urlSearchParams: URLSearchParams) {
  urlSearchParams.forEach((filter) => {
    if (filter === 'select' || filter === 'include' || filter === 'sort') {
      return;
    }

    urlSearchParams.delete(filter);
  });
}
