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

  const mapFallback = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14032.544133481682!2d${selectedPod?.lng || 77.0406}!3d${selectedPod?.lat || 28.4472}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&maptype=satellite`;

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
          <div className="mb-6 opacity-40"><Zap size={44} className="text-emerald-500" /></div>
          <h1 className="text-7xl md:text-8xl font-black italic tracking-tighter text-white uppercase mb-4">XCHARGE<span className="text-emerald-500">.</span></h1>
          <p className="text-zinc-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-12">Exicom Fleet Intelligence</p>
          <button onClick={() => setStage('map')} className="bg-white text-black px-14 py-5 rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all hover:bg-emerald-500 hover:text-white active:scale-95">
            Initialize Access
          </button>
        </div>
      )}

      {/* MAIN INTERFACE */}
      {(stage === 'map' || stage === 'details') && (
        <div className="flex h-full w-full">
           <div className="flex-grow relative bg-zinc-950">
             <iframe title="Map" className="w-full h-full border-none grayscale-[0.4] brightness-[0.7]" src={mapFallback} />
             <div className="absolute top-10 left-10 p-5 bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl z-20">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-[10px] font-black text-white uppercase tracking-[0.15em]">Live Feed • Gurugram</p>
               </div>
             </div>
           </div>

           {/* SIDEBAR */}
           <div className="w-[420px] bg-black/90 backdrop-blur-3xl border-l border-white/5 flex flex-col z-40 shadow-2xl">
             <div className="p-10 border-b border-white/5">
                <h2 className="text-[9px] font-black text-emerald-500 tracking-[0.5em] uppercase mb-2">Available Fleet</h2>
                <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter">Harmony</h3>
             </div>
             
             <div className="flex-grow overflow-y-auto p-6 space-y-4">
               {pods.map(pod => (
                 <div 
                   key={pod.id} 
                   onClick={() => { setSelectedPod(pod); setStage('details'); }} 
                   className={`p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer ${selectedPod?.id === pod.id ? 'bg-emerald-500 border-emerald-400' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                 >
                   <div className="flex justify-between items-start mb-4">
                     <div>
                       <h3 className={`font-black italic uppercase text-base ${selectedPod?.id === pod.id ? 'text-black' : 'text-white'}`}>{pod.name}</h3>
                       <p className={`text-[9px] font-black tracking-widest mt-1.5 ${selectedPod?.id === pod.id ? 'text-black/60' : 'text-zinc-500'}`}>{pod.power} OUTPUT</p>
                     </div>
                     <ArrowRight className={`${selectedPod?.id === pod.id ? 'text-black' : 'text-zinc-700'}`} size={18} />
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
           
           {/* BOOKING DRAWER */}
           {stage === 'details' && selectedPod && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[55] flex justify-end">
                <div className="h-full w-[550px] bg-zinc-950 border-l border-white/10 p-16 flex flex-col justify-center animate-in slide-in-from-right-full duration-500">
                  <button onClick={() => setStage('map')} className="absolute top-10 right-10 text-zinc-500 hover:text-white transition-colors"><ChevronLeft size={32} /></button>
                  
                  <div className="mb-10">
                    <span className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px]">Configuration</span>
                    <h2 className="text-5xl font-black italic uppercase mt-5 mb-4 leading-none">{selectedPod.name}</h2>
                    <p className="text-zinc-400 text-base leading-relaxed font-medium">"{selectedPod.intel}"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-12">
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                      <Gauge className="text-emerald-500 mb-3" size={24} />
                      <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Max Power</p>
                      <p className="text-2xl font-black italic">{selectedPod.power}</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                      <ShieldCheck className="text-emerald-500 mb-3" size={24} />
                      <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">System Status</p>
                      <p className="text-2xl font-black italic">ACTIVE</p>
                    </div>
                  </div>

                  <button onClick={() => setStage('loading')} className="flex items-center justify-between w-full bg-emerald-500 text-black p-8 rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all transform active:scale-95 shadow-xl shadow-emerald-500/10">
                    <span>Confirm Dispatch</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
           )}
        </div>
      )}

      {/* LOADING STAGE */}
      {stage === 'loading' && (
        <div className="absolute inset-0 z-[70] bg-black flex flex-col items-center justify-center p-8 text-white">
          <div className="relative w-28 h-52 border-[5px] border-white/10 rounded-[2rem] p-1.5 mb-10 overflow-hidden">
            <div className="w-full bg-emerald-500 rounded-2xl transition-all duration-300" style={{ height: `${loadProgress}%`, marginTop: `${100 - loadProgress}%` }} />
            <div className="absolute inset-0 flex items-center justify-center"><Zap className="text-white/40 animate-pulse" size={40} /></div>
          </div>
          <div className="text-center max-w-sm">
            <h2 className="text-6xl font-black italic mb-2 leading-none">{loadProgress}%</h2>
            <p className="text-[10px] tracking-[0.4em] text-emerald-500 font-bold uppercase mb-8">Synchronizing</p>
            <div key={triviaIndex} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-lg font-bold italic uppercase text-white mb-2">{trivia[triviaIndex].title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">{trivia[triviaIndex].detail}</p>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS STAGE */}
      {stage === 'success' && selectedPod && (
        <div className="absolute inset-0 z-[80] bg-black text-white flex flex-col items-center justify-center text-center p-10">
          <Navigation className="text-emerald-500 mb-8 animate-bounce" size={64} />
          <h2 className="text-6xl font-black italic tracking-tighter uppercase mb-2">Tracking</h2>
          <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-16">Unit in transit</p>
          
          <div className="grid grid-cols-2 gap-8 w-full max-w-md mb-16">
            <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Arrival</p>
              <h3 className="text-4xl font-black italic">{formatTime(secondsLeft)}</h3>
            </div>
            <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Distance</p>
              <h3 className="text-4xl font-black italic">{selectedPod.dist}</h3>
            </div>
          </div>
          <button onClick={() => setStage('map')} className="text-zinc-500 font-black uppercase text-[10px] tracking-widest hover:text-white underline underline-offset-8 transition-colors">Abort Dispatch</button>
        </div>
      )}
    </div>
  );
};

export default App;
