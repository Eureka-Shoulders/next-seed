class Enum<T extends Record<string, string>> {
  private notFound = 'Sem correspondência';

  constructor(private enumerable: T) {}

  getKey(value: string) {
    return (
      Object.keys(this.enumerable).find(
        (key) => this.enumerable[key] === value
      ) || this.notFound
    );
  }

  getValue(key: string) {
    return this.enumerable[key] || this.notFound;
  }
}

export default Enum;
