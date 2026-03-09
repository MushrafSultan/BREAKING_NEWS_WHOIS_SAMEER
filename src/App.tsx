/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  AlertCircle, 
  Newspaper, 
  Twitter, 
  Play, 
  Search, 
  FileText, 
  ShieldAlert,
  Cake,
  Heart
} from 'lucide-react';

// --- Components ---

const BreakingNewsBanner = () => (
  <div className="bg-red-600 text-white py-2 px-4 flex items-center justify-center gap-2 font-bold sticky top-0 z-50 shadow-lg">
    <AlertCircle size={20} className="animate-pulse" />
    <motion.span 
      animate={{ opacity: [1, 0.7, 1], scale: [1, 1.02, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="tracking-widest uppercase text-sm md:text-base"
    >
      🚨 BREAKING NEWS
    </motion.span>
  </div>
);

const NewsTicker = () => (
  <div className="bg-black text-yellow-400 py-1 overflow-hidden whitespace-nowrap border-y border-yellow-400/30">
    <div className="inline-block animate-marquee">
      <span className="mx-4">Friends confirm he survived another year of chaos</span>
      <span className="mx-4">•</span>
      <span className="mx-4">Experts still studying his friendship with Musharaf</span>
      <span className="mx-4">•</span>
      <span className="mx-4">Internet activity rising due to Sameer’s birthday</span>
      <span className="mx-4">•</span>
      <span className="mx-4">Global celebration levels reaching critical mass</span>
      <span className="mx-4">•</span>
    </div>
    <div className="inline-block animate-marquee">
      <span className="mx-4">Friends confirm he survived another year of chaos</span>
      <span className="mx-4">•</span>
      <span className="mx-4">Experts still studying his friendship with Musharaf</span>
      <span className="mx-4">•</span>
      <span className="mx-4">Internet activity rising due to Sameer’s birthday</span>
      <span className="mx-4">•</span>
      <span className="mx-4">Global celebration levels reaching critical mass</span>
      <span className="mx-4">•</span>
    </div>
  </div>
);

const NewsCard = ({ outlet, text, delay = 0 }: { outlet: string, text: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4"
  >
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
        <Newspaper size={16} className="text-gray-500" />
      </div>
      <span className="font-bold text-sm text-red-600 uppercase tracking-tight">{outlet}</span>
    </div>
    <p className="text-gray-800 italic text-sm leading-relaxed mb-3">"{text}"</p>
    <div className="w-full h-32 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
      [ PHOTO PLACEHOLDER ]
    </div>
  </motion.div>
);

const Tweet = ({ handle, content, delay = 0 }: { handle: string, content: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4"
  >
    <div className="flex items-center gap-2 mb-2">
      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
        <Twitter size={20} fill="currentColor" />
      </div>
      <div>
        <div className="font-bold text-sm leading-none">{handle}</div>
        <div className="text-gray-500 text-xs">@{handle.toLowerCase()}</div>
      </div>
    </div>
    <p className="text-gray-900 text-sm mb-1">{content}</p>
    <div className="text-blue-500 text-xs font-medium">#SameerDay #LegendaryFriend</div>
  </motion.div>
);

const BirthdaySequence = ({ onMemoriesClick }: { onMemoriesClick: () => void }) => {
  const [index, setIndex] = useState(0);
  const [showWish, setShowWish] = useState(false);
  const [isFinal, setIsFinal] = useState(false);

  const messages = [
    "Welcome to the year where ideas stop being ideas and start becoming reality.",
    "Welcome to the year where plans stop waiting and start happening.",
    "Welcome to the year of doing more, building more, and becoming more.",
    "Welcome to the year where dreams stop sitting in the mind and start moving in real life.",
    "Welcome to the year where everything you talked about finally begins."
  ];

  useEffect(() => {
    if (isFinal) return;

    const wishTimer = setTimeout(() => {
      setShowWish(true);
    }, 1500);

    const nextTimer = setTimeout(() => {
      if (index < messages.length - 1) {
        setShowWish(false);
        setIndex(prev => prev + 1);
      } else {
        setIsFinal(true);
      }
    }, 5000);

    return () => {
      clearTimeout(wishTimer);
      clearTimeout(nextTimer);
    };
  }, [index, isFinal, messages.length]);

  return (
    <div className="mt-20 text-center pb-20 min-h-[400px] flex flex-col items-center justify-center px-4 relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.p 
            className={`text-zinc-100 leading-tight mb-8 tracking-tight ${index === messages.length - 1 ? 'text-2xl md:text-4xl font-black' : 'text-xl md:text-2xl font-medium'}`}
          >
            {messages[index]}
          </motion.p>
          
          <AnimatePresence>
            {showWish && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={`font-black tracking-tighter text-red-500 ${index === messages.length - 1 ? 'text-4xl md:text-7xl mb-4' : 'text-3xl md:text-5xl mb-2'}`}>
                  Happy Birthday Sameer 🎂
                </h2>
                {index === messages.length - 1 && (
                  <>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-zinc-500 text-xl font-medium mb-12"
                    >
                      — Musharaf
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <button 
                        onClick={onMemoriesClick}
                        className="bg-red-600 text-white px-12 py-4 rounded-full font-black text-xl hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] active:scale-95 cursor-pointer"
                      >
                        Memories
                      </button>
                    </motion.div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {isFinal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                top: "100%", 
                left: `${Math.random() * 100}%`,
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                top: "-10%",
                left: `${(Math.random() - 0.5) * 20 + (i * 5)}%`,
                opacity: 0
              }}
              transition={{ 
                duration: Math.random() * 3 + 2, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute w-2 h-2 bg-red-500 rounded-full blur-[1px]"
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

const MemoriesGallery = () => {
  const images = Array.from({ length: 16 }, (_, i) => i + 1);
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="p-6 md:p-12 bg-white min-h-screen text-gray-900 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] mt-12"
      id="memories"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">Memories</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6,
                delay: (i % 4) * 0.1 + Math.floor(i / 4) * 0.1 
              }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group relative"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              
              {/* Replace with memory photo {img} */}
              <img 
                src={`https://picsum.photos/seed/sameer_memory_${img}/800/800`} 
                alt={`Memory ${img}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-red-600">
                  Memory #{img}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center pb-12">
          <p className="text-gray-400 font-medium italic">To be continued...</p>
        </div>
      </div>
    </motion.section>
  );
};

export default function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchComplete, setSearchComplete] = useState(false);
  const [showConfidential, setShowConfidential] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleMemoriesClick = () => {
    setShowMemories(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
    setTimeout(() => {
      document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isSearching && !searchComplete) {
          setIsSearching(true);
          setTimeout(() => {
            setIsSearching(false);
            setSearchComplete(true);
          }, 3000);
        }
      },
      { threshold: 0.5 }
    );

    if (searchRef.current) {
      observer.observe(searchRef.current);
    }

    return () => observer.disconnect();
  }, [isSearching, searchComplete]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-red-100">
      {/* Header */}
      <BreakingNewsBanner />
      
      {/* Main Headline Section */}
      <section className="p-4 md:p-8 max-w-2xl mx-auto bg-white border-b border-gray-200">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black leading-tight mb-4 tracking-tighter"
        >
          Local Legend Sameer Turns One Year Older Today
        </motion.h1>
        
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 uppercase font-bold tracking-widest">
          <span>By Global News Desk</span>
          <span>•</span>
          <span>March 9, 2026</span>
        </div>

        <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-inner mb-6">
          <img 
            src="src/public/sameerBanner.jpg" 
            alt="Sameer looking legendary" 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="bg-gray-50 p-2 text-[10px] text-gray-400 uppercase tracking-widest text-center border-t border-gray-100">
            Exclusive: First leaked image of the subject in his natural habitat
          </div>
        </div>
      </section>

      <NewsTicker />

      {/* News Outlets Section */}
      <section className="p-6 max-w-2xl mx-auto">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-200"></div>
          Global Coverage
          <div className="h-px flex-1 bg-gray-200"></div>
        </h2>
        
        <NewsCard 
          outlet="TechToday" 
          text="Experts confirm Sameer’s friendship software is still running without updates since years."
          delay={0.1}
        />
        <NewsCard 
          outlet="Global Times" 
          text="Authorities confirm one rare human called Sameer has maintained friendship despite constant nonsense."
          delay={0.2}
        />
        <NewsCard 
          outlet="Sports Daily" 
          text="Sameer wins lifetime award for tolerating Musharaf."
          delay={0.3}
        />
      </section>

      {/* Internet Reactions */}
      <section className="p-6 bg-gray-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Twitter className="text-blue-500" />
            Internet Reactions
          </h2>
          
          <Tweet 
            handle="NASA" 
            content="We detected unusual happiness signals today. Source confirmed: Sameer’s birthday."
            delay={0.1}
          />
          <Tweet 
            handle="Google" 
            content="Search spike detected: “How to wish Sameer?”"
            delay={0.2}
          />
          <Tweet 
            handle="FBI" 
            content="Subject Sameer officially classified as legendary friend."
            delay={0.3}
          />
        </div>
      </section>

      {/* Documentary Section */}
      <section className="p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-black mb-8 italic">Exclusive Documentary</h2>
        
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group cursor-pointer mb-6 shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Play fill="currentColor" size={32} className="ml-1" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-red-600"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <span className="text-white font-bold">The Mystery of the Best Friend</span>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">
          Scientists still researching how Sameer managed to stay best friend with Musharaf.
        </p>
        <p className="text-red-600 font-bold mt-2 uppercase text-sm tracking-widest">
          Case still unsolved.
        </p>
      </section>

      {/* Search Section */}
      <section ref={searchRef} className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white border-y border-gray-200">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div 
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="relative mb-8">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Search size={32} className="text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold animate-pulse">Searching internet for Sameer’s birthday…</h3>
            </motion.div>
          ) : searchComplete ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-xs"
            >
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-black text-red-600 mb-2">Error: No one celebrated Sameer’s birthday.</h3>
              <p className="text-gray-500 mb-8">System scan complete. Zero results found in 195 countries.</p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-lg font-medium mb-6 italic">But one idiot still remembers.</p>
                <button 
                  onClick={() => setShowConfidential(true)}
                  className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg active:scale-95"
                >
                  Reveal that idiot
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <div className="text-gray-300 italic">Scroll to continue investigation...</div>
          )}
        </AnimatePresence>
      </section>

      {/* Confidential File Section */}
      <AnimatePresence>
        {showConfidential && (
          <motion.section 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 md:p-12 bg-zinc-900 text-zinc-100"
          >
            <div className="max-w-xl mx-auto border-2 border-zinc-700 p-8 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 font-black text-xs uppercase tracking-widest rotate-45 translate-x-10 translate-y-4">
                TOP SECRET
              </div>
              
              <div className="flex items-center gap-3 mb-8 border-b border-zinc-700 pb-4">
                <ShieldAlert className="text-red-500" size={32} />
                <h2 className="text-3xl font-black tracking-tighter uppercase">CONFIDENTIAL FILE</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Subject:</h4>
                  <div className="text-xl font-mono">Name: Sameer</div>
                  <div className="text-xl font-mono text-red-500">Status: Dangerous best friend</div>
                </div>

                <div>
                  <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Crimes:</h4>
                  <ul className="space-y-2 font-mono text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span> Making stupid memories
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span> Laughing at wrong times
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span> Being irreplaceable
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-zinc-700">
                  <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Conclusion:</h4>
                  <div className="text-2xl font-black text-white italic underline decoration-red-600 underline-offset-4">
                    Verdict: Must be protected at all costs.
                  </div>
                </div>
              </div>
            </div>

            {/* Final Closing Message Sequence */}
            <BirthdaySequence onMemoriesClick={handleMemoriesClick} />
            
            {showMemories && <MemoriesGallery />}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Hidden Audio for Memories */}
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop 
        className="hidden"
      />


      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
