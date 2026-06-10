import { useState } from "react";
import { Star, Plus, Trash2, Edit3, Check, X } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  rating: number;
  review: string;
  notes?: string;
}

const defaultMovies: Movie[] = [
  { id: "1", title: "Spirited Away", year: "2001", poster: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=200&h=300&fit=crop", rating: 5, review: "A timeless masterpiece. Miyazaki at his finest — the world-building is unparalleled. 🌊", notes: "Favorite Ghibli film" },
  { id: "2", title: "Portrait of a Lady on Fire", year: "2019", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=300&fit=crop", rating: 5, review: "Visually breathtaking and emotionally devastating. Pure art. 🔥", notes: "Watched 3 times" },
  { id: "3", title: "Call Me By Your Name", year: "2017", poster: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=200&h=300&fit=crop", rating: 4, review: "Lush cinematography and beautiful performances. Summer in Italy at its peak. 🍑" },
  { id: "4", title: "The Grand Budapest Hotel", year: "2014", poster: "https://images.unsplash.com/photo-1525923838299-2312b60f6d69?w=200&h=300&fit=crop", rating: 5, review: "Wes Anderson's magnum opus. Every frame is a painting. 🎨", notes: "Perfect aesthetic" },
  { id: "5", title: "Amélie", year: "2001", poster: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=200&h=300&fit=crop", rating: 5, review: "Whimsical, warm and wonderfully strange. My comfort movie forever. 🎠" },
];

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

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>(defaultMovies);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempEdit, setTempEdit] = useState<Partial<Movie>>({});

  const startEdit = (item: Movie) => { setEditingId(item.id); setTempEdit({ ...item }); };
  const saveEdit = () => {
    setMovies(prev => prev.map(m => m.id === editingId ? { ...m, ...tempEdit } as Movie : m));
    setEditingId(null);
  };

  const addMovie = () => {
    const n: Movie = { id: Date.now().toString(), title: "New Movie", year: "2024", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=300&fit=crop", rating: 3, review: "" };
    setMovies(prev => [n, ...prev]);
    startEdit(n);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold tracking-widest" style={{ color: "#9ca3af", fontSize: "18px" }}>MOVIES</h2>
        <button onClick={addMovie} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 100%)" }}>
          <Plus className="w-4 h-4" /> Add Movie
        </button>
      </div>

      <div className="space-y-4">
        {movies.map(item => (
          <div key={item.id} className="flex gap-4 rounded-2xl border p-4 hover:shadow-sm transition-shadow" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <img src={item.poster} alt={item.title} className="w-16 h-24 object-cover rounded-xl shrink-0" />
            <div className="flex-1 min-w-0">
              {editingId === item.id ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input value={tempEdit.title ?? ""} onChange={e => setTempEdit(p => ({ ...p, title: e.target.value }))} className="flex-1 border border-pink-200 rounded px-2 py-1 text-sm bg-pink-50 outline-none" style={{ color: "#6b7280" }} placeholder="Title" />
                    <input value={tempEdit.year ?? ""} onChange={e => setTempEdit(p => ({ ...p, year: e.target.value }))} className="w-20 border border-pink-200 rounded px-2 py-1 text-sm bg-pink-50 outline-none" style={{ color: "#6b7280" }} placeholder="Year" />
                  </div>
                  <StarRating value={tempEdit.rating ?? 0} onChange={v => setTempEdit(p => ({ ...p, rating: v }))} />
                  <textarea value={tempEdit.review ?? ""} onChange={e => setTempEdit(p => ({ ...p, review: e.target.value }))} rows={3} className="w-full border border-pink-200 rounded px-2 py-1 text-sm bg-pink-50 outline-none resize-none" style={{ color: "#6b7280" }} placeholder="Review..." />
                  <input value={tempEdit.notes ?? ""} onChange={e => setTempEdit(p => ({ ...p, notes: e.target.value }))} className="w-full border border-pink-200 rounded px-2 py-1 text-xs bg-pink-50 outline-none" style={{ color: "#9ca3af" }} placeholder="Notes..." />
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="flex items-center gap-1 px-3 py-1 rounded bg-green-100 text-green-600 text-xs"><Check className="w-3 h-3" />Save</button>
                    <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-3 py-1 rounded bg-red-50 text-red-400 text-xs"><X className="w-3 h-3" />Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold" style={{ color: "#6b7280" }}>{item.title}</p>
                      <p className="text-xs mb-1.5" style={{ color: "#9ca3af" }}>{item.year}</p>
                      <StarRating value={item.rating} />
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => startEdit(item)} className="p-1 rounded-full hover:bg-pink-50 text-gray-300 hover:text-pink-300 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setMovies(prev => prev.filter(m => m.id !== item.id))} className="p-1 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-300 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  {item.review && <p className="text-sm mt-2 leading-relaxed" style={{ color: "#6b7280" }}>{item.review}</p>}
                  {item.notes && <p className="text-xs mt-1 italic" style={{ color: "#c4b5fd" }}>{item.notes}</p>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
