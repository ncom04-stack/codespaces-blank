import React, { useState, useEffect } from 'react';
import { MapPin, Zap, ShieldCheck, Navigation, ArrowRight, Cpu, ChevronLeft, Globe, BatteryCharging } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState('welcome'); 
  const [selectedPod, setSelectedPod] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);

  // AUTHENTIC EXICOM HARMONY FLEET
  const pods = [
    { 
      id: 1, name: 'HARMONY DIRECT 2.0', power: '240kW DC', eta: '2 min', dist: '0.4 km',
      lat: 28.4490, lng: 77.0430,
      intel: "Next-gen flagship. Features dynamic load sharing and Harmony OS for 99% uptime."
    },
    { 
      id: 2, name: 'HARMONY BOOST', power: '400kW (BESS)', eta: '5 min', dist: '1.2 km',
      lat: 28.4410, lng: 77.0350,
      intel: "Battery-integrated ultra-fast charger. Delivers high power even in grid-constrained areas."
    },
    { 
      id: 3, name: 'HARMONY DISTRIBUTED', power: '600kW SYSTEM', eta: '8 min', dist: '2.8 km',
      lat: 28.4550, lng: 77.0500,
      intel: "The peak of scalability. Supports up to 12 charging points with intelligent power matrix switching."
    },
    { 
      id: 4, name: 'HARMONY GEN 1.5', power: '120kW DC', eta: '11 min', dist: '3.5 km',
      lat: 28.4350, lng: 77.0250,
      intel: "Proven reliability. Optimized for highway depots and fleet-heavy industrial environments."
    }
  ];

  useEffect(() => {
    if (stage === 'loading') {
      const interval = setInterval(() => {
        setLoadProgress(prev => {
          if (prev >= 100) { clearInterval(interval); setTimeout(() => setStage('success'), 800); return 100; }
          return prev + 4;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const getMapUrl = () => {
    const coords = selectedPod ? `${selectedPod.lat},${selectedPod.lng}` : "28.4472,77.0406";
    return `https://maps.google.com/maps?q=${coords}&t=k&z=17&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className={`h-screen w-screen transition-all duration-1000 ${stage === 'welcome' ? 'bg-[#000]' : 'bg-[#fff]'} font-sans antialiased`}>
      
      {/* 1. WELCOME SCREEN */}
      {stage === 'welcome' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="text-center mb-20">
            <h1 className="text-8xl font-black italic tracking-tighter text-white uppercase animate-in fade-in slide-in-from-bottom-8 duration-1000">Xcharge<span className="text-emerald-500">.</span></h1>
            <p className="text-[10px] tracking-[1em] text-gray-600 uppercase font-bold mt-4">Powered by Exicom</p>
          </div>
          <button 
            onClick={() => setStage('map')}
            className="group relative bg-white text-black px-14 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.4em] overflow-hidden hover:text-white transition-colors duration-500"
          >
            <span className="relative z-10 flex items-center gap-4">Initialize Fleet <ArrowRight size={14}/></span>
            <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      )}

      {/* 2. DASHBOARD */}
      <div className={`flex h-full w-full transition-all duration-1000 ${stage !== 'map' && stage !== 'details' ? 'blur-3xl opacity-0' : 'opacity-100'}`}>
        
        {/* MAP */}
        <div className="flex-grow relative bg-[#111]">
          <iframe 
            key={selectedPod ? selectedPod.id : 'default'}
            title="Satellite Feed"
            className="w-full h-full border-none grayscale-[0.3] contrast-[1.1]"
            src={getMapUrl()}
          />
          <div className="absolute top-10 left-10 p-6 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20">
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Live Intelligence</p>
            <h2 className="text-xl font-bold italic tracking-tight uppercase text-black">Sector 32, Gurugram</h2>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-[500px] bg-white border-l border-gray-100 p-12 flex flex-col shadow-[-40px_0_80px_rgba(0,0,0,0.05)]">
          <header className="mb-12 flex justify-between items-center">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-black">Harmony Series</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active Fleet</span>
            </div>
          </header>

          <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
            {pods.map(pod => (
              <div 
                key={pod.id} 
                onClick={() => { setSelectedPod(pod); setStage('details'); }}
                className={`p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer group ${selectedPod?.id === pod.id ? 'border-emerald-500 bg-emerald-50/20' : 'border-gray-100 bg-gray-50 hover:bg-white hover:shadow-2xl'}`}
              >
                <div className="flex justify-between items-center mb-6">
                  {/* Charger Name in Bold Black */}
                  <h3 className="text-xl font-black italic uppercase tracking-tight text-black group-hover:text-emerald-600 transition-colors">{pod.name}</h3>
                  <div className="text-right">
                    <p className="text-xl font-black italic text-black leading-none">{pod.eta}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">{pod.dist}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest bg-white border border-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap size={10} className="text-emerald-500"/> {pod.power}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. DETAILS PAGE */}
      {stage === 'details' && selectedPod && (
        <div className="absolute inset-0 z-[60] bg-white/98 backdrop-blur-3xl flex items-center justify-center p-12 animate-in fade-in zoom-in-95 duration-700">
          <div className="max-w-5xl w-full grid grid-cols-2 gap-24">
            <div className="space-y-10">
              <button onClick={() => setStage('map')} className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 flex items-center gap-2 hover:text-black transition-colors">
                <ChevronLeft size={16}/> Fleet View
              </button>
              <div className="space-y-4">
                <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none text-black">{selectedPod.name}</h2>
                <div className="h-1 w-20 bg-emerald-500" />
              </div>
              <p className="text-2xl font-light italic leading-relaxed text-gray-600">"{selectedPod.intel}"</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Power Logic</p>
                  <p className="font-bold text-black">Dynamic Load Sharing</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Connectivity</p>
                  <p className="font-bold text-black">OCPP 2.0.1 Certified</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="bg-black p-16 rounded-[4rem] text-center shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10"><BatteryCharging size={120} className="text-white"/></div>
                 <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Estimated Arrival</p>
                 <h3 className="text-9xl font-black italic tracking-tighter text-white mb-12">{selectedPod.eta}</h3>
                 <button onClick={() => setStage('loading')} className="w-full bg-emerald-500 text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[12px] hover:bg-white hover:text-black transition-all shadow-2xl">Confirm Dispatch</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. LOADING & SUCCESS (OMITTED FOR BREVITY - AS PREVIOUS) */}
      {stage === 'loading' && (
        <div className="absolute inset-0 z-[70] bg-white flex flex-col items-center justify-center">
           <div className="w-48 h-48 border-2 border-gray-100 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full animate-spin" />
              <div className="text-3xl font-black italic text-black">{loadProgress}%</div>
           </div>
           <p className="mt-8 text-[10px] font-black tracking-[0.8em] text-gray-400 uppercase">Synchronizing Harmony OS</p>
        </div>
      )}

      {stage === 'success' && (
        <div className="absolute inset-0 z-[80] bg-black text-white flex flex-col items-center justify-center text-center">
          <Globe className="text-emerald-500 mb-8 animate-pulse" size={64} />
          <h2 className="text-7xl font-black italic tracking-tighter uppercase text-white">Dispatched</h2>
          <p className="text-gray-500 font-bold uppercase tracking-[0.5em] text-[10px] mb-16 underline underline-offset-8 decoration-emerald-500">
            {selectedPod.name} is in transit
          </p>
          <button onClick={() => setStage('map')} className="bg-white text-black px-14 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:bg-emerald-500 transition-all">Track Deployment</button>
        </div>
      )}

    </div>
  );
};

export default App;