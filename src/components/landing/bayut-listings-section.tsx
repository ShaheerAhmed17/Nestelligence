'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Property {
  id: number;
  title: string;
  price: number;
  rooms: number;
  baths: number;
  location: { name: string }[];
  coverPhoto?: { url: string };
  purpose: string;
}

export default function BayutListingsSection() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [purpose, setPurpose] = useState('for-sale'); // or "for-rent"

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`/api/realtymole/bayut?purpose=${purpose}`);
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching Bayut listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [purpose]);

  return (
    <section className="py-20 md:py-32 bg-background text-white" id="bayut-listings">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">🏙️ Bayut Property Listings</h2>
          <select
            className="bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
            value={purpose}
            onChange={(e) => {
              setLoading(true);
              setPurpose(e.target.value);
            }}
          >
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center">Loading properties...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="border border-white/10 rounded-lg overflow-hidden bg-card hover:shadow-xl transition"
              >
                {property.coverPhoto?.url && (
                  <img
                    src={property.coverPhoto.url}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{property.title.slice(0, 60)}...</h3>
                  <p className="mt-1 text-primary font-bold text-xl">AED {property.price.toLocaleString()}</p>
                  <p className="text-sm text-foreground/70 mt-1">
                    🛏 {property.rooms} Bed · 🛁 {property.baths} Bath
                  </p>
                  <p className="text-sm text-foreground/50 mt-1">
                    📍 {property.location.map(loc => loc.name).join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
