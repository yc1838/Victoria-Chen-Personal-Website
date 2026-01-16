
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Smartphone, Globe, Layers, Zap, Clock, ArrowRight } from 'lucide-react';

// --- SYSTEM UNIFICATION DIAGRAM (Replaces Surface Code) ---
export const SystemUnificationDiagram: React.FC = () => {
  // Visualizes the unification of 4 fragmented systems into one pipeline
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [unified, setUnified] = useState(false);

  // Nodes representing legacy fragmented systems
  const nodes = [
    { id: 1, x: '20%', y: '20%', label: 'Legacy A' },
    { id: 2, x: '80%', y: '20%', label: 'Legacy B' },
    { id: 3, x: '20%', y: '80%', label: 'Legacy C' },
    { id: 4, x: '80%', y: '80%', label: 'Legacy D' },
  ];

  const handleUnify = () => {
    setUnified(!unified);
    setActiveNode(null);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-800">Interactive: System Unification</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        Click <strong>Unify Architecture</strong> to visualize how 4 fragmented registration systems were consolidated into a modern, centralized pipeline.
      </p>
      
      <div className="relative w-72 h-72 bg-[#F5F4F0] rounded-lg border border-stone-200 p-4 overflow-hidden">
         {/* Central Unified Core */}
         <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div 
                className={`w-20 h-20 rounded-full flex items-center justify-center border-2 bg-stone-900 text-white shadow-lg z-20 transition-all duration-500`}
                animate={{ scale: unified ? 1.2 : 1 }}
            >
                <Layers size={32} className="text-nobel-gold" />
            </motion.div>
         </div>

         {/* Connection Lines */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {nodes.map((node) => (
                 <motion.line 
                    key={`line-${node.id}`}
                    x1="50%" y1="50%"
                    x2={node.x} y2={node.y}
                    stroke="#C5A059"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: unified ? 1 : 0, opacity: unified ? 0.5 : 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                 />
            ))}
         </svg>

         {/* Legacy Nodes */}
         {nodes.map((node) => (
             <motion.div
                key={`node-${node.id}`}
                className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border border-stone-300 flex items-center justify-center text-xs font-bold z-10 cursor-pointer shadow-sm bg-white hover:border-nobel-gold`}
                style={{ left: node.x, top: node.y }}
                animate={{ 
                    x: unified ? (node.id === 1 || node.id === 3 ? 40 : -40) : 0,
                    y: unified ? (node.id === 1 || node.id === 2 ? 40 : -40) : 0,
                    opacity: unified ? 0 : 1
                }}
                transition={{ duration: 0.8 }}
                onClick={() => setActiveNode(node.id)}
             >
                <Database size={16} className="text-stone-500" />
             </motion.div>
         ))}
      </div>

      <button 
        onClick={handleUnify}
        className="mt-8 px-6 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-colors shadow-lg flex items-center gap-2"
      >
        <Zap size={14} className={unified ? "text-nobel-gold" : "text-stone-400"} />
        {unified ? "Reset Architecture" : "Unify Architecture"}
      </button>
      
      <div className="mt-4 h-6 text-sm font-serif italic text-stone-600">
        {unified ? "Systems consolidated. Cross-platform compatibility achieved." : "4 fragmented endpoints mapped."}
      </div>
    </div>
  );
};

// --- DATA PIPELINE DIAGRAM (Replaces Transformer Decoder) ---
export const DataPipelineDiagram: React.FC = () => {
  // Visualizes Request -> API Gateway -> Processing -> Cache/DB
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-900">Meta Artifact Pipeline</h3>
      <p className="text-sm text-stone-600 mb-6 text-center max-w-md">
        Automated delivery system retrieving ML model metadata via GraphQL and caching assets for Instagram/Facebook.
      </p>

      <div className="relative w-full max-w-lg h-56 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center gap-4 md:gap-8 p-4">
        
        {/* Stage 1: Client/Request */}
        <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 0 ? 'border-nobel-gold bg-nobel-gold/10' : 'border-stone-200 bg-stone-50'}`}>
                <Smartphone size={24} className={step === 0 ? 'text-stone-900' : 'text-stone-400'} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">App</span>
        </div>

        {/* Arrow */}
        <div className="text-stone-300"><ArrowRight size={20}/></div>

        {/* Stage 2: GraphQL/API */}
        <div className="flex flex-col items-center gap-2 relative z-10">
             <div className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 ${step === 1 ? 'border-stone-800 bg-stone-900 text-white' : 'border-stone-200 bg-stone-50'}`}>
                <Globe size={24} className={step === 1 ? 'text-nobel-gold animate-pulse' : 'text-stone-300'} />
             </div>
             <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">GraphQL</span>
        </div>

        {/* Arrow */}
        <div className="text-stone-300"><ArrowRight size={20}/></div>

        {/* Stage 3: Cache/Storage */}
        <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 2 ? 'border-blue-500 bg-blue-50' : 'border-stone-200 bg-stone-50'}`}>
                <Server size={24} className={step === 2 ? 'text-blue-600' : 'text-stone-400'} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Cache</span>
        </div>
        
         {/* Arrow */}
         <div className="text-stone-300"><ArrowRight size={20}/></div>

         {/* Stage 4: Delivery */}
        <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 3 ? 'border-green-500 bg-green-50' : 'border-stone-200 bg-stone-50'}`}>
                <Layers size={24} className={step === 3 ? 'text-green-600' : 'text-stone-400'} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Artifact</span>
        </div>
        
        {/* Animated Packet */}
        <motion.div 
            className="absolute w-3 h-3 bg-nobel-gold rounded-full z-0"
            animate={{ 
                left: ['10%', '35%', '60%', '85%'],
                opacity: [0, 1, 1, 0]
            }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            style={{ top: '38%' }}
        />

      </div>

      <div className="flex gap-2">
          {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-nobel-gold' : 'w-2 bg-stone-300'}`}></div>
          ))}
      </div>
    </div>
  );
};

// --- LATENCY OPTIMIZATION CHART (Replaces Performance Metric) ---
export const LatencyOptimizationChart: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-nobel-gold">Query Latency Reduction</h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    Optimizing SQL algorithms and introducing caching strategies for high-traffic endpoints resulted in massive performance gains.
                </p>
                <div className="mt-6 space-y-4">
                     <div className="flex items-center gap-3 text-sm text-stone-300">
                        <span className="w-3 h-3 bg-stone-600 rounded-sm"></span>
                        Legacy Endpoints (~1000ms)
                     </div>
                     <div className="flex items-center gap-3 text-sm text-nobel-gold">
                        <span className="w-3 h-3 bg-nobel-gold rounded-sm shadow-[0_0_10px_rgba(197,160,89,0.5)]"></span>
                        Optimized System (~20ms)
                     </div>
                </div>
                <div className="mt-8 font-mono text-xs text-stone-500 flex items-center gap-2">
                    <Clock size={14} className="text-nobel-gold" /> 
                    <span>RESPONSE TIME (LOWER IS BETTER)</span>
                </div>
            </div>
            
            <div className="relative w-full md:w-80 h-72 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 flex justify-center items-end gap-8">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                   <div className="w-full h-px bg-stone-400"></div>
                   <div className="w-full h-px bg-stone-400"></div>
                   <div className="w-full h-px bg-stone-400"></div>
                   <div className="w-full h-px bg-stone-400"></div>
                   <div className="w-full h-px bg-stone-400"></div>
                </div>

                {/* Legacy Bar */}
                <div className="w-20 flex flex-col items-center z-10 h-full justify-end">
                    <div className="relative w-full h-full flex items-end">
                         {/* Label at top of bar (which is top of container) */}
                         <div className="absolute top-0 w-full text-center -mt-8 text-sm font-mono text-stone-400 font-bold bg-stone-900/80 px-1 rounded">1s+</div>
                         <motion.div 
                            className="w-full bg-stone-600 rounded-t-md border-t border-x border-stone-500/30"
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                    <div className="mt-3 h-6 flex items-center text-xs font-bold text-stone-500 uppercase tracking-wider">Before</div>
                </div>

                {/* Optimized Bar */}
                <div className="w-20 flex flex-col items-center z-10 h-full justify-end">
                     <div className="relative w-full h-full flex items-end">
                        {/* Label just above the 5% bar */}
                        <motion.div 
                            className="absolute w-full text-center text-sm font-mono text-nobel-gold font-bold bg-stone-900/80 px-1 rounded"
                            style={{ bottom: '15%' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1 }}
                        >
                            20ms
                        </motion.div>
                        <motion.div 
                            className="w-full bg-nobel-gold rounded-t-md shadow-[0_0_20px_rgba(197,160,89,0.25)] relative overflow-hidden"
                            initial={{ height: 0 }}
                            whileInView={{ height: "5%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5, type: "spring" }}
                        >
                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                        </motion.div>
                    </div>
                     <div className="mt-3 h-6 flex items-center text-xs font-bold text-nobel-gold uppercase tracking-wider">After</div>
                </div>
                
                {/* 50x Label */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 }}
                    className="absolute top-6 right-6 bg-white text-stone-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 z-20"
                >
                    50x FASTER
                </motion.div>
            </div>
        </div>
    )
}
