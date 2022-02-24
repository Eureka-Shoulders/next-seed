import clearFilters from './clearFilters';

describe('Project utils Tests', () => {
  it('should clear filters', () => {
    const filters = new URLSearchParams();

    filters.append('name', 'Tony');
    filters.append('locked', 'true');

    clearFilters(filters);

    expect(filters.has('name')).toBe(false);
    expect(filters.has('locked')).toBe(false);
  });

  it('should ignore important filters when clearing', () => {
    const filters = new URLSearchParams();

    filters.append('select', '{ name: true }');
    filters.append('include', '{ person: true }');
    filters.append('sort', 'email-desc');
    filters.append('name', 'Tony');
    filters.append('locked', 'true');

    clearFilters(filters);

    expect(filters.has('select')).toBe(true);
    expect(filters.has('include')).toBe(true);
    expect(filters.has('sort')).toBe(true);
    expect(filters.has('name')).toBe(false);
    expect(filters.has('locked')).toBe(false);
  });
});
