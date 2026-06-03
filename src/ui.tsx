import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  defaultConfig,
  type AiSettings,
  type NamingRule,
  type NodeKind,
  type PluginConfig,
  type PluginToUiMessage,
  type PropertyPreset,
  type RenameOptions,
  type RenamePreviewItem,
  type SelectionSummary,
  type UeLayoutOptions,
  type UiToPluginMessage
} from "./shared";
import "./styles.css";

type Tab = "naming" | "properties" | "ue" | "presets";

const nodeKinds: NodeKind[] = ["TEXT", "IMAGE", "COMPONENT", "FRAME", "SHAPE", "NODE"];

function App() {
  const [tab, setTab] = useState<Tab>("naming");
  const [config, setConfig] = useState<PluginConfig>(defaultConfig);
  const [selection, setSelection] = useState<SelectionSummary>({ count: 0, roots: [] });
  const [renameOptions, setRenameOptions] = useState<RenameOptions>({
    scope: "deep",
    skipLocked: true,
    skipHidden: true,
    keepOriginalSuffix: false,
    useAiNames: false
  });
  const [preview, setPreview] = useState<RenamePreviewItem[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState(defaultConfig.propertyPresets[0].id);
  const [ueOptions, setUeOptions] = useState<UeLayoutOptions>(defaultConfig.ueDefaults);
  const [status, setStatus] = useState("准备就绪");
  const [importJson, setImportJson] = useState("");

  useEffect(() => {
    window.onmessage = (event: MessageEvent<{ pluginMessage: PluginToUiMessage }>) => {
      const message = event.data.pluginMessage;
      if (!message) return;
      if (message.type === "READY") {
        setConfig(message.config);
        setUeOptions(message.config.ueDefaults);
        setSelection(message.selection);
        setSelectedPresetId(message.config.propertyPresets[0]?.id ?? "");
      }
      if (message.type === "SELECTION") setSelection(message.selection);
      if (message.type === "RENAME_PREVIEW") {
        setPreview(message.items);
        setStatus(`${message.aiUsed ? "AI" : "规则"}预览 ${message.items.length} 个节点`);
      }
      if (message.type === "APPLY_RESULT" || message.type === "UE_RESULT") setStatus(message.message);
      if (message.type === "CONFIG_EXPORTED") {
        setImportJson(message.json);
        setStatus("配置已导出到文本框");
      }
      if (message.type === "PROJECT_CONFIG_WRITTEN") setStatus(message.message);
      if (message.type === "ERROR") setStatus(`错误：${message.message}`);
    };
    post({ type: "SCAN_SELECTION" });
  }, []);

  const selectedPreset = useMemo(
    () => config.propertyPresets.find((preset) => preset.id === selectedPresetId) ?? config.propertyPresets[0],
    [config.propertyPresets, selectedPresetId]
  );

  function saveConfig(next: PluginConfig) {
    setConfig(next);
    post({ type: "SAVE_CONFIG", config: next });
  }

  function updateRule(id: string, patch: Partial<NamingRule>) {
    saveConfig({ ...config, namingRules: config.namingRules.map((rule) => (rule.id === id ? { ...rule, ...patch } : rule)) });
  }

  function updateAi(patch: Partial<AiSettings>) {
    saveConfig({ ...config, aiSettings: { ...config.aiSettings, ...patch } });
  }

  function updatePreset(preset: PropertyPreset) {
    saveConfig({
      ...config,
      propertyPresets: config.propertyPresets.map((item) => (item.id === preset.id ? preset : item))
    });
  }

  function updateUe(next: UeLayoutOptions) {
    setUeOptions(next);
    saveConfig({ ...config, ueDefaults: next });
  }

  function addPreset() {
    const base = selectedPreset ?? defaultConfig.propertyPresets[0];
    const preset = { ...base, id: `preset-${Date.now()}`, name: "New Preset", enabled: { ...base.enabled }, values: { ...base.values } };
    saveConfig({ ...config, propertyPresets: [...config.propertyPresets, preset] });
    setSelectedPresetId(preset.id);
  }

  return (
    <main>
      <header>
        <div>
          <h1>AI Auto Namer</h1>
          <p>{selection.count ? `已选中 ${selection.count} 个节点` : "未选中节点"}</p>
        </div>
        <button className="icon" onClick={() => post({ type: "SCAN_SELECTION" })} title="刷新选区">
          ↻
        </button>
      </header>

      <nav>
        <TabButton id="naming" tab={tab} setTab={setTab} label="命名" />
        <TabButton id="properties" tab={tab} setTab={setTab} label="属性" />
        <TabButton id="ue" tab={tab} setTab={setTab} label="UE画板" />
        <TabButton id="presets" tab={tab} setTab={setTab} label="词库/AI" />
      </nav>

      {tab === "naming" && (
        <section>
          <SelectionPanel selection={selection} />
          <RenameControls options={renameOptions} setOptions={setRenameOptions} />
          <div className="actions">
            <button onClick={() => post({ type: "PREVIEW_RENAME", options: renameOptions, config })}>规则预览</button>
            <button onClick={() => post({ type: "GENERATE_AI_NAMES", options: renameOptions, config })}>AI 建议</button>
            <button className="primary" disabled={!preview.length} onClick={() => post({ type: "APPLY_RENAME", items: preview })}>
              应用命名
            </button>
          </div>
          <PreviewTable items={preview} setItems={setPreview} />
        </section>
      )}

      {tab === "properties" && selectedPreset && (
        <section>
          <div className="row">
            <label>
              属性组合
              <select value={selectedPreset.id} onChange={(event) => setSelectedPresetId(event.target.value)}>
                {config.propertyPresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={addPreset}>新增</button>
          </div>
          <PropertyEditor preset={selectedPreset} updatePreset={updatePreset} />
          <RenameControls options={renameOptions} setOptions={setRenameOptions} compact />
          <div className="actions">
            <button className="primary" onClick={() => post({ type: "APPLY_PROPERTIES", preset: selectedPreset, options: renameOptions })}>
              应用属性
            </button>
          </div>
        </section>
      )}

      {tab === "ue" && (
        <section>
          <SelectionPanel selection={selection} />
          <UeEditor options={ueOptions} setOptions={updateUe} />
          <div className="actions">
            <button className="primary" onClick={() => post({ type: "CREATE_UE_FRAME", options: ueOptions, config })}>
              生成 UE 画板
            </button>
          </div>
        </section>
      )}

      {tab === "presets" && (
        <section>
          <h2>命名词库</h2>
          <div className="rules">
            {config.namingRules.map((rule) => (
              <div className="rule" key={rule.id}>
                <span>{rule.label}</span>
                <input value={rule.prefix} onChange={(event) => updateRule(rule.id, { prefix: event.target.value })} />
                <input type="number" min={1} max={6} value={rule.digits} onChange={(event) => updateRule(rule.id, { digits: Number(event.target.value) })} />
              </div>
            ))}
          </div>
          <h2>AI 设置</h2>
          <AiEditor settings={config.aiSettings} update={updateAi} />
          <h2>配置共享</h2>
          <div className="actions">
            <button onClick={() => post({ type: "EXPORT_CONFIG" })}>导出 JSON</button>
            <button onClick={() => post({ type: "IMPORT_CONFIG", json: importJson })}>导入 JSON</button>
            <button onClick={() => post({ type: "WRITE_PROJECT_CONFIG", config })}>写入项目配置</button>
          </div>
          <textarea value={importJson} onChange={(event) => setImportJson(event.target.value)} placeholder="导入/导出的 JSON 配置" />
        </section>
      )}

      <footer>{status}</footer>
    </main>
  );
}

function TabButton({ id, tab, setTab, label }: { id: Tab; tab: Tab; setTab: (tab: Tab) => void; label: string }) {
  return (
    <button className={tab === id ? "active" : ""} onClick={() => setTab(id)}>
      {label}
    </button>
  );
}

function SelectionPanel({ selection }: { selection: SelectionSummary }) {
  return (
    <div className="panel">
      {selection.roots.length ? (
        selection.roots.map((node) => (
          <div key={node.id} className="selection-item">
            <strong>{node.name}</strong>
            <span>
              {node.type} · {node.childCount} children
            </span>
          </div>
        ))
      ) : (
        <p>请选择节点或画板后刷新。</p>
      )}
    </div>
  );
}

function RenameControls({
  options,
  setOptions,
  compact = false
}: {
  options: RenameOptions;
  setOptions: (options: RenameOptions) => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "controls compact" : "controls"}>
      <label>
        范围 Scope
        <select value={options.scope} onChange={(event) => setOptions({ ...options, scope: event.target.value as RenameOptions["scope"] })}>
          <option value="selection">仅选中节点</option>
          <option value="children">直接子级</option>
          <option value="deep">全部子节点</option>
        </select>
      </label>
      <Check label="跳过 Locked" checked={options.skipLocked} onChange={(value) => setOptions({ ...options, skipLocked: value })} />
      <Check label="跳过 Hidden" checked={options.skipHidden} onChange={(value) => setOptions({ ...options, skipHidden: value })} />
      <Check label="保留原名后缀" checked={options.keepOriginalSuffix} onChange={(value) => setOptions({ ...options, keepOriginalSuffix: value })} />
    </div>
  );
}

function PreviewTable({ items, setItems }: { items: RenamePreviewItem[]; setItems: (items: RenamePreviewItem[]) => void }) {
  if (!items.length) return <div className="empty">还没有预览结果。</div>;
  return (
    <div className="table">
      {items.map((item, index) => (
        <div className="table-row" key={item.id}>
          <span>{item.kind}</span>
          <small title={item.currentName}>{item.currentName}</small>
          <input
            value={item.nextName}
            onChange={(event) => setItems(items.map((next, nextIndex) => (nextIndex === index ? { ...next, nextName: event.target.value } : next)))}
          />
        </div>
      ))}
    </div>
  );
}

function PropertyEditor({ preset, updatePreset }: { preset: PropertyPreset; updatePreset: (preset: PropertyPreset) => void }) {
  const setEnabled = (key: string, value: boolean) => updatePreset({ ...preset, enabled: { ...preset.enabled, [key]: value } });
  const setValue = <K extends keyof PropertyPreset["values"]>(key: K, value: PropertyPreset["values"][K]) =>
    updatePreset({ ...preset, values: { ...preset.values, [key]: value } });
  return (
    <div className="property-editor">
      <label>
        Preset Name
        <input value={preset.name} onChange={(event) => updatePreset({ ...preset, name: event.target.value })} />
      </label>
      <fieldset>
        <legend>Target</legend>
        {nodeKinds.map((kind) => (
          <Check
            key={kind}
            label={kind}
            checked={preset.targetKinds.includes(kind)}
            onChange={(value) =>
              updatePreset({ ...preset, targetKinds: value ? [...preset.targetKinds, kind] : preset.targetKinds.filter((item) => item !== kind) })
            }
          />
        ))}
      </fieldset>
      <fieldset>
        <legend>Common</legend>
        <ToggleNumber label="opacity" keyName="opacity" enabled={preset.enabled.opacity} value={preset.values.opacity} setEnabled={setEnabled} setValue={setValue} step={0.1} min={0} max={1} />
        <Check label="visible" checked={preset.enabled.visible} onChange={(value) => setEnabled("visible", value)} />
        <Check label="locked" checked={preset.enabled.locked} onChange={(value) => setEnabled("locked", value)} />
      </fieldset>
      <fieldset>
        <legend>Text</legend>
        <InlineCheck label="font" checked={!!(preset.enabled.fontFamily || preset.enabled.fontStyle)} onChange={(value) => { setEnabled("fontFamily", value); setEnabled("fontStyle", value); }} />
        <div className="row">
          <input value={preset.values.fontFamily} onChange={(event) => setValue("fontFamily", event.target.value)} />
          <input value={preset.values.fontStyle} onChange={(event) => setValue("fontStyle", event.target.value)} />
        </div>
        <ToggleNumber label="fontSize" keyName="fontSize" enabled={preset.enabled.fontSize} value={preset.values.fontSize} setEnabled={setEnabled} setValue={setValue} />
        <ToggleNumber label="lineHeight" keyName="lineHeightPx" enabled={preset.enabled.lineHeightPx} value={preset.values.lineHeightPx} setEnabled={setEnabled} setValue={setValue} />
        <ToggleNumber label="letterSpacing" keyName="letterSpacing" enabled={preset.enabled.letterSpacing} value={preset.values.letterSpacing} setEnabled={setEnabled} setValue={setValue} />
        <ToggleNumber label="paragraphSpacing" keyName="paragraphSpacing" enabled={preset.enabled.paragraphSpacing} value={preset.values.paragraphSpacing} setEnabled={setEnabled} setValue={setValue} />
        <InlineCheck label="align H/V" checked={!!(preset.enabled.textAlignHorizontal || preset.enabled.textAlignVertical)} onChange={(value) => { setEnabled("textAlignHorizontal", value); setEnabled("textAlignVertical", value); }} />
        <div className="row">
          <select value={preset.values.textAlignHorizontal} onChange={(event) => setValue("textAlignHorizontal", event.target.value as never)}>
            <option>LEFT</option><option>CENTER</option><option>RIGHT</option><option>JUSTIFIED</option>
          </select>
          <select value={preset.values.textAlignVertical} onChange={(event) => setValue("textAlignVertical", event.target.value as never)}>
            <option>TOP</option><option>CENTER</option><option>BOTTOM</option>
          </select>
        </div>
        <InlineCheck label="textFill" checked={!!preset.enabled.textFill} onChange={(value) => setEnabled("textFill", value)} />
        <input type="color" value={preset.values.textFill} onChange={(event) => setValue("textFill", event.target.value)} />
      </fieldset>
      <fieldset>
        <legend>Layout / Image</legend>
        <ToggleNumber label="cornerRadius" keyName="cornerRadius" enabled={preset.enabled.cornerRadius} value={preset.values.cornerRadius} setEnabled={setEnabled} setValue={setValue} />
        <InlineCheck label="imageScale" checked={!!preset.enabled.imageScaleMode} onChange={(value) => setEnabled("imageScaleMode", value)} />
        <select value={preset.values.imageScaleMode} onChange={(event) => setValue("imageScaleMode", event.target.value as never)}>
          <option>FILL</option><option>FIT</option><option>CROP</option><option>TILE</option>
        </select>
        <Check label="clipsContent" checked={preset.enabled.clipsContent} onChange={(value) => setEnabled("clipsContent", value)} />
        <ToggleNumber label="padding" keyName="padding" enabled={preset.enabled.padding} value={preset.values.padding} setEnabled={setEnabled} setValue={setValue} />
        <ToggleNumber label="itemSpacing" keyName="itemSpacing" enabled={preset.enabled.itemSpacing} value={preset.values.itemSpacing} setEnabled={setEnabled} setValue={setValue} />
      </fieldset>
    </div>
  );
}

function UeEditor({ options, setOptions }: { options: UeLayoutOptions; setOptions: (options: UeLayoutOptions) => void }) {
  return (
    <div className="controls">
      <label>
        生成模式
        <select value={options.mode} onChange={(event) => setOptions({ ...options, mode: event.target.value as UeLayoutOptions["mode"] })}>
          <option value="preserve">保持原坐标</option>
          <option value="grid">网格整理</option>
        </select>
      </label>
      <label>
        spacing
        <input type="number" value={options.spacing} onChange={(event) => setOptions({ ...options, spacing: Number(event.target.value) })} />
      </label>
      <label>
        maxGridItemSize
        <input type="number" value={options.maxGridItemSize} onChange={(event) => setOptions({ ...options, maxGridItemSize: Number(event.target.value) })} />
      </label>
      <Check label="保留原尺寸" checked={options.preserveSize} onChange={(value) => setOptions({ ...options, preserveSize: value })} />
      <Check label="包含 Hidden" checked={options.includeHidden} onChange={(value) => setOptions({ ...options, includeHidden: value })} />
      <Check label="包含 Locked" checked={options.includeLocked} onChange={(value) => setOptions({ ...options, includeLocked: value })} />
    </div>
  );
}

function AiEditor({ settings, update }: { settings: AiSettings; update: (patch: Partial<AiSettings>) => void }) {
  return (
    <div className="controls">
      <Check label="启用 AI" checked={settings.enabled} onChange={(value) => update({ enabled: value })} />
      <label>Base URL<input value={settings.baseUrl} onChange={(event) => update({ baseUrl: event.target.value })} /></label>
      <label>Model<input value={settings.model} onChange={(event) => update({ model: event.target.value })} /></label>
      <label>API Key<input type="password" value={settings.apiKey} onChange={(event) => update({ apiKey: event.target.value })} /></label>
      <label>Prompt Template<textarea value={settings.promptTemplate} onChange={(event) => update({ promptTemplate: event.target.value })} /></label>
    </div>
  );
}

function ToggleNumber<K extends keyof PropertyPreset["values"]>({
  label,
  keyName,
  enabled,
  value,
  setEnabled,
  setValue,
  step = 1,
  min,
  max
}: {
  label: string;
  keyName: K;
  enabled?: boolean;
  value: number;
  setEnabled: (key: string, value: boolean) => void;
  setValue: (key: K, value: PropertyPreset["values"][K]) => void;
  step?: number;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline">
      <Check label={label} checked={!!enabled} onChange={(checked) => setEnabled(String(keyName), checked)} />
      <input type="number" step={step} min={min} max={max} value={value} onChange={(event) => setValue(keyName, Number(event.target.value) as never)} />
    </div>
  );
}

function InlineCheck({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <Check label={label} checked={checked} onChange={onChange} />;
}

function Check({ label, checked, onChange }: { label: string; checked?: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="check">
      <input type="checkbox" checked={!!checked} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}

function post(message: UiToPluginMessage) {
  parent.postMessage({ pluginMessage: message }, "*");
}

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
