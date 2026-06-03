import { build as esbuild } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const watch = process.argv.includes("--watch");

async function buildCode() {
  await esbuild({
    entryPoints: ["src/code.ts"],
    bundle: true,
    outfile: "dist/code.js",
    platform: "browser",
    target: "es2017",
    format: "iife",
    sourcemap: true,
    logLevel: "info"
  });
}

async function buildUi() {
  await mkdir("dist", { recursive: true });
  const [html, packageJson] = await Promise.all([
    readFile("src/ui.html", "utf8"),
    readFile("package.json", "utf8")
  ]);
  const { version } = JSON.parse(packageJson);
  await writeFile("dist/ui.html", html.replaceAll("__APP_VERSION__", version), "utf8");
}

await buildCode();
await buildUi();

if (watch) console.log("--watch is currently treated as a one-shot build.");
