export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  image: string;
  featured: boolean;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    price: 1250000,
    location: 'Beverly Hills, CA',
    type: 'house',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4500,
    description: 'Stunning contemporary villa with panoramic city views, infinity pool, and smart home features.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    featured: true,
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    price: 890000,
    location: 'Manhattan, NY',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    description: 'Exclusive penthouse in the heart of the city with floor-to-ceiling windows and private terrace.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    featured: true,
  },
  {
    id: '3',
    title: 'Coastal Beach House',
    price: 1750000,
    location: 'Malibu, CA',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    description: 'Beachfront paradise with direct ocean access, wrap-around deck, and sunset views.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    featured: true,
  },
  {
    id: '4',
    title: 'Urban Loft',
    price: 425000,
    location: 'Brooklyn, NY',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1100,
    description: 'Industrial-chic loft with exposed brick, high ceilings, and open floor plan.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    featured: false,
  },
  {
    id: '5',
    title: 'Suburban Family Home',
    price: 575000,
    location: 'Austin, TX',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    description: 'Spacious family home in top-rated school district with large backyard and updated kitchen.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    featured: false,
  },
  {
    id: '6',
    title: 'Luxury Condo',
    price: 650000,
    location: 'Miami, FL',
    type: 'condo',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    description: 'High-rise luxury condo with resort-style amenities, bay views, and modern finishes.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    featured: false,
  },
  {
    id: '7',
    title: 'Historic Townhouse',
    price: 980000,
    location: 'Boston, MA',
    type: 'townhouse',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    description: 'Charming brownstone with original details, private garden, and modern updates.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    featured: false,
  },
  {
    id: '8',
    title: 'Mountain Retreat',
    price: 825000,
    location: 'Aspen, CO',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2400,
    description: 'Cozy mountain home with ski-in/ski-out access, hot tub, and breathtaking views.',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    featured: false,
  },
];

export const propertyTypes = ['house', 'apartment', 'condo', 'townhouse'] as const;
export const locations = Array.from(new Set(properties.map(p => p.location)));
