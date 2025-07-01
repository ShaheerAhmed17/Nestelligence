'use client';

import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle, Bed, Bath, Home } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface RealtyMoleProperty {
  id: string;
  formattedAddress: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  description: string;
  photos: string[];
  propertyType: string;
}

function ListingDetailViewContent({ zpid }: { zpid: string }) {
  const [property, setProperty] = useState<RealtyMoleProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!zpid) return;

    const city = searchParams.get('city');
    const state = searchParams.get('state');

    if (!city || !state) {
      setError('Missing location information to fetch property details.');
      setLoading(false);
      return;
    }

    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/realtymole', { params: { city, state } });
        const allProperties: any[] = response.data || [];
        const foundProperty = allProperties.find(p => p.id === zpid);
        
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          setError('Could not find property details. It may no longer be available.');
        }

      } catch (err) {
        console.error('Failed to fetch property details:', err);
        setError('Could not load property details. There was an issue with the data provider.');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [zpid, searchParams]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Property Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-destructive/10 border-destructive text-center">
          <CardContent className="p-8">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-destructive mb-2">An Error Occurred</h2>
            <p className="text-destructive/80">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!property) {
      return (
        <div className="container mx-auto px-4 py-8 text-center">
            <p>Property not found.</p>
        </div>
      );
  }

  const [streetAddress, ...restAddress] = property.formattedAddress.split(',');
  const cityState = restAddress.join(',').trim();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-card border-border overflow-hidden">
        <div className="grid md:grid-cols-2">
            {property.photos && property.photos.length > 0 ? (
                 <img
                    src={property.photos[0]}
                    alt={`Image of ${property.formattedAddress}`}
                    className="w-full h-full object-cover max-h-[600px]"
                    data-ai-hint="house interior"
                />
            ) : (
              <div className="bg-secondary flex items-center justify-center h-full min-h-[300px]">
                <p className="text-muted-foreground">No Image Available</p>
              </div>
            )}
          <div className="p-6 md:p-8 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">{streetAddress || property.formattedAddress}</h1>
            <p className="text-muted-foreground text-lg mb-4">{cityState}</p>
            <p className="text-4xl font-bold text-primary mb-6">{property.price ? `$${property.price.toLocaleString()}` : 'Price not available'}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-secondary p-3 rounded-lg">
                    <Bed className="mx-auto mb-1 text-primary" />
                    <p className="font-bold">{property.bedrooms || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground">Beds</p>
                </div>
                <div className="bg-secondary p-3 rounded-lg">
                    <Bath className="mx-auto mb-1 text-primary" />
                    <p className="font-bold">{property.bathrooms ? Math.round(property.bathrooms) : 'N/A'}</p>
                    <p className="text-xs text-muted-foreground">Baths</p>
                </div>
                 <div className="bg-secondary p-3 rounded-lg">
                    <Home className="mx-auto mb-1 text-primary" />
                    <p className="font-bold">{property.squareFootage?.toLocaleString() || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground">Sqft</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold font-headline mb-2">Description</h2>
            <p className="text-muted-foreground mb-8 flex-grow">{property.description || 'No description available.'}</p>
            
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent mt-auto w-full">
                <a href="/#contact">Contact Agent For This Property</a>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}


export default function ListingDetailView({ zpid }: { zpid: string }) {
  return (
    <Suspense fallback={
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-lg">Loading Property Details...</p>
        </div>
      }>
      <ListingDetailViewContent zpid={zpid} />
    </Suspense>
  )
}
