import React, { useState, useEffect } from 'react';
import {
  Zap,
  BatteryCharging,
  ChevronLeft,
  Navigation,
  Gauge,
  Timer,
  Signal
} from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState('welcome');
  const [liquidFill, setLiquidFill] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPod, setSelectedPod] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [battery, setBattery] = useState(7);
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [confidence, setConfidence] = useState(0);

  /* ---------------- DATA ---------------- */

  const pods = [
    { id: 1, name: 'HARMONY DIRECT 2.0', power: '240kW', eta: 3, dist: '0.6km', reliability: 99.9, intel: 'Liquid-cooled ultra-fast DC platform.' },
    { id: 2, name: 'HARMONY BOOST', power: '400kW', eta: 5, dist: '1.2km', reliability: 99.7, intel: 'BESS-backed grid-independent charging.' },
    { id: 3, name: 'HARMONY DISTRIBUTED', power: '600kW', eta: 9, dist: '2.4km', reliability: 99.5, intel: 'Fleet-scale modular power matrix.' },
    { id: 4, name: 'SPIN FREE MOBILE', power: '120kW', eta: 2, dist: '0.4km', reliability: 99.6, intel: 'Rapid-deploy mobile DC charger for roadside rescue.' }
  ];

  const trivia = [
    { title: '40+ Years of Power', detail: 'Exicom has powered critical infrastructure since 1978.' },
    { title: 'Telecom DNA', detail: 'Exicom systems power telecom towers across 40+ countries.' },
    { title: '99.9% Uptime', detail: 'Designed for mission-critical availability, not consumer grade.' },
    { title: 'BESS Intelligence', detail: 'Harmony Boost integrates storage to bypass grid constraints.' }
  ];

  /* ---------------- SIMULATIONS ---------------- */

  // Confidence score (Apple-style calm intelligence)
  useEffect(() => {
    if (stage === 'details' && selectedPod) {
      // Soft calculation, feels intelligent not flashy
      const score = Math.min(99, Math.round(selectedPod.reliability));
      setConfidence(score);
    }
  }, [stage, selectedPod]);

  useEffect(() => {
    if (stage === 'map' && battery > 3) {
      const drain = setInterval(() => setBattery(b => b - 1), 8000);
      return () => clearInterval(drain);
    }
  }, [stage, battery]);

  useEffect(() => {
    if (stage === 'dispatch' && selectedPod) {
      const loader = setInterval(() => {
        setLoadProgress(p => {
          if (p >= 100) {
            clearInterval(loader);
            setSecondsLeft(selectedPod.eta * 60);
            setStage('tracking');
            return 100;
          }
          return p + 1;
        });
      }, 100);

      const triviaTimer = setInterval(() => {
        setTriviaIndex(i => (i + 1) % trivia.length);
      }, 2500);

      return () => {
        clearInterval(loader);
        clearInterval(triviaTimer);
      };
    }
  }, [stage, selectedPod]);

  useEffect(() => {
    if (stage === 'tracking' && secondsLeft > 0) {
      const t = setInterval(() => setSecondsLeft(s => s - 1), 1000);
      return () => clearInterval(t);
    }
  }, [stage, secondsLeft]);

  const format = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  /* ---------------- UI ---------------- */

  return (
    <div className="h-screen w-screen bg-black text-white font-['SF_Pro_Display','Inter','system-ui'] overflow-hidden">

      {/* WELCOME */}
      {stage === 'welcome' && (
        <div className="h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-emerald-500/10 to-transparent transition-all duration-[1800ms] ${liquidFill ? 'translate-y-0' : 'translate-y-full'}`} />
          <Zap className="text-emerald-400 mb-6 z-10" size={56} />
          <h1
            onClick={() => {
              setLiquidFill(true);
              setTimeout(() => setStage('map'), 1600);
            }}
            className="text-8xl font-black italic cursor-pointer z-10"
          >
            XCHARGE<span className="text-emerald-400">.</span>
          </h1>
          <p className="text-emerald-300 tracking-[0.4em] text-xs mt-6 z-10">CHARGE ON DEMAND</p>
        </div>
      )}

      {/* MAP */}
      {stage === 'map' && (
        <div className="flex h-full">
          <div className="flex-1 relative">
            <iframe
              title="map"
              className="w-full h-full grayscale brightness-75"
              src="https://www.google.com/maps?q=gurugram&z=14&output=embed"
            />
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-xl px-5 py-3 rounded-xl border border-white/5">
              <p className="text-xs tracking-widest uppercase">Battery</p>
              <div className="flex items-center gap-2 mt-1">
                <BatteryCharging className={battery <= 5 ? 'text-red-500' : 'text-emerald-500'} />
                <span className="font-black">{battery}%</span>
              </div>
            </div>
          </div>

          <div className="w-[420px] border-l border-white/5 p-8 overflow-y-auto">
            <h2 className="text-xs tracking-[0.4em] text-emerald-500 uppercase mb-6">Available Units</h2>
            {pods.map(p => (
              <div
                key={p.id}
                onClick={() => { setSelectedPod(p); setStage('details'); }}
                className="mb-4 p-6 rounded-3xl bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                <h3 className="font-black italic">{p.name}</h3>
                <p className="text-xs text-zinc-500 mt-1">{p.power} • ETA {p.eta} min</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAILS */}
      {stage === 'details' && selectedPod && (
        <div className="absolute inset-0 bg-black/80 flex justify-center items-center">
          <div className="bg-zinc-950 p-16 rounded-3xl w-[600px] relative">
            <ChevronLeft onClick={() => setStage('map')} className="absolute top-8 right-8 cursor-pointer" />
            <h2 className="text-5xl font-black italic mb-4">{selectedPod.name}</h2>
            <p className="text-zinc-400 mb-8">{selectedPod.intel}</p>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] tracking-widest uppercase text-emerald-500 mb-2">Dispatch Confidence</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${confidence}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-white">{confidence}%</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">Optimized for reliability, ETA & grid conditions</p>
              </div>
              <Stat icon={<Gauge />} label="Power" value={selectedPod.power} />
              <Stat icon={<Signal />} label="Reliability" value={`${selectedPod.reliability}%`} />
              <Stat icon={<Timer />} label="ETA" value={`${selectedPod.eta} min`} />
            </div>
            <button
              onClick={() => setShowPayment(true)}
              className="w-full bg-emerald-500 text-black py-6 rounded-2xl font-black tracking-widest"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      )}

      {/* DISPATCH */}
      {stage === 'dispatch' && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-8">
          <div className="relative w-28 h-52 border-[5px] border-white/10 rounded-[2rem] p-1.5 mb-10 overflow-hidden">
            <div
              className="w-full bg-emerald-500 rounded-2xl transition-all duration-300"
              style={{ height: `${loadProgress}%`, marginTop: `${100 - loadProgress}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="text-white/40 animate-pulse" size={40} />
            </div>
          </div>
          <h2 className="text-6xl font-black italic mb-2">{loadProgress}%</h2>
          <p className="tracking-[0.4em] text-xs text-emerald-400 uppercase mb-8">Synchronizing Exicom Fleet</p>
          <div className="text-center max-w-sm">
            <h3 className="text-lg font-bold italic uppercase mb-2">{trivia[triviaIndex].title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{trivia[triviaIndex].detail}</p>
          </div>
        </div>
      )}

      {/* TRACKING */}
      {stage === 'tracking' && selectedPod && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl bg-black/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Navigation className="text-emerald-500 animate-pulse" size={22} />
              <div>
                <p className="text-xs tracking-widest uppercase text-emerald-500">Unit En Route</p>
                <p className="text-sm text-zinc-300">{selectedPod.name} is moving toward your location</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] tracking-widest uppercase text-zinc-500">Estimated Arrival</p>
              <p className="text-3xl font-black italic">{format(secondsLeft)}</p>
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000"
              style={{ width: `${Math.min(100, 100 - (secondsLeft / (selectedPod.eta * 60)) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="absolute inset-0 z-[90] bg-black/80 backdrop-blur-xl flex items-center justify-center">
          <div className="bg-zinc-950 w-[420px] rounded-3xl p-10 border border-white/10">
            <h3 className="text-2xl font-black italic mb-6">Mock Payment</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm"><span>Energy Estimate</span><span>₹1,250</span></div>
              <div className="flex justify-between text-sm"><span>Service Fee</span><span>₹150</span></div>
              <div className="flex justify-between font-black"><span>Total</span><span>₹1,400</span></div>
            </div>
            <button
              onClick={() => {
                setShowPayment(false);
                setStage('dispatch');
              }}
              className="w-full bg-emerald-500 text-black py-4 rounded-xl font-black tracking-widest"
            >
              PAY & DISPATCH (BYPASS)
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

const Stat = ({ icon, label, value }) => (
  <div className="bg-white/5 p-6 rounded-2xl">
    <div className="text-emerald-500 mb-2">{icon}</div>
    <p className="text-[10px] tracking-widest text-zinc-500 uppercase">{label}</p>
    <p className="text-xl font-black italic">{value}</p>
  </div>
);

export default App;
