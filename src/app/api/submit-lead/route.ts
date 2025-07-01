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

  // --- AI-Powered Follow-Up Generation & Messaging ---
  try {
    console.log('Generating AI-powered follow-up messages...');
    const followUpContent = await automatedLeadNurturing({
      leadName: body.name,
      leadEmail: body.email,
      leadPhone: body.phone,
      propertyOfInterest: `${body.propertyType} in ${body.location}`,
      lastInteraction: 'Submitted the lead capture form for a free consultation.',
    });
    
    console.log('--- Generated Email ---');
    console.log(followUpContent.emailMessage);
    console.log('--- Generated SMS ---');
    console.log(followUpContent.textMessage);
    console.log('-----------------------');

    // --- Twilio SMS Integration ---
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

    // --- Twilio WhatsApp Integration ---
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_NUMBER) {
      console.log('Attempting to send WhatsApp message via Twilio...');
      try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        const message = `Hi ${body.name}, thank you for reaching out to Nestelligence! 🏡 Based on your interest in ${body.propertyType} properties around ${body.location} with a budget of ${body.budget}, one of our experts will connect with you shortly. We're excited to help you find your perfect place! — Team Nestelligence 💎`;

        await client.messages.create({
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${body.phone}`, // Ensure this is a valid E.164 format phone number
          body: message,
        });
        console.log('Successfully sent WhatsApp message to', body.phone);
      } catch (whatsAppError) {
        console.error('!!! Twilio WhatsApp Sending Error !!!');
        console.error('Could not send WhatsApp message. Please check your Twilio credentials, ensure the phone number is in E.164 format, and that the Twilio WhatsApp sandbox is configured.');
        console.error('Error Details:', whatsAppError);
      }
    } else {
      console.log('Twilio WhatsApp number not provided. Skipping WhatsApp integration.');
    }

  } catch (error) {
    // Log any errors from the AI flow but don't block the user response.
    console.error('!!! AI Follow-Up Generation Error !!!');
    console.error('Could not generate follow-up messages. Please check the Genkit flow.');
    console.error('Error Details:', error);
  }


  try {
    // --- Google Sheets Integration ---
    if (process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
        console.log('Attempting to save lead to Google Sheets...');
        const serviceAccountAuth = new JWT({
          email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
          key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

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
    console.error('!!! Google Sheets Integration Error !!!');
    console.error('Could not save lead to Google Sheets. Please check your credentials and sheet permissions.');
    console.error('Error Details:', error);
  }

  return NextResponse.json({ message: 'Lead submitted successfully!' }, { status: 200 });
}
