import React, { useState, useEffect } from 'react';
import { MapPin, Zap, Navigation, ArrowRight, Cpu, ChevronLeft, Globe } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState('welcome'); 
  const [selectedPod, setSelectedPod] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);

  // AUTHENTIC HARMONY MODELS
  const pods = [
    { id: 1, name: 'HARMONY DIRECT 2.0', power: '240kW', eta: '3 min', dist: '0.6km', lat: 28.4490, lng: 77.0430, intel: "Flagship liquid-cooled architecture." },
    { id: 2, name: 'HARMONY BOOST', power: '400kW', eta: '5 min', dist: '1.2km', lat: 28.4410, lng: 77.0350, intel: "Battery-buffered ultra charging." },
    { id: 3, name: 'HARMONY DISTRIBUTED', power: '600kW', eta: '9 min', dist: '2.4km', lat: 28.4550, lng: 77.0500, intel: "Scalable power matrix system." },
    { id: 4, name: 'HARMONY GEN 1.5', power: '120kW', eta: '12 min', dist: '3.1km', lat: 28.4350, lng: 77.0250, intel: "Industrial grade reliability." }
  ];

  // Progress logic for loading screen
  useEffect(() => {
    if (stage === 'loading') {
      const interval = setInterval(() => {
        setLoadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage('success'), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const getMapUrl = () => {
    const lat = selectedPod ? selectedPod.lat : 28.4472;
    const lng = selectedPod ? selectedPod.lng : 77.0406;
    return `https://maps.google.com/maps?q=${lat},${lng}&t=k&z=17&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className={`h-screen w-screen overflow-hidden font-sans transition-colors duration-1000 ${stage === 'welcome' ? 'bg-black' : 'bg-white'}`}>
      
      {/* 1. WELCOME SCREEN */}
      {stage === 'welcome' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-7xl md:text-8xl font-black italic tracking-tighter text-white uppercase mb-4">
            XCHARGE<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-[10px] tracking-[0.8em] text-gray-500 uppercase font-bold mb-12">Powered by Harmony OS</p>
          <button 
            onClick={() => setStage('map')}
            className="group relative bg-white text-black px-12 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-emerald-500 hover:text-white active:scale-95"
          >
            Access Fleet <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={14}/>
          </button>
        </div>
      )}

      {/* 2. DASHBOARD (Map & Sidebar) */}
      {(stage === 'map' || stage === 'details') && (
        <div className="flex h-full w-full animate-in fade-in duration-700">
          {/* MAP VIEW */}
          <div className="flex-grow relative bg-gray-900">
            <iframe 
              key={selectedPod ? selectedPod.id : 'default'}
              title="Map"
              className="w-full h-full border-none grayscale-[0.3] contrast-[1.1] opacity-90"
              src={getMapUrl()}
            />
            <div className="absolute top-8 left-8 p-5 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl">
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Active Sector</p>
              <h2 className="text-lg font-bold italic uppercase text-black">Sector 32, Gurugram</h2>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-[450px] bg-white border-l border-gray-100 p-10 flex flex-col shadow-2xl z-10">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-black mb-10">Fleet</h2>
            <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
              {pods.map(pod => (
                <div 
                  key={pod.id} 
                  onClick={() => { setSelectedPod(pod); setStage('details'); }}
                  className={`p-6 rounded-[2rem] border transition-all cursor-pointer group ${selectedPod?.id === pod.id ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-100 bg-gray-50 hover:border-gray-300'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-black italic text-black uppercase">{pod.name}</h3>
                    <div className="text-right">
                      <p className="text-lg font-black italic text-black leading-none">{pod.eta}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase">{pod.dist}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-gray-500 uppercase bg-white border border-gray-200 px-3 py-1 rounded-full">{pod.power} DC</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. DETAILS PAGE OVERLAY */}
      {stage === 'details' && selectedPod && (
        <div className="absolute inset-0 z-[60] bg-white/98 backdrop-blur-2xl flex items-center justify-center p-8 animate-in zoom-in-95 duration-500">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <button onClick={() => setStage('map')} className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 hover:text-black">
                <ChevronLeft size={16}/> Return
              </button>
              <h2 className="text-6xl font-black italic uppercase tracking-tighter text-black leading-none">{selectedPod.name}</h2>
              <p className="text-xl font-light italic text-gray-600">"{selectedPod.intel}"</p>
            </div>
            <div className="bg-black p-12 rounded-[3rem] text-center shadow-2xl">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Arrival ETA</p>
              <h3 className="text-8xl font-black italic text-white mb-10">{selectedPod.eta}</h3>
              <button onClick={() => setStage('loading')} className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black uppercase text-[11px] hover:bg-white hover:text-black transition-all">Confirm Dispatch</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. LOADING & SUCCESS */}
      {stage === 'loading' && (
        <div className="absolute inset-0 z-[70] bg-white flex flex-col items-center justify-center">
          <div className="w-40 h-40 border-4 border-gray-100 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 border-t-4 border-emerald-500 rounded-full animate-spin" />
            <span className="text-2xl font-black italic text-black">{loadProgress}%</span>
          </div>
          <p className="mt-8 text-[10px] font-black tracking-[0.6em] text-gray-400 uppercase">Syncing Harmony OS</p>
        </div>
      )}

      {stage === 'success' && (
        <div className="absolute inset-0 z-[80] bg-black text-white flex flex-col items-center justify-center text-center p-6">
          <Globe className="text-emerald-500 mb-8 animate-pulse" size={64} />
          <h2 className="text-6xl font-black italic tracking-tighter uppercase mb-4">Dispatched</h2>
          <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-12">Unit {selectedPod.name} In Transit</p>
          <button onClick={() => setStage('map')} className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[11px] hover:bg-emerald-500 hover:text-white transition-all">Track Deployment</button>
        </div>
      )}
    </div>
  );
};

export default App;
