// src/components/landing/bayut-listings-section.tsx

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BayutListingsSection() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [purpose, setPurpose] = useState('for-sale');
  const [locationID, setLocationID] = useState('5002');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRooms, setMinRooms] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const q = new URLSearchParams({
          purpose,
          categoryID: '4',
          location: locationID,
          minPrice: minPrice || '0',
          maxPrice: maxPrice || '10000000',
          minRooms: minRooms || '0',
        }).toString();

        const res = await axios.get(`/api/realtymole/bayut?${q}`);
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching Bayut listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [purpose, locationID, minPrice, maxPrice, minRooms]);

  return (
    <section className="py-20 bg-background text-white" id="bayut-listings">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">🏙️ Bayut Property Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <select value={purpose} onChange={e => setPurpose(e.target.value)} className="bg-white/10 px-3 py-2 rounded">
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
          </select>
          <select value={locationID} onChange={e => setLocationID(e.target.value)} className="bg-white/10 px-3 py-2 rounded">
            <option value="5002">Dubai (All)</option>
            {/* you can add more area options here */}
          </select>
          <input type="number" placeholder="Min Price" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="bg-white/10 px-3 py-2 rounded" />
          <input type="number" placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="bg-white/10 px-3 py-2 rounded" />
          <input type="number" placeholder="Min Beds" value={minRooms} onChange={e => setMinRooms(e.target.value)} className="bg-white/10 px-3 py-2 rounded" />
        </div>

        {loading ? (
          <p className="text-center">Loading…</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {properties.map(p => (
              <div key={p.id} className="bg-card rounded overflow-hidden border border-white/10 hover:shadow-xl transition">
                {p.coverPhoto?.url && <img src={p.coverPhoto.url} alt={p.title} className="h-48 w-full object-cover" />}
                <div className="p-4">
                  <h3 className="font-semibold">{p.title.slice(0, 60)}...</h3>
                  <p className="text-primary font-bold">AED {p.price.toLocaleString()}</p>
                  <p className="text-sm">🛏 {p.rooms} Bed · 🛁 {p.baths} Bath</p>
                  <p className="text-sm text-foreground/70">{p.location?.map((l:any) => l.name).join(', ')}</p>
                </div>
              </div>
            ))}
            {properties.length === 0 && <p className="text-center col-span-full">No listings found.</p>}
          </div>
        )}
      </div>
    </section>
  );
}
