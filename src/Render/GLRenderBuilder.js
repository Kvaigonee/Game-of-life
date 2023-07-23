import GLRenderer from "./GLRender";


export default class GLRenderBuilder {


    static buildGameOfLifeRender() {
        const render = new GLRenderer();

        render.createCanvas("render_area");
        render.createContext("webgl2");


        return render;
    }

}