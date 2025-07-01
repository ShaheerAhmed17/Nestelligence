'use client';

import { useState } from 'react';
import Image from 'next/image';

const mockListings = [
    {
      imgSrc: 'https://placehold.co/600x400.png',
      address: '123 Main St, San Francisco, CA',
      price: '$1,200,000',
      beds: 3,
      baths: 2,
      city: 'San Francisco',
      state: 'CA',
      'data-ai-hint': 'modern house'
    },
    {
      imgSrc: 'https://placehold.co/600x400.png',
      address: '456 Market St, San Francisco, CA',
      price: '$2,500,000',
      beds: 4,
      baths: 3,
      city: 'San Francisco',
      state: 'CA',
      'data-ai-hint': 'luxury apartment'
    },
    {
      imgSrc: 'https://placehold.co/600x400.png',
      address: '789 Oak St, San Francisco, CA',
      price: '$850,000',
      beds: 2,
      baths: 1,
      city: 'San Francisco',
      state: 'CA',
      'data-ai-hint': 'suburban home'
    },
    {
        imgSrc: 'https://placehold.co/600x400.png',
        address: '101 Broadway, New York, NY',
        price: '$3,100,000',
        beds: 2,
        baths: 2,
        city: 'New York',
        state: 'NY',
        'data-ai-hint': 'city skyscraper'
    },
    {
        imgSrc: 'https://placehold.co/600x400.png',
        address: '202 Park Ave, New York, NY',
        price: '$5,500,000',
        beds: 3,
        baths: 4,
        city: 'New York',
        state: 'NY',
        'data-ai-hint': 'penthouse view'
    },
    {
        imgSrc: 'https://placehold.co/600x400.png',
        address: '303 Rodeo Dr, Los Angeles, CA',
        price: '$10,200,000',
        beds: 5,
        baths: 6,
        city: 'Los Angeles',
        state: 'CA',
        'data-ai-hint': 'mansion estate'
    }
];

export default function ZillowListings() {
  const [location, setLocation] = useState('San Francisco,CA');

  const [city, state] = location.split(',');
  const filteredListings = mockListings.filter(listing => listing.city === city && listing.state === state);

  return (
    <section className="py-20 bg-background text-white" id="zillow-listings">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">🏡 Zillow Property Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <select onChange={e => setLocation(e.target.value)} value={location} className="bg-white/10 px-3 py-2 rounded">
            <option value="San Francisco,CA">San Francisco, CA</option>
            <option value="New York,NY">New York, NY</option>
            <option value="Los Angeles,CA">Los Angeles, CA</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {filteredListings.length > 0 ? filteredListings.map((listing: any, index: number) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden border border-white/10 hover:shadow-xl transition-shadow duration-300">
                <Image src={listing.imgSrc} alt={listing.address} width={600} height={400} className="h-48 w-full object-cover" data-ai-hint={listing['data-ai-hint']} />
                <div className="p-4">
                  <h3 className="font-semibold">{listing.address}</h3>
                  <p className="text-primary font-bold">{listing.price}</p>
                  <p className="text-sm">🛏 {listing.beds} Bed · 🛁 {listing.baths} Bath</p>
                </div>
              </div>
            )) : <p className="text-center col-span-full">No listings found for the selected area.</p>}
        </div>
      </div>
    </section>
  );
}
