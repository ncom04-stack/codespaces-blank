import React, { useState, useEffect } from 'react';
import { Zap, Globe, BatteryCharging, ChevronLeft, ArrowRight, ShieldCheck, Cpu, Navigation, MapPin, Gauge, Timer } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState('welcome'); 
  const [selectedPod, setSelectedPod] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const trivia = [
    { title: "Harmony OS", detail: "Exicom's proprietary stack ensuring 99.9% charger uptime." },
    { title: "Dynamic Load Sharing", detail: "Optimized power distribution based on real-time demand." },
    { title: "Pioneer Tech", detail: "Exicom launched India's first EV power plant in 1994." },
    { title: "Tritium Holster", detail: "Premium ergonomics with assisted cable retraction." },
    { title: "Modular Design", detail: "40kW units allowing effortless power upgrades." }
  ];

  const pods = [
    { id: 1, name: 'HARMONY DIRECT 2.0', power: '240kW', eta: 3, dist: '0.6km', lat: 28.4490, lng: 77.0430, intel: "Flagship liquid-cooled architecture for ultra-fast throughput." },
    { id: 2, name: 'HARMONY BOOST', power: '400kW', eta: 5, dist: '1.2km', lat: 28.4410, lng: 77.0350, intel: "BESS-integrated system for grid-independent high power." },
    { id: 3, name: 'HARMONY DISTRIBUTED', power: '600kW', eta: 9, dist: '2.4km', lat: 28.4550, lng: 77.0500, intel: "Scalable power matrix for heavy-duty fleet hubs." },
    { id: 4, name: 'HARMONY WALL', power: '30kW', eta: 14, dist: '4.8km', lat: 28.4600, lng: 77.0600, intel: "Compact DC charging for urban hospitality & retail." },
    { id: 5, name: 'HARMONY DIRECT', power: '120kW', eta: 19, dist: '6.1km', lat: 28.4300, lng: 77.0200, intel: "Proven industrial reliability for long-range transit." },
    { id: 6, name: 'HARMONY GEN 1.5', power: '60kW', eta: 25, dist: '8.2km', lat: 28.4700, lng: 77.0700, intel: "Legacy standard with high-durability performance." }
  ];

  const mapFallback = `https://maps.google.com/maps?q=${selectedPod?.lat || 28.4472},${selectedPod?.lng || 77.0406}&t=k&z=16&ie=UTF8&iwloc=&output=embed`;

  useEffect(() => {
    if (stage === 'loading') {
      const interval = setInterval(() => {
        setLoadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setSecondsLeft(selectedPod ? selectedPod.eta * 60 : 300);
            setTimeout(() => setStage('success'), 800);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      const triviaTimer = setInterval(() => {
        setTriviaIndex(prev => (prev + 1) % trivia.length);
      }, 2500);
      return () => { clearInterval(interval); clearInterval(triviaTimer); };
    }
  }, [stage, selectedPod]);

  useEffect(() => {
    if (stage === 'success' && secondsLeft > 0) {
      const timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [stage, secondsLeft]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white font-sans selection:bg-emerald-500">
      
      {/* STAGE: WELCOME */}
      {stage === 'welcome' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center bg-black">
          <div className="mb-4 opacity-40"><Zap size={32} className="text-emerald-500" /></div>
          <h1 className="text-6xl font-black italic tracking-tighter text-white uppercase mb-2">XCHARGE<span className="text-emerald-500">.</span></h1>
          <p className="text-zinc-500 font-bold tracking-[0.5em] uppercase text-[8px] mb-10">Exicom Fleet Intelligence</p>
          <button onClick={() => setStage('map')} className="bg-white text-black px-12 py-4 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all hover:bg-emerald-500 hover:text-white">
            Initialize
          </button>
        </div>
      )}

      {/* MAIN INTERFACE */}
      {(stage === 'map' || stage === 'details') && (
        <div className="flex h-full w-full">
           <div className="flex-grow relative bg-zinc-950">
             <iframe title="Map" className="w-full h-full border-none grayscale-[0.4] brightness-[0.7]" src={mapFallback} />
             <div className="absolute top-8 left-8 p-4 bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl z-20">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-[8px] font-black text-white uppercase tracking-[0.15em]">Live Feed • Gurugram</p>
               </div>
             </div>
           </div>

           {/* SIDEBAR - SMALLER TEXT */}
           <div className="w-[380px] bg-black/90 backdrop-blur-3xl border-l border-white/5 flex flex-col z-40">
             <div className="p-8 border-b border-white/5">
                <h2 className="text-[7px] font-black text-emerald-500 tracking-[0.5em] uppercase mb-1">Available Fleet</h2>
                <h3 className="text-2xl font-black italic uppercase text-white">Harmony</h3>
             </div>
             
             <div className="flex-grow overflow-y-auto p-4 space-y-3">
               {pods.map(pod => (
                 <div 
                   key={pod.id} 
                   onClick={() => { setSelectedPod(pod); setStage('details'); }} 
                   className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${selectedPod?.id === pod.id ? 'bg-emerald-500 border-emerald-400' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                 >
                   <div className="flex justify-between items-start mb-3">
                     <div>
                       <h3 className={`font-black italic uppercase text-sm ${selectedPod?.id === pod.id ? 'text-black' : 'text-white'}`}>{pod.name}</h3>
                       <p className={`text-[7px] font-black tracking-widest mt-1 ${selectedPod?.id === pod.id ? 'text-black/60' : 'text-zinc-500'}`}>{pod.power} OUTPUT</p>
                     </div>
                     <ArrowRight className={`${selectedPod?.id === pod.id ? 'text-black' : 'text-zinc-700'}`} size={16} />
                   </div>
                   <div className="flex gap-3">
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[7px] font-bold ${selectedPod?.id === pod.id ? 'bg-black/10 text-black' : 'bg-white/5 text-zinc-400'}`}>
                        <Timer size={10} /> {pod.eta} MIN
                      </div>
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[7px] font-bold ${selectedPod?.id === pod.id ? 'bg-black/10 text-black' : 'bg-white/5 text-zinc-400'}`}>
                        <MapPin size={10} /> {pod.dist}
                      </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
           
           {/* BOOKING DRAWER - SMALLER TEXT */}
           {stage === 'details' && selectedPod && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[55] flex justify-end">
                <div className="h-full w-[500px] bg-zinc-950 border-l border-white/10 p-12 flex flex-col justify-center animate-in slide-in-from-right-full duration-500">
                  <button onClick={() => setStage('map')} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><ChevronLeft size={24} /></button>
                  
                  <div className="mb-8">
                    <span className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[7px]">Configuration</span>
                    <h2 className="text-4xl font-black italic uppercase mt-4 mb-3">{selectedPod.name}</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed font-medium">"{selectedPod.intel}"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <Gauge className="text-emerald-500 mb-2" size={18} />
                      <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Max Power</p>
                      <p className="text-xl font-black italic">{selectedPod.power}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <ShieldCheck className="text-emerald-500 mb-2" size={18} />
                      <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Status</p>
                      <p className="text-xl font-black italic">ACTIVE</p>
                    </div>
                  </div>

                  <button onClick={() => setStage('loading')} className="flex items-center justify-between w-full bg-emerald-500 text-black p-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all">
                    <span>Confirm Dispatch</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
           )}
        </div>
      )}

      {/* LOADING STAGE */}
      {stage === 'loading' && (
        <div className="absolute inset-0 z-[70] bg-black flex flex-col items-center justify-center p-8 text-white">
          <div className="relative w-24 h-44 border-[4px] border-white/10 rounded-[1.5rem] p-1 mb-8">
            <div className="w-full bg-emerald-500 rounded-xl transition-all duration-300" style={{ height: `${loadProgress}%`, marginTop: `${100 - loadProgress}%` }} />
            <div className="absolute inset-0 flex items-center justify-center"><Zap className="text-white/50" size={32} /></div>
          </div>
          <div className="text-center max-w-xs">
            <h2 className="text-4xl font-black italic mb-1">{loadProgress}%</h2>
            <p className="text-[7px] tracking-[0.4em] text-emerald-500 font-bold uppercase mb-6">Syncing Harmony</p>
            <div key={triviaIndex} className="animate-in fade-in duration-500">
              <h3 className="text-sm font-bold italic uppercase text-white mb-1">{trivia[triviaIndex].title}</h3>
              <p className="text-[10px] text-zinc-400 leading-relaxed">{trivia[triviaIndex].detail}</p>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS STAGE */}
      {stage === 'success' && selectedPod && (
        <div className="absolute inset-0 z-[80] bg-black text-white flex flex-col items-center justify-center text-center p-10">
          <Navigation className="text-emerald-500 mb-6 animate-pulse" size={48} />
          <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-1">Tracking</h2>
          <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[7px] mb-12">In Transit</p>
          
          <div className="grid grid-cols-2 gap-6 w-full max-w-sm mb-12">
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest mb-1">Arrival</p>
              <h3 className="text-3xl font-black italic">{formatTime(secondsLeft)}</h3>
            </div>
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest mb-1">Range</p>
              <h3 className="text-3xl font-black italic">{selectedPod.dist}</h3>
            </div>
          </div>
          <button onClick={() => setStage('map')} className="text-zinc-500 font-black uppercase text-[7px] tracking-widest hover:text-white underline underline-offset-4">Abort</button>
        </div>
      )}
    </div>
  );
};

export default App;
