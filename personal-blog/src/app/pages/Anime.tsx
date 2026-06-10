import { useState } from "react";
import { Star, Plus, Trash2, Edit3, Check, X } from "lucide-react";

type Status = "Watching" | "Completed" | "Plan to Watch" | "Dropped";

interface AnimeItem {
  id: string;
  title: string;
  cover: string;
  rating: number;
  status: Status;
  episodes?: string;
  notes?: string;
}

const defaultAnime: AnimeItem[] = [
  { id: "1", title: "Fruits Basket", cover: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=280&fit=crop", rating: 5, status: "Completed", episodes: "63/63", notes: "Absolutely beautiful story 🌸" },
  { id: "2", title: "Your Lie in April", cover: "https://images.unsplash.com/photo-1549213783-8284d0336c4f?w=200&h=280&fit=crop", rating: 5, status: "Completed", episodes: "22/22", notes: "Made me cry so much 🎹" },
  { id: "3", title: "Violet Evergarden", cover: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=280&fit=crop", rating: 5, status: "Completed", episodes: "13/13", notes: "Stunning animation ✉️" },
  { id: "4", title: "Komi Can't Communicate", cover: "https://images.unsplash.com/photo-1586861203927-800a5acdce4d?w=200&h=280&fit=crop", rating: 4, status: "Watching", episodes: "12/24", notes: "So sweet and wholesome 💕" },
  { id: "5", title: "The Ancient Magus Bride", cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=280&fit=crop", rating: 4, status: "Plan to Watch", notes: "On my watchlist!" },
  { id: "6", title: "Nana", cover: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=200&h=280&fit=crop", rating: 5, status: "Completed", episodes: "47/47", notes: "Forever in my heart 🎸" },
];

const statusColors: Record<Status, string> = {
  Watching: "#86efac",
  Completed: "#93c5fd",
  "Plan to Watch": "#fcd34d",
  Dropped: "#fca5a5",
};

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} onClick={() => onChange?.(n)} className={onChange ? "cursor-pointer" : "cursor-default"}>
          <Star className="w-3.5 h-3.5" fill={n <= value ? "#f9a8d4" : "none"} style={{ color: n <= value ? "#f9a8d4" : "#e5e7eb" }} />
        </button>
      ))}
    </div>
  );
}

export default function Anime() {
  const [anime, setAnime] = useState<AnimeItem[]>(defaultAnime);
  const [filter, setFilter] = useState<Status | "All">("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempEdit, setTempEdit] = useState<Partial<AnimeItem>>({});

  const filtered = filter === "All" ? anime : anime.filter(a => a.status === filter);

  const startEdit = (item: AnimeItem) => {
    setEditingId(item.id);
    setTempEdit({ ...item });
  };

  const saveEdit = () => {
    setAnime(prev => prev.map(a => a.id === editingId ? { ...a, ...tempEdit } as AnimeItem : a));
    setEditingId(null);
  };

  const addAnime = () => {
    const newItem: AnimeItem = {
      id: Date.now().toString(),
      title: "New Anime",
      cover: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=280&fit=crop",
      rating: 3,
      status: "Plan to Watch",
    };
    setAnime(prev => [newItem, ...prev]);
    startEdit(newItem);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold tracking-widest" style={{ color: "#9ca3af", fontSize: "18px" }}>ANIME LIST</h2>
        <button
          onClick={addAnime}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 100%)" }}
        >
          <Plus className="w-4 h-4" /> Add Anime
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["All", "Watching", "Completed", "Plan to Watch", "Dropped"] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              background: filter === s ? "#f9a8d4" : "#fdf2f8",
              color: filter === s ? "#fff" : "#9ca3af",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="rounded-2xl overflow-hidden border transition-shadow hover:shadow-md" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <div className="relative group">
              <img src={item.cover} alt={item.title} className="w-full h-44 object-cover" />
              <div className="absolute top-2 right-2 flex gap-1">
                <button onClick={() => startEdit(item)} className="p-1 rounded-full bg-white/90 hover:bg-white text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Edit3 className="w-3 h-3" />
                </button>
                <button onClick={() => setAnime(prev => prev.filter(a => a.id !== item.id))} className="p-1 rounded-full bg-white/90 hover:bg-white text-red-300 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white shadow-sm" style={{ background: statusColors[item.status] + "dd", fontSize: "10px" }}>
                  {item.status}
                </span>
              </div>
            </div>
            <div className="p-3">
              {editingId === item.id ? (
                <div className="space-y-2">
                  <input value={tempEdit.title ?? ""} onChange={e => setTempEdit(p => ({ ...p, title: e.target.value }))} className="w-full border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none" style={{ color: "#6b7280" }} />
                  <select value={tempEdit.status ?? ""} onChange={e => setTempEdit(p => ({ ...p, status: e.target.value as Status }))} className="w-full border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none" style={{ color: "#6b7280" }}>
                    {(["Watching", "Completed", "Plan to Watch", "Dropped"] as Status[]).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input value={tempEdit.episodes ?? ""} onChange={e => setTempEdit(p => ({ ...p, episodes: e.target.value }))} className="w-full border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none" placeholder="Episodes (e.g. 12/24)" style={{ color: "#6b7280" }} />
                  <textarea value={tempEdit.notes ?? ""} onChange={e => setTempEdit(p => ({ ...p, notes: e.target.value }))} rows={2} className="w-full border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none resize-none" placeholder="Notes..." style={{ color: "#6b7280" }} />
                  <StarRating value={tempEdit.rating ?? 0} onChange={v => setTempEdit(p => ({ ...p, rating: v }))} />
                  <div className="flex gap-1">
                    <button onClick={saveEdit} className="flex-1 py-1 rounded bg-green-100 text-green-600 text-xs flex items-center justify-center gap-1"><Check className="w-3 h-3" />Save</button>
                    <button onClick={() => setEditingId(null)} className="flex-1 py-1 rounded bg-red-50 text-red-400 text-xs flex items-center justify-center gap-1"><X className="w-3 h-3" />Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold mb-1 truncate" style={{ color: "#6b7280" }}>{item.title}</p>
                  <StarRating value={item.rating} />
                  {item.episodes && <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>📺 {item.episodes}</p>}
                  {item.notes && <p className="text-xs mt-1 italic truncate" style={{ color: "#c4b5fd" }}>{item.notes}</p>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
