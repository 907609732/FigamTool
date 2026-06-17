import { build as esbuild } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const watch = process.argv.includes("--watch");
const useTestConfig = process.argv.includes("--test-config");
const outDir = useTestConfig ? "dist-local" : "dist";
const localTestConfig = useTestConfig
  ? JSON.parse(await readFile(".figmatool-test-config.json", "utf8"))
  : null;
const injectedTestConfig = JSON.stringify(localTestConfig);

async function buildCode() {
  await mkdir(outDir, { recursive: true });
  await esbuild({
    entryPoints: ["src/code.ts"],
    bundle: true,
    outfile: `${outDir}/code.js`,
    platform: "browser",
    target: "es2017",
    format: "iife",
    define: {
      __LOCAL_TEST_CONFIG__: injectedTestConfig
    },
    sourcemap: true,
    logLevel: "info"
  });
}

async function buildUi() {
  await mkdir(outDir, { recursive: true });
  const [html, packageJson] = await Promise.all([
    readFile("src/ui.html", "utf8"),
    readFile("package.json", "utf8")
  ]);
  const { version } = JSON.parse(packageJson);
  const output = html
    .replaceAll("__APP_VERSION__", version)
    .replaceAll("__LOCAL_TEST_CONFIG__", injectedTestConfig);
  await writeFile(`${outDir}/ui.html`, output, "utf8");
}

async function buildLocalManifest() {
  if (!useTestConfig) return;
  const manifest = JSON.parse(await readFile("../manifest.json", "utf8"));
  manifest.name = `${manifest.name} (Local Test)`;
  manifest.main = `${outDir}/code.js`;
  manifest.ui = `${outDir}/ui.html`;
  await writeFile("manifest.local.json", `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

await buildCode();
await buildUi();
await buildLocalManifest();

if (watch) console.log("--watch is currently treated as a one-shot build.");
