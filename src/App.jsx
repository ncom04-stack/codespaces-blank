import React, { useState, useEffect } from 'react';
import { Zap, Globe, BatteryCharging, ChevronLeft, ArrowRight, ShieldCheck, Cpu, Navigation } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState('welcome'); 
  const [selectedPod, setSelectedPod] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const trivia = [
    { title: "Harmony OS", detail: "Exicom's proprietary stack ensuring 99.9% charger uptime." },
    { title: "Dynamic Load Sharing", detail: "Optimized distribution between guns based on real-time demand." },
    { title: "Pioneer Tech", detail: "Exicom launched India's first EV power plant in 1994." },
    { title: "Tritium Holster", detail: "Featuring premium ergonomics and assisted retraction." },
    { title: "Modular Design", detail: "40kW modular units allow effortless power upgrades." }
  ];

  const pods = [
    { id: 1, name: 'HARMONY DIRECT 2.0', power: '240kW', eta: 3, dist: '0.6km', lat: 28.4490, lng: 77.0430, intel: "Flagship liquid-cooled architecture." },
    { id: 2, name: 'HARMONY BOOST', power: '400kW', eta: 5, dist: '1.2km', lat: 28.4410, lng: 77.0350, intel: "Battery-buffered ultra charging." },
    { id: 3, name: 'HARMONY DISTRIBUTED', power: '600kW', eta: 9, dist: '2.4km', lat: 28.4550, lng: 77.0500, intel: "Scalable power matrix system." }
  ];

  // FIX: Corrected Map URL syntax
  const getMapUrl = () => {
    const lat = selectedPod ? selectedPod.lat : 28.4472;
    const lng = selectedPod ? selectedPod.lng : 77.0406;
    // Standard embed format for coordinate-based maps
    return `https://maps.google.com/maps?q=${lat},${lng}&t=k&z=17&ie=UTF8&iwloc=&output=embed`;
  };

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
    <div className={`h-screen w-screen overflow-hidden font-sans ${stage === 'welcome' || stage === 'loading' || stage === 'success' ? 'bg-black' : 'bg-white'}`}>
      
      {stage === 'welcome' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-7xl font-black italic tracking-tighter text-white uppercase mb-4">XCHARGE<span className="text-emerald-500">.</span></h1>
          <button onClick={() => setStage('map')} className="bg-white text-black px-12 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all">Access Fleet</button>
        </div>
      )}

      {(stage === 'map' || stage === 'details') && (
        <div className="flex h-full w-full">
           <div className="flex-grow relative bg-gray-900">
             <iframe 
                key={selectedPod ? selectedPod.id : 'default'}
                title="Map"
                className="w-full h-full border-none"
                src={getMapUrl()}
             />
             <div className="absolute top-8 left-8 p-5 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl z-20">
               <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Active Sector</p>
               <h2 className="text-lg font-bold italic uppercase text-black">Sector 32, Gurugram</h2>
             </div>
           </div>

           <div className="w-[400px] bg-white p-10 border-l border-gray-100 flex flex-col overflow-y-auto shadow-2xl z-10">
             <h2 className="text-3xl font-black italic uppercase mb-8">Harmony Fleet</h2>
             {pods.map(pod => (
               <div key={pod.id} onClick={() => { setSelectedPod(pod); setStage('details'); }} className={`p-6 mb-4 rounded-3xl border transition-all cursor-pointer ${selectedPod?.id === pod.id ? 'border-emerald-500 bg-emerald-50' : 'bg-gray-50 hover:border-gray-300'}`}>
                 <h3 className="font-black italic uppercase text-black">{pod.name}</h3>
                 <p className="text-[10px] text-gray-400 font-bold uppercase">{pod.power} • {pod.eta} MIN AWAY</p>
               </div>
             ))}
           </div>
           
           {stage === 'details' && selectedPod && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-xl z-[55] flex items-center justify-center p-12 animate-in fade-in zoom-in duration-300">
                <div className="max-w-xl w-full text-center">
                  <h2 className="text-5xl font-black italic uppercase mb-4 text-black">{selectedPod.name}</h2>
                  <p className="text-gray-500 mb-10 italic">"{selectedPod.intel}"</p>
                  <button onClick={() => setStage('loading')} className="w-full bg-black text-white py-6 rounded-3xl font-black uppercase tracking-widest hover:bg-emerald-500 transition-all">Confirm Booking & Verify System</button>
                  <button onClick={() => setStage('map')} className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Back to Map</button>
                </div>
              </div>
           )}
        </div>
      )}

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
              <p className="text-xs text-gray-400 font-medium leading-relaxed">{trivia[triviaIndex].detail}</p>
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
          <h2 className="text-6xl font-black italic tracking-tighter uppercase mb-2">Tracking Unit</h2>
          <p className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px] mb-16">In Transit to your location</p>
          
          <div className="grid grid-cols-2 gap-8 w-full max-w-md mb-16">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
              <p className="text-[9px] font-black text-gray-500 uppercase mb-2">Live ETA</p>
              <h3 className="text-4xl font-black italic text-white">{formatTime(secondsLeft)}</h3>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
              <p className="text-[9px] font-black text-gray-500 uppercase mb-2">Distance</p>
              <h3 className="text-4xl font-black italic text-white">{selectedPod.dist}</h3>
            </div>
          </div>

          <button onClick={() => setStage('map')} className="bg-white text-black px-16 py-6 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Cancel Dispatch</button>
        </div>
      )}
    </div>
  );
};

export default App;
