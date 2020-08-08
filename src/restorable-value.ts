export default class RestorableValue<T> {
  value: T;
  restoreValue: T;

  constructor(value: T, restoreValue?: T) {
    this.value = value;
    this.restoreValue = restoreValue ?? value;
  }

  set(value: T): RestorableValue<T> {
    return new RestorableValue(value, this.restoreValue);
  }

  save(): RestorableValue<T> {
    return new RestorableValue(this.value);
  }

  restore(): RestorableValue<T> {
    return new RestorableValue(this.restoreValue);
  }
}
