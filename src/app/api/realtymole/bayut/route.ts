// app/api/bayut/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const purpose = url.searchParams.get('purpose') || 'for-sale';
  const categoryID = url.searchParams.get('categoryID') || '4'; // 4 = apartments
  const locationExternalIDs = url.searchParams.get('location') || '5002'; // Dubai

  const headers = {
    'X-RapidAPI-Key': 'cb18f8fec3mshb0a723975bd6629p17029ejsn1837b831094c',
    'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
  };

  const apiUrl = `https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&hitsPerPage=8&page=0&lang=en&categoryExternalID=${categoryID}`;

  try {
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();
    return NextResponse.json(data.hits);
  } catch (error) {
    console.error('Bayut API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}
