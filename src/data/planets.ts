import { PlanetData } from '../store/planetStore'

export const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    description: 'The smallest and innermost planet in the Solar System.',
    textureUrl: '/textures/placeholder.jpg',
    color: '#8C7E6C',
    details: {
      diameter: '4,879 km',
      distance: '57.9 million km',
      temperature: '430°C (day) / -180°C (night)',
      moons: 0,
      dayLength: '176 Earth days',
      yearLength: '88 Earth days',
      gravity: '3.7 m/s²',
      composition: ['Iron', 'Nickel', 'Silicate rocks']
    },
    size: 0.4,
    rotationSpeed: 0.003,
    atmosphereColor: '#A37C6D',
    hasRings: false
  },
  {
    id: 'venus',
    name: 'Venus',
    description: 'Often called Earth\'s sister planet due to similar size.',
    textureUrl: '/textures/placeholder.jpg',
    color: '#E6B98D',
    details: {
      diameter: '12,104 km',
      distance: '108.2 million km',
      temperature: '462°C',
      moons: 0,
      dayLength: '243 Earth days',
      yearLength: '225 Earth days',
      gravity: '8.87 m/s²',
      composition: ['Carbon dioxide', 'Nitrogen', 'Sulfur dioxide']
    },
    size: 0.95,
    rotationSpeed: 0.002,
    atmosphereColor: '#FFD700',
    hasRings: false
  },
  {
    id: 'earth',
    name: 'Earth',
    description: 'Our home planet and the only known planet with life.',
    textureUrl: '/textures/placeholder.jpg',
    color: '#2E75B6',
    details: {
      diameter: '12,742 km',
      distance: '149.6 million km',
      temperature: '15°C (average)',
      moons: 1,
      dayLength: '24 hours',
      yearLength: '365.25 days',
      gravity: '9.81 m/s²',
      composition: ['Nitrogen', 'Oxygen', 'Argon']
    },
    size: 1,
    rotationSpeed: 0.005,
    atmosphereColor: '#4B77BE',
    hasRings: false
  },
  {
    id: 'mars',
    name: 'Mars',
    description: 'The Red Planet, named after the Roman god of war.',
    textureUrl: '/textures/placeholder.jpg',
    color: '#C1440E',
    details: {
      diameter: '6,779 km',
      distance: '227.9 million km',
      temperature: '-63°C (average)',
      moons: 2,
      dayLength: '24 hours 37 minutes',
      yearLength: '687 Earth days',
      gravity: '3.72 m/s²',
      composition: ['Carbon dioxide', 'Nitrogen', 'Argon']
    },
    size: 0.53,
    rotationSpeed: 0.004,
    atmosphereColor: '#E27B58',
    hasRings: false
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    description: 'The largest planet in our Solar System.',
    textureUrl: '/textures/placeholder.jpg',
    color: '#C88B3A',
    details: {
      diameter: '139,820 km',
      distance: '778.5 million km',
      temperature: '-110°C (average)',
      moons: 79,
      dayLength: '10 hours',
      yearLength: '11.8 Earth years',
      gravity: '24.79 m/s²',
      composition: ['Hydrogen', 'Helium', 'Methane']
    },
    size: 2.0,
    rotationSpeed: 0.008,
    atmosphereColor: '#E4A853',
    hasRings: true
  },
  {
    id: 'saturn',
    name: 'Saturn',
    description: 'Famous for its spectacular ring system.',
    textureUrl: '/textures/placeholder.jpg',
    color: '#E4B784',
    details: {
      diameter: '116,460 km',
      distance: '1.4 billion km',
      temperature: '-140°C (average)',
      moons: 82,
      dayLength: '10.7 hours',
      yearLength: '29.5 Earth years',
      gravity: '10.44 m/s²',
      composition: ['Hydrogen', 'Helium', 'Methane']
    },
    size: 1.8,
    rotationSpeed: 0.007,
    atmosphereColor: '#F4D03F',
    hasRings: true
  }
]
