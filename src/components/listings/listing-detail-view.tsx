'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle, Bed, Bath, Home } from 'lucide-react';

interface PropertyDetails {
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
  };
  price: number;
  bedrooms: number;
  bathrooms: number;
  livingArea: number;
  description: string;
  photos: { url: string }[];
  homeType: string;
}

export default function ListingDetailView({ zpid }: { zpid: string }) {
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!zpid) return;

    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/Zillow/property', { params: { zpid } });
        setProperty(response.data);
      } catch (err) {
        console.error('Failed to fetch property details:', err);
        setError('Could not load property details. It may no longer be available.');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [zpid]);

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

  const fullAddress = `${property.address.streetAddress}, ${property.address.city}, ${property.address.state} ${property.address.zipcode}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-card border-border overflow-hidden">
        <div className="grid md:grid-cols-2">
            {property.photos && property.photos.length > 0 && (
                 <img
                    src={property.photos[0].url}
                    alt={`Image of ${fullAddress}`}
                    className="w-full h-full object-cover max-h-[600px]"
                    data-ai-hint="house interior"
                />
            )}
          <div className="p-6 md:p-8 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">{property.address.streetAddress}</h1>
            <p className="text-muted-foreground text-lg mb-4">{`${property.address.city}, ${property.address.state}`}</p>
            <p className="text-4xl font-bold text-primary mb-6">${property.price.toLocaleString()}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-secondary p-3 rounded-lg">
                    <Bed className="mx-auto mb-1 text-primary" />
                    <p className="font-bold">{property.bedrooms}</p>
                    <p className="text-xs text-muted-foreground">Beds</p>
                </div>
                <div className="bg-secondary p-3 rounded-lg">
                    <Bath className="mx-auto mb-1 text-primary" />
                    <p className="font-bold">{Math.round(property.bathrooms)}</p>
                    <p className="text-xs text-muted-foreground">Baths</p>
                </div>
                 <div className="bg-secondary p-3 rounded-lg">
                    <Home className="mx-auto mb-1 text-primary" />
                    <p className="font-bold">{property.livingArea?.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Sqft</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold font-headline mb-2">Description</h2>
            <p className="text-muted-foreground mb-8 flex-grow">{property.description}</p>
            
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent mt-auto w-full">
                <a href="/#contact">Contact Agent For This Property</a>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
