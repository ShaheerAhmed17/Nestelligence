'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const ALL_AREAS = [
    { city: 'Los Angeles', state: 'CA' },
    { city: 'San Francisco', state: 'CA' },
    { city: 'New York', state: 'NY' },
    { city: 'Miami', state: 'FL' },
    { city: 'Chicago', state: 'IL' },
    { city: 'Houston', state: 'TX' },
    { city: 'Seattle', state: 'WA' },
];

interface Property {
  price: number;
  bedrooms: number;
  bathrooms: number;
  formattedAddress: string;
}

interface ComparisonData {
  name: string;
  city: string;
  state: string;
  avgPrice: number;
  avgBeds: number;
  avgBaths: number;
  propertyCount: number;
}

export default function MarketAnalysisView() {
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<{city: string, state: string}[]>([ALL_AREAS[0], ALL_AREAS[2]]);
  
  const fetchMarketData = async (area: {city: string, state: string}) => {
    try {
      const response = await axios.get('/api/realtymole', { params: { city: area.city, state: area.state } });
      const properties: Property[] = response.data;
      if (!properties || properties.length === 0) return null;

      const validProperties = properties.filter(p => p.price > 0);
      if (validProperties.length === 0) return null;

      const total_price = validProperties.reduce((acc, p) => acc + p.price, 0);
      const total_beds = validProperties.reduce((acc, p) => acc + (p.bedrooms || 0), 0);
      const total_baths = validProperties.reduce((acc, p) => acc + (p.bathrooms || 0), 0);
      
      return {
        name: `${area.city}, ${area.state}`,
        city: area.city,
        state: area.state,
        avgPrice: total_price / validProperties.length,
        avgBeds: total_beds / validProperties.length,
        avgBaths: total_baths / validProperties.length,
        propertyCount: validProperties.length
      };
    } catch (error) {
      console.error(`Failed to fetch data for ${area.city}`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const dataPromises = selectedAreas.map(area => fetchMarketData(area));
      const results = await Promise.all(dataPromises);
      setComparisonData(results.filter(r => r !== null) as ComparisonData[]);
      setLoading(false);
    };

    if (selectedAreas.length > 0) {
        fetchAllData();
    } else {
        setComparisonData([]);
        setLoading(false);
    }
  }, [selectedAreas]);

  const availableAreas = useMemo(() => {
    return ALL_AREAS.filter(a => !selectedAreas.find(sa => sa.city === a.city && sa.state === a.state));
  }, [selectedAreas]);

  const chartConfig = {
    avgPrice: { label: 'Avg. Price', color: 'hsl(var(--primary))' },
  };

  const bedsBathsChartConfig = {
      avgBeds: { label: 'Avg. Beds', color: 'hsl(var(--chart-1))' },
      avgBaths: { label: 'Avg. Baths', color: 'hsl(var(--chart-2))' },
  }

  return (
    <section className="py-16 bg-background text-white" id="market-analysis">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-accent to-primary">
                Market Analysis
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
                Compare real estate markets across different cities with AI-powered insights.
            </p>
        </div>

        <Card className="mb-8 bg-card border-border">
          <CardHeader>
            <CardTitle>City Comparison</CardTitle>
            <CardDescription>Select areas to compare their real estate markets.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
                {selectedAreas.map(area => (
                  <Badge key={`${area.city}-${area.state}`} variant="secondary" className="text-lg py-1 px-3 flex items-center gap-2">
                      {area.city}, {area.state}
                      <button onClick={() => setSelectedAreas(selectedAreas.filter(a => a.city !== area.city || a.state !== area.state))} className="rounded-full hover:bg-muted-foreground/20 p-0.5">
                          <X className="w-4 h-4" />
                      </button>
                  </Badge>
                ))}
            </div>
            <Select onValueChange={(value) => {
                const area = ALL_AREAS.find(a => `${a.city},${a.state}` === value);
                if (area && !selectedAreas.find(sa => sa.city === area.city && sa.state === area.state)) {
                    setSelectedAreas([...selectedAreas, area]);
                }
            }}>
                <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Add an area to compare..." />
                </SelectTrigger>
                <SelectContent>
                    {availableAreas.map(area => (
                        <SelectItem key={`${area.city}-${area.state}`} value={`${area.city},${area.state}`}>{area.city}, {area.state}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {loading ? (
            <div className="text-center py-8">Loading comparison data...</div>
        ) : comparisonData.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Average Property Price</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                  <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="city" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis
                      tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent
                        labelFormatter={(label, payload) => payload?.[0]?.payload.name}
                        formatter={(value) => `$${Number(value).toLocaleString()}`}
                        indicator="dot"
                      />}
                    />
                    <Bar dataKey="avgPrice" name="Average Price" fill="var(--color-avgPrice)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Average Bedrooms vs. Bathrooms</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={bedsBathsChartConfig} className="min-h-[300px] w-full">
                   <BarChart data={comparisonData} margin={{ top: 20, right: 20, bottom: 5 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="city" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis tickFormatter={val => val.toFixed(1)} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent 
                        labelFormatter={(label, payload) => payload?.[0]?.payload.name}
                        indicator="dot" />}
                    />
                    <Bar dataKey="avgBeds" name="Avg. Beds" fill="var(--color-avgBeds)" radius={4} />
                    <Bar dataKey="avgBaths" name="Avg. Baths" fill="var(--color-avgBaths)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        ) : (
             <div className="text-center py-8">No data to display. Please select areas to compare.</div>
        )}
      </div>
    </section>
  );
}
