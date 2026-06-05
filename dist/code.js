"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // src/shared.ts
  var defaultConfig = {
    namingRules: [
      { id: "text", label: "Text \u6587\u5B57", kind: "TEXT", prefix: "Txt", digits: 3 },
      { id: "image", label: "Image \u56FE\u7247", kind: "IMAGE", prefix: "Img", digits: 3 },
      { id: "component", label: "Component \u7EC4\u4EF6", kind: "COMPONENT", prefix: "Cmp", digits: 3 },
      { id: "frame", label: "Frame \u753B\u677F", kind: "FRAME", prefix: "Frm", digits: 3 },
      { id: "shape", label: "Shape \u56FE\u5F62", kind: "SHAPE", prefix: "Shape", digits: 3 },
      { id: "node", label: "Node \u5176\u4ED6", kind: "NODE", prefix: "Node", digits: 3 }
    ],
    lexicon: [
      {
        id: "lex-text",
        word: "Txt",
        label: "Text \u6587\u672C",
        kind: "TEXT",
        prefix: "Txt",
        description: "\u666E\u901A\u6587\u5B57\u5C42",
        applyProperties: true,
        enabled: {
          fontFamily: true,
          fontStyle: true,
          fontSize: true,
          lineHeightPercent: true,
          textAlignHorizontal: true,
          textAlignVertical: true,
          textFill: true
        },
        values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
      },
      {
        id: "lex-text-name",
        word: "TxtName",
        label: "TxtName \u540D\u79F0",
        kind: "TEXT",
        prefix: "TxtName",
        description: "\u540D\u79F0\u6587\u5B57",
        applyProperties: true,
        enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
        values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
      },
      {
        id: "lex-text-time",
        word: "TxtTime",
        label: "TxtTime \u65F6\u95F4",
        kind: "TEXT",
        prefix: "TxtTime",
        description: "\u65F6\u95F4\u6587\u5B57",
        applyProperties: true,
        enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
        values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
      },
      {
        id: "lex-text-tag",
        word: "TxtTag",
        label: "TxtTag \u6807\u7B7E",
        kind: "TEXT",
        prefix: "TxtTag",
        description: "\u6807\u7B7E\u6587\u5B57",
        applyProperties: true,
        enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
        values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
      },
      {
        id: "lex-text-num",
        word: "TxtNum",
        label: "TxtNum \u6570\u5B57",
        kind: "TEXT",
        prefix: "TxtNum",
        description: "\u6570\u5B57\u6587\u5B57",
        applyProperties: true,
        enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
        values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 32, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
      },
      {
        id: "lex-text-task",
        word: "TxtTask",
        label: "TxtTask \u4EFB\u52A1",
        kind: "TEXT",
        prefix: "TxtTask",
        description: "\u4EFB\u52A1\u6587\u5B57",
        applyProperties: true,
        enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
        values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
      },
      {
        id: "lex-text-desc",
        word: "TxtDesc",
        label: "TxtDesc \u63CF\u8FF0",
        kind: "TEXT",
        prefix: "TxtDesc",
        description: "\u63CF\u8FF0\u6587\u5B57",
        applyProperties: true,
        enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
        values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
      },
      {
        id: "lex-text-lv",
        word: "TxtLv",
        label: "TxtLv \u7B49\u7EA7",
        kind: "TEXT",
        prefix: "TxtLv",
        description: "\u7B49\u7EA7\u6587\u5B57",
        applyProperties: true,
        enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
        values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
      },
      {
        id: "lex-title",
        word: "Title",
        label: "Title \u6807\u9898",
        kind: "TEXT",
        prefix: "Title",
        description: "\u6807\u9898\u6587\u5B57",
        applyProperties: true,
        enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
        values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 32, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
      },
      {
        id: "lex-label",
        word: "Label",
        label: "Label \u6807\u7B7E",
        kind: "TEXT",
        prefix: "Label",
        description: "\u8BF4\u660E/\u6807\u7B7E\u6587\u5B57",
        applyProperties: true,
        enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
        values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
      },
      { id: "lex-bg-image", word: "BG", label: "BG \u80CC\u666F\u56FE", kind: "IMAGE", prefix: "BG", description: "\u80CC\u666F\u56FE\u7247", applyProperties: false },
      { id: "lex-image", word: "Img", label: "Image \u56FE\u7247", kind: "IMAGE", prefix: "Img", description: "\u56FE\u7247\u8D44\u6E90", applyProperties: false },
      { id: "lex-image-tag", word: "ImgTag", label: "ImgTag \u56FE\u7247\u6807\u7B7E", kind: "IMAGE", prefix: "ImgTag", description: "\u56FE\u7247\u6807\u7B7E", applyProperties: false },
      { id: "lex-icon", word: "Icon", label: "Icon \u56FE\u6807", kind: "IMAGE", prefix: "Icon", description: "\u5C0F\u56FE\u6807/\u88C5\u9970\u56FE", applyProperties: false },
      { id: "lex-ornament", word: "Ornament", label: "Ornament \u88C5\u9970\u54C1", kind: "IMAGE", prefix: "Ornament", description: "\u88C5\u9970\u56FE\u7247", applyProperties: false },
      { id: "lex-normal", word: "Normal", label: "Normal \u5E38\u6001", kind: "IMAGE", prefix: "Normal", description: "\u5E38\u6001\u56FE\u7247", applyProperties: false },
      { id: "lex-hover", word: "Hover", label: "Hover \u60AC\u6D6E\u6001", kind: "IMAGE", prefix: "Hover", description: "\u60AC\u6D6E\u6001\u56FE\u7247", applyProperties: false },
      { id: "lex-selected", word: "Selected", label: "Selected \u9009\u4E2D\u6001", kind: "IMAGE", prefix: "Selected", description: "\u9009\u4E2D\u6001\u56FE\u7247", applyProperties: false },
      { id: "lex-disabled", word: "Disabled", label: "Disabled \u7981\u7528\u6001", kind: "IMAGE", prefix: "Disabled", description: "\u7981\u7528\u6001\u56FE\u7247", applyProperties: false },
      { id: "lex-mask", word: "Mask", label: "Mask \u906E\u7F69", kind: "IMAGE", prefix: "Mask", description: "\u906E\u7F69\u56FE\u7247", applyProperties: false },
      { id: "lex-button", word: "Btn", label: "Button \u6309\u94AE", kind: "COMPONENT", prefix: "Btn", description: "\u6309\u94AE\u7EC4\u4EF6\u6216\u6309\u94AE\u7EC4", applyProperties: false },
      { id: "lex-content", word: "Content", label: "Content \u5185\u5BB9", kind: "FRAME", prefix: "Content", description: "Frame \u5185\u5BB9\u5BB9\u5668", applyProperties: false },
      { id: "lex-panel", word: "Panel", label: "Panel \u9762\u677F", kind: "FRAME", prefix: "Panel", description: "\u5F39\u7A97/\u9762\u677F\u5BB9\u5668", applyProperties: false },
      { id: "lex-group", word: "Group", label: "Group \u7EC4", kind: "FRAME", prefix: "Group", description: "\u666E\u901A\u5206\u7EC4\u5BB9\u5668", applyProperties: false },
      { id: "lex-shape", word: "Shape", label: "Shape \u56FE\u5F62", kind: "SHAPE", prefix: "Shape", description: "\u57FA\u7840\u5F62\u72B6", applyProperties: false },
      { id: "lex-bg", word: "Bg", label: "Background \u80CC\u666F", kind: "SHAPE", prefix: "Bg", description: "\u80CC\u666F\u5757/\u5E95\u56FE", applyProperties: false },
      { id: "lex-node", word: "Node", label: "Node \u901A\u7528", kind: "NODE", prefix: "Node", description: "\u65E0\u6CD5\u8BC6\u522B\u7684\u8282\u70B9", applyProperties: false }
    ],
    propertyPresets: [
      {
        id: "ue-text-center",
        name: "\u6587\u672C 28 \u5C45\u4E2D",
        targetKinds: ["TEXT", "IMAGE", "COMPONENT", "FRAME", "SHAPE", "NODE"],
        enabled: {
          opacity: true,
          fontSize: true,
          lineHeightPercent: true,
          letterSpacing: true,
          textAlignHorizontal: true,
          textAlignVertical: true
        },
        values: {
          opacity: 1,
          visible: true,
          locked: false,
          blendMode: "NORMAL",
          fontFamily: "Inter",
          fontStyle: "Regular",
          fontSize: 28,
          lineHeightPx: 42,
          lineHeightPercent: 150,
          letterSpacing: 0,
          textAlignHorizontal: "CENTER",
          textAlignVertical: "CENTER",
          paragraphSpacing: 0,
          textFill: "#FFFFFF",
          imageScaleMode: "FILL",
          cornerRadius: 0,
          constraintsHorizontal: "MIN",
          constraintsVertical: "MIN",
          clipsContent: false,
          layoutMode: "NONE",
          padding: 0,
          itemSpacing: 0
        }
      }
    ],
    activePropertyPresetId: "ue-text-center",
    applyPropertiesOnRename: true,
    ueDefaults: {
      mode: "preserve",
      spacing: 24,
      preserveSize: true,
      includeHidden: false,
      includeLocked: false,
      maxGridItemSize: 160
    },
    aiSettings: {
      enabled: false,
      provider: "openai-compatible",
      providerKeys: {},
      baseUrl: "https://api.openai.com/v1/chat/completions",
      apiKey: "",
      model: "gpt-4.1-mini",
      promptTemplate: "Name Figma nodes for UE import. Return JSON array with id and name. Use short English asset names and preserve prefixes when useful."
    },
    translateSettings: {
      provider: "baidu",
      appId: "",
      secretKey: "",
      from: "zh",
      to: "en"
    }
  };
  var localTestConfig = {};
  if (localTestConfig.aiSettings) Object.assign(defaultConfig.aiSettings, localTestConfig.aiSettings);
  if (localTestConfig.translateSettings) Object.assign(defaultConfig.translateSettings, localTestConfig.translateSettings);

  // src/code.ts
  var CONFIG_KEY = "ai-auto-namer-config";
  var PROJECT_CONFIG_NODE_NAME = ".AutoNamePluginConfig";
  figma.showUI(__html__, { width: 560, height: 720, themeColors: true });
  void initialize();
  figma.on("selectionchange", async () => {
    try {
      post({ type: "SELECTION", selection: await getSelectionSummary() });
    } catch (error) {
      post({ type: "ERROR", message: errorMessage(error) });
    }
  });
  figma.ui.onmessage = async (message) => {
    try {
      if (message.type === "SCAN_SELECTION") {
        post({ type: "SELECTION", selection: await getSelectionSummary() });
        return;
      }
      if (message.type === "RESIZE_UI") {
        figma.ui.resize(clamp(Math.round(message.width), 420, 900), clamp(Math.round(message.height), 520, 1e3));
        return;
      }
      if (message.type === "SAVE_CONFIG") {
        await saveConfig(message.config);
        figma.notify("\u914D\u7F6E\u5DF2\u4FDD\u5B58");
        return;
      }
      if (message.type === "IMPORT_CONFIG") {
        const config = normalizeConfig(JSON.parse(message.json));
        await saveConfig(config);
        post({ type: "READY", config, selection: await getSelectionSummary() });
        figma.notify("\u914D\u7F6E\u5DF2\u5BFC\u5165");
        return;
      }
      if (message.type === "EXPORT_CONFIG") {
        post({ type: "CONFIG_EXPORTED", json: JSON.stringify(await loadConfig(), null, 2) });
        return;
      }
      if (message.type === "WRITE_PROJECT_CONFIG") {
        await writeProjectConfig(message.config);
        post({ type: "PROJECT_CONFIG_WRITTEN", message: "\u9879\u76EE\u914D\u7F6E\u8282\u70B9\u5DF2\u5199\u5165\u5F53\u524D\u9875\u9762" });
        return;
      }
      if (message.type === "PREVIEW_RENAME" || message.type === "GENERATE_AI_NAMES") {
        const items = await buildRenamePreview(message.options, message.config, message.type === "GENERATE_AI_NAMES");
        post({ type: "RENAME_PREVIEW", items, aiUsed: message.type === "GENERATE_AI_NAMES" });
        return;
      }
      if (message.type === "APPLY_RENAME") {
        const changed = await applyRename(message.items);
        post({ type: "APPLY_RESULT", message: `\u5DF2\u91CD\u547D\u540D ${changed} \u4E2A\u8282\u70B9` });
        figma.notify(`\u5DF2\u91CD\u547D\u540D ${changed} \u4E2A\u8282\u70B9`);
        return;
      }
      if (message.type === "APPLY_PROPERTIES") {
        const changed = await applyProperties(message.preset, message.options);
        post({ type: "APPLY_RESULT", message: `\u5DF2\u5904\u7406 ${changed} \u4E2A\u8282\u70B9\u5C5E\u6027` });
        figma.notify(`\u5DF2\u5904\u7406 ${changed} \u4E2A\u8282\u70B9\u5C5E\u6027`);
        return;
      }
      if (message.type === "APPLY_LEXICON_ENTRY") {
        const result = await applyLexiconEntry(message.entryId, message.options, message.config);
        post({ type: "APPLY_RESULT", message: `\u5DF2\u5E94\u7528\u8BCD\u6761\uFF1A\u91CD\u547D\u540D ${result.renamed} \u4E2A\uFF0C\u5C5E\u6027 ${result.properties} \u4E2A` });
        figma.notify(`\u5DF2\u5E94\u7528\u8BCD\u6761\uFF1A${result.word}`);
        return;
      }
      if (message.type === "TRANSLATE_AND_RENAME") {
        const result = await translateAndRename(message.text, message.options, message.config);
        post({ type: "APPLY_RESULT", message: `\u767E\u5EA6\u7FFB\u8BD1\u4E3A ${result.name}\uFF0C\u5DF2\u91CD\u547D\u540D ${result.renamed} \u4E2A\u8282\u70B9` });
        figma.notify(`\u5DF2\u7FFB\u8BD1\u547D\u540D\uFF1A${result.name}`);
        return;
      }
      if (message.type === "AUTO_NAME_FRAME") {
        const result = await autoNameFrame(message.config);
        post({
          type: "APPLY_RESULT",
          message: `\u4E00\u952E\u547D\u540D\u5B8C\u6210\uFF1A\u753B\u677F ${result.frameName}\uFF0C\u547D\u540D ${result.renamed} \u4E2A\uFF0C\u89E3\u6563 Group ${result.groups} \u4E2A\uFF0C\u5220\u9664 Mask ${result.masks} \u4E2A\uFF0C\u8DF3\u8FC7 ${result.skipped} \u4E2A`
        });
        figma.notify(`\u4E00\u952E\u547D\u540D\u5B8C\u6210\uFF1A${result.frameName}`);
        return;
      }
      if (message.type === "CREATE_VARIANTS") {
        const result = await createVariants(message.mode);
        const prefix = result.convertedFrame ? "\u5DF2\u5C06 Frame \u8F6C\u4E3A Component\uFF0C\u5E76" : "";
        post({ type: "APPLY_RESULT", message: `${prefix}\u5236\u4F5C ${result.count} \u4E2A\u53D8\u4F53\uFF1A${result.name}` });
        figma.notify(`${prefix}\u5236\u4F5C ${result.count} \u4E2A\u53D8\u4F53`);
        return;
      }
      if (message.type === "CREATE_UE_FRAME") {
        const created = await createUeFrame(message.options, message.config);
        post({ type: "UE_RESULT", message: `\u5DF2\u751F\u6210 ${created.name}\uFF0C\u5305\u542B ${created.count} \u4E2A\u8282\u70B9` });
        figma.notify(`\u5DF2\u751F\u6210 ${created.name}`);
      }
    } catch (error) {
      post({ type: "ERROR", message: errorMessage(error) });
    }
  };
  async function initialize() {
    const config = await loadConfig();
    post({ type: "READY", config, selection: await getSelectionSummary() });
  }
  function post(message) {
    figma.ui.postMessage(message);
  }
  async function loadConfig() {
    const saved = await figma.clientStorage.getAsync(CONFIG_KEY);
    return normalizeConfig(saved);
  }
  async function saveConfig(config) {
    await figma.clientStorage.setAsync(CONFIG_KEY, normalizeConfig(config));
  }
  function normalizeConfig(input) {
    var _a, _b, _c, _d, _e;
    if (!input || typeof input !== "object") return defaultConfig;
    const partial = input;
    const ueDefaults = (_a = partial.ueDefaults) != null ? _a : {};
    const aiSettings = (_b = partial.aiSettings) != null ? _b : {};
    const translateSettings = (_c = partial.translateSettings) != null ? _c : {};
    const normalizedAiSettings = Object.assign({}, defaultConfig.aiSettings, aiSettings);
    const normalizedTranslateSettings = Object.assign({}, defaultConfig.translateSettings, translateSettings);
    if (!normalizedAiSettings.apiKey && localTestConfig.aiSettings) Object.assign(normalizedAiSettings, localTestConfig.aiSettings);
    const normalizedProviderKeys = Object.assign(
      {},
      defaultConfig.aiSettings.providerKeys,
      aiSettings.providerKeys,
      (_d = localTestConfig.aiSettings) == null ? void 0 : _d.providerKeys
    );
    normalizedAiSettings.providerKeys = normalizedProviderKeys;
    if (normalizedAiSettings.apiKey && normalizedAiSettings.provider) {
      normalizedProviderKeys[normalizedAiSettings.provider] = normalizedAiSettings.apiKey;
    }
    if (!normalizedTranslateSettings.secretKey && localTestConfig.translateSettings) {
      Object.assign(normalizedTranslateSettings, localTestConfig.translateSettings);
    }
    const propertyPresets = normalizePropertyPresets(partial.propertyPresets);
    const activePropertyPresetId = propertyPresets.some((preset) => preset.id === partial.activePropertyPresetId) ? partial.activePropertyPresetId : propertyPresets[0].id;
    return {
      namingRules: Array.isArray(partial.namingRules) ? partial.namingRules : defaultConfig.namingRules,
      lexicon: normalizeLexicon(partial.lexicon),
      propertyPresets,
      activePropertyPresetId,
      applyPropertiesOnRename: (_e = partial.applyPropertiesOnRename) != null ? _e : true,
      ueDefaults: Object.assign({}, defaultConfig.ueDefaults, ueDefaults),
      aiSettings: normalizedAiSettings,
      translateSettings: normalizedTranslateSettings
    };
  }
  function normalizeLexicon(input) {
    const source = Array.isArray(input) ? input : defaultConfig.lexicon;
    const normalized = source.map((entry, index) => {
      var _a;
      const partial = entry;
      const fallback = (_a = defaultConfig.lexicon[index]) != null ? _a : defaultConfig.lexicon[defaultConfig.lexicon.length - 1];
      return {
        id: partial.id || `lex-${index + 1}`,
        word: partial.word || partial.prefix || partial.label || fallback.word,
        label: partial.label || partial.word || partial.prefix || fallback.label,
        kind: partial.kind || fallback.kind,
        prefix: partial.prefix || partial.word || fallback.prefix,
        description: partial.description || ""
      };
    });
    const existingIds = new Set(normalized.map((entry) => entry.id));
    for (const entry of defaultConfig.lexicon) {
      if (!existingIds.has(entry.id)) normalized.push(entry);
    }
    return normalized;
  }
  function normalizePropertyPresets(input) {
    const source = Array.isArray(input) && input.length ? input : defaultConfig.propertyPresets;
    const fallback = defaultConfig.propertyPresets[0];
    return source.map((preset, index) => {
      const partial = preset;
      return {
        id: partial.id || `preset-${index + 1}`,
        name: partial.name || `\u5C5E\u6027\u65B9\u6848 ${index + 1}`,
        targetKinds: Array.isArray(partial.targetKinds) && partial.targetKinds.length ? partial.targetKinds : fallback.targetKinds,
        enabled: Object.assign({}, partial.enabled || {}),
        values: Object.assign({}, fallback.values, partial.values || {})
      };
    });
  }
  async function ensureCurrentPageLoaded() {
    await figma.currentPage.loadAsync();
  }
  async function getSelectionSummary() {
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
  async function collectTargets(options) {
    await ensureCurrentPageLoaded();
    const selection = Array.from(figma.currentPage.selection);
    if (options.scope === "selection") return selection.filter(allowNode(options));
    if (options.scope === "children") {
      const children = [];
      for (const node of selection) {
        if ("children" in node) {
          for (const child of node.children) children.push(child);
        }
      }
      return children.filter(allowNode(options));
    }
    const deep = [];
    for (const node of selection) {
      for (const child of flatten(node)) deep.push(child);
    }
    return deep.filter(allowNode(options));
  }
  function flatten(node) {
    if (!("children" in node)) return [node];
    const nodes = [node];
    for (const child of node.children) {
      for (const nested of flatten(child)) nodes.push(nested);
    }
    return nodes;
  }
  function allowNode(options) {
    return (node) => {
      if (options.skipHidden && "visible" in node && !node.visible) return false;
      if (options.skipLocked && node.locked) return false;
      return true;
    };
  }
  async function buildRenamePreview(options, config, useAi) {
    const targets = await collectTargets(options);
    if (!targets.length) throw new Error("\u6CA1\u6709\u53EF\u5904\u7406\u7684\u9009\u4E2D\u8282\u70B9");
    const ruleByKind = new Map(config.namingRules.map((rule) => [rule.kind, rule]));
    const counters = /* @__PURE__ */ new Map();
    const previews = targets.map((node) => {
      var _a, _b, _c;
      const kind = getNodeKind(node);
      const rule = (_b = (_a = ruleByKind.get(kind)) != null ? _a : ruleByKind.get("NODE")) != null ? _b : defaultConfig.namingRules[5];
      const nextIndex = ((_c = counters.get(kind)) != null ? _c : 0) + 1;
      counters.set(kind, nextIndex);
      const prefix = getLexiconPrefix(kind, rule.prefix, config, options.lexiconEntryId);
      const base = `${prefix}_${String(nextIndex).padStart(rule.digits, "0")}`;
      const nextName = options.keepOriginalSuffix ? `${base}_${safeName(node.name)}` : base;
      return { id: node.id, currentName: node.name, nextName, type: node.type, kind };
    });
    if (!useAi) return previews;
    const aiNames = await requestAiNames(targets, config.aiSettings, previews);
    return previews.map((item) => {
      var _a;
      return __spreadProps(__spreadValues({}, item), { nextName: (_a = aiNames.get(item.id)) != null ? _a : item.nextName });
    });
  }
  function getLexiconPrefix(kind, fallbackPrefix, config, lexiconEntryId) {
    var _a, _b, _c, _d;
    const lexicon = Array.isArray(config.lexicon) ? config.lexicon : defaultConfig.lexicon;
    if (lexiconEntryId === "__auto_lexicon__") {
      return (_b = (_a = lexicon.find((entry) => entry.kind === kind)) == null ? void 0 : _a.prefix) != null ? _b : fallbackPrefix;
    }
    if (lexiconEntryId) {
      return (_d = (_c = lexicon.find((entry) => entry.id === lexiconEntryId)) == null ? void 0 : _c.prefix) != null ? _d : fallbackPrefix;
    }
    return fallbackPrefix;
  }
  async function applyRename(items) {
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
  async function applyProperties(preset, options) {
    const targets = (await collectTargets(options)).filter((node) => preset.targetKinds.includes(getNodeKind(node)));
    let changed = 0;
    for (const node of targets) {
      const didChange = await applyPresetToNode(node, preset);
      if (didChange) changed += 1;
    }
    return changed;
  }
  async function applyLexiconEntry(entryId, options, config) {
    var _a;
    const normalized = normalizeConfig(config);
    const entry = normalized.lexicon.find((item) => item.id === entryId);
    if (!entry) throw new Error("\u627E\u4E0D\u5230\u8FD9\u4E2A\u8BCD\u5E93\u8BCD\u6761");
    const targets = await collectTargets(options);
    if (!targets.length) throw new Error("\u6CA1\u6709\u53EF\u5904\u7406\u7684\u9009\u4E2D\u8282\u70B9");
    const baseName = safeName(entry.word || entry.prefix || entry.label);
    let renamed = 0;
    let properties = 0;
    const preset = normalized.applyPropertiesOnRename ? (_a = normalized.propertyPresets.find((item) => item.id === normalized.activePropertyPresetId)) != null ? _a : normalized.propertyPresets[0] : null;
    for (let index = 0; index < targets.length; index += 1) {
      const node = targets[index];
      node.name = targets.length > 1 ? `${baseName}_${String(index + 1).padStart(2, "0")}` : baseName;
      renamed += 1;
      if (preset) {
        const didChange = await applyPresetToNode(node, preset);
        if (didChange) properties += 1;
      }
    }
    return { renamed, properties, word: baseName };
  }
  async function translateAndRename(text, options, config) {
    const normalized = normalizeConfig(config);
    const translated = await requestBaiduTranslation(text.trim(), normalized.translateSettings);
    const baseName = toNodeName(translated);
    const targets = await collectTargets(options);
    if (!targets.length) throw new Error("\u6CA1\u6709\u53EF\u5904\u7406\u7684\u9009\u4E2D\u8282\u70B9");
    let renamed = 0;
    for (let index = 0; index < targets.length; index += 1) {
      targets[index].name = targets.length > 1 ? `${baseName}_${String(index + 1).padStart(2, "0")}` : baseName;
      renamed += 1;
    }
    return { renamed, name: baseName };
  }
  async function createVariants(mode) {
    var _a;
    await ensureCurrentPageLoaded();
    const selection = Array.from(figma.currentPage.selection);
    if (selection.length !== 1 || selection[0].type !== "COMPONENT" && selection[0].type !== "FRAME") {
      throw new Error("\u8BF7\u53EA\u9009\u4E2D\u4E00\u4E2A\u72EC\u7ACB\u7684 Frame \u6216\u5C1A\u672A\u52A0\u5165\u53D8\u4F53\u96C6\u7684\u4E3B\u7EC4\u4EF6\uFF08Component\uFF09");
    }
    const selected = selection[0];
    const convertedFrame = selected.type === "FRAME";
    const source = selected.type === "FRAME" ? figma.createComponentFromNode(selected) : selected;
    if (((_a = source.parent) == null ? void 0 : _a.type) === "COMPONENT_SET") {
      throw new Error("\u8FD9\u4E2A\u7EC4\u4EF6\u5DF2\u7ECF\u662F\u53D8\u4F53\uFF0C\u8BF7\u9009\u62E9\u4E00\u4E2A\u72EC\u7ACB\u4E3B\u7EC4\u4EF6");
    }
    const parent = source.parent;
    if (!isChildrenContainer(parent)) throw new Error("\u5F53\u524D\u7EC4\u4EF6\u6240\u5728\u4F4D\u7F6E\u65E0\u6CD5\u521B\u5EFA\u53D8\u4F53\u96C6");
    const originalName = source.name;
    const originalX = source.x;
    const originalY = source.y;
    const parentIndex = parent.children.indexOf(source);
    const definitions = variantDefinitions(mode);
    const components = [];
    const clones = [];
    try {
      for (let index = 0; index < definitions.length; index += 1) {
        const component = index === 0 ? source : source.clone();
        if (index > 0) {
          parent.appendChild(component);
          clones.push(component);
        }
        component.name = variantComponentName(definitions[index]);
        positionVariant(component, index, mode, originalX, originalY, source.width, source.height);
        components.push(component);
      }
      const componentSet = figma.combineAsVariants(components, parent, parentIndex);
      componentSet.name = originalName;
      figma.currentPage.selection = [componentSet];
      figma.viewport.scrollAndZoomIntoView([componentSet]);
      return { count: definitions.length, name: componentSet.name, convertedFrame };
    } catch (error) {
      source.name = originalName;
      for (const clone of clones) {
        if (!clone.removed) clone.remove();
      }
      throw new Error(`\u5236\u4F5C\u53D8\u4F53\u5931\u8D25\uFF1A${errorMessage(error)}`);
    }
  }
  function variantDefinitions(mode) {
    if (mode === "six") {
      return [
        { State: "Normal", Checked: "Unchecked" },
        { State: "Hover", Checked: "Unchecked" },
        { State: "Pressed", Checked: "Unchecked" },
        { State: "Normal", Checked: "Checked" },
        { State: "Hover", Checked: "Checked" },
        { State: "Pressed", Checked: "Checked" }
      ];
    }
    return [{ State: "Normal" }, { State: "Hover" }, { State: "Pressed" }];
  }
  function variantComponentName(definition) {
    return definition.Checked ? `State=${definition.State}, Checked=${definition.Checked}` : `State=${definition.State}`;
  }
  function positionVariant(component, index, mode, x, y, width, height) {
    try {
      if (mode === "six") {
        component.x = x + index % 3 * (width + 20);
        component.y = y + Math.floor(index / 3) * (height + 40);
      } else {
        component.x = x;
        component.y = y + index * (height + 20);
      }
    } catch (e) {
    }
  }
  function isChildrenContainer(node) {
    return !!node && "children" in node && "appendChild" in node && "insertChild" in node;
  }
  async function autoNameFrame(config) {
    var _a, _b, _c, _d, _e;
    await ensureCurrentPageLoaded();
    const selection = Array.from(figma.currentPage.selection);
    if (selection.length !== 1 || selection[0].type !== "FRAME") {
      throw new Error("\u8BF7\u53EA\u9009\u4E2D\u4E00\u4E2A\u9700\u8981\u6574\u7406\u7684\u4E00\u952E\u547D\u540D\u753B\u677F\uFF08Frame\uFF09");
    }
    const root = selection[0];
    const normalized = normalizeConfig(config);
    const ruleByKind = new Map(normalized.namingRules.map((rule) => [rule.kind, rule.prefix]));
    const candidates = collectAutoNameCandidates(root);
    const originalFrameName = root.name.trim() || "Frame";
    const sources = [originalFrameName, ...candidates.map((candidate) => candidate.source)];
    const translationResult = await translateSources(sources, normalized.translateSettings);
    const translations = translationResult.translated;
    const frameTranslation = (_a = translations.get(originalFrameName)) != null ? _a : originalFrameName;
    root.name = buildAutoFrameName(figma.root.name, frameTranslation, root.width, root.height);
    const cleanup = cleanGroupsAndMasks(root);
    const counters = /* @__PURE__ */ new Map();
    let renamed = 0;
    let skipped = cleanup.skipped;
    for (const candidate of candidates) {
      try {
        if (candidate.node.removed) {
          skipped += 1;
          continue;
        }
        const prefix = (_c = (_b = ruleByKind.get(candidate.kind)) != null ? _b : ruleByKind.get("NODE")) != null ? _c : "Node";
        const translated = (_d = translations.get(candidate.source)) != null ? _d : candidate.source;
        const body = stripNamingPrefix(toChildNodeName(translated), prefix);
        const baseName = `${prefix}${body || candidate.kind.charAt(0) + candidate.kind.slice(1).toLowerCase()}`;
        const next = ((_e = counters.get(baseName)) != null ? _e : 0) + 1;
        counters.set(baseName, next);
        candidate.node.name = next > 1 ? `${baseName}${String(next).padStart(2, "0")}` : baseName;
        renamed += 1;
      } catch (e) {
        skipped += 1;
      }
    }
    figma.currentPage.selection = [root];
    if (translationResult.warning) figma.notify(translationResult.warning);
    return { frameName: root.name, renamed, groups: cleanup.groups, masks: cleanup.masks, skipped };
  }
  function buildAutoFrameName(projectName, translatedFrameName, width, height) {
    const project = toFrameNameSegment(projectName) || "Project";
    const translated = stripFramePlatformToken(toNodeName(translatedFrameName)) || "Frame";
    return `${project}_${translated}_${framePlatformSuffix(width, height)}`;
  }
  function framePlatformSuffix(width, height) {
    const roundedWidth = Math.round(width);
    const roundedHeight = Math.round(height);
    if (roundedWidth === 2340 && roundedHeight === 1080) return "IOS";
    if (roundedWidth === 2560 && roundedHeight === 1440) return "PC";
    return "Item";
  }
  function stripFramePlatformToken(value) {
    return value.replace(/^(IOS|PC|Item)+/i, "").replace(/(IOS|PC|Item)+$/i, "");
  }
  function collectAutoNameCandidates(root) {
    const candidates = [];
    const visit = (container) => {
      for (const node of container.children) {
        if (isMaskNode(node)) continue;
        if (node.type === "GROUP") {
          visit(node);
          continue;
        }
        const kind = getNodeKind(node);
        candidates.push({ node, kind, source: getAutoNameSource(node, kind) });
        if ("children" in node) visit(node);
      }
    };
    visit(root);
    return candidates;
  }
  function getAutoNameSource(node, kind) {
    const raw = node.type === "TEXT" && node.characters.trim() ? node.characters.trim().replace(/\s+/g, " ").slice(0, 80) : node.name.trim();
    const fallback = kind.charAt(0) + kind.slice(1).toLowerCase();
    return raw || fallback;
  }
  function cleanGroupsAndMasks(root) {
    let groups = 0;
    let masks = 0;
    let skipped = 0;
    const visit = (container) => {
      for (const node of Array.from(container.children)) {
        if (isMaskNode(node)) {
          try {
            node.remove();
            masks += 1;
          } catch (e) {
            skipped += 1;
          }
          continue;
        }
        if (node.type === "GROUP") {
          visit(node);
          try {
            const parent = node.parent;
            if (!parent || !("insertChild" in parent) || !("children" in parent)) throw new Error("Group \u65E0\u6CD5\u89E3\u6563");
            let index = parent.children.indexOf(node);
            for (const child of Array.from(node.children)) {
              const transform = child.relativeTransform;
              parent.insertChild(index, child);
              child.relativeTransform = transform;
              index += 1;
            }
            if (!node.removed) node.remove();
            groups += 1;
          } catch (e) {
            skipped += 1;
          }
          continue;
        }
        if ("children" in node) visit(node);
      }
    };
    visit(root);
    return { groups, masks, skipped };
  }
  function isMaskNode(node) {
    return "isMask" in node && node.isMask;
  }
  async function translateSources(sources, settings) {
    const unique = Array.from(new Set(sources));
    const translated = new Map(unique.map((source) => [source, source]));
    const chinese = unique.filter(containsChinese);
    if (!chinese.length) return { translated };
    if (!settings.appId || !settings.secretKey) {
      return { translated, warning: "\u672A\u914D\u7F6E\u767E\u5EA6\u7FFB\u8BD1\uFF0C\u5DF2\u7528\u539F\u540D\u79F0\u7EE7\u7EED\u6574\u7406" };
    }
    for (const batch of translationBatches(chinese)) {
      let results;
      try {
        results = await requestBaiduTranslationResults(batch.join("\n"), settings);
      } catch (error) {
        return { translated, warning: `\u767E\u5EA6\u7FFB\u8BD1\u5931\u8D25\uFF0C\u5DF2\u7528\u539F\u540D\u79F0\u7EE7\u7EED\u6574\u7406\uFF1A${errorMessage(error)}` };
      }
      if (results.length === batch.length) {
        batch.forEach((source, index) => translated.set(source, results[index] || source));
        continue;
      }
      const split = results.length === 1 ? results[0].split(/\r?\n/) : [];
      if (split.length === batch.length) {
        batch.forEach((source, index) => translated.set(source, split[index] || source));
        continue;
      }
      for (const source of batch) {
        try {
          const single = await requestBaiduTranslationResults(source, settings);
          translated.set(source, single.join(" ") || source);
        } catch (error) {
          return { translated, warning: `\u767E\u5EA6\u7FFB\u8BD1\u5931\u8D25\uFF0C\u5DF2\u7528\u90E8\u5206\u7FFB\u8BD1\u7ED3\u679C\u7EE7\u7EED\u6574\u7406\uFF1A${errorMessage(error)}` };
        }
      }
    }
    return { translated };
  }
  function translationBatches(sources) {
    const batches = [];
    let batch = [];
    let size = 0;
    for (const source of sources) {
      const nextSize = encodeURIComponent(source).length + 3;
      if (batch.length && (batch.length >= 30 || size + nextSize > 4e3)) {
        batches.push(batch);
        batch = [];
        size = 0;
      }
      batch.push(source);
      size += nextSize;
    }
    if (batch.length) batches.push(batch);
    return batches;
  }
  function containsChinese(value) {
    return /[\u3400-\u9fff]/.test(value);
  }
  function stripNamingPrefix(value, prefix) {
    const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return value.replace(new RegExp(`^${escaped}[_\\s-]*`, "i"), "");
  }
  async function requestBaiduTranslation(text, settings) {
    return (await requestBaiduTranslationResults(text, settings)).join(" ");
  }
  async function requestBaiduTranslationResults(text, settings) {
    if (!text) throw new Error("\u8BF7\u8F93\u5165\u8981\u7FFB\u8BD1\u7684\u4E2D\u6587");
    if (!settings.appId || !settings.secretKey) throw new Error("\u8BF7\u5148\u5728\u8BBE\u7F6E\u91CC\u586B\u5199\u767E\u5EA6\u7FFB\u8BD1 AppID \u548C\u5BC6\u94A5");
    const salt = String(Date.now());
    const sign = md5(`${settings.appId}${text}${salt}${settings.secretKey}`);
    const query = encodeQuery({
      q: text,
      from: settings.from || "zh",
      to: settings.to || "en",
      appid: settings.appId,
      salt,
      sign
    });
    let response;
    try {
      response = await fetch(`https://fanyi-api.baidu.com/api/trans/vip/translate?${query}`);
    } catch (error) {
      throw new Error(`\u767E\u5EA6\u7FFB\u8BD1\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25\uFF1A${errorMessage(error)}`);
    }
    if (!response.ok) throw new Error(`\u767E\u5EA6\u7FFB\u8BD1\u8BF7\u6C42\u5931\u8D25\uFF1A${response.status} ${response.statusText}`);
    const payload = await response.json();
    if (payload == null ? void 0 : payload.error_code) throw new Error(`\u767E\u5EA6\u7FFB\u8BD1\u5931\u8D25\uFF1A${payload.error_code} ${payload.error_msg || ""}`.trim());
    const translated = Array.isArray(payload == null ? void 0 : payload.trans_result) ? payload.trans_result.map((item) => item.dst || "") : [];
    if (!translated.length || !translated.some((item) => item.trim())) throw new Error("\u767E\u5EA6\u7FFB\u8BD1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7ED3\u679C");
    return translated;
  }
  function encodeQuery(values) {
    return Object.keys(values).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(values[key])}`).join("&");
  }
  function errorMessage(error) {
    if (error instanceof Error) return error.message || error.name;
    if (typeof error === "string") return error;
    if (error && typeof error === "object") {
      const record = error;
      const message = record.message || record.error || record.reason || record.statusText;
      if (typeof message === "string" && message.trim()) return message;
      try {
        const json = JSON.stringify(error);
        if (json && json !== "{}") return json;
      } catch (e) {
      }
    }
    return String(error);
  }
  async function applyPresetToNode(node, preset) {
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
    if (enabled.cornerRadius && "topLeftCornerRadius" in node && "topRightCornerRadius" in node && "bottomLeftCornerRadius" in node && "bottomRightCornerRadius" in node) {
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
      changed = await applyTextPreset(node, preset) || changed;
    }
    if ((enabled.imageScaleMode || enabled.textFill) && "fills" in node && Array.isArray(node.fills)) {
      const fills = node.fills.map((paint) => {
        if (enabled.imageScaleMode && paint.type === "IMAGE") return __spreadProps(__spreadValues({}, paint), { scaleMode: values.imageScaleMode });
        if (enabled.textFill && paint.type === "SOLID") return __spreadValues(__spreadValues({}, paint), hexToSolidPaint(values.textFill));
        return paint;
      });
      node.fills = fills;
      changed = true;
    }
    return changed;
  }
  async function applyTextPreset(node, preset) {
    var _a, _b;
    const { enabled, values } = preset;
    let changed = false;
    if (enabled.fontFamily || enabled.fontStyle) {
      const fontName = {
        family: values.fontFamily || "Inter",
        style: values.fontStyle || "Regular"
      };
      try {
        await figma.loadFontAsync(fontName);
        node.fontName = fontName;
        changed = true;
      } catch (e) {
        figma.notify(`\u5B57\u4F53\u4E0D\u53EF\u7528\uFF0C\u5DF2\u8DF3\u8FC7\uFF1A${fontName.family} ${fontName.style}`);
      }
    } else if (node.fontName !== figma.mixed) {
      await figma.loadFontAsync(node.fontName);
    }
    if (enabled.fontSize) {
      node.fontSize = values.fontSize;
      changed = true;
    }
    if (enabled.lineHeightPx) {
      node.lineHeight = { unit: "PERCENT", value: (_a = values.lineHeightPercent) != null ? _a : 150 };
      changed = true;
    }
    if (enabled.lineHeightPercent) {
      node.lineHeight = { unit: "PERCENT", value: (_b = values.lineHeightPercent) != null ? _b : 150 };
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
  async function createUeFrame(options, config) {
    var _a;
    await ensureCurrentPageLoaded();
    const source = figma.currentPage.selection[0];
    if (!source || !("absoluteBoundingBox" in source) || !source.absoluteBoundingBox) {
      throw new Error("\u8BF7\u9009\u62E9\u4E00\u4E2A UI \u753B\u677F\u6216\u5305\u542B\u56FE\u7247\u7684\u8282\u70B9");
    }
    const sourceBox = source.absoluteBoundingBox;
    const candidates = flatten(source).filter((node) => {
      if (!options.includeHidden && "visible" in node && !node.visible) return false;
      if (!options.includeLocked && node.locked) return false;
      return node !== source && (getNodeKind(node) === "IMAGE" || node.exportSettings.length > 0);
    });
    if (!candidates.length) throw new Error("\u9009\u533A\u5185\u6CA1\u6709\u56FE\u7247\u6216\u53EF\u5BFC\u51FA\u8282\u70B9");
    const frame = figma.createFrame();
    frame.name = `${source.name}_UE_Assets`;
    frame.x = sourceBox.x + sourceBox.width + 120;
    frame.y = sourceBox.y;
    frame.resize(sourceBox.width, sourceBox.height);
    frame.fills = [];
    figma.currentPage.appendChild(frame);
    const imageRule = (_a = config.namingRules.find((rule) => rule.kind === "IMAGE")) != null ? _a : defaultConfig.namingRules[1];
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
  async function writeProjectConfig(config) {
    await ensureCurrentPageLoaded();
    const existing = figma.currentPage.findOne((node) => node.name === PROJECT_CONFIG_NODE_NAME);
    const target = existing != null ? existing : figma.createFrame();
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
  async function requestAiNames(nodes, settings, fallback) {
    var _a, _b, _c;
    if (!settings.enabled || !settings.apiKey || !settings.baseUrl || !settings.model) {
      throw new Error("AI \u672A\u542F\u7528\u6216\u7F3A\u5C11 Base URL / API Key / Model");
    }
    const summaries = nodes.map((node) => ({
      id: node.id,
      type: node.type,
      name: node.name,
      kind: getNodeKind(node),
      size: "width" in node ? { width: Math.round(node.width), height: Math.round(node.height) } : void 0,
      text: node.type === "TEXT" ? node.characters.slice(0, 120) : void 0,
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
    if (!response.ok) throw new Error(`AI \u8BF7\u6C42\u5931\u8D25\uFF1A${response.status} ${response.statusText}`);
    const payload = await response.json();
    const content = (_c = (_b = (_a = payload == null ? void 0 : payload.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content;
    if (typeof content !== "string") throw new Error("AI \u8FD4\u56DE\u683C\u5F0F\u65E0\u6548");
    const parsed = JSON.parse(extractJson(content));
    const seen = /* @__PURE__ */ new Map();
    return new Map(
      parsed.filter((item) => item.id && item.name).map((item) => {
        var _a2;
        const base = safeName(item.name);
        const next = ((_a2 = seen.get(base)) != null ? _a2 : 0) + 1;
        seen.set(base, next);
        return [item.id, next > 1 ? `${base}_${String(next).padStart(3, "0")}` : base];
      })
    );
  }
  function getNodeKind(node) {
    if (node.type === "TEXT") return "TEXT";
    if (hasImageFill(node)) return "IMAGE";
    if (node.type === "INSTANCE" || node.type === "COMPONENT" || node.type === "COMPONENT_SET") return "COMPONENT";
    if (node.type === "FRAME" || node.type === "SECTION") return "FRAME";
    if (node.type === "VECTOR" || node.type === "BOOLEAN_OPERATION" || node.type === "RECTANGLE" || node.type === "ELLIPSE" || node.type === "POLYGON" || node.type === "STAR" || node.type === "LINE") {
      return "SHAPE";
    }
    return "NODE";
  }
  function hasImageFill(node) {
    return "fills" in node && Array.isArray(node.fills) && node.fills.some((paint) => paint.type === "IMAGE");
  }
  function getNodePath(node) {
    const names = [];
    let current = node;
    while (current && current.type !== "PAGE" && current.type !== "DOCUMENT") {
      names.unshift(current.name);
      current = current.parent;
    }
    return names.join("/");
  }
  function safeName(value) {
    const cleaned = value.trim().replace(/[^\w\u4e00-\u9fa5-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
    return cleaned || "Node";
  }
  function toFrameNameSegment(value) {
    return safeName(value);
  }
  function toChildNodeName(value) {
    return toNodeName(value).replace(/_/g, "");
  }
  function hexToSolidPaint(hex2) {
    const { color, opacity } = hexToRgbAndOpacity(hex2);
    return opacity == null ? { type: "SOLID", color } : { type: "SOLID", color, opacity };
  }
  function hexToRgbAndOpacity(hex2) {
    const normalized = hex2.replace("#", "").trim();
    const value = normalized.length === 3 ? normalized.split("").map((char) => char + char).join("") : normalized;
    const rgbValue = (value || "ffffff").slice(0, 6).padEnd(6, "f");
    const number = Number.parseInt(rgbValue, 16);
    const opacity = value.length >= 8 ? Number.parseInt(value.slice(6, 8), 16) / 255 : void 0;
    return {
      color: {
        r: (number >> 16 & 255) / 255,
        g: (number >> 8 & 255) / 255,
        b: (number & 255) / 255
      },
      opacity
    };
  }
  function toNodeName(value) {
    const words = value.normalize("NFKD").replace(/['’]/g, "").split(/[^A-Za-z0-9]+/).filter(Boolean);
    if (!words.length) return safeName(value);
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  }
  function extractJson(content) {
    const match = content.match(/\[[\s\S]*\]/);
    return match ? match[0] : content;
  }
  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
  function scaleSize(node, maxSize) {
    const ratio = Math.min(1, maxSize / Math.max(node.width, node.height));
    return { width: Math.max(1, node.width * ratio), height: Math.max(1, node.height * ratio) };
  }
  function md5(input) {
    const text = unescape(encodeURIComponent(input));
    const words = [];
    for (let i = 0; i < text.length; i += 1) {
      words[i >> 2] |= text.charCodeAt(i) << i % 4 * 8;
    }
    words[text.length >> 2] |= 128 << text.length % 4 * 8;
    words[(text.length + 8 >> 6) * 16 + 14] = text.length * 8;
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
  function cmn(q, a, b, x, s, t) {
    return add32(rol(add32(add32(a, q), add32(x, t)), s), b);
  }
  function ff(a, b, c, d, x, s, t) {
    return cmn(b & c | ~b & d, a, b, x, s, t);
  }
  function gg(a, b, c, d, x, s, t) {
    return cmn(b & d | c & ~d, a, b, x, s, t);
  }
  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function rol(num, count) {
    return num << count | num >>> 32 - count;
  }
  function add32(a, b) {
    return a + b | 0;
  }
  function hex(num) {
    let output = "";
    for (let i = 0; i < 4; i += 1) {
      output += (num >> i * 8 & 255).toString(16).padStart(2, "0");
    }
    return output;
  }
})();
//# sourceMappingURL=code.js.map
