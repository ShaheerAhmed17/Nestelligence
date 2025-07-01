// src/app/api/realtymole/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');
  const state = searchParams.get('state');

  if (!city || !state) {
    return NextResponse.json({ error: 'City and state parameters are required' }, { status: 400 });
  }

  try {
    const response = await axios.get('https://realty-mole-property-api.p.rapidapi.com/properties', {
      params: {
        city,
        state,
        limit: 50,
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
