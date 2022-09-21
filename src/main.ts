import IPresentation from "./presentation/base/IPresentation";
import CubesPresentation from "./presentation/cubes/Cubes";
import { MonoSquarePresentation } from "./presentation/monosquare/MonoSquare";
import { TrianglePresentation } from "./presentation/triangle/Triangle";

const monoSquarePresentation: IPresentation<any> = new MonoSquarePresentation();

const trianglePresentation: IPresentation<any> = new TrianglePresentation();

const cubesPresentation: IPresentation<any> = new CubesPresentation();


const currentPresentation: IPresentation<any> = trianglePresentation;


const canvas = document.querySelector("canvas")!
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

currentPresentation.onLoaded();