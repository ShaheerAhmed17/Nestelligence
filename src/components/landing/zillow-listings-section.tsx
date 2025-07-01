'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

interface Listing {
  id: string; // Switched from zpid to RealtyMole's id
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  imgSrc: string;
}

export default function ZillowListings() {
  const [location, setLocation] = useState('San Francisco,CA');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const [city, state] = location.split(',');

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/realtymole', { params: { city, state } });
        const mappedListings = (response.data || []).map((p: any) => ({
          id: p.id,
          address: p.formattedAddress,
          price: p.price ? `$${p.price.toLocaleString()}` : 'Price not available',
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          imgSrc: p.photos?.[0] || `https://placehold.co/600x400.png`,
        })).filter((p: any) => p.id); // Ensure property has an ID
        
        setListings(mappedListings.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch RealtyMole listings:", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    if (city && state) {
      fetchListings();
    }
  }, [location, city, state]);

  return (
    <section className="py-20 bg-background text-white" id="zillow-listings">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">🏡 Featured Property Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Select onValueChange={setLocation} value={location}>
            <SelectTrigger className="bg-white/10 px-3 py-2 rounded">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="San Francisco,CA">San Francisco, CA</SelectItem>
              <SelectItem value="New York,NY">New York, NY</SelectItem>
              <SelectItem value="Los Angeles,CA">Los Angeles, CA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="bg-card rounded-lg overflow-hidden border border-white/10">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardContent>
                </Card>
              ))
            ) : listings.length > 0 ? listings.map((listing: Listing) => (
              <Link href={`/listings/${listing.id}?city=${encodeURIComponent(city)}&state=${state}`} key={listing.id} className="block h-full">
                <Card className="bg-card rounded-lg overflow-hidden border border-white/10 hover:shadow-xl hover:border-primary transition-all duration-300 h-full flex flex-col">
                <img src={listing.imgSrc} alt={listing.address} className="h-48 w-full object-cover" data-ai-hint="modern house" />
                <CardContent className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold truncate flex-grow">{listing.address}</h3>
                    <p className="text-primary font-bold mt-1">{listing.price}</p>
                    <p className="text-sm mt-1">
                      {listing.bedrooms ? `🛏 ${listing.bedrooms} Bed` : ''}
                      {listing.bedrooms && listing.bathrooms ? ' · ' : ''}
                      {listing.bathrooms ? `🛁 ${Math.round(listing.bathrooms)} Bath` : ''}
                    </p>
                </CardContent>
                </Card>
              </Link>
            )) : <p className="text-center col-span-full py-8">No listings found for the selected area.</p>}
        </div>
      </div>
    </section>
  );
}
