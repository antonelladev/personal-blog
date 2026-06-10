import { useState } from "react";
import { Plus, Trash2, Edit3, Check, X, ChevronDown, ChevronUp } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: string;
  tags: string[];
  expanded: boolean;
}

const defaultEntries: JournalEntry[] = [
  {
    id: "1",
    title: "A perfect spring day 🌸",
    content: `Today was one of those days that feel like they belong in a Studio Ghibli film. I woke up early, made myself a warm matcha latte, and sat by the window watching the rain drizzle softly.\n\nI've been feeling really inspired lately — started sketching characters for a little story I've been dreaming up. The world feels so full of possibilities when I let myself just... daydream.\n\nListened to Yuki Kajiura's soundtrack on repeat. If music could be a color, hers would be the softest shade of lavender. 💜`,
    date: "March 15, 2024",
    mood: "🌸 Cozy",
    tags: ["daily", "creativity", "music"],
    expanded: false,
  },
  {
    id: "2",
    title: "Thoughts on Violet Evergarden finale 💌",
    content: `I finally finished Violet Evergarden tonight and I am NOT okay.\n\nI've been putting off watching the final episodes because some part of me knew that it would be devastating, and I was right. But in the most beautiful way possible.\n\nWhat strikes me most about this show is how it teaches us that healing isn't linear. Violet starts as someone who doesn't understand emotions, who defines herself by her usefulness as a weapon — and by the end she learns what it means to love and be loved.\n\nI think I needed this story more than I realized. 📝✨`,
    date: "February 28, 2024",
    mood: "💜 Emotional",
    tags: ["anime", "review", "feelings"],
    expanded: false,
  },
  {
    id: "3",
    title: "Learning to draw again 🎨",
    content: `Picked up my drawing tablet again after months of ignoring it. My hands felt rusty but there's something magical about the way a blank canvas welcomes you back no matter how long you've been away.\n\nStarted with some simple portrait studies. Eyes are still my favorite thing to draw — they hold so much story in them.\n\nGoal for this month: finish one complete illustration. No excuses, no perfectionism, just make the thing. 🌟`,
    date: "February 10, 2024",
    mood: "✨ Motivated",
    tags: ["art", "goals", "creative"],
    expanded: false,
  },
];

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(defaultEntries);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempEdit, setTempEdit] = useState<Partial<JournalEntry>>({});

  const toggleExpand = (id: string) => setEntries(prev => prev.map(e => e.id === id ? { ...e, expanded: !e.expanded } : e));

  const startEdit = (entry: JournalEntry) => { setEditingId(entry.id); setTempEdit({ ...entry }); };
  const saveEdit = () => {
    setEntries(prev => prev.map(e => e.id === editingId ? { ...e, ...tempEdit, tags: typeof tempEdit.tags === "string" ? (tempEdit.tags as unknown as string).split(",").map((t: string) => t.trim()) : (tempEdit.tags ?? e.tags) } as JournalEntry : e));
    setEditingId(null);
  };

  const addEntry = () => {
    const n: JournalEntry = {
      id: Date.now().toString(),
      title: "New Entry",
      content: "Write your thoughts here...",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      mood: "✨ Happy",
      tags: ["daily"],
      expanded: true,
    };
    setEntries(prev => [n, ...prev]);
    startEdit(n);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold tracking-widest" style={{ color: "#9ca3af", fontSize: "18px" }}>JOURNAL 🌙</h2>
        <button onClick={addEntry} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 100%)" }}>
          <Plus className="w-4 h-4" /> New Entry
        </button>
      </div>

      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className="rounded-2xl border overflow-hidden hover:shadow-sm transition-shadow" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            {/* Entry header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ background: "linear-gradient(135deg, #fdf2f8 0%, #faf5ff 100%)" }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#fce7f3", color: "#f472b6" }}>{entry.mood}</span>
                  {entry.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f3e8ff", color: "#a78bfa" }}>#{tag}</span>
                  ))}
                </div>
                <h3 className="font-semibold" style={{ color: "#6b7280", fontSize: "15px" }}>{entry.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{entry.date}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-3">
                <button onClick={() => startEdit(entry)} className="p-1.5 rounded-full hover:bg-white text-gray-300 hover:text-pink-300 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                <button onClick={() => setEntries(prev => prev.filter(e => e.id !== entry.id))} className="p-1.5 rounded-full hover:bg-white text-gray-300 hover:text-red-300 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => toggleExpand(entry.id)} className="p-1.5 rounded-full hover:bg-white text-gray-300 hover:text-purple-300 transition-colors">
                  {entry.expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Entry content */}
            {(entry.expanded || editingId === entry.id) && (
              <div className="px-5 py-4">
                {editingId === entry.id ? (
                  <div className="space-y-3">
                    <input value={tempEdit.title ?? ""} onChange={e => setTempEdit(p => ({ ...p, title: e.target.value }))} className="w-full border border-pink-200 rounded px-3 py-1.5 text-sm bg-pink-50 outline-none font-semibold" style={{ color: "#6b7280" }} placeholder="Entry title" />
                    <div className="flex gap-2">
                      <input value={tempEdit.mood ?? ""} onChange={e => setTempEdit(p => ({ ...p, mood: e.target.value }))} className="flex-1 border border-pink-200 rounded px-3 py-1.5 text-sm bg-pink-50 outline-none" style={{ color: "#6b7280" }} placeholder="Mood emoji + text" />
                      <input value={Array.isArray(tempEdit.tags) ? tempEdit.tags.join(", ") : tempEdit.tags ?? ""} onChange={e => setTempEdit(p => ({ ...p, tags: e.target.value.split(",").map(t => t.trim()) }))} className="flex-1 border border-pink-200 rounded px-3 py-1.5 text-sm bg-pink-50 outline-none" style={{ color: "#6b7280" }} placeholder="Tags (comma separated)" />
                    </div>
                    <textarea value={tempEdit.content ?? ""} onChange={e => setTempEdit(p => ({ ...p, content: e.target.value }))} rows={8} className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm bg-pink-50 outline-none resize-none leading-relaxed" style={{ color: "#6b7280" }} />
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-green-100 text-green-600 text-sm"><Check className="w-3.5 h-3.5" />Save</button>
                      <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-red-50 text-red-400 text-sm"><X className="w-3.5 h-3.5" />Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#6b7280" }}>{entry.content}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
