# FigamTool

Figma 节点 AI 命名和属性批量设置工具。

## 根目录结构

根目录只保留：

- `manifest.json`：Figma 导入插件时使用的配置文件。
- `system/`：源码、构建产物、npm 配置、脚本和本地测试配置都放在这里。
- `README.md`：项目说明。
- `交互文档.md`：产品功能和交互说明，后续改功能先看这里。

## 常用命令

所有 npm 命令都在 `system/` 目录执行：

```bash
cd system
npm run typecheck
npm run build
npm run build:test
```

正式导入 Figma 时，选择根目录的 `manifest.json`。

本机临时 API 测试时：

1. 复制 `system/.figmatool-test-config.example.json` 为 `system/.figmatool-test-config.json`。
2. 在 `system/.figmatool-test-config.json` 中填写百度翻译和 Kimi 测试凭据。
3. 运行 `cd system && npm run build:test`。
4. 在 Figma 开发插件中导入 `system/manifest.local.json`。

`system/.figmatool-test-config.json`、`system/dist-local/` 和 `system/manifest.local.json` 已加入 `.gitignore`，不会进入公开仓库。
