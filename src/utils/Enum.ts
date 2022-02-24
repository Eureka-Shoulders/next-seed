import { find, keys } from 'ramda';

class Enum<T extends Record<string, string>> {
  private notFound = 'Enum not found';

  constructor(private enumerable: T) {}

  getKey(value: string) {
    return (
      find((key) => this.enumerable[key] === value, keys(this.enumerable)) ||
      this.notFound
    );
  }

  getValue(key: string) {
    return this.enumerable[key] || this.notFound;
  }
}

export default Enum;
