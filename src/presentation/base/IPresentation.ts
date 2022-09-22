import Lazy from "./Lazy";
import { IRenderer } from "./IRenderer";

export default abstract class IPresentation<T extends IRenderer> {
    abstract lazyWebGL: Lazy<T>

    get webGL(): T {
        return this.lazyWebGL.field;
    }

    abstract onLoaded(): void

    abstract prepareScene(): void

    abstract drawScene(): void
}