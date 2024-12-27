import { motion } from 'framer-motion'
import Button from '../components/Button'
import PlanetDetail from '../components/PlanetDetail'
import { usePlanetStore } from '../store/planetStore'
import Scene3D from '../components/Scene3D'
import Planet3D from '../components/Planet3D'
import LoadingSpinner from '../components/LoadingSpinner'

const Planets = () => {
  const { planets, selectedPlanet, setSelectedPlanet, searchQuery, setSearchQuery } = usePlanetStore()

  const filteredPlanets = planets.filter(planet =>
    planet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    planet.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
          Explore Our Solar System
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover the wonders of space and learn about the planets in our cosmic neighborhood
        </p>
      </motion.div>

      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search planets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredPlanets.map((planet, index) => (
          <motion.div
            key={planet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 backdrop-blur-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-800 hover:border-blue-500/50"
          >
            <div className="h-64 relative">
              <Scene3D>
                <Planet3D
                  textureUrl={planet.textureUrl}
                  size={planet.size}
                  rotationSpeed={planet.rotationSpeed}
                  atmosphereColor={planet.atmosphereColor}
                  rings={planet.hasRings}
                />
              </Scene3D>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">{planet.name}</h3>
              <p className="text-gray-300 mb-4">{planet.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm">
                  {planet.details.temperature}
                </span>
                <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-sm">
                  {planet.details.moons} {planet.details.moons === 1 ? 'moon' : 'moons'}
                </span>
                <span className="px-2 py-1 bg-pink-500/10 text-pink-400 rounded-lg text-sm">
                  {planet.details.yearLength}
                </span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedPlanet(planet)}
              >
                Explore Planet
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPlanet && (
        <PlanetDetail
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </div>
  )
}

export default Planets
