'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const REALTYMOLE_API_KEY = 'b78e623394f0428cbab530eacf0823fe';
const BAYUT_API_KEY = 'cb18f8fec3mshb0a723975bd6629p17029ejsn1837b831094c';

export default function MarketInsights() {
  const [averagePrices, setAveragePrices] = useState<any>(null);
  const [bayutListings, setBayutListings] = useState<any[]>([]);
  const cities = ['Dubai', 'Karachi', 'Lahore', 'London'];

  useEffect(() => {
    // Fetch average prices for each city
    async function fetchRealtyMole() {
      const results: any = {};
      for (const city of cities) {
        const res = await axios.get(
          `https://api.realtymole.com/properties?city=${encodeURIComponent(city)}`,
          {
            headers: {
              'X-Api-Key': REALTYMOLE_API_KEY
            }
          }
        );
        results[city] = res.data.length > 0
          ? (res.data.reduce((acc: number, item: any) => acc + item.price, 0) / res.data.length).toFixed(0)
          : 'N/A';
      }
      setAveragePrices(results);
    }

    async function fetchBayutTrending() {
      const options = {
        method: 'GET',
        url: 'https://bayut.p.rapidapi.com/properties/list',
        params: {
          locationExternalIDs: '5002', // Dubai as an example
          purpose: 'for-sale',
          hitsPerPage: '6',
          page: '0',
          lang: 'en',
          sort: 'city-level-score',
          rentFrequency: 'monthly',
          categoryExternalID: '4'
        },
        headers: {
          'x-rapidapi-key': BAYUT_API_KEY,
          'x-rapidapi-host': 'bayut.p.rapidapi.com'
        }
      };

      try {
        const res = await axios.request(options);
        setBayutListings(res.data?.hits || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRealtyMole();
    fetchBayutTrending();
  }, []);

  return (
    <section id="market" className="py-20 md:py-32 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-12">
          Live Market Insights 🌍
        </h2>

        {/* Average Prices */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-12">
          {averagePrices && Object.entries(averagePrices).map(([city, price]) => (
            <div key={city} className="p-6 border border-primary/30 rounded-lg bg-card shadow-md shadow-primary/10">
              <h3 className="text-xl font-semibold mb-2">{city}</h3>
              <p className="text-2xl text-primary font-bold">{price !== 'N/A' ? `$${price}` : 'Data N/A'}</p>
              <p className="text-sm text-foreground/60 mt-1">Avg. Property Price</p>
            </div>
          ))}
        </div>

        {/* Trending Listings */}
        <h3 className="text-2xl font-headline font-bold mb-6 text-center">
          🔥 Trending Listings (Bayut)
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {bayutListings.map((listing, index) => (
            <div key={index} className="bg-card p-4 rounded-lg shadow-md border border-border/40 hover:border-primary transition-all duration-300">
              <img src={listing.coverPhoto?.url} alt={listing.title} className="w-full h-48 object-cover rounded mb-4" />
              <h4 className="font-semibold text-lg">{listing.title}</h4>
              <p className="text-primary font-bold mt-1">AED {listing.price}</p>
              <p className="text-sm text-foreground/60">{listing.location?.map((loc: any) => loc.name).join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
