/*

In this step we will add a example to demonstrate how to use our library


*/

/*

for this we need babel support to convert our jsx into js

1. npm install vite
2. npm install @vitejs/plugin-react

at root , create vite.config.js file and add the following code

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: "classic",
            jsxImportSource: undefined,
        }),
    ],
});



*/

/*

but that code uses React.createElement, we need to change it to use our createElement function
so update the vite.config.js file to the following

react({
    jsxRuntime: "classic",
    babel: {
        plugins: [
            [
                "@babel/plugin-transform-react-jsx",
                {
                    pragma: "createElement",
                },
            ],
        ],
    },
});


then setup example folder and add first.jsx file with the code and then index.html file ,
and finally run the command -> npx vite


*/
