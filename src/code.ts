import {
  defaultConfig,
  type AiSettings,
  type LexiconEntry,
  type NodeKind,
  type PluginConfig,
  type PluginToUiMessage,
  type PropertyPreset,
  type RenameOptions,
  type RenamePreviewItem,
  type SelectionSummary,
  type TranslateSettings,
  type UeLayoutOptions,
  type UiToPluginMessage
} from "./shared";

const CONFIG_KEY = "ai-auto-namer-config";
const PROJECT_CONFIG_NODE_NAME = ".AutoNamePluginConfig";

figma.showUI(__html__, { width: 560, height: 720, themeColors: true });

void initialize();

figma.on("selectionchange", async () => {
  try {
    post({ type: "SELECTION", selection: await getSelectionSummary() });
  } catch (error) {
    post({ type: "ERROR", message: error instanceof Error ? error.message : String(error) });
  }
});

figma.ui.onmessage = async (message: UiToPluginMessage) => {
  try {
    if (message.type === "SCAN_SELECTION") {
      post({ type: "SELECTION", selection: await getSelectionSummary() });
      return;
    }

    if (message.type === "RESIZE_UI") {
      figma.ui.resize(clamp(Math.round(message.width), 420, 900), clamp(Math.round(message.height), 520, 1000));
      return;
    }

    if (message.type === "SAVE_CONFIG") {
      await saveConfig(message.config);
      figma.notify("配置已保存");
      return;
    }

    if (message.type === "IMPORT_CONFIG") {
      const config = normalizeConfig(JSON.parse(message.json));
      await saveConfig(config);
      post({ type: "READY", config, selection: await getSelectionSummary() });
      figma.notify("配置已导入");
      return;
    }

    if (message.type === "EXPORT_CONFIG") {
      post({ type: "CONFIG_EXPORTED", json: JSON.stringify(await loadConfig(), null, 2) });
      return;
    }

    if (message.type === "WRITE_PROJECT_CONFIG") {
      await writeProjectConfig(message.config);
      post({ type: "PROJECT_CONFIG_WRITTEN", message: "项目配置节点已写入当前页面" });
      return;
    }

    if (message.type === "PREVIEW_RENAME" || message.type === "GENERATE_AI_NAMES") {
      const items = await buildRenamePreview(message.options, message.config, message.type === "GENERATE_AI_NAMES");
      post({ type: "RENAME_PREVIEW", items, aiUsed: message.type === "GENERATE_AI_NAMES" });
      return;
    }

    if (message.type === "APPLY_RENAME") {
      const changed = await applyRename(message.items);
      post({ type: "APPLY_RESULT", message: `已重命名 ${changed} 个节点` });
      figma.notify(`已重命名 ${changed} 个节点`);
      return;
    }

    if (message.type === "APPLY_PROPERTIES") {
      const changed = await applyProperties(message.preset, message.options);
      post({ type: "APPLY_RESULT", message: `已处理 ${changed} 个节点属性` });
      figma.notify(`已处理 ${changed} 个节点属性`);
      return;
    }

    if (message.type === "APPLY_LEXICON_ENTRY") {
      const result = await applyLexiconEntry(message.entryId, message.options, message.config);
      post({ type: "APPLY_RESULT", message: `已应用词条：重命名 ${result.renamed} 个，属性 ${result.properties} 个` });
      figma.notify(`已应用词条：${result.word}`);
      return;
    }

    if (message.type === "TRANSLATE_AND_RENAME") {
      const result = await translateAndRename(message.text, message.options, message.config);
      post({ type: "APPLY_RESULT", message: `百度翻译为 ${result.name}，已重命名 ${result.renamed} 个节点` });
      figma.notify(`已翻译命名：${result.name}`);
      return;
    }

    if (message.type === "CREATE_UE_FRAME") {
      const created = await createUeFrame(message.options, message.config);
      post({ type: "UE_RESULT", message: `已生成 ${created.name}，包含 ${created.count} 个节点` });
      figma.notify(`已生成 ${created.name}`);
    }
  } catch (error) {
    post({ type: "ERROR", message: error instanceof Error ? error.message : String(error) });
  }
};

async function initialize() {
  const config = await loadConfig();
  post({ type: "READY", config, selection: await getSelectionSummary() });
}

function post(message: PluginToUiMessage) {
  figma.ui.postMessage(message);
}

async function loadConfig(): Promise<PluginConfig> {
  const saved = await figma.clientStorage.getAsync(CONFIG_KEY);
  return normalizeConfig(saved);
}

async function saveConfig(config: PluginConfig) {
  await figma.clientStorage.setAsync(CONFIG_KEY, normalizeConfig(config));
}

function normalizeConfig(input: unknown): PluginConfig {
  if (!input || typeof input !== "object") return defaultConfig;
  const partial = input as Partial<PluginConfig>;
  const ueDefaults = partial.ueDefaults ?? {};
  const aiSettings = partial.aiSettings ?? {};
  const translateSettings = partial.translateSettings ?? {};
  return {
    namingRules: Array.isArray(partial.namingRules) ? partial.namingRules : defaultConfig.namingRules,
    lexicon: normalizeLexicon(partial.lexicon),
    propertyPresets: Array.isArray(partial.propertyPresets) ? partial.propertyPresets : defaultConfig.propertyPresets,
    ueDefaults: Object.assign({}, defaultConfig.ueDefaults, ueDefaults),
    aiSettings: Object.assign({}, defaultConfig.aiSettings, aiSettings),
    translateSettings: Object.assign({}, defaultConfig.translateSettings, translateSettings)
  };
}

function normalizeLexicon(input: unknown): LexiconEntry[] {
  const source = Array.isArray(input) ? input : defaultConfig.lexicon;
  const normalized: LexiconEntry[] = source.map((entry, index) => {
    const partial = entry as Partial<LexiconEntry>;
    const fallback = defaultConfig.lexicon[index] ?? defaultConfig.lexicon[defaultConfig.lexicon.length - 1];
    const values = Object.assign({}, partial.values || {});
    if (values.lineHeightPercent == null) values.lineHeightPercent = 150;
    if (values.textAlignHorizontal == null) values.textAlignHorizontal = "CENTER";
    if (values.textAlignVertical == null) values.textAlignVertical = "CENTER";
    return {
      id: partial.id || `lex-${index + 1}`,
      word: partial.word || partial.prefix || partial.label || fallback.word,
      label: partial.label || partial.word || partial.prefix || fallback.label,
      kind: partial.kind || fallback.kind,
      prefix: partial.prefix || partial.word || fallback.prefix,
      description: partial.description || "",
      applyProperties: partial.applyProperties ?? false,
      enabled: partial.enabled || {},
      values
    };
  });
  const existingIds = new Set(normalized.map((entry) => entry.id));
  for (const entry of defaultConfig.lexicon) {
    if (!existingIds.has(entry.id)) normalized.push(entry);
  }
  return normalized;
}

async function ensureCurrentPageLoaded() {
  await figma.currentPage.loadAsync();
}

async function getSelectionSummary(): Promise<SelectionSummary> {
  await ensureCurrentPageLoaded();
  const roots = figma.currentPage.selection.map((node) => ({
    id: node.id,
    name: node.name,
    type: node.type,
    kind: getNodeKind(node),
    childCount: "children" in node ? node.children.length : 0
  }));
  return { count: roots.length, roots };
}

async function collectTargets(options: RenameOptions): Promise<SceneNode[]> {
  await ensureCurrentPageLoaded();
  const selection = Array.from(figma.currentPage.selection);
  if (options.scope === "selection") return selection.filter(allowNode(options));
  if (options.scope === "children") {
    const children: SceneNode[] = [];
    for (const node of selection) {
      if ("children" in node) {
        for (const child of node.children) children.push(child);
      }
    }
    return children.filter(allowNode(options));
  }
  const deep: SceneNode[] = [];
  for (const node of selection) {
    for (const child of flatten(node)) deep.push(child);
  }
  return deep.filter(allowNode(options));
}

function flatten(node: SceneNode): SceneNode[] {
  if (!("children" in node)) return [node];
  const nodes: SceneNode[] = [node];
  for (const child of node.children) {
    for (const nested of flatten(child)) nodes.push(nested);
  }
  return nodes;
}

function allowNode(options: Pick<RenameOptions, "skipHidden" | "skipLocked">) {
  return (node: SceneNode) => {
    if (options.skipHidden && "visible" in node && !node.visible) return false;
    if (options.skipLocked && node.locked) return false;
    return true;
  };
}

async function buildRenamePreview(
  options: RenameOptions,
  config: PluginConfig,
  useAi: boolean
): Promise<RenamePreviewItem[]> {
  const targets = await collectTargets(options);
  if (!targets.length) throw new Error("没有可处理的选中节点");

  const ruleByKind = new Map(config.namingRules.map((rule) => [rule.kind, rule]));
  const counters = new Map<NodeKind, number>();
  const previews: RenamePreviewItem[] = targets.map((node) => {
    const kind = getNodeKind(node);
    const rule = ruleByKind.get(kind) ?? ruleByKind.get("NODE") ?? defaultConfig.namingRules[5];
    const nextIndex = (counters.get(kind) ?? 0) + 1;
    counters.set(kind, nextIndex);
    const prefix = getLexiconPrefix(kind, rule.prefix, config, options.lexiconEntryId);
    const base = `${prefix}_${String(nextIndex).padStart(rule.digits, "0")}`;
    const nextName = options.keepOriginalSuffix ? `${base}_${safeName(node.name)}` : base;
    return { id: node.id, currentName: node.name, nextName, type: node.type, kind };
  });

  if (!useAi) return previews;
  const aiNames = await requestAiNames(targets, config.aiSettings, previews);
  return previews.map((item) => ({ ...item, nextName: aiNames.get(item.id) ?? item.nextName }));
}

function getLexiconPrefix(kind: NodeKind, fallbackPrefix: string, config: PluginConfig, lexiconEntryId?: string): string {
  const lexicon = Array.isArray(config.lexicon) ? config.lexicon : defaultConfig.lexicon;
  if (lexiconEntryId === "__auto_lexicon__") {
    return lexicon.find((entry) => entry.kind === kind)?.prefix ?? fallbackPrefix;
  }
  if (lexiconEntryId) {
    return lexicon.find((entry) => entry.id === lexiconEntryId)?.prefix ?? fallbackPrefix;
  }
  return fallbackPrefix;
}

async function applyRename(items: RenamePreviewItem[]): Promise<number> {
  let changed = 0;
  for (const item of items) {
    const node = await figma.getNodeByIdAsync(item.id);
    if (node && "name" in node && item.nextName.trim()) {
      node.name = item.nextName.trim();
      changed += 1;
    }
  }
  return changed;
}

async function applyProperties(preset: PropertyPreset, options: RenameOptions): Promise<number> {
  const targets = (await collectTargets(options)).filter((node) => preset.targetKinds.includes(getNodeKind(node)));
  let changed = 0;
  for (const node of targets) {
    const didChange = await applyPresetToNode(node, preset);
    if (didChange) changed += 1;
  }
  return changed;
}

async function applyLexiconEntry(
  entryId: string,
  options: RenameOptions,
  config: PluginConfig
): Promise<{ renamed: number; properties: number; word: string }> {
  const normalized = normalizeConfig(config);
  const entry = normalized.lexicon.find((item) => item.id === entryId);
  if (!entry) throw new Error("找不到这个词库词条");
  const targets = await collectTargets(options);
  if (!targets.length) throw new Error("没有可处理的选中节点");

  const baseName = safeName(entry.word || entry.prefix || entry.label);
  let renamed = 0;
  let properties = 0;
  const preset = lexiconEntryToPreset(entry);
  for (let index = 0; index < targets.length; index += 1) {
    const node = targets[index];
    node.name = targets.length > 1 ? `${baseName}_${String(index + 1).padStart(2, "0")}` : baseName;
    renamed += 1;
    if (entry.applyProperties && preset) {
      const didChange = await applyPresetToNode(node, preset);
      if (didChange) properties += 1;
    }
  }
  return { renamed, properties, word: baseName };
}

async function translateAndRename(
  text: string,
  options: RenameOptions,
  config: PluginConfig
): Promise<{ renamed: number; name: string }> {
  const normalized = normalizeConfig(config);
  const translated = await requestBaiduTranslation(text.trim(), normalized.translateSettings);
  const baseName = toNodeName(translated);
  const targets = await collectTargets(options);
  if (!targets.length) throw new Error("没有可处理的选中节点");
  let renamed = 0;
  for (let index = 0; index < targets.length; index += 1) {
    targets[index].name = targets.length > 1 ? `${baseName}_${String(index + 1).padStart(2, "0")}` : baseName;
    renamed += 1;
  }
  return { renamed, name: baseName };
}

async function requestBaiduTranslation(text: string, settings: TranslateSettings): Promise<string> {
  if (!text) throw new Error("请输入要翻译的中文");
  if (!settings.appId || !settings.secretKey) throw new Error("请先在设置里填写百度翻译 AppID 和密钥");
  const salt = String(Date.now());
  const sign = md5(`${settings.appId}${text}${salt}${settings.secretKey}`);
  const params = new URLSearchParams({
    q: text,
    from: settings.from || "zh",
    to: settings.to || "en",
    appid: settings.appId,
    salt,
    sign
  });
  const response = await fetch(`https://api.fanyi.baidu.com/api/trans/vip/translate?${params.toString()}`);
  if (!response.ok) throw new Error(`百度翻译请求失败：${response.status} ${response.statusText}`);
  const payload = await response.json();
  if (payload?.error_code) throw new Error(`百度翻译失败：${payload.error_code} ${payload.error_msg || ""}`.trim());
  const translated = Array.isArray(payload?.trans_result)
    ? payload.trans_result.map((item: { dst?: string }) => item.dst || "").join(" ")
    : "";
  if (!translated.trim()) throw new Error("百度翻译没有返回有效结果");
  return translated;
}

function lexiconEntryToPreset(entry: LexiconEntry): PropertyPreset | null {
  if (!entry.applyProperties) return null;
  const values = Object.assign({}, defaultConfig.propertyPresets[0].values, entry.values ?? {});
  return {
    id: `${entry.id}-preset`,
    name: entry.label || entry.word,
    targetKinds: [entry.kind],
    enabled: entry.enabled ?? {},
    values
  };
}

async function applyPresetToNode(node: SceneNode, preset: PropertyPreset): Promise<boolean> {
  const { enabled, values } = preset;
  let changed = false;

  if (enabled.opacity && "opacity" in node) {
    node.opacity = clamp(values.opacity, 0, 1);
    changed = true;
  }
  if (enabled.visible && "visible" in node) {
    node.visible = values.visible;
    changed = true;
  }
  if (enabled.locked) {
    node.locked = values.locked;
    changed = true;
  }
  if (enabled.blendMode && "blendMode" in node) {
    node.blendMode = values.blendMode;
    changed = true;
  }
  if (enabled.constraints && "constraints" in node) {
    node.constraints = { horizontal: values.constraintsHorizontal, vertical: values.constraintsVertical };
    changed = true;
  }
  if (
    enabled.cornerRadius &&
    "topLeftCornerRadius" in node &&
    "topRightCornerRadius" in node &&
    "bottomLeftCornerRadius" in node &&
    "bottomRightCornerRadius" in node
  ) {
    node.topLeftCornerRadius = values.cornerRadius;
    node.topRightCornerRadius = values.cornerRadius;
    node.bottomLeftCornerRadius = values.cornerRadius;
    node.bottomRightCornerRadius = values.cornerRadius;
    changed = true;
  }
  if (enabled.clipsContent && "clipsContent" in node) {
    node.clipsContent = values.clipsContent;
    changed = true;
  }
  if (enabled.layoutMode && "layoutMode" in node) {
    node.layoutMode = values.layoutMode;
    changed = true;
  }
  if (enabled.padding && "paddingLeft" in node) {
    node.paddingLeft = values.padding;
    node.paddingRight = values.padding;
    node.paddingTop = values.padding;
    node.paddingBottom = values.padding;
    changed = true;
  }
  if (enabled.itemSpacing && "itemSpacing" in node) {
    node.itemSpacing = values.itemSpacing;
    changed = true;
  }

  if (node.type === "TEXT") {
    changed = (await applyTextPreset(node, preset)) || changed;
  }

  if ((enabled.imageScaleMode || enabled.textFill) && "fills" in node && Array.isArray(node.fills)) {
    const fills = node.fills.map((paint) => {
      if (enabled.imageScaleMode && paint.type === "IMAGE") return { ...paint, scaleMode: values.imageScaleMode };
      if (enabled.textFill && paint.type === "SOLID") return { ...paint, ...hexToSolidPaint(values.textFill) };
      return paint;
    });
    node.fills = fills;
    changed = true;
  }

  return changed;
}

async function applyTextPreset(node: TextNode, preset: PropertyPreset): Promise<boolean> {
  const { enabled, values } = preset;
  let changed = false;

  if (enabled.fontFamily || enabled.fontStyle) {
    const fontName: FontName = {
      family: values.fontFamily || "Inter",
      style: values.fontStyle || "Regular"
    };
    try {
      await figma.loadFontAsync(fontName);
      node.fontName = fontName;
      changed = true;
    } catch {
      figma.notify(`字体不可用，已跳过：${fontName.family} ${fontName.style}`);
    }
  } else if (node.fontName !== figma.mixed) {
    await figma.loadFontAsync(node.fontName);
  }

  if (enabled.fontSize) {
    node.fontSize = values.fontSize;
    changed = true;
  }
  if (enabled.lineHeightPx) {
    node.lineHeight = { unit: "PERCENT", value: values.lineHeightPercent ?? 150 };
    changed = true;
  }
  if (enabled.lineHeightPercent) {
    node.lineHeight = { unit: "PERCENT", value: values.lineHeightPercent ?? 150 };
    changed = true;
  }
  if (enabled.letterSpacing) {
    node.letterSpacing = { unit: "PIXELS", value: values.letterSpacing };
    changed = true;
  }
  if (enabled.textAlignHorizontal) {
    node.textAlignHorizontal = values.textAlignHorizontal;
    changed = true;
  }
  if (enabled.textAlignVertical) {
    node.textAlignVertical = values.textAlignVertical;
    changed = true;
  }
  if (enabled.paragraphSpacing) {
    node.paragraphSpacing = values.paragraphSpacing;
    changed = true;
  }
  if (enabled.textFill) {
    node.fills = [hexToSolidPaint(values.textFill)];
    changed = true;
  }

  return changed;
}

async function createUeFrame(options: UeLayoutOptions, config: PluginConfig): Promise<{ name: string; count: number }> {
  await ensureCurrentPageLoaded();
  const source = figma.currentPage.selection[0];
  if (!source || !("absoluteBoundingBox" in source) || !source.absoluteBoundingBox) {
    throw new Error("请选择一个 UI 画板或包含图片的节点");
  }

  const sourceBox = source.absoluteBoundingBox;
  const candidates = flatten(source).filter((node) => {
    if (!options.includeHidden && "visible" in node && !node.visible) return false;
    if (!options.includeLocked && node.locked) return false;
    return node !== source && (getNodeKind(node) === "IMAGE" || node.exportSettings.length > 0);
  });
  if (!candidates.length) throw new Error("选区内没有图片或可导出节点");

  const frame = figma.createFrame();
  frame.name = `${source.name}_UE_Assets`;
  frame.x = sourceBox.x + sourceBox.width + 120;
  frame.y = sourceBox.y;
  frame.resize(sourceBox.width, sourceBox.height);
  frame.fills = [];
  figma.currentPage.appendChild(frame);

  const imageRule = config.namingRules.find((rule) => rule.kind === "IMAGE") ?? defaultConfig.namingRules[1];
  candidates.forEach((node, index) => {
    const clone = node.clone();
    clone.name = `${imageRule.prefix}_${String(index + 1).padStart(imageRule.digits, "0")}`;
    frame.appendChild(clone);
    if (options.mode === "preserve") {
      const box = node.absoluteBoundingBox;
      if (box) {
        clone.x = box.x - sourceBox.x;
        clone.y = box.y - sourceBox.y;
      }
    } else {
      const size = options.preserveSize ? { width: clone.width, height: clone.height } : scaleSize(clone, options.maxGridItemSize);
      if (!options.preserveSize && "resize" in clone) clone.resize(size.width, size.height);
      const columns = Math.max(1, Math.floor(sourceBox.width / (options.maxGridItemSize + options.spacing)));
      const col = index % columns;
      const row = Math.floor(index / columns);
      clone.x = col * (options.maxGridItemSize + options.spacing);
      clone.y = row * (options.maxGridItemSize + options.spacing + 28);
    }
  });

  if (options.mode === "grid") {
    const rows = Math.ceil(candidates.length / Math.max(1, Math.floor(sourceBox.width / (options.maxGridItemSize + options.spacing))));
    frame.resize(sourceBox.width, Math.max(sourceBox.height, rows * (options.maxGridItemSize + options.spacing + 28)));
  }

  figma.currentPage.selection = [frame];
  figma.viewport.scrollAndZoomIntoView([frame]);
  return { name: frame.name, count: candidates.length };
}

async function writeProjectConfig(config: PluginConfig) {
  await ensureCurrentPageLoaded();
  const existing = figma.currentPage.findOne((node) => node.name === PROJECT_CONFIG_NODE_NAME);
  const target = existing ?? figma.createFrame();
  target.name = PROJECT_CONFIG_NODE_NAME;
  target.setPluginData(CONFIG_KEY, JSON.stringify(normalizeConfig(config)));
  if ("visible" in target) target.visible = false;
  target.locked = true;
  if (!existing) {
    target.x = figma.viewport.center.x;
    target.y = figma.viewport.center.y;
    figma.currentPage.appendChild(target);
  }
}

async function requestAiNames(
  nodes: SceneNode[],
  settings: AiSettings,
  fallback: RenamePreviewItem[]
): Promise<Map<string, string>> {
  if (!settings.enabled || !settings.apiKey || !settings.baseUrl || !settings.model) {
    throw new Error("AI 未启用或缺少 Base URL / API Key / Model");
  }
  const summaries = nodes.map((node) => ({
    id: node.id,
    type: node.type,
    name: node.name,
    kind: getNodeKind(node),
    size: "width" in node ? { width: Math.round(node.width), height: Math.round(node.height) } : undefined,
    text: node.type === "TEXT" ? node.characters.slice(0, 120) : undefined,
    path: getNodePath(node)
  }));
  const response = await fetch(settings.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.apiKey}`
    },
    body: JSON.stringify({
      model: settings.model,
      messages: [
        { role: "system", content: settings.promptTemplate },
        {
          role: "user",
          content: `Return only JSON array: [{"id":"node id","name":"PascalOrSnakeName"}]. Nodes: ${JSON.stringify(summaries)}. Fallback prefixes: ${JSON.stringify(fallback)}`
        }
      ],
      temperature: 0.2
    })
  });
  if (!response.ok) throw new Error(`AI 请求失败：${response.status} ${response.statusText}`);
  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("AI 返回格式无效");
  const parsed = JSON.parse(extractJson(content)) as Array<{ id: string; name: string }>;
  const seen = new Map<string, number>();
  return new Map(
    parsed
      .filter((item) => item.id && item.name)
      .map((item) => {
        const base = safeName(item.name);
        const next = (seen.get(base) ?? 0) + 1;
        seen.set(base, next);
        return [item.id, next > 1 ? `${base}_${String(next).padStart(3, "0")}` : base];
      })
  );
}

function getNodeKind(node: SceneNode): NodeKind {
  if (node.type === "TEXT") return "TEXT";
  if (hasImageFill(node)) return "IMAGE";
  if (node.type === "INSTANCE" || node.type === "COMPONENT" || node.type === "COMPONENT_SET") return "COMPONENT";
  if (node.type === "FRAME" || node.type === "SECTION") return "FRAME";
  if (
    node.type === "VECTOR" ||
    node.type === "BOOLEAN_OPERATION" ||
    node.type === "RECTANGLE" ||
    node.type === "ELLIPSE" ||
    node.type === "POLYGON" ||
    node.type === "STAR" ||
    node.type === "LINE"
  ) {
    return "SHAPE";
  }
  return "NODE";
}

function hasImageFill(node: SceneNode): boolean {
  return "fills" in node && Array.isArray(node.fills) && node.fills.some((paint) => paint.type === "IMAGE");
}

function getNodePath(node: BaseNode): string {
  const names: string[] = [];
  let current: BaseNode | null = node;
  while (current && current.type !== "PAGE" && current.type !== "DOCUMENT") {
    names.unshift(current.name);
    current = current.parent;
  }
  return names.join("/");
}

function safeName(value: string): string {
  const cleaned = value.trim().replace(/[^\w\u4e00-\u9fa5-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return cleaned || "Node";
}

function hexToSolidPaint(hex: string): SolidPaint {
  const { color, opacity } = hexToRgbAndOpacity(hex);
  return opacity == null ? { type: "SOLID", color } : { type: "SOLID", color, opacity };
}

function hexToRgbAndOpacity(hex: string): { color: RGB; opacity?: number } {
  const normalized = hex.replace("#", "").trim();
  const value = normalized.length === 3 ? normalized.split("").map((char) => char + char).join("") : normalized;
  const rgbValue = (value || "ffffff").slice(0, 6).padEnd(6, "f");
  const number = Number.parseInt(rgbValue, 16);
  const opacity = value.length >= 8 ? Number.parseInt(value.slice(6, 8), 16) / 255 : undefined;
  return {
    color: {
      r: ((number >> 16) & 255) / 255,
      g: ((number >> 8) & 255) / 255,
      b: (number & 255) / 255
    },
    opacity
  };
}

function toNodeName(value: string): string {
  const words = value
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
  if (!words.length) return safeName(value);
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
}

function extractJson(content: string): string {
  const match = content.match(/\[[\s\S]*\]/);
  return match ? match[0] : content;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function scaleSize(node: SceneNode, maxSize: number) {
  const ratio = Math.min(1, maxSize / Math.max(node.width, node.height));
  return { width: Math.max(1, node.width * ratio), height: Math.max(1, node.height * ratio) };
}

function md5(input: string): string {
  const text = unescape(encodeURIComponent(input));
  const words: number[] = [];
  for (let i = 0; i < text.length; i += 1) {
    words[i >> 2] |= text.charCodeAt(i) << ((i % 4) * 8);
  }
  words[text.length >> 2] |= 0x80 << ((text.length % 4) * 8);
  words[(((text.length + 8) >> 6) * 16) + 14] = text.length * 8;

  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < words.length; i += 16) {
    const oa = a;
    const ob = b;
    const oc = c;
    const od = d;

    a = ff(a, b, c, d, words[i + 0] || 0, 7, -680876936);
    d = ff(d, a, b, c, words[i + 1] || 0, 12, -389564586);
    c = ff(c, d, a, b, words[i + 2] || 0, 17, 606105819);
    b = ff(b, c, d, a, words[i + 3] || 0, 22, -1044525330);
    a = ff(a, b, c, d, words[i + 4] || 0, 7, -176418897);
    d = ff(d, a, b, c, words[i + 5] || 0, 12, 1200080426);
    c = ff(c, d, a, b, words[i + 6] || 0, 17, -1473231341);
    b = ff(b, c, d, a, words[i + 7] || 0, 22, -45705983);
    a = ff(a, b, c, d, words[i + 8] || 0, 7, 1770035416);
    d = ff(d, a, b, c, words[i + 9] || 0, 12, -1958414417);
    c = ff(c, d, a, b, words[i + 10] || 0, 17, -42063);
    b = ff(b, c, d, a, words[i + 11] || 0, 22, -1990404162);
    a = ff(a, b, c, d, words[i + 12] || 0, 7, 1804603682);
    d = ff(d, a, b, c, words[i + 13] || 0, 12, -40341101);
    c = ff(c, d, a, b, words[i + 14] || 0, 17, -1502002290);
    b = ff(b, c, d, a, words[i + 15] || 0, 22, 1236535329);

    a = gg(a, b, c, d, words[i + 1] || 0, 5, -165796510);
    d = gg(d, a, b, c, words[i + 6] || 0, 9, -1069501632);
    c = gg(c, d, a, b, words[i + 11] || 0, 14, 643717713);
    b = gg(b, c, d, a, words[i + 0] || 0, 20, -373897302);
    a = gg(a, b, c, d, words[i + 5] || 0, 5, -701558691);
    d = gg(d, a, b, c, words[i + 10] || 0, 9, 38016083);
    c = gg(c, d, a, b, words[i + 15] || 0, 14, -660478335);
    b = gg(b, c, d, a, words[i + 4] || 0, 20, -405537848);
    a = gg(a, b, c, d, words[i + 9] || 0, 5, 568446438);
    d = gg(d, a, b, c, words[i + 14] || 0, 9, -1019803690);
    c = gg(c, d, a, b, words[i + 3] || 0, 14, -187363961);
    b = gg(b, c, d, a, words[i + 8] || 0, 20, 1163531501);
    a = gg(a, b, c, d, words[i + 13] || 0, 5, -1444681467);
    d = gg(d, a, b, c, words[i + 2] || 0, 9, -51403784);
    c = gg(c, d, a, b, words[i + 7] || 0, 14, 1735328473);
    b = gg(b, c, d, a, words[i + 12] || 0, 20, -1926607734);

    a = hh(a, b, c, d, words[i + 5] || 0, 4, -378558);
    d = hh(d, a, b, c, words[i + 8] || 0, 11, -2022574463);
    c = hh(c, d, a, b, words[i + 11] || 0, 16, 1839030562);
    b = hh(b, c, d, a, words[i + 14] || 0, 23, -35309556);
    a = hh(a, b, c, d, words[i + 1] || 0, 4, -1530992060);
    d = hh(d, a, b, c, words[i + 4] || 0, 11, 1272893353);
    c = hh(c, d, a, b, words[i + 7] || 0, 16, -155497632);
    b = hh(b, c, d, a, words[i + 10] || 0, 23, -1094730640);
    a = hh(a, b, c, d, words[i + 13] || 0, 4, 681279174);
    d = hh(d, a, b, c, words[i + 0] || 0, 11, -358537222);
    c = hh(c, d, a, b, words[i + 3] || 0, 16, -722521979);
    b = hh(b, c, d, a, words[i + 6] || 0, 23, 76029189);
    a = hh(a, b, c, d, words[i + 9] || 0, 4, -640364487);
    d = hh(d, a, b, c, words[i + 12] || 0, 11, -421815835);
    c = hh(c, d, a, b, words[i + 15] || 0, 16, 530742520);
    b = hh(b, c, d, a, words[i + 2] || 0, 23, -995338651);

    a = ii(a, b, c, d, words[i + 0] || 0, 6, -198630844);
    d = ii(d, a, b, c, words[i + 7] || 0, 10, 1126891415);
    c = ii(c, d, a, b, words[i + 14] || 0, 15, -1416354905);
    b = ii(b, c, d, a, words[i + 5] || 0, 21, -57434055);
    a = ii(a, b, c, d, words[i + 12] || 0, 6, 1700485571);
    d = ii(d, a, b, c, words[i + 3] || 0, 10, -1894986606);
    c = ii(c, d, a, b, words[i + 10] || 0, 15, -1051523);
    b = ii(b, c, d, a, words[i + 1] || 0, 21, -2054922799);
    a = ii(a, b, c, d, words[i + 8] || 0, 6, 1873313359);
    d = ii(d, a, b, c, words[i + 15] || 0, 10, -30611744);
    c = ii(c, d, a, b, words[i + 6] || 0, 15, -1560198380);
    b = ii(b, c, d, a, words[i + 13] || 0, 21, 1309151649);
    a = ii(a, b, c, d, words[i + 4] || 0, 6, -145523070);
    d = ii(d, a, b, c, words[i + 11] || 0, 10, -1120210379);
    c = ii(c, d, a, b, words[i + 2] || 0, 15, 718787259);
    b = ii(b, c, d, a, words[i + 9] || 0, 21, -343485551);

    a = add32(a, oa);
    b = add32(b, ob);
    c = add32(c, oc);
    d = add32(d, od);
  }

  return [a, b, c, d].map(hex).join("");
}

function cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
  return add32(rol(add32(add32(a, q), add32(x, t)), s), b);
}

function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return cmn((b & c) | (~b & d), a, b, x, s, t);
}

function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

function rol(num: number, count: number): number {
  return (num << count) | (num >>> (32 - count));
}

function add32(a: number, b: number): number {
  return (a + b) | 0;
}

function hex(num: number): string {
  let output = "";
  for (let i = 0; i < 4; i += 1) {
    output += ((num >> (i * 8)) & 255).toString(16).padStart(2, "0");
  }
  return output;
}
