import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import css from "rollup-plugin-import-css";
import nodePolyfills from "rollup-plugin-node-polyfills";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import scss from "rollup-plugin-scss";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      json(),
      nodePolyfills({
        exclude: [
          "util",
          "zlib",
          "os",
          "tty",
          "assert",
          "fs",
          "url",
          "https",
          "http",
          "path",
          "stream",
        ],
      }),
    ],
    external: ["react", "react-dom", /\.css$/, /\.scss$/],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts.default()],
  },
  {
    input: "src/styles/index.scss",
    output: [
      {
        file: "dist/styles/index.css",
        format: "es",
      },
    ],
    plugins: [
      css(),
      scss({ fileName: "index.css", outputStyle: "compressed" }),
    ],
  },
];
