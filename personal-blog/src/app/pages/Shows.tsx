import { useState } from "react";
import { Star, Plus, Trash2, Edit3, Check, X } from "lucide-react";

type ShowStatus = "Watching" | "Completed" | "Plan to Watch" | "Paused";

interface Show {
  id: string;
  title: string;
  seasons: string;
  poster: string;
  rating: number;
  status: ShowStatus;
  review: string;
}

const defaultShows: Show[] = [
  { id: "1", title: "Bridgerton", seasons: "3 Seasons", poster: "https://images.unsplash.com/photo-1609188076864-c35269136f14?w=200&h=280&fit=crop", rating: 4, status: "Completed", review: "Romantic, dramatic and absolutely delightful. A guilty pleasure. 👑" },
  { id: "2", title: "Stranger Things", seasons: "4 Seasons", poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=280&fit=crop", rating: 5, status: "Completed", review: "Nostalgia + horror + heart. One of the best shows ever made. 🔦" },
  { id: "3", title: "Wednesday", seasons: "1 Season", poster: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=200&h=280&fit=crop", rating: 4, status: "Completed", review: "Gothic, witty and so stylish. Jenna Ortega is iconic. 🖤" },
  { id: "4", title: "Emily in Paris", seasons: "4 Seasons", poster: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=200&h=280&fit=crop", rating: 3, status: "Watching", review: "Cheesy but fun comfort watching. The fashion is everything. 🥐" },
];

const statusColors: Record<ShowStatus, string> = {
  Watching: "#86efac",
  Completed: "#93c5fd",
  "Plan to Watch": "#fcd34d",
  Paused: "#d1d5db",
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

export default function Shows() {
  const [shows, setShows] = useState<Show[]>(defaultShows);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempEdit, setTempEdit] = useState<Partial<Show>>({});

  const startEdit = (item: Show) => { setEditingId(item.id); setTempEdit({ ...item }); };
  const saveEdit = () => {
    setShows(prev => prev.map(s => s.id === editingId ? { ...s, ...tempEdit } as Show : s));
    setEditingId(null);
  };

  const addShow = () => {
    const n: Show = { id: Date.now().toString(), title: "New Show", seasons: "1 Season", poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=280&fit=crop", rating: 3, status: "Plan to Watch", review: "" };
    setShows(prev => [n, ...prev]);
    startEdit(n);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold tracking-widest" style={{ color: "#9ca3af", fontSize: "18px" }}>SHOWS</h2>
        <button onClick={addShow} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 100%)" }}>
          <Plus className="w-4 h-4" /> Add Show
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {shows.map(item => (
          <div key={item.id} className="rounded-2xl border overflow-hidden hover:shadow-sm transition-shadow" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <div className="relative group">
              <img src={item.poster} alt={item.title} className="w-full h-36 object-cover" />
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(item)} className="p-1 rounded-full bg-white/90 hover:bg-white text-gray-400 shadow-sm"><Edit3 className="w-3 h-3" /></button>
                <button onClick={() => setShows(prev => prev.filter(s => s.id !== item.id))} className="p-1 rounded-full bg-white/90 hover:bg-white text-red-300 shadow-sm"><Trash2 className="w-3 h-3" /></button>
              </div>
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-white shadow-sm" style={{ background: statusColors[item.status] + "ee", fontSize: "10px" }}>
                {item.status}
              </span>
            </div>
            <div className="p-3">
              {editingId === item.id ? (
                <div className="space-y-2">
                  <input value={tempEdit.title ?? ""} onChange={e => setTempEdit(p => ({ ...p, title: e.target.value }))} className="w-full border border-pink-200 rounded px-2 py-1 text-sm bg-pink-50 outline-none" style={{ color: "#6b7280" }} />
                  <input value={tempEdit.seasons ?? ""} onChange={e => setTempEdit(p => ({ ...p, seasons: e.target.value }))} className="w-full border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none" style={{ color: "#6b7280" }} placeholder="Seasons" />
                  <select value={tempEdit.status ?? ""} onChange={e => setTempEdit(p => ({ ...p, status: e.target.value as ShowStatus }))} className="w-full border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none" style={{ color: "#6b7280" }}>
                    {(["Watching", "Completed", "Plan to Watch", "Paused"] as ShowStatus[]).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <StarRating value={tempEdit.rating ?? 0} onChange={v => setTempEdit(p => ({ ...p, rating: v }))} />
                  <textarea value={tempEdit.review ?? ""} onChange={e => setTempEdit(p => ({ ...p, review: e.target.value }))} rows={2} className="w-full border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none resize-none" style={{ color: "#6b7280" }} placeholder="Review..." />
                  <div className="flex gap-1">
                    <button onClick={saveEdit} className="flex-1 py-1 rounded bg-green-100 text-green-600 text-xs flex items-center justify-center gap-1"><Check className="w-3 h-3" />Save</button>
                    <button onClick={() => setEditingId(null)} className="flex-1 py-1 rounded bg-red-50 text-red-400 text-xs flex items-center justify-center gap-1"><X className="w-3 h-3" />Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-semibold text-sm" style={{ color: "#6b7280" }}>{item.title}</p>
                  <p className="text-xs mb-1.5" style={{ color: "#9ca3af" }}>{item.seasons}</p>
                  <StarRating value={item.rating} />
                  {item.review && <p className="text-xs mt-2 leading-relaxed" style={{ color: "#6b7280" }}>{item.review}</p>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
