import { useState, useRef } from "react";
import { NavLink, Outlet } from "react-router";
import {
  Youtube,
  Github,
  Twitter,
  Instagram,
  Camera,
  Edit3,
  Check,
  X,
} from "lucide-react";

const DEFAULT_BANNER = "https://i.pinimg.com/736x/de/be/1a/debe1a941bfce1c624541b78f928fd0f.jpg";
const DEFAULT_AVATAR = "https://i.pinimg.com/236x/c9/d9/9c/c9d99cb54393c2f784d057f5b446e6cf.jpg";

interface SiteData {
  banner: string;
  avatar: string;
  username: string;
  handle: string;
  bio: {
    name: string;
    gender: string;
    religion: string;
    age: string;
    mbti: string;
    occupation: string;
    interests: string;
  };
  socials: {
    instagram: string;
    twitter: string;
    discord: string;
    youtube: string;
    spotify: string;
    pinterest: string;
    goodreads: string;
    github: string;
    letterboxd: string;
  };
}

const defaultData: SiteData = {
  banner: DEFAULT_BANNER,
  avatar: DEFAULT_AVATAR,
  username: "Anto ☆",
  handle: "@born.to.be.linda",
  bio: {
    name: "Anto",
    bio: "Female Christian 18yo ENFP Programmer Videogames, anime, music, art, books",

  },
  socials: {
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    discord: "https://discord.com",
    youtube: "https://youtube.com",
    spotify: "https://spotify.com",
    pinterest: "https://pinterest.com",
    goodreads: "https://goodreads.com",
    github: "https://github.com",
    letterboxd: "https://letterboxd.com",
  },
};

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

function GoodreadsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M11.43 23.995c-3.608-.208-6.274-2.077-6.448-5.226.695 0 1.367.013 2.038-.013.135-.006.334.208.41.369.977 2.058 2.Push 2.729 4.603 2.658 2.515-.075 4.153-1.613 4.27-4.133.078-1.621.013-3.25.013-4.859-.083.09-.135.134-.17.186-1.097 1.89-2.807 2.706-4.903 2.648-2.882-.08-4.987-1.613-5.858-4.374-.578-1.82-.545-3.675-.039-5.494.964-3.471 4.006-5.188 7.292-4.808 1.602.19 2.862.943 3.815 2.289.056.078.115.155.228.303V.918h2.108v16.405c0 .726.013 1.452-.014 2.178-.186 4.17-3.056 6.445-7.345 6.494zm3.226-14.763c-.018-.446-.037-.813-.086-1.175-.38-2.748-2.508-4.152-5.072-3.487-1.82.471-2.776 1.808-3.098 3.578-.232 1.27-.226 2.554.065 3.816.498 2.181 1.845 3.439 3.927 3.648 2.18.218 4.048-.862 4.72-2.966.383-1.178.354-2.385.544-3.414z"/>
    </svg>
  );
}

function LetterboxdIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M8.5 3C5.467 3 3 5.467 3 8.5S5.467 14 8.5 14 14 11.533 14 8.5 11.533 3 8.5 3zm7 0C12.467 3 10 5.467 10 8.5S12.467 14 15.5 14 21 11.533 21 8.5 18.533 3 15.5 3zm-7 12C5.467 15 3 17.467 3 20.5S5.467 26 8.5 26 14 23.533 14 20.5 11.533 15 8.5 15zm7 0c-3.033 0-5.5 2.467-5.5 5.5S12.467 26 15.5 26 21 23.533 21 20.5 18.533 15 15.5 15z"/>
    </svg>
  );
}

const pages = [
  { label: "✦ Anime List", path: "/anime" },
  { label: "✦ Movies", path: "/movies" },
  { label: "✦ Shows", path: "/shows" },
  { label: "✦ Wish List", path: "/wishlist" },
  { label: "✦ Journal", path: "/journal" },
];

export function Layout() {
  const [data, setData] = useState<SiteData>(defaultData);
  const [editingBio, setEditingBio] = useState(false);
  const [editingSocials, setEditingSocials] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [tempBio, setTempBio] = useState(data.bio);
  const [tempSocials, setTempSocials] = useState(data.socials);
  const [tempProfile, setTempProfile] = useState({ username: data.username, handle: data.handle });
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setData(prev => ({ ...prev, banner: url }));
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setData(prev => ({ ...prev, avatar: url }));
    }
  };

  const saveBio = () => {
    setData(prev => ({ ...prev, bio: tempBio }));
    setEditingBio(false);
  };

  const saveSocials = () => {
    setData(prev => ({ ...prev, socials: tempSocials }));
    setEditingSocials(false);
  };

  const saveProfile = () => {
    setData(prev => ({ ...prev, username: tempProfile.username, handle: tempProfile.handle }));
    setEditingProfile(false);
  };

  const socialIcons = [
    { key: "pinterest" as const, Icon: PinterestIcon, label: "Pinterest", color: "#E60023" },
    { key: "twitter" as const, Icon: () => <Twitter className="w-5 h-5" />, label: "X / Twitter", color: "#000000" },
    { key: "discord" as const, Icon: DiscordIcon, label: "Discord", color: "#5865F2" },
    { key: "instagram" as const, Icon: () => <Instagram className="w-5 h-5" />, label: "Instagram", color: "#E1306C" },
    { key: "spotify" as const, Icon: SpotifyIcon, label: "Spotify", color: "#1DB954" },
    { key: "youtube" as const, Icon: () => <Youtube className="w-5 h-5" />, label: "YouTube", color: "#FF0000" },
    { key: "letterboxd" as const, Icon: LetterboxdIcon, label: "Letterboxd", color: "#00B020" },
    { key: "goodreads" as const, Icon: GoodreadsIcon, label: "Goodreads", color: "#553B08" },
    { key: "github" as const, Icon: () => <Github className="w-5 h-5" />, label: "GitHub", color: "#333333" },
  ];

  return (
    <div className="min-h-screen bg-white font-nunito">
      {/* Banner */}
      <div className="relative w-full h-[280px] overflow-hidden group">
        <img
          src={data.banner}
          alt="Banner"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.05) saturate(0.9)" }}
        />
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
        {/* Edit banner button */}
        <button
          onClick={() => bannerInputRef.current?.click()}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 rounded-full px-3 py-1.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          style={{ fontSize: "12px" }}
        >
          <Camera className="w-3.5 h-3.5" />
          Edit Banner
        </button>
        <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
      </div>

      {/* Main layout: sidebar + content */}
      <div className="flex max-w-6xl mx-auto px-4">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 relative pr-6">
          {/* Avatar overlapping banner */}
          <div className="relative -mt-20 mb-3 flex flex-col items-center">
            <div className="relative group">
              <img
                src={data.avatar}
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-white shadow-md object-cover"
              />
              <button
                onClick={() => avatarInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
            <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>

          {/* Username */}
          <div className="text-center mb-1">
            {editingProfile ? (
              <div className="space-y-2">
                <input
                  value={tempProfile.username}
                  onChange={e => setTempProfile(p => ({ ...p, username: e.target.value }))}
                  className="w-full text-center border border-pink-200 rounded-lg px-2 py-1 bg-pink-50 outline-none"
                  style={{ fontSize: "22px", color: "#f472b6" }}
                />
                <input
                  value={tempProfile.handle}
                  onChange={e => setTempProfile(p => ({ ...p, handle: e.target.value }))}
                  className="w-full text-center border border-pink-200 rounded-lg px-2 py-1 bg-pink-50 outline-none text-sm"
                  style={{ color: "#9ca3af" }}
                />
                <div className="flex gap-2 justify-center">
                  <button onClick={saveProfile} className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"><Check className="w-4 h-4" /></button>
                  <button onClick={() => { setEditingProfile(false); setTempProfile({ username: data.username, handle: data.handle }); }} className="p-1 rounded-full bg-red-100 text-red-400 hover:bg-red-200"><X className="w-4 h-4" /></button>
                </div>
              </div>
            ) : (
              <div className="cursor-pointer group/name" onClick={() => { setEditingProfile(true); setTempProfile({ username: data.username, handle: data.handle }); }}>
                <div className="font-playfair italic flex items-center justify-center gap-1 group-hover/name:opacity-80 transition-opacity" style={{ fontSize: "28px", color: "#f472b6" }}>
                  {data.username}
                  <Edit3 className="w-3.5 h-3.5 opacity-0 group-hover/name:opacity-60 transition-opacity" />
                </div>
                <div className="text-sm mt-0.5" style={{ color: "#9ca3af" }}>{data.handle}</div>
              </div>
            )}
          </div>

          {/* Bio */}
          <div className="mt-4 text-center">
            {editingBio ? (
              <div className="space-y-1.5 text-left">
                {(Object.keys(tempBio) as (keyof typeof tempBio)[]).map(key => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className="text-xs text-pink-300 capitalize w-20 shrink-0">{key}:</span>
                    <input
                      value={tempBio[key]}
                      onChange={e => setTempBio(p => ({ ...p, [key]: e.target.value }))}
                      className="flex-1 border border-pink-200 rounded px-2 py-0.5 text-xs bg-pink-50 outline-none"
                      style={{ color: "#6b7280" }}
                    />
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <button onClick={saveBio} className="flex-1 py-1 rounded-lg bg-green-100 text-green-600 text-xs flex items-center justify-center gap-1"><Check className="w-3 h-3" />Save</button>
                  <button onClick={() => { setEditingBio(false); setTempBio(data.bio); }} className="flex-1 py-1 rounded-lg bg-red-50 text-red-400 text-xs flex items-center justify-center gap-1"><X className="w-3 h-3" />Cancel</button>
                </div>
              </div>
            ) : (
              <div
                className="cursor-pointer group/bio relative"
                onClick={() => { setEditingBio(true); setTempBio(data.bio); }}
              >
                <button className="absolute -top-1 -right-1 p-1 rounded-full bg-pink-50 text-pink-300 opacity-0 group-hover/bio:opacity-100 transition-opacity">
                  <Edit3 className="w-3 h-3" />
                </button>
                <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
                  {data.bio.name} | {data.bio.gender} | {data.bio.religion} |{" "}
                  {data.bio.age} | {data.bio.mbti} | {data.bio.occupation}
                </p>
                <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>
                  {data.bio.interests}
                </p>
              </div>
            )}
          </div>

          {/* Socials */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-playfair italic text-lg" style={{ color: "#9ca3af" }}>socials</h3>
              <button
                onClick={() => { setEditingSocials(true); setTempSocials(data.socials); }}
                className="p-1 rounded-full bg-pink-50 text-pink-300 hover:bg-pink-100 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            </div>

            {editingSocials ? (
              <div className="space-y-1.5">
                {socialIcons.map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className="text-xs text-pink-300 w-20 shrink-0">{label}:</span>
                    <input
                      value={tempSocials[key]}
                      onChange={e => setTempSocials(p => ({ ...p, [key]: e.target.value }))}
                      className="flex-1 border border-pink-200 rounded px-2 py-0.5 text-xs bg-pink-50 outline-none"
                      style={{ color: "#6b7280" }}
                      placeholder="https://..."
                    />
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <button onClick={saveSocials} className="flex-1 py-1 rounded-lg bg-green-100 text-green-600 text-xs flex items-center justify-center gap-1"><Check className="w-3 h-3" />Save</button>
                  <button onClick={() => { setEditingSocials(false); setTempSocials(data.socials); }} className="flex-1 py-1 rounded-lg bg-red-50 text-red-400 text-xs flex items-center justify-center gap-1"><X className="w-3 h-3" />Cancel</button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {socialIcons.map(({ key, Icon, label, color }) => (
                  <a
                    key={key}
                    href={data.socials[key] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-pink-50 transition-colors hover:scale-110 transform duration-200"
                    style={{ color: "#9ca3af" }}
                    onMouseEnter={e => (e.currentTarget.style.color = color)}
                    onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Pages Navigation */}
          <div className="mt-6">
            <div
              className="flex items-center justify-center gap-2 mb-3 px-3 py-2 rounded-xl"
              style={{ background: "linear-gradient(135deg, #fce7f3 0%, #f3e8ff 100%)" }}
            >
              <span className="text-xs" style={{ color: "#9ca3af" }}>✦ ✦</span>
              <h3 className="font-nunito font-semibold tracking-wide" style={{ fontSize: "13px", color: "#c084fc" }}>PAGES</h3>
              <span className="text-xs" style={{ color: "#9ca3af" }}>✦ ✦</span>
            </div>
            <div className="space-y-2">
              {pages.map(page => (
                <NavLink
                  key={page.path}
                  to={page.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-white shadow-sm"
                        : "text-gray-400 hover:text-pink-400"
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive
                      ? "linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 100%)"
                      : "linear-gradient(135deg, #fdf2f8 0%, #faf5ff 100%)",
                  })}
                >
                  🎀 {page.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pb-4 text-center" style={{ fontSize: "11px", color: "#d1d5db" }}>
            made with figma by Linda 
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 pt-8 pl-6 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
