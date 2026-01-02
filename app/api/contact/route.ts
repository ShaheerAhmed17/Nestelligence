import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// ---------------- Schema ----------------
const contactSchema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email().max(255),
    message: z.string().min(10).max(1000),
});

// ---------------- POST Handler ----------------
export async function POST(req: NextRequest) {
    try {
        console.log('📩 /api/contact HIT');

        // Read body
        const body = await req.json();
        console.log('📨 Incoming body:', body);

        // Validate
        const parsed = contactSchema.parse(body);
        console.log('✅ Parsed data:', parsed);

        // Check env vars
        console.log('🔐 ENV CHECK:', {
            SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
            EMAIL: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            KEY: !!process.env.GOOGLE_PRIVATE_KEY,
        });

        // Google auth
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        // Connect to sheet
        const doc = new GoogleSpreadsheet(
            process.env.GOOGLE_SHEET_ID!,
            serviceAccountAuth
        );

        await doc.loadInfo();
        console.log('📄 Sheet title:', doc.title);

        const sheet = doc.sheetsByIndex[0];
        console.log('📄 Using sheet:', sheet.title);

        // Add row
        await sheet.addRow({
            Name: parsed.name,
            Email: parsed.email,
            Message: parsed.message,
            Date: new Date().toISOString(),
        });

        console.log('✅ Row successfully added');

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('❌ Contact API error:', err);

        return NextResponse.json(
            {
                success: false,
                error: err instanceof Error ? err.message : String(err),
            },
            { status: 500 }
        );
    }
}