import React from "react";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";

import Like from "../like";

let container;

//helpers
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(()=>{
        ReactDOM.render(<Like/>, container);
    });
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe("Testing likes component", ()=>{
    //verificando el parrafo
    it("Parrafo sin cambios por default", ()=>{
        const parrafo = container.querySelector("p");
        expect(parrafo.textContent).toBe("Likes: 0");
    });

    //probar el evento like
    it("Sumar un like cuando se activa like", ()=>{
        const incrementLike = container.querySelector("#increment");
        const parrafo = container.querySelector("p");
        act(()=>{
            incrementLike.dispatchEvent( new MouseEvent("click", {bubbles: true}))
        });
        expect(parrafo.textContent).toBe("Likes: 1");
    });

    //probar el evento dislike
    it("Restar un like cuando se activa dislike", ()=>{
        const decrementLike = container.querySelector("#decrement");
        const parrafo = container.querySelector("p");
        act(()=>{
            decrementLike.dispatchEvent( new MouseEvent("click", {bubbles: true}))
        });
        expect(parrafo.textContent).toBe("Likes: -1");
    });
});