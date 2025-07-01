'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import axios from 'axios';

export const getPropertyDataForCity = ai.defineTool(
  {
    name: 'getPropertyDataForCity',
    description: 'Fetches real estate property data for a given US city and state. Use this to compare markets.',
    inputSchema: z.object({
      city: z.string().describe('The US city to fetch property data for, e.g., "Los Angeles".'),
      state: z.string().describe('The two-letter state abbreviation, e.g., "CA".'),
    }),
    outputSchema: z.object({
      averagePrice: z.number().optional().describe('The average price of properties in the city.'),
      propertyCount: z.number().describe('The number of properties found for the city.'),
    }),
  },
  async (input) => {
    try {
      // In a server environment, we need to call the full URL.
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
      const response = await axios.get(`${baseUrl}/api/realtymole`, { params: { city: input.city, state: input.state } });
      const properties: any[] = response.data;
      
      if (!properties || properties.length === 0) {
        return { propertyCount: 0 };
      }

      const validProperties = properties.filter(p => p.price);
      if (validProperties.length === 0) {
          return { propertyCount: 0 };
      }
      const averagePrice = validProperties.reduce((acc, p) => acc + p.price, 0) / validProperties.length;
      
      return {
        averagePrice: isNaN(averagePrice) ? undefined : averagePrice,
        propertyCount: validProperties.length
      };
    } catch (error) {
      console.error(`Error fetching data for ${input.city}, ${input.state} in tool:`, error);
      return { averagePrice: 0, propertyCount: 0 };
    }
  }
);
