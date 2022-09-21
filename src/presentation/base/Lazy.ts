export default abstract class Lazy<T> {
    private _field: T | undefined = undefined;

    get field() {
        return this._field || (this._field = this.initializer());
    }

    abstract initializer(): T
}