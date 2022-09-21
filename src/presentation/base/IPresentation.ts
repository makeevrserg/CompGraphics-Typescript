import Lazy from "./Lazy";
import { WebGlStlTP } from "./WebGlStlTP";

export default abstract class IPresentation<T extends WebGlStlTP> {
    abstract lazyWebGL: Lazy<T>

    get webGL(): T {
        return this.lazyWebGL.field;
    }

    abstract onLoaded(): void

    abstract onClicked(): void

    abstract prepareScene(): void

    abstract drawScene(): void
}