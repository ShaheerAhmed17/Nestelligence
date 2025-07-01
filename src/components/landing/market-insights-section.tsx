'use client';

interface Property {
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
}

const mockData: Property[] = [
  {
    address: '123 Luxury Lane, Beverly Hills, CA',
    price: 5250000,
    bedrooms: 5,
    bathrooms: 6,
  },
  {
    address: '456 Ocean Drive, Malibu, CA',
    price: 7800000,
    bedrooms: 4,
    bathrooms: 5,
  },
  {
    address: '789 Skyline View, Hollywood Hills, CA',
    price: 3100000,
    bedrooms: 3,
    bathrooms: 4,
  },
  {
    address: '101 Sunset Blvd, Los Angeles, CA',
    price: 4500000,
    bedrooms: 4,
    bathrooms: 4,
  },
];

export default function MarketInsightsSection() {
  return (
    <section
      className="py-20 md:py-32 bg-background text-white"
      id="market-insights"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          📊 Market Insights
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {mockData.map((property, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-white/10 bg-card hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {property.address}
              </h3>
              <p>💵 Price: ${property.price.toLocaleString()}</p>
              <p>🛏 Bedrooms: {property.bedrooms}</p>
              <p>🛁 Bathrooms: {property.bathrooms}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
