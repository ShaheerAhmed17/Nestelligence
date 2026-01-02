'use client';

import { useState, useMemo } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyFilters } from '@/components/PropertyFilters';
import { properties, Property } from '@/data/properties';

export default function Properties() {
    const [search, setSearch] = useState('');
    const [type, setType] = useState('all');
    const [location, setLocation] = useState('all');
    const [priceRange, setPriceRange] = useState('all');

    const filteredProperties = useMemo(() => {
        return properties.filter((property: Property) => {
            // Search filter
            const searchLower = search.toLowerCase();
            const matchesSearch =
                !search ||
                property.title.toLowerCase().includes(searchLower) ||
                property.description.toLowerCase().includes(searchLower) ||
                property.location.toLowerCase().includes(searchLower);

            // Type filter
            const matchesType = type === 'all' || property.type === type;

            // Location filter
            const matchesLocation = location === 'all' || property.location === location;

            // Price range filter
            let matchesPrice = true;
            if (priceRange !== 'all') {
                if (priceRange === '2000000+') {
                    matchesPrice = property.price >= 2000000;
                } else {
                    const [min, max] = priceRange.split('-').map(Number);
                    matchesPrice = property.price >= min && property.price <= max;
                }
            }

            return matchesSearch && matchesType && matchesLocation && matchesPrice;
        });
    }, [search, type, location, priceRange]);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="pt-28 lg:pt-32 pb-8 bg-muted">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
                            Browse Our Properties
                        </h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Explore our extensive collection of homes, apartments, and condos. Use the filters to find your perfect match.
                        </p>
                    </div>

                    <PropertyFilters
                        search={search}
                        onSearchChange={setSearch}
                        type={type}
                        onTypeChange={setType}
                        location={location}
                        onLocationChange={setLocation}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                    />
                </div>
            </section>

            {/* Properties Grid */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-muted-foreground">
                            Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span>{' '}
                            {filteredProperties.length === 1 ? 'property' : 'properties'}
                        </p>
                    </div>

                    {filteredProperties.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {filteredProperties.map((property, index) => (
                                <div
                                    key={property.id}
                                    className="animate-scale-in"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-10 h-10 text-muted-foreground"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                                No properties found
                            </h3>
                            <p className="text-muted-foreground">
                                Try adjusting your filters to see more results.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
