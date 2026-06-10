import { useState, useRef } from "react";
import { Heart, Edit3, Check, X, Plus, Trash2, Camera } from "lucide-react";
import passportdexImg from "../../imports/WhatsApp_Image_2026-06-09_at_20.45.57.jpeg";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  image?: string;
}

const defaultPosts: Post[] = [
  {
    id: "1",
    title: "ABOUT ME",
    content: `Hi! my name is Linda Antonella, i am 18 years old, my birthday is on January 26. I really enjoy videogames, series, programming, music, art, reading books and writing poetry and baking desserts! ;p i love creating new things! 🌸✨`,
    date: "February 14, 2026 at 4:05 PM",
    likes: 59,
  },
  {
    id: "2",
    title: "Passportdex",
    content: "Here's a look at my current Passportdex — tracking everything I've watched, played and explored!",
    date: "May 5, 2022 at 7:30 PM",
    likes: 25,
    image: "passportdex",
  },
];

function PostCard({ post, onUpdate, onDelete }: {
  post: Post;
  onUpdate: (id: string, data: Partial<Post>) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [tempTitle, setTempTitle] = useState(post.title);
  const [tempContent, setTempContent] = useState(post.content);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const save = () => {
    onUpdate(post.id, { title: tempTitle, content: tempContent });
    setEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpdate(post.id, { image: url });
    }
  };

  return (
    <div className="rounded-2xl border mb-6 overflow-hidden" style={{ borderColor: "rgba(0,0,0,0.07)", background: "#fff" }}>
      {/* Post header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "rgba(0,0,0,0.05)", background: "#fdf9fe" }}>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-xs font-semibold tracking-wider" style={{ background: "#f9a8d4", color: "#fff" }}>
            POSTED
          </span>
          <span className="text-xs" style={{ color: "#9ca3af" }}>{post.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setLiked(!liked); onUpdate(post.id, { likes: post.likes + (liked ? -1 : 1) }); }}
            className="flex items-center gap-1 transition-colors"
            style={{ color: liked ? "#f472b6" : "#d1d5db" }}
          >
            <Heart className="w-4 h-4" fill={liked ? "#f472b6" : "none"} />
            <span className="text-xs">{post.likes + (liked ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => { setEditing(true); setTempTitle(post.title); setTempContent(post.content); }}
            className="p-1 rounded-full hover:bg-pink-50 transition-colors"
            style={{ color: "#d1d5db" }}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="p-1 rounded-full hover:bg-red-50 transition-colors"
            style={{ color: "#fca5a5" }}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Post body */}
      <div className="px-6 py-5">
        {editing ? (
          <div className="space-y-3">
            <input
              value={tempTitle}
              onChange={e => setTempTitle(e.target.value)}
              className="w-full border-b border-pink-200 bg-transparent outline-none pb-1 font-semibold tracking-wider"
              style={{ color: "#a78bfa", fontSize: "15px" }}
            />
            <textarea
              value={tempContent}
              onChange={e => setTempContent(e.target.value)}
              rows={5}
              className="w-full border border-pink-100 rounded-xl p-3 bg-pink-50/30 outline-none resize-none text-sm"
              style={{ color: "#6b7280" }}
            />
            <div className="flex gap-2">
              <button onClick={save} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 text-green-600 text-sm"><Check className="w-3.5 h-3.5" />Save</button>
              <button onClick={() => setEditing(false)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-400 text-sm"><X className="w-3.5 h-3.5" />Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold tracking-wider mb-3" style={{ color: "#a78bfa", fontSize: "15px" }}>
              {post.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{post.content}</p>

            {/* Image area */}
            {post.image && (
              <div className="mt-4 rounded-xl overflow-hidden border group/img relative" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                {post.image === "passportdex" ? (
                  <img src={passportdexImg} alt="Passportdex" className="w-full object-cover rounded-xl" style={{ maxHeight: "360px" }} />
                ) : (
                  <img src={post.image} alt="Post image" className="w-full object-cover rounded-xl" style={{ maxHeight: "360px" }} />
                )}
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-500 rounded-full px-2.5 py-1 flex items-center gap-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity shadow-sm"
                  style={{ fontSize: "11px" }}
                >
                  <Camera className="w-3 h-3" />
                  Replace
                </button>
                <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(defaultPosts);

  const updatePost = (id: string, data: Partial<Post>) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const addPost = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: "NEW POST",
      content: "Write something here...",
      date: new Date().toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true }),
      likes: 0,
    };
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold tracking-widest" style={{ color: "#9ca3af", fontSize: "18px" }}>POSTS</h2>
        <button
          onClick={addPost}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 100%)" }}
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {posts.map(post => (
        <PostCard key={post.id} post={post} onUpdate={updatePost} onDelete={deletePost} />
      ))}

      {posts.length === 0 && (
        <div className="text-center py-16" style={{ color: "#d1d5db" }}>
          <p className="text-lg mb-2">No posts yet ✨</p>
          <p className="text-sm">Click "New Post" to create your first entry.</p>
        </div>
      )}
    </div>
  );
}
