import { useState } from "react";
import { Plus, Trash2, Edit3, Check, X, ExternalLink } from "lucide-react";

type Priority = "High" | "Medium" | "Low";

interface WishItem {
  id: string;
  name: string;
  category: string;
  priority: Priority;
  price?: string;
  url?: string;
  notes?: string;
  emoji: string;
  purchased: boolean;
}

const defaultItems: WishItem[] = [
  { id: "1", name: "Wacom Tablet", category: "Art & Design", priority: "High", price: "$80", url: "https://wacom.com", notes: "For digital art practice 🎨", emoji: "🖊️", purchased: false },
  { id: "2", name: "Violet Evergarden Artbook", category: "Books", priority: "High", price: "$45", notes: "Limited edition", emoji: "📖", purchased: false },
  { id: "3", name: "Studio Ghibli Blu-ray Box Set", category: "Movies", priority: "Medium", price: "$120", notes: "All the films!", emoji: "🎬", purchased: false },
  { id: "4", name: "Mechanical Keyboard", category: "Tech", priority: "Medium", price: "$150", notes: "Pastel keycaps 🌸", emoji: "⌨️", purchased: false },
  { id: "5", name: "Fruits Basket Manga Complete", category: "Books", priority: "High", price: "$200", notes: "All 23 volumes", emoji: "🌸", purchased: true },
  { id: "6", name: "Polaroid Camera", category: "Photography", priority: "Low", price: "$90", notes: "For aesthetic photos", emoji: "📷", purchased: false },
];

const priorityColors: Record<Priority, string> = {
  High: "#fca5a5",
  Medium: "#fcd34d",
  Low: "#86efac",
};

export default function WishList() {
  const [items, setItems] = useState<WishItem[]>(defaultItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempEdit, setTempEdit] = useState<Partial<WishItem>>({});
  const [filterPurchased, setFilterPurchased] = useState<"all" | "pending" | "purchased">("all");

  const filtered = items.filter(i => {
    if (filterPurchased === "pending") return !i.purchased;
    if (filterPurchased === "purchased") return i.purchased;
    return true;
  });

  const startEdit = (item: WishItem) => { setEditingId(item.id); setTempEdit({ ...item }); };
  const saveEdit = () => {
    setItems(prev => prev.map(i => i.id === editingId ? { ...i, ...tempEdit } as WishItem : i));
    setEditingId(null);
  };

  const togglePurchased = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, purchased: !i.purchased } : i));

  const addItem = () => {
    const n: WishItem = { id: Date.now().toString(), name: "New Item", category: "Other", priority: "Medium", emoji: "✨", purchased: false };
    setItems(prev => [n, ...prev]);
    startEdit(n);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold tracking-widest" style={{ color: "#9ca3af", fontSize: "18px" }}>WISH LIST ✨</h2>
        <button onClick={addItem} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 100%)" }}>
          <Plus className="w-4 h-4" /> Add Wish
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(["all", "pending", "purchased"] as const).map(f => (
          <button key={f} onClick={() => setFilterPurchased(f)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize"
            style={{ background: filterPurchased === f ? "#f9a8d4" : "#fdf2f8", color: filterPurchased === f ? "#fff" : "#9ca3af" }}>
            {f === "all" ? "All" : f === "pending" ? "🎁 Pending" : "✅ Purchased"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(item => (
          <div key={item.id} className="flex items-center gap-4 rounded-2xl border p-4 transition-all hover:shadow-sm" style={{ borderColor: "rgba(0,0,0,0.06)", opacity: item.purchased ? 0.65 : 1 }}>
            <button onClick={() => togglePurchased(item.id)} className="w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
              style={{ borderColor: item.purchased ? "#86efac" : "#fce7f3", background: item.purchased ? "#f0fdf4" : "#fff" }}>
              {item.purchased && <Check className="w-4 h-4" style={{ color: "#86efac" }} />}
            </button>

            <div className="text-2xl">{item.emoji}</div>

            <div className="flex-1 min-w-0">
              {editingId === item.id ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input value={tempEdit.emoji ?? ""} onChange={e => setTempEdit(p => ({ ...p, emoji: e.target.value }))} className="w-12 border border-pink-200 rounded px-2 py-1 text-sm bg-pink-50 outline-none text-center" />
                    <input value={tempEdit.name ?? ""} onChange={e => setTempEdit(p => ({ ...p, name: e.target.value }))} className="flex-1 border border-pink-200 rounded px-2 py-1 text-sm bg-pink-50 outline-none" style={{ color: "#6b7280" }} placeholder="Item name" />
                  </div>
                  <div className="flex gap-2">
                    <input value={tempEdit.category ?? ""} onChange={e => setTempEdit(p => ({ ...p, category: e.target.value }))} className="flex-1 border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none" style={{ color: "#6b7280" }} placeholder="Category" />
                    <input value={tempEdit.price ?? ""} onChange={e => setTempEdit(p => ({ ...p, price: e.target.value }))} className="w-24 border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none" style={{ color: "#6b7280" }} placeholder="Price" />
                    <select value={tempEdit.priority ?? "Medium"} onChange={e => setTempEdit(p => ({ ...p, priority: e.target.value as Priority }))} className="border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none" style={{ color: "#6b7280" }}>
                      {(["High", "Medium", "Low"] as Priority[]).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <input value={tempEdit.url ?? ""} onChange={e => setTempEdit(p => ({ ...p, url: e.target.value }))} className="w-full border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none" style={{ color: "#6b7280" }} placeholder="Link (optional)" />
                  <input value={tempEdit.notes ?? ""} onChange={e => setTempEdit(p => ({ ...p, notes: e.target.value }))} className="w-full border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none" style={{ color: "#6b7280" }} placeholder="Notes..." />
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="flex items-center gap-1 px-3 py-1 rounded bg-green-100 text-green-600 text-xs"><Check className="w-3 h-3" />Save</button>
                    <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-3 py-1 rounded bg-red-50 text-red-400 text-xs"><X className="w-3 h-3" />Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm" style={{ color: "#6b7280", textDecoration: item.purchased ? "line-through" : "none" }}>{item.name}</p>
                      <span className="px-2 py-0.5 rounded-full text-white" style={{ background: priorityColors[item.priority] + "cc", fontSize: "10px" }}>{item.priority}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs" style={{ color: "#9ca3af" }}>{item.category}</span>
                      {item.price && <span className="text-xs font-medium" style={{ color: "#c4b5fd" }}>{item.price}</span>}
                    </div>
                    {item.notes && <p className="text-xs mt-1 italic" style={{ color: "#9ca3af" }}>{item.notes}</p>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full hover:bg-pink-50 text-gray-300 hover:text-pink-300 transition-colors"><ExternalLink className="w-3.5 h-3.5" /></a>}
                    <button onClick={() => startEdit(item)} className="p-1 rounded-full hover:bg-pink-50 text-gray-300 hover:text-pink-300 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))} className="p-1 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-300 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
