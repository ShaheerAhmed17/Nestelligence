import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const city = url.searchParams.get('city');
    const state = url.searchParams.get('state');

    if (!city || !state) {
      return NextResponse.json({ error: 'Missing city or state parameter' }, { status: 400 });
    }

    const options = {
      method: 'GET',
      url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
      params: {
        location: `${city}, ${state}`,
        home_type: 'Houses',
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || 'cb18f8fec3mshb0a723975bd6629p17029ejsn1837b831094c',
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    
    return NextResponse.json(response.data);

  } catch (error) {
    console.error('Zillow API error:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Zillow' }, { status: 500 });
  }
}
