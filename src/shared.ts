export type NodeKind = "TEXT" | "IMAGE" | "COMPONENT" | "FRAME" | "SHAPE" | "NODE";
export type RenameScope = "selection" | "children" | "deep";
export type UeLayoutMode = "preserve" | "grid";

export interface NamingRule {
  id: string;
  label: string;
  kind: NodeKind;
  prefix: string;
  digits: number;
}

export interface RenameOptions {
  scope: RenameScope;
  skipLocked: boolean;
  skipHidden: boolean;
  keepOriginalSuffix: boolean;
  useAiNames: boolean;
  lexiconEntryId?: string;
}

export interface RenamePreviewItem {
  id: string;
  currentName: string;
  nextName: string;
  type: string;
  kind: NodeKind;
}

export interface PropertyPreset {
  id: string;
  name: string;
  targetKinds: NodeKind[];
  enabled: Record<string, boolean>;
  values: PropertyValues;
}

export interface PropertyValues {
  opacity: number;
  visible: boolean;
  locked: boolean;
  blendMode: BlendMode;
  fontFamily: string;
  fontStyle: string;
  fontSize: number;
  lineHeightPx: number;
  lineHeightPercent: number;
  letterSpacing: number;
  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAlignVertical: "TOP" | "CENTER" | "BOTTOM";
  paragraphSpacing: number;
  textFill: string;
  imageScaleMode: "FILL" | "FIT" | "CROP" | "TILE";
  cornerRadius: number;
  constraintsHorizontal: ConstraintType;
  constraintsVertical: ConstraintType;
  clipsContent: boolean;
  layoutMode: "NONE" | "HORIZONTAL" | "VERTICAL";
  padding: number;
  itemSpacing: number;
}

export interface UeLayoutOptions {
  mode: UeLayoutMode;
  spacing: number;
  preserveSize: boolean;
  includeHidden: boolean;
  includeLocked: boolean;
  maxGridItemSize: number;
}

export interface AiSettings {
  enabled: boolean;
  provider?: "openai-compatible" | "kimi";
  baseUrl: string;
  apiKey: string;
  model: string;
  promptTemplate: string;
}

export interface TranslateSettings {
  provider: "baidu";
  appId: string;
  secretKey: string;
  from: string;
  to: string;
}

export interface LexiconEntry {
  id: string;
  word: string;
  label: string;
  kind: NodeKind;
  prefix: string;
  description: string;
  applyProperties?: boolean;
  enabled?: Record<string, boolean>;
  values?: Partial<PropertyValues>;
}

export interface PluginConfig {
  namingRules: NamingRule[];
  lexicon: LexiconEntry[];
  propertyPresets: PropertyPreset[];
  ueDefaults: UeLayoutOptions;
  aiSettings: AiSettings;
  translateSettings: TranslateSettings;
}

export interface SelectionSummary {
  count: number;
  roots: Array<{ id: string; name: string; type: string; kind: NodeKind; childCount: number }>;
}

export type PluginToUiMessage =
  | { type: "READY"; config: PluginConfig; selection: SelectionSummary }
  | { type: "SELECTION"; selection: SelectionSummary }
  | { type: "RENAME_PREVIEW"; items: RenamePreviewItem[]; aiUsed: boolean }
  | { type: "APPLY_RESULT"; message: string }
  | { type: "UE_RESULT"; message: string }
  | { type: "CONFIG_EXPORTED"; json: string }
  | { type: "PROJECT_CONFIG_WRITTEN"; message: string }
  | { type: "ERROR"; message: string };

export type UiToPluginMessage =
  | { type: "SCAN_SELECTION" }
  | { type: "PREVIEW_RENAME"; options: RenameOptions; config: PluginConfig }
  | { type: "APPLY_RENAME"; items: RenamePreviewItem[] }
  | { type: "APPLY_PROPERTIES"; preset: PropertyPreset; options: RenameOptions }
  | { type: "APPLY_LEXICON_ENTRY"; entryId: string; options: RenameOptions; config: PluginConfig }
  | { type: "CREATE_UE_FRAME"; options: UeLayoutOptions; config: PluginConfig }
  | { type: "SAVE_CONFIG"; config: PluginConfig }
  | { type: "IMPORT_CONFIG"; json: string }
  | { type: "EXPORT_CONFIG" }
  | { type: "WRITE_PROJECT_CONFIG"; config: PluginConfig }
  | { type: "GENERATE_AI_NAMES"; options: RenameOptions; config: PluginConfig }
  | { type: "TRANSLATE_AND_RENAME"; text: string; options: RenameOptions; config: PluginConfig }
  | { type: "AUTO_NAME_FRAME"; config: PluginConfig }
  | { type: "RESIZE_UI"; width: number; height: number };

export const defaultConfig: PluginConfig = {
  namingRules: [
    { id: "text", label: "Text 文字", kind: "TEXT", prefix: "Txt", digits: 3 },
    { id: "image", label: "Image 图片", kind: "IMAGE", prefix: "Img", digits: 3 },
    { id: "component", label: "Component 组件", kind: "COMPONENT", prefix: "Cmp", digits: 3 },
    { id: "frame", label: "Frame 画板", kind: "FRAME", prefix: "Frm", digits: 3 },
    { id: "shape", label: "Shape 图形", kind: "SHAPE", prefix: "Shape", digits: 3 },
    { id: "node", label: "Node 其他", kind: "NODE", prefix: "Node", digits: 3 }
  ],
  lexicon: [
    {
      id: "lex-text",
      word: "Txt",
      label: "Text 文本",
      kind: "TEXT",
      prefix: "Txt",
      description: "普通文字层",
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
      label: "TxtName 名称",
      kind: "TEXT",
      prefix: "TxtName",
      description: "名称文字",
      applyProperties: true,
      enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
      values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
    },
    {
      id: "lex-text-time",
      word: "TxtTime",
      label: "TxtTime 时间",
      kind: "TEXT",
      prefix: "TxtTime",
      description: "时间文字",
      applyProperties: true,
      enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
      values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
    },
    {
      id: "lex-text-tag",
      word: "TxtTag",
      label: "TxtTag 标签",
      kind: "TEXT",
      prefix: "TxtTag",
      description: "标签文字",
      applyProperties: true,
      enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
      values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
    },
    {
      id: "lex-text-num",
      word: "TxtNum",
      label: "TxtNum 数字",
      kind: "TEXT",
      prefix: "TxtNum",
      description: "数字文字",
      applyProperties: true,
      enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
      values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 32, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
    },
    {
      id: "lex-text-task",
      word: "TxtTask",
      label: "TxtTask 任务",
      kind: "TEXT",
      prefix: "TxtTask",
      description: "任务文字",
      applyProperties: true,
      enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
      values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
    },
    {
      id: "lex-text-desc",
      word: "TxtDesc",
      label: "TxtDesc 描述",
      kind: "TEXT",
      prefix: "TxtDesc",
      description: "描述文字",
      applyProperties: true,
      enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
      values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
    },
    {
      id: "lex-text-lv",
      word: "TxtLv",
      label: "TxtLv 等级",
      kind: "TEXT",
      prefix: "TxtLv",
      description: "等级文字",
      applyProperties: true,
      enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
      values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
    },
    {
      id: "lex-title",
      word: "Title",
      label: "Title 标题",
      kind: "TEXT",
      prefix: "Title",
      description: "标题文字",
      applyProperties: true,
      enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
      values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 32, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
    },
    {
      id: "lex-label",
      word: "Label",
      label: "Label 标签",
      kind: "TEXT",
      prefix: "Label",
      description: "说明/标签文字",
      applyProperties: true,
      enabled: { fontFamily: true, fontStyle: true, fontSize: true, lineHeightPercent: true, textAlignHorizontal: true, textAlignVertical: true, textFill: true },
      values: { fontFamily: "Inter", fontStyle: "Regular", fontSize: 28, lineHeightPercent: 150, textAlignHorizontal: "CENTER", textAlignVertical: "CENTER", textFill: "#FFFFFF" }
    },
    { id: "lex-bg-image", word: "BG", label: "BG 背景图", kind: "IMAGE", prefix: "BG", description: "背景图片", applyProperties: false },
    { id: "lex-image", word: "Img", label: "Image 图片", kind: "IMAGE", prefix: "Img", description: "图片资源", applyProperties: false },
    { id: "lex-image-tag", word: "ImgTag", label: "ImgTag 图片标签", kind: "IMAGE", prefix: "ImgTag", description: "图片标签", applyProperties: false },
    { id: "lex-icon", word: "Icon", label: "Icon 图标", kind: "IMAGE", prefix: "Icon", description: "小图标/装饰图", applyProperties: false },
    { id: "lex-ornament", word: "Ornament", label: "Ornament 装饰品", kind: "IMAGE", prefix: "Ornament", description: "装饰图片", applyProperties: false },
    { id: "lex-normal", word: "Normal", label: "Normal 常态", kind: "IMAGE", prefix: "Normal", description: "常态图片", applyProperties: false },
    { id: "lex-hover", word: "Hover", label: "Hover 悬浮态", kind: "IMAGE", prefix: "Hover", description: "悬浮态图片", applyProperties: false },
    { id: "lex-selected", word: "Selected", label: "Selected 选中态", kind: "IMAGE", prefix: "Selected", description: "选中态图片", applyProperties: false },
    { id: "lex-disabled", word: "Disabled", label: "Disabled 禁用态", kind: "IMAGE", prefix: "Disabled", description: "禁用态图片", applyProperties: false },
    { id: "lex-mask", word: "Mask", label: "Mask 遮罩", kind: "IMAGE", prefix: "Mask", description: "遮罩图片", applyProperties: false },
    { id: "lex-button", word: "Btn", label: "Button 按钮", kind: "COMPONENT", prefix: "Btn", description: "按钮组件或按钮组", applyProperties: false },
    { id: "lex-content", word: "Content", label: "Content 内容", kind: "FRAME", prefix: "Content", description: "Frame 内容容器", applyProperties: false },
    { id: "lex-panel", word: "Panel", label: "Panel 面板", kind: "FRAME", prefix: "Panel", description: "弹窗/面板容器", applyProperties: false },
    { id: "lex-group", word: "Group", label: "Group 组", kind: "FRAME", prefix: "Group", description: "普通分组容器", applyProperties: false },
    { id: "lex-shape", word: "Shape", label: "Shape 图形", kind: "SHAPE", prefix: "Shape", description: "基础形状", applyProperties: false },
    { id: "lex-bg", word: "Bg", label: "Background 背景", kind: "SHAPE", prefix: "Bg", description: "背景块/底图", applyProperties: false },
    { id: "lex-node", word: "Node", label: "Node 通用", kind: "NODE", prefix: "Node", description: "无法识别的节点", applyProperties: false }
  ],
  propertyPresets: [
    {
      id: "ue-text-center",
      name: "UE Text Center",
      targetKinds: ["TEXT"],
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
    baseUrl: "https://api.openai.com/v1/chat/completions",
    apiKey: "",
    model: "gpt-4.1-mini",
    promptTemplate:
      "Name Figma nodes for UE import. Return JSON array with id and name. Use short English asset names and preserve prefixes when useful."
  },
  translateSettings: {
    provider: "baidu",
    appId: "",
    secretKey: "",
    from: "zh",
    to: "en"
  }
};
