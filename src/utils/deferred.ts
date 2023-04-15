export class Deferred<T> {
  promise: Promise<T>;
  resolve!: (value: T) => void;

  constructor() {
    this.promise = new Promise(resolve => {
      this.resolve = resolve;
    });
  }

  reset() {
    this.promise = new Promise(resolve => {
      this.resolve = resolve;
    });
  }
}
