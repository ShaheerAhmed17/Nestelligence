import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_TITLE = 'Analytics';
const VISITOR_KEY = 'totalVisitors';

async function getAnalyticsSheet() {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !SPREADSHEET_ID) {
        throw new Error('Google Sheets credentials not set.');
    }

    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    let sheet = doc.sheetsByTitle[SHEET_TITLE];
    if (!sheet) {
        sheet = await doc.addSheet({ title: SHEET_TITLE, headerValues: ['Key', 'Value'] });
        await sheet.addRow({ Key: VISITOR_KEY, Value: 0 });
    }
    return sheet;
}

// POST /api/analytics/track-visit - Increments visitor count
export async function POST() {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !SPREADSHEET_ID) {
        return NextResponse.json({ success: false, message: 'Analytics not configured.' });
    }

    try {
        const sheet = await getAnalyticsSheet();
        const rows = await sheet.getRows();
        let visitorRow = rows.find(row => row.get('Key') === VISITOR_KEY);

        if (visitorRow) {
            const currentCount = parseInt(visitorRow.get('Value'), 10) || 0;
            visitorRow.set('Value', currentCount + 1);
            await visitorRow.save();
        } else {
            await sheet.addRow({ Key: VISITOR_KEY, Value: 1 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('!!! Google Sheets Analytics Write Error !!!', error);
        return NextResponse.json({ error: 'Failed to track visit.' }, { status: 500 });
    }
}
