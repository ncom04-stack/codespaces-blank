import React, { useState, useEffect } from 'react';
import { Zap, Globe, BatteryCharging, ChevronLeft, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState('welcome'); 
  const [selectedPod, setSelectedPod] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [triviaIndex, setTriviaIndex] = useState(0);

  const trivia = [
    { title: "Harmony OS", detail: "Exicom's proprietary stack ensuring 99.9% charger uptime." },
    { title: "Global Impact", detail: "Powering EV infrastructure across India and Southeast Asia." },
    { title: "Fast-Charging Pioneer", detail: "Exicom launched India's first complete EV power plant in 1994." },
    { title: "Tritium Tech", detail: "Now integrating world-class DC fast-charging technology." },
    { title: "Climate Resilience", detail: "Tested to perform from -30°C to 75°C industrial extremes." }
  ];

  const pods = [
    { id: 1, name: 'HARMONY DIRECT 2.0', power: '240kW', eta: '3 min', dist: '0.6km', lat: 28.4490, lng: 77.0430, intel: "Flagship liquid-cooled architecture." },
    { id: 2, name: 'HARMONY BOOST', power: '400kW', eta: '5 min', dist: '1.2km', lat: 28.4410, lng: 77.0350, intel: "Battery-buffered ultra charging." },
    { id: 3, name: 'HARMONY DISTRIBUTED', power: '600kW', eta: '9 min', dist: '2.4km', lat: 28.4550, lng: 77.0500, intel: "Scalable power matrix system." },
    { id: 4, name: 'HARMONY GEN 1.5', power: '120kW', eta: '12 min', dist: '3.1km', lat: 28.4350, lng: 77.0250, intel: "Industrial grade reliability." }
  ];

  useEffect(() => {
    if (stage === 'loading') {
      // Progress incremented every 100ms for a smooth 10-second "Focus" load
      const interval = setInterval(() => {
        setLoadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage('success'), 800);
            return 100;
          }
          // Slowed down: takes ~10 seconds to finish
          return prev + 1; 
        });
      }, 100);

      // Rotate trivia every 2 seconds
      const triviaTimer = setInterval(() => {
        setTriviaIndex(prev => (prev + 1) % trivia.length);
      }, 2500);

      return () => { clearInterval(interval); clearInterval(triviaTimer); };
    }
  }, [stage]);

  // UI Components (Simplified for brevity - focus on Loading Screen)
  if (stage === 'loading') {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center p-8 text-white font-sans overflow-hidden">
        {/* CUSTOM BATTERY LOADER */}
        <div className="relative w-32 h-60 border-[6px] border-white/20 rounded-[2rem] p-2 mb-12 flex flex-col justify-end overflow-hidden">
          {/* Battery Tip */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/20 rounded-t-lg" />
          
          {/* Liquid Fill Level */}
          <div 
            className="w-full bg-emerald-500 rounded-2xl transition-all duration-300 ease-linear shadow-[0_0_40px_rgba(16,185,129,0.6)]"
            style={{ height: `${loadProgress}%` }}
          />
          
          {/* Animated Bolt Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className={`text-white transition-opacity duration-500 ${loadProgress % 10 < 5 ? 'opacity-100' : 'opacity-30'}`} size={48} />
          </div>
        </div>

        {/* LOADING STATS */}
        <div className="text-center mb-16 max-w-sm">
          <h2 className="text-6xl font-black italic mb-2">{loadProgress}%</h2>
          <p className="text-[10px] tracking-[0.5em] text-emerald-500 font-bold uppercase mb-8">Synchronizing Deployment</p>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
          
          {/* TRIVIA SECTION */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 key={triviaIndex}">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Exicom Insight</p>
            <h3 className="text-xl font-bold italic uppercase leading-tight mb-2 text-white">{trivia[triviaIndex].title}</h3>
            <p className="text-sm text-gray-400 font-medium">{trivia[triviaIndex].detail}</p>
          </div>
        </div>
      </div>
    );
  }

  // ... (Keep your existing Stage Welcome, Map, Details, and Success here)
  return (
    <div className="bg-black text-white h-screen flex items-center justify-center">
       <button onClick={() => setStage('loading')} className="bg-emerald-500 p-4 rounded-xl">Test Loading Feature</button>
    </div>
  );
};

export default App;
