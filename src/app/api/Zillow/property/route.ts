
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const zpid = url.searchParams.get('zpid');

    if (!zpid) {
      return NextResponse.json({ error: 'Missing zpid parameter' }, { status: 400 });
    }

    const options = {
      method: 'GET',
      url: 'https://zillow-com1.p.rapidapi.com/property',
      params: { zpid },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || 'cb18f8fec3mshb0a723975bd6629p17029ejsn1837b831094c',
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    
    // The API response is directly the property object
    return NextResponse.json(response.data);

  } catch (error) {
    console.error('Zillow Property API error:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Zillow' }, { status: 500 });
  }
}
