// src/app/api/realtymole/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city') || 'Los Angeles';

  try {
    const response = await axios.get('https://realty-mole-property-api.p.rapidapi.com/properties', {
      params: {
        city,
        state: 'CA',
        limit: 5,
      },
      headers: {
        'X-RapidAPI-Key': 'b78e623394f0428cbab530eacf0823fe',
        'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching from Realty Mole API:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
