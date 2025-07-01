// src/app/api/submit-lead/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  // Log the received lead data first
  console.log('Received lead submission:', body);

  try {
    // --- Google Sheets Integration ---
    // This section attempts to save the lead to Google Sheets.
    // It will only run if you have provided the necessary credentials in your environment variables.
    // To make this work, you need to:
    // 1. Create a Google Sheet and get its ID from the URL.
    // 2. Create a Google Service Account in your Google Cloud project.
    // 3. Enable the Google Sheets API for your project.
    // 4. Share your Google Sheet with the service account's email address.
    // 5. Store your service account credentials and sheet ID in environment variables.
    if (process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
        console.log('Attempting to save lead to Google Sheets...');
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
        console.log('Successfully saved lead to Google Sheets.');
    } else {
        console.log('Google Sheets credentials not set. Skipping Sheets integration.');
    }
  } catch (error) {
    // If saving to Google Sheets fails for any reason, we log the detailed error
    // but do not send a 500 error back to the client. This ensures the user experience
    // is not interrupted by backend configuration issues.
    console.error('!!! Google Sheets Integration Error !!!');
    console.error('Could not save lead to Google Sheets. Please check your credentials and sheet permissions.');
    console.error('Error Details:', error);
  }

  // Always return a success response to the client.
  // This prevents user-facing errors if the Google Sheets integration fails.
  // The lead information is always logged on the server.
  return NextResponse.json({ message: 'Lead submitted successfully!' }, { status: 200 });
}
