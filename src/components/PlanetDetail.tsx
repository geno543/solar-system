import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Scene3D from './Scene3D';
import Planet3D from './Planet3D';
import { PlanetData } from '../store/planetStore';
import { useState, useEffect } from 'react';

const DetailItem = ({ label, value, unit = '' }: { label: string; value: string | number; unit?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-black/30 p-3 rounded-lg hover:bg-black/40 transition-colors"
  >
    <span className="text-gray-400">{label}:</span>
    <span className="float-right text-white">{value}{unit}</span>
  </motion.div>
);

interface PlanetDetailProps {
  planet: PlanetData;
  onClose: () => void;
}

const PlanetDetail = ({ planet, onClose }: PlanetDetailProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'composition' | '3d'>('overview');
  const [isRotating, setIsRotating] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'r') setIsRotating(prev => !prev);
      if (e.key === '+') setZoomLevel(prev => Math.min(prev + 0.1, 2));
      if (e.key === '-') setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🌎' },
    { id: 'composition', label: 'Composition', icon: '⚗️' },
    { id: '3d', label: '3D View', icon: '🔄' }
  ] as const;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900/90 rounded-xl overflow-hidden shadow-2xl max-w-6xl w-full"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col h-[80vh]">
            {/* Header */}
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <motion.h2 
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text"
              >
                {planet.name}
              </motion.h2>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  Press 'ESC' to close
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-800">
              <div className="flex space-x-4 p-4">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 space-y-6"
                  >
                    <p className="text-gray-300 text-lg leading-relaxed">{planet.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <DetailItem label="Diameter" value={planet.details.diameter} unit=" km"/>
                        <DetailItem label="Distance from Sun" value={planet.details.distance} unit=" million km"/>
                        <DetailItem label="Temperature" value={planet.details.temperature} unit="°C"/>
                        <DetailItem label="Moons" value={planet.details.moons.toString()} />
                      </div>
                      <div className="space-y-4">
                        <DetailItem label="Day Length" value={planet.details.dayLength} unit=" Earth days"/>
                        <DetailItem label="Year Length" value={planet.details.yearLength} unit=" Earth years"/>
                        <DetailItem label="Gravity" value={planet.details.gravity} unit=" m/s²"/>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'composition' && (
                  <motion.div
                    key="composition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6"
                  >
                    <h3 className="text-xl font-bold mb-4">Atmospheric Composition</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {planet.details.composition.map((element, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-black/30 p-4 rounded-lg border border-gray-800 hover:bg-black/40 transition-colors"
                        >
                          <span className="text-gray-300">{element}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === '3d' && (
                  <motion.div
                    key="3d"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative h-[500px] bg-black/50"
                  >
                    <div className="absolute top-4 left-4 z-10 bg-black/50 p-4 rounded-lg text-sm text-gray-400">
                      <p>Controls:</p>
                      <p>'R' - Toggle rotation</p>
                      <p>'+ / -' - Zoom in/out</p>
                      <p>Mouse drag - Rotate view</p>
                    </div>
                    <Scene3D>
                      <Planet3D
                        textureUrl={planet.textureUrl}
                        size={zoomLevel}
                        rotationSpeed={isRotating ? 0.005 : 0}
                        atmosphereColor={planet.color}
                        rings={planet.hasRings}
                        position={[0, 0, 0]}
                      />
                    </Scene3D>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlanetDetail;
