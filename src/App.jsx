import React, { useState, useEffect } from 'react';
import { Zap, Globe, BatteryCharging, ChevronLeft, ArrowRight, ShieldCheck, Cpu, Navigation, MapPin, Gauge, Timer, Info } from 'lucide-react';

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

  const getMapUrl = () => {
    const lat = selectedPod ? selectedPod.lat : 28.4472;
    const lng = selectedPod ? selectedPod.lng : 77.0406;
    return `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY_OPTIONAL&center=${lat},${lng}&zoom=16&maptype=satellite`;
    // Note: For a live demo without a key, we'll use the coordinate fallback:
  };
  
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
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black">
          <div className="mb-6 opacity-50"><Zap size={40} className="text-emerald-500" /></div>
          <h1 className="text-8xl font-black italic tracking-tighter text-white uppercase mb-4 leading-none">XCHARGE<span className="text-emerald-500">.</span></h1>
          <p className="text-zinc-500 font-medium tracking-[0.4em] uppercase text-[10px] mb-12">Premier Exicom Fleet Management</p>
          <button onClick={() => setStage('map')} className="group relative bg-white text-black px-16 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10">Initialize Access</span>
            <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      )}

      {/* MAIN INTERFACE: MAP & SIDEBAR */}
      {(stage === 'map' || stage === 'details') && (
        <div className="flex h-full w-full">
           {/* MAP AREA */}
           <div className="flex-grow relative bg-zinc-950">
             <iframe title="Map" className="w-full h-full border-none grayscale-[0.3] contrast-[1.1] brightness-[0.8]" src={mapFallback} />
             <div className="absolute top-10 left-10 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl z-20">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Sector 32, Gurugram • LIVE</p>
               </div>
             </div>
           </div>

           {/* PREMIUM SIDEBAR */}
           <div className="w-[450px] bg-black/80 backdrop-blur-3xl border-l border-white/5 flex flex-col z-40">
             <div className="p-10 border-b border-white/5">
                <h2 className="text-xs font-black text-emerald-500 tracking-[0.5em] uppercase mb-2">Available Fleet</h2>
                <h3 className="text-4xl font-black italic uppercase text-white">Harmony.</h3>
             </div>
             
             <div className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-4">
               {pods.map(pod => (
                 <div 
                   key={pod.id} 
                   onClick={() => { setSelectedPod(pod); setStage('details'); }} 
                   className={`group p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer ${selectedPod?.id === pod.id ? 'bg-emerald-500 border-emerald-400' : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'}`}
                 >
                   <div className="flex justify-between items-start mb-4">
                     <div>
                       <h3 className={`font-black italic uppercase text-lg leading-none ${selectedPod?.id === pod.id ? 'text-black' : 'text-white'}`}>{pod.name}</h3>
                       <p className={`text-[9px] font-black tracking-widest mt-2 ${selectedPod?.id === pod.id ? 'text-black/60' : 'text-zinc-500'}`}>{pod.power} PEAK OUTPUT</p>
                     </div>
                     <ArrowRight className={`${selectedPod?.id === pod.id ? 'text-black' : 'text-zinc-700'}`} size={20} />
                   </div>
                   <div className="flex gap-4">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold ${selectedPod?.id === pod.id ? 'bg-black/10 text-black' : 'bg-white/5 text-zinc-400'}`}>
                        <Timer size={12} /> {pod.eta} MIN
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold ${selectedPod?.id === pod.id ? 'bg-black/10 text-black' : 'bg-white/5 text-zinc-400'}`}>
                        <MapPin size={12} /> {pod.dist}
                      </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
           
           {/* PREMIUM BOOKING SCREEN */}
           {stage === 'details' && selectedPod && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-[55] flex items-center justify-end animate-in fade-in duration-500">
                <div className="h-full w-[600px] bg-zinc-950 border-l border-white/10 p-16 flex flex-col justify-center animate-in slide-in-from-right-full duration-700">
                  <button onClick={() => setStage('map')} className="absolute top-10 right-10 text-zinc-500 hover:text-white transition-colors"><ChevronLeft size={32} /></button>
                  
                  <div className="mb-12">
                    <span className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] border-b border-emerald-500/30 pb-2">Unit Configuration</span>
                    <h2 className="text-6xl font-black italic uppercase mt-6 mb-4">{selectedPod.name}</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed font-medium">"{selectedPod.intel}"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-16">
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5">
                      <Gauge className="text-emerald-500 mb-4" size={24} />
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Max Power</p>
                      <p className="text-2xl font-black italic">{selectedPod.power}</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5">
                      <ShieldCheck className="text-emerald-500 mb-4" size={24} />
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Status</p>
                      <p className="text-2xl font-black italic">CERTIFIED</p>
                    </div>
                  </div>

                  <button onClick={() => setStage('loading')} className="group flex items-center justify-between w-full bg-emerald-500 text-black p-8 rounded-[2rem] font-black uppercase tracking-widest hover:bg-white transition-all duration-300 scale-100 hover:scale-[1.02]">
                    <span className="text-xl italic">Confirm Dispatch</span>
                    <div className="bg-black text-white p-3 rounded-2xl group-hover:bg-emerald-500 group-hover:text-black transition-colors"><ArrowRight /></div>
                  </button>
                </div>
              </div>
           )}
        </div>
      )}

      {/* (STAGES: LOADING & SUCCESS REMAIN THE SAME FROM PREVIOUS CODE) */}
      {/* ... keeping logic consistent ... */}
      
      {stage === 'loading' && (
        <div className="absolute inset-0 z-[70] bg-black flex flex-col items-center justify-center p-8 text-white">
          <div className="relative w-28 h-52 border-[5px] border-white/10 rounded-[2rem] p-1.5 mb-10 overflow-hidden">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-white/10 rounded-t-md" />
            <div className="w-full bg-emerald-500 rounded-2xl transition-all duration-300 ease-linear shadow-[0_0_30px_rgba(16,185,129,0.5)]" style={{ height: `${loadProgress}%`, marginTop: `${100 - loadProgress}%` }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className={`text-white transition-opacity duration-500 ${loadProgress % 10 < 5 ? 'opacity-100' : 'opacity-20'}`} size={40} />
            </div>
          </div>
          <div className="text-center max-w-xs">
            <h2 className="text-5xl font-black italic mb-2">{loadProgress}%</h2>
            <p className="text-[9px] tracking-[0.4em] text-emerald-500 font-bold uppercase mb-8">Harmony Sync in Progress</p>
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-700" key={triviaIndex}>
              <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Exicom Feature</p>
              <h3 className="text-lg font-bold italic uppercase text-white mb-2">{trivia[triviaIndex].title}</h3>
              <p className="text-xs text-zinc-400 font-medium leading-relaxed">{trivia[triviaIndex].detail}</p>
            </div>
          </div>
        </div>
      )}

      {stage === 'success' && selectedPod && (
        <div className="absolute inset-0 z-[80] bg-black text-white flex flex-col items-center justify-center text-center p-10">
          <div className="mb-12 relative">
             <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
             <Navigation className="text-emerald-500 relative animate-bounce" size={80} />
          </div>
          <h2 className="text-7xl font-black italic tracking-tighter uppercase mb-2">Tracking.</h2>
          <p className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px] mb-16">Unit in transit to location</p>
          
          <div className="grid grid-cols-2 gap-8 w-full max-w-lg mb-16">
            <div className="bg-zinc-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl">
              <p className="text-[9px] font-black text-zinc-500 uppercase mb-2 tracking-widest">Live Arrival</p>
              <h3 className="text-5xl font-black italic text-white">{formatTime(secondsLeft)}</h3>
            </div>
            <div className="bg-zinc-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl">
              <p className="text-[9px] font-black text-zinc-500 uppercase mb-2 tracking-widest">Range Remaining</p>
              <h3 className="text-5xl font-black italic text-white">{selectedPod.dist}</h3>
            </div>
          </div>

          <button onClick={() => setStage('map')} className="text-zinc-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all underline underline-offset-8">Abort Dispatch</button>
        </div>
      )}
    </div>
  );
};

export default App;
