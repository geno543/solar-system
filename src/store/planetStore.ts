import { create } from 'zustand'
import { planets as planetsData } from '../data/planets'

export interface PlanetData {
  id: string
  name: string
  description: string
  textureUrl: string
  color: string
  details: {
    diameter: string
    distance: string
    temperature: string
    moons: number
    dayLength: string
    yearLength: string
    gravity: string
    composition: string[]
  }
  size: number
  rotationSpeed: number
  atmosphereColor: string
  hasRings: boolean
  normalMap?: string
  specularMap?: string
  emissiveMap?: string
  cloudsMap?: string
}

interface PlanetStore {
  planets: PlanetData[]
  selectedPlanet: PlanetData | null
  setSelectedPlanet: (planet: PlanetData | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const usePlanetStore = create<PlanetStore>((set) => ({
  planets: planetsData,
  selectedPlanet: null,
  setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query })
}))
