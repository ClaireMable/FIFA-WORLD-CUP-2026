import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Send, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Masukkan email Anda.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Format email tidak valid.');
      return;
    }
    
    setIsSubscribed(true);
    setEmail('');
    setError('');
  };

  const socialLinks = [
    {
      name: 'Telegram',
      href: 'https://t.me/Kapsul4Dku_Bot',
      bgGradient: 'from-sky-400 to-sky-600',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.18l-1.91 9c-.14.65-.53.81-1.08.5l-2.91-2.14-1.4 1.35c-.15.15-.28.28-.58.28l.2-2.94 5.36-4.84c.23-.21-.05-.32-.36-.12L10.23 13.2 7.39 12.3c-.62-.19-.63-.62.13-.92l11.09-4.28c.51-.19.96.11.81 1.08z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: 'https://x.com/Kapsul4D_Trendz',
      bgGradient: 'from-sky-400 to-sky-600',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/pusatkapsulsga/',
      bgGradient: 'from-pink-600 to-purple-600',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      href: 'http://wa.me/6282113530838', // placeholder WhatsApp
      bgGradient: 'from-emerald-500 to-green-600',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.602-1.01-5.05-2.852-6.894S14.008 1.99 11.4 1.99c-5.444 0-9.87 4.373-9.874 9.746-.002 1.771.474 3.5 1.378 5.01l-.973 3.548 3.65-.951zm11.587-5.698c-.265-.132-1.566-.772-1.808-.859-.242-.088-.419-.132-.595.132-.176.264-.683.859-.837 1.035-.154.176-.308.198-.573.066-.265-.132-1.119-.412-2.132-1.315-.788-.702-1.32-1.569-1.474-1.833-.154-.264-.016-.407.117-.539.12-.12.265-.308.397-.462.132-.154.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.132-.596-1.432-.816-1.961-.214-.516-.45-.445-.616-.453l-.528-.01c-.183 0-.48.069-.73.342-.25.273-.956.934-.956 2.278s.979 2.642 1.115 2.818c.137.176 1.928 2.944 4.672 4.128.653.282 1.163.451 1.562.578.656.208 1.253.179 1.725.108.526-.079 1.566-.639 1.786-1.255.22-.616.22-1.145.154-1.255-.066-.11-.242-.198-.507-.33z"/>
        </svg>
      )
    }
  ];

  const menuColumns = [
    {
      title: 'MENU',
      links: [
        { label: 'Beranda', href: '#beranda' },
        { label: 'Pertandingan', href: '#grup' }, // Scrolls to matches
        { label: 'Grup', href: '#grup' },
        { label: 'Klasemen', href: '#klasemen' },
        { label: 'Statistik', href: '#statistik' },
      ]
    },
    {
      title: 'TURNAMEN',
      links: [
        { label: 'Jadwal', href: '#' },
        { label: 'Stadion', href: '#' },
        { label: 'Tim Peserta', href: '#' },
        { label: 'Sejarah', href: '#' },
        { label: 'Statistik', href: '#' },
      ]
    },
    {
      title: 'BANTUAN',
      links: [
        { label: 'Statistik Kami', href: '#' },
        { label: 'Kontak', href: '#' },
        { label: 'Kebijakan Privasi', href: '#' },
        { label: 'Syarat & Ketentuan', href: '#' },
        { label: 'FAQ', href: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-[#252626] text-gray-400 border-t border-neutral-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Column 1: Brand Logo & Description */}
          <div className="lg:col-span-5 text-left">
            <a 
              href="https://shortq.net/login-kapsul4d"
              className="flex items-center gap-2 mb-4 cursor-pointer group w-max"
            >
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-brand/40 shadow-[0_0_8px_rgba(173,255,47,0.2)] flex-shrink-0 bg-black group-hover:scale-105 group-hover:border-brand transition-all">
                <img 
                  src="https://ik.imagekit.io/srri8ez3b/kapsul4dlogo?tr=cm-extract,x-144,y-390,w-800,h-800" 
                  alt="Kapsul Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative h-6.5 flex-shrink-0 overflow-hidden">
                <img 
                  src="https://ik.imagekit.io/srri8ez3b/tekskapsul4d?tr=cm-extract,x-240,y-402,w-1080,h-197" 
                  alt="KAPSUL4D" 
                  className="h-full w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </a>
            
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm mb-6">
              Sumber informasi seputar Piala Dunia 2026 USA, Canada, Mexico. Dapatkan update terbaru, jadwal pertandingan, klasemen, dan informasi menarik lainnya.
            </p>

            {/* Social Icons with 3D Stacked Hover Effect */}
            <div className="relative mt-2">
              {/* SVG Squircle clipPath definition */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
                    <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"></path>
                  </clipPath>
                </defs>
              </svg>

              <div className="relative inline-block">
                {/* Backdrop Glassmorphic container */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl"></div>

                <div className="relative flex items-center gap-x-3.5 p-2.5">
                  {socialLinks.map((social, idx) => (
                    <div key={idx} className="relative group/social">
                      {/* Deepest Stack layer */}
                      <div 
                        style={{ clipPath: 'url(#squircleClip)' }}
                        className="absolute inset-0 bg-neutral-900 border border-neutral-700/20 opacity-0 scale-75 translate-y-0 group-hover/social:opacity-25 group-hover/social:scale-95 group-hover/social:-translate-y-1 transition-all duration-300 ease-out"
                      />
                      {/* Middle Stack layer */}
                      <div 
                        style={{ clipPath: 'url(#squircleClip)' }}
                        className="absolute inset-0 bg-neutral-900 border border-neutral-700/30 opacity-0 scale-85 translate-y-0 group-hover/social:opacity-50 group-hover/social:scale-100 group-hover/social:-translate-y-2.5 transition-all duration-300 ease-out"
                      />
                      {/* Upper Stack layer */}
                      <div 
                        style={{ clipPath: 'url(#squircleClip)' }}
                        className={`absolute inset-0 bg-gradient-to-br ${social.bgGradient} opacity-0 scale-95 translate-y-0 group-hover/social:opacity-75 group-hover/social:scale-105 group-hover/social:-translate-y-4 transition-all duration-300 ease-out`}
                      />

                      {/* Main Button */}
                      <a
                        href={social.href}
                        aria-label={social.name}
                        style={{ clipPath: 'url(#squircleClip)' }}
                        className={`relative w-12 h-12 bg-neutral-900/95 border border-neutral-800 rounded-xl flex items-center justify-center shadow-lg cursor-pointer transform transition-all duration-300 ease-out group-hover/social:scale-110 group-hover/social:-translate-y-5.5 group-hover/social:shadow-2xl group-hover/social:bg-gradient-to-br group-hover/social:${social.bgGradient} group-hover/social:border-white/20`}
                      >
                        {/* Icon - golden-yellow when unhovered, white when hovered */}
                        <div className="transform transition-all duration-300 group-hover/social:scale-110 group-hover/social:text-white text-brand animate-none">
                          {React.cloneElement(social.icon, { 
                            className: "h-5 w-5 fill-current transition-colors" 
                          })}
                        </div>
                      </a>

                      {/* Tooltip Stacked effect */}
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/social:opacity-100 transition-all duration-300 pointer-events-none flex flex-col items-center justify-end h-8">
                        <div className="absolute bg-neutral-900/30 border border-neutral-800/20 text-[9px] px-2 py-0.5 rounded-md text-transparent scale-90 translate-y-2 group-hover/social:translate-y-1 opacity-0 group-hover/social:opacity-40 transition-all duration-300">
                          {social.name}
                        </div>
                        <div className="absolute bg-neutral-900/60 border border-neutral-800/40 text-[9px] px-2 py-0.5 rounded-md text-transparent scale-95 translate-y-1 group-hover/social:translate-y-0.5 opacity-0 group-hover/social:opacity-70 transition-all duration-300">
                          {social.name}
                        </div>
                        <div className="relative bg-neutral-950 border border-brand/30 text-brand text-[9px] font-bold font-mono tracking-wider px-2 py-0.5 rounded shadow-xl scale-100 translate-y-0 opacity-0 group-hover/social:opacity-100 transition-all duration-300">
                          {social.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Columns 2-4: Menu links */}
          <div className="grid grid-cols-3 gap-4 lg:col-span-7 text-left">
            {menuColumns.map((col, idx) => (
              <div key={idx}>
                <h4 className="font-display font-bold text-xs tracking-wider text-white mb-4 uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-xs">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-brand transition-colors inline-block font-medium"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <span>
            © 2026 <a href="https://shortq.net/login-kapsul4d" className="hover:text-brand transition-colors font-bold underline decoration-brand/30">KAPSUL4D</a>. All Rights Reserved.
          </span>
          <span className="flex items-center gap-1">
            Made with <span className="text-red-500">❤️</span> for Football Fans
          </span>
        </div>

      </div>
    </footer>
  );
}
