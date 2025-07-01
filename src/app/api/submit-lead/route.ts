// src/app/api/submit-lead/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// This is the main function that will be called when the API route is requested.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // --- Google Sheets Integration ---
    // To make this work, you need to:
    // 1. Create a Google Sheet and get its ID from the URL.
    // 2. Create a Google Service Account in your Google Cloud project.
    // 3. Enable the Google Sheets API for your project.
    // 4. Share your Google Sheet with the service account's email address.
    // 5. Store your service account credentials and sheet ID in environment variables.

    // For example, in your .env or .env.local file:
    // GOOGLE_SHEET_ID=your_sheet_id_here
    // GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=your_service_account_email@...
    // GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="your_private_key_here"

    // The code below is a template. It is commented out to prevent errors
    // until you have set up your environment variables.

    /*
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
        throw new Error("Google Sheets environment variables are not set.");
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsByTitle[title]`

    // Ensure your Google Sheet has headers that match these keys
    await sheet.addRow({
      Timestamp: new Date().toISOString(),
      Name: body.name,
      Email: body.email,
      Phone: body.phone,
      Location: body.location,
      Budget: body.budget,
      PropertyType: body.propertyType,
    });
    */

    // For now, we'll just log the data to the console.
    // Remove this line once you uncomment the code above.
    console.log('Lead submitted to API. To connect to Google Sheets, follow the instructions in src/app/api/submit-lead/route.ts:', body);

    return NextResponse.json({ message: 'Lead submitted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    // It's better to not expose internal error details to the client
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
