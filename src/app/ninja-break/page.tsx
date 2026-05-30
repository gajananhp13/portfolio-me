"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Zap, Shield, Database, Coins, Trophy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// --- Types ---
type FloatingItem = {
  id: number;
  x: number;
  y: number;
  type: "token" | "ninja";
};

// --- Data: Injective Facts ---
const INJECTIVE_FACTS = [
  "Injective is the fastest L1 blockchain tailored for finance.",
  "Zero gas fees for users on many dApps thanks to gas compression.",
  "MEV resistant: Front-running is impossible on Injective.",
  "Interoperable: Seamlessly connect with Ethereum, Cosmos, and Solana.",
  "Instant finality: Transactions are confirmed instantly.",
  "Built with the Cosmos SDK, enabling sovereign interoperability.",
  "Native Web3 modules for developers to build dApps faster.",
];

export default function NinjaBreakPage() {
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [fact, setFact] = useState<string | null>(null);
  const [gameActive, setGameActive] = useState(false);

  // --- Game Loop ---
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      if (items.length < 5) {
        setItems((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 80 + 10, // 10% to 90%
            y: Math.random() * 80 + 10,
            type: Math.random() > 0.7 ? "ninja" : "token",
          },
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameActive, items]);

  // --- Game Interaction ---
  const handleItemClick = (id: number, type: "token" | "ninja") => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    
    // Sound effect placeholder (visual feedback is enough for now)
    
    if (type === "token") {
      setScore((s) => s + 10);
      setFact(INJECTIVE_FACTS[Math.floor(Math.random() * INJECTIVE_FACTS.length)]);
    } else {
      setScore((s) => s + 50); // Bonus for catching a Ninja!
      setFact("NINJA MODE ACTIVATED! You caught a rare builder!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black -z-10" />

      {/* --- Header --- */}
      <header className="p-6 flex justify-between items-center z-50 relative border-b border-cyan-900/30 backdrop-blur-md bg-black/50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="text-black w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tighter">Ninja<span className="text-cyan-400">Hub</span></span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
            <span className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors"><Shield className="w-4 h-4" /> Secure</span>
            <span className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors"><Rocket className="w-4 h-4" /> Fast</span>
            <span className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors"><Database className="w-4 h-4" /> Decentralized</span>
          </div>
          <Button 
            variant="outline" 
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300"
            onClick={() => window.open("https://injective.com", "_blank")}
          >
            Go to Injective <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="container mx-auto px-4 pt-12 pb-20 flex flex-col items-center justify-center min-h-[80vh]">
        
        <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 mb-2">
              BUILD THE FUTURE
            </h1>
            <p className="text-2xl md:text-3xl font-light text-gray-300">
              Welcome to the <span className="text-cyan-400 font-semibold">Injective Ecosystem</span>
            </p>
          </motion.div>

          <motion.p 
            className="text-gray-400 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore the fastest layer 1 blockchain built for finance. 
            Catch tokens, earn points, and learn why Injective is the home for Web3 finance.
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8"
          >
            {!gameActive ? (
              <Button 
                size="lg" 
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all hover:scale-105"
                onClick={() => setGameActive(true)}
              >
                Start Ninja Training
              </Button>
            ) : (
               <div className="bg-cyan-950/30 border border-cyan-800/50 rounded-2xl p-6 backdrop-blur-sm">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="text-yellow-400 w-6 h-6" />
                      <span className="text-xl font-bold">Score: {score}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setGameActive(false)} className="text-red-400 hover:text-red-300 hover:bg-red-950/30">End Training</Button>
                 </div>
                 
                 <div className="h-16 flex items-center justify-center text-center">
                   <AnimatePresence mode="wait">
                     {fact ? (
                       <motion.p 
                        key={fact}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-cyan-200 font-medium"
                       >
                         {fact}
                       </motion.p>
                     ) : (
                       <p className="text-gray-500 italic">Catch items to learn secrets...</p>
                     )}
                   </AnimatePresence>
                 </div>
               </div>
            )}
          </motion.div>
        </div>

        {/* --- Floating Game Area (Overlay) --- */}
        {gameActive && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
             <AnimatePresence>
              {items.map((item) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute pointer-events-auto cursor-pointer focus:outline-none"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  onClick={() => handleItemClick(item.id, item.type)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.type === "token" ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500 blur-md rounded-full opacity-50 animate-pulse" />
                      <Coins className="text-cyan-300 w-12 h-12 relative z-10 drop-shadow-lg" />
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500 blur-md rounded-full opacity-50 animate-pulse" />
                       {/* Ninja Icon Placeholder - roughly using a Shield/Zap combo for "Ninja" vibes */}
                       <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center relative z-10 border-2 border-purple-300 shadow-lg">
                          <Zap className="text-white w-8 h-8 fill-current" />
                       </div>
                    </div>
                  )}
                </motion.button>
              ))}
             </AnimatePresence>
          </div>
        )}

      </main>

      {/* --- Footer Ecosystem Strip --- */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-gray-800 p-4 z-40">
        <div className="container mx-auto flex justify-between items-center text-xs md:text-sm text-gray-500">
           <p>Built for <span className="text-cyan-500 font-semibold">Ninja Break Hackathon</span></p>
           <div className="flex gap-4">
             <a href="#" className="hover:text-white transition-colors">Docs</a>
             <a href="#" className="hover:text-white transition-colors">Discord</a>
             <a href="#" className="hover:text-white transition-colors">Governance</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
