import { useRef, useState } from "react";
import { Paperclip, ArrowUp, X } from "lucide-react";
import { mockAgents, mockFolders } from "@/mocks/data";
import { useApp } from "@/store/app";
import { SourcePickerModal } from "./SourcePickerModal";

export function ChatComposer({
  onSend,
  placeholder = "Entrez votre requête",
  small = false,
  initialValue = "",
}: {
  onSend?: (text: string, agent?: string) => void;
  placeholder?: string;
  small?: boolean;
  initialValue?: string;
}) {
  const [val, setVal] = useState(initialValue);
  const [agent, setAgent] = useState<string | undefined>();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [agentPickerOpen, setAgentPickerOpen] = useState(false);
  const [agentIdx, setAgentIdx] = useState(0);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { attachedSources, detach } = useApp();

  const filteredAgents = mockAgents.filter((a) => {
    const q = val.split("@").pop()?.toLowerCase() ?? "";
    return a.name.toLowerCase().includes(q);
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setVal(v);
    const last = v[v.length - 1];
    if (last === "@") setAgentPickerOpen(true);
    else if (!v.includes("@")) setAgentPickerOpen(false);
  };

  const pickAgent = (name: string) => {
    setAgent(name);
    setVal((v) => v.replace(/@\S*$/, "") + "");
    setAgentPickerOpen(false);
    textRef.current?.focus();
  };

  const submit = () => {
    if (!val.trim() && !agent) return;
    onSend?.(val.trim(), agent);
    setVal("");
    setAgent(undefined);
  };

  return (
    <div className="w-full max-w-[860px] mx-auto">
      {(attachedSources.length > 0 || agent) && (
        <div className="flex flex-wrap gap-2 mb-2 px-1">
          {agent && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-medium">
              @{agent}
              <button onClick={() => setAgent(undefined)}><X className="size-3" /></button>
            </span>
          )}
          {attachedSources.map((id) => {
            const f = mockFolders.find((x) => x.id === id);
            return (
              <span key={id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-medium">
                📁 {f?.name ?? id}
                <button onClick={() => detach(id)}><X className="size-3" /></button>
              </span>
            );
          })}
        </div>
      )}

      <div className="relative">
        <div className={`flex items-end gap-2 bg-[var(--surface)] border border-border rounded-2xl shadow-sm px-3 ${small ? "py-2" : "py-3"}`}>
          <button
            onClick={() => setPickerOpen((o) => !o)}
            aria-label="Joindre"
            className="relative p-2 rounded-md hover:bg-slate-50 text-foreground"
          >
            <Paperclip className="size-5" strokeWidth={1.5} />
            {attachedSources.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-[var(--success)] text-white text-[10px] flex items-center justify-center">
                {attachedSources.length}
              </span>
            )}
          </button>
          <textarea
            ref={textRef}
            value={val}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (agentPickerOpen) {
                if (e.key === "ArrowDown") { e.preventDefault(); setAgentIdx((i) => Math.min(filteredAgents.length - 1, i + 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setAgentIdx((i) => Math.max(0, i - 1)); }
                if (e.key === "Enter") { e.preventDefault(); pickAgent(filteredAgents[agentIdx]?.name ?? ""); }
                if (e.key === "Escape") setAgentPickerOpen(false);
              } else if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={1}
            placeholder={placeholder}
            className="flex-1 resize-none bg-transparent border-0 outline-none text-base placeholder:text-muted-foreground py-2"
          />
          <button
            onClick={submit}
            aria-label="Envoyer"
            className="size-9 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center hover:bg-[var(--accent)]/90"
          >
            <ArrowUp className="size-4" strokeWidth={2} />
          </button>
        </div>

        {agentPickerOpen && filteredAgents.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-[var(--surface)] border border-border rounded-xl shadow-lg z-30 overflow-hidden">
            {filteredAgents.map((a, i) => (
              <button
                key={a.id}
                onMouseEnter={() => setAgentIdx(i)}
                onClick={() => pickAgent(a.name)}
                className={`w-full text-left px-4 h-10 flex items-center text-sm ${i === agentIdx ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "hover:bg-slate-50"}`}
              >
                @{a.name}
              </button>
            ))}
          </div>
        )}

        {pickerOpen && <SourcePickerModal onClose={() => setPickerOpen(false)} />}
      </div>
    </div>
  );
}
