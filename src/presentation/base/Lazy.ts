export default class Lazy<T> {

    private initializer!: () => T
    constructor(initializer: () => T) {
        this.initializer = initializer;
    }
    private _field: T | undefined = undefined;

    get field() {
        return this._field || (this._field = this.initializer());
    }
}