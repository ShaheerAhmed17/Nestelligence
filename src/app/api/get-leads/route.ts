import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function GET() {
  // Check for required environment variables
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.log('Google Sheets credentials not set. Indicating misconfiguration.');
    return NextResponse.json({ configured: false, leads: [] });
  }

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Full scope for read/write
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    // Convert GoogleSpreadsheetRow objects to plain objects.
    const leads = rows.map(row => {
        const rowData: { [key: string]: any } = {};
        sheet.headerValues.forEach(header => {
            rowData[header] = row.get(header);
        });
        return rowData;
    });

    // Return in reverse chronological order
    return NextResponse.json({ configured: true, leads: leads.reverse() });

  } catch (error) {
    console.error('!!! Google Sheets Read Error !!!');
    console.error('Could not read leads from Google Sheets. Please check your credentials and sheet permissions.');
    console.error('Error Details:', error);
    return NextResponse.json({ error: 'Failed to fetch leads from Google Sheets. Check server logs for details.' }, { status: 500 });
  }
}
