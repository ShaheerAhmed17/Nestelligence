'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ZillowListings() {
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchZillowListings = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/Zillow', { params: { city, state } });
        setListings(res.data.props?.searchList?.results || []);
      } catch (error) {
        console.error('Error fetching Zillow listings:', error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchZillowListings();
  }, [city, state]);

  return (
    <section className="py-20 bg-background text-white" id="zillow-listings">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">🏡 Zillow Property Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <select onChange={e => setCity(e.target.value)} value={city} className="bg-white/10 px-3 py-2 rounded">
            <option value="San Francisco">San Francisco</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
          </select>

          <select onChange={e => setState(e.target.value)} value={state} className="bg-white/10 px-3 py-2 rounded">
            <option value="CA">CA</option>
            <option value="NY">NY</option>
            <option value="TX">TX</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center">Loading listings...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {listings.length > 0 ? listings.map((listing: any, index: number) => (
              <div key={index} className="bg-card rounded overflow-hidden border border-white/10 hover:shadow-xl transition">
                <img src={listing.imgSrc} alt={listing.address} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{listing.address}</h3>
                  <p className="text-primary font-bold">{listing.price}</p>
                  <p className="text-sm">🛏 {listing.beds} Bed · 🛁 {listing.baths} Bath</p>
                </div>
              </div>
            )) : <p className="text-center col-span-full">No listings found for the selected area.</p>}
          </div>
        )}
      </div>
    </section>
  );
}
