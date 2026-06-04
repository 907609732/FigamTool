# FigamTool
Figam节点AI命名属性修改工具

## 本机临时 API 测试配置

仓库是公开仓库，请勿把真实 API Key 提交到 Git。

1. 复制 `.figmatool-test-config.example.json` 为 `.figmatool-test-config.json`。
2. 在 `.figmatool-test-config.json` 中填写百度翻译和 Kimi 测试凭据。
3. 运行 `npm run build:test`。
4. 在 Figma 开发插件中导入根目录生成的 `manifest.local.json`。

`.figmatool-test-config.json`、`dist-local/` 和 `manifest.local.json` 已加入 `.gitignore`，不会进入公开仓库。跨电脑测试时，请通过私密方式单独传输 `.figmatool-test-config.json`，然后重新运行 `npm run build:test`。
