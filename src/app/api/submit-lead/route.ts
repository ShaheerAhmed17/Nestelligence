// src/app/api/submit-lead/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { automatedLeadNurturing } from '@/ai/flows/automated-lead-nurturing';
import twilio from 'twilio';

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  // Log the received lead data first
  console.log('Received lead submission:', body);

  // --- AI-Powered Follow-Up Generation & SMS Sending ---
  try {
    console.log('Generating AI-powered follow-up messages...');
    const followUpContent = await automatedLeadNurturing({
      leadName: body.name,
      leadEmail: body.email,
      leadPhone: body.phone,
      propertyOfInterest: `${body.propertyType} in ${body.location}`,
      lastInteraction: 'Submitted the lead capture form for a free consultation.',
    });
    
    // For demonstration, we're logging the generated messages.
    // In a real application, you would integrate an email/SMS service here
    // to send these messages automatically.
    console.log('--- Generated Email ---');
    console.log(followUpContent.emailMessage);
    console.log('--- Generated SMS ---');
    console.log(followUpContent.textMessage);
    console.log('-----------------------');

    // --- Twilio SMS Integration ---
    // This section attempts to send the generated text message via Twilio.
    // To make this work, you need to provide your Twilio credentials in your environment variables:
    // TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
        console.log('Attempting to send SMS via Twilio...');
        try {
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            await client.messages.create({
                body: followUpContent.textMessage,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: body.phone, // Ensure this is a valid E.164 format phone number (e.g., +14155238886)
            });
            console.log('Successfully sent SMS via Twilio.');
        } catch (smsError) {
            console.error('!!! Twilio SMS Sending Error !!!');
            console.error('Could not send SMS. Please check your Twilio credentials and ensure the phone number is in E.164 format.');
            console.error('Error Details:', smsError);
        }
    } else {
        console.log('Twilio credentials not set. Skipping SMS integration.');
    }

  } catch (error) {
    // Log any errors from the AI flow but don't block the user response.
    console.error('!!! AI Follow-Up Generation Error !!!');
    console.error('Could not generate follow-up messages. Please check the Genkit flow.');
    console.error('Error Details:', error);
  }


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
          Phone: `'${body.phone}'`,
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
