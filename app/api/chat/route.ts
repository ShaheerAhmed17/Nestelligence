import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";
import { searchProperties } from "@/lib/vectorSearch";

const WEBSITE_CONTEXT = `
ABOUT Nestelligence:
Nestelligence is a premier real estate agency based in Karachi, Pakistan.
We specialize in buying, selling, and consultation for residential and commercial properties.

CONTACT INFORMATION:
- Phone: +92 311 1283440
- Email: gettoknowshaheer798@gmail.com
- Office Location: Karachi, Pakistan
- Office Hours: Mon-Sat: 9:00 AM - 12:00 PM

SERVICES:
- Property Buying & Selling
- Investment Consultation
- Property Valuation
- Legal Documentation Assistance
`;

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY!);

        // 1️⃣ Embed the user query for property search
        const output = await client.featureExtraction({
            model: "sentence-transformers/all-MiniLM-L6-v2",
            inputs: message,
        });

        // Handle potential array wrapping from the API
        // For a single string input, it usually returns a 1D array (the vector).
        // Safely cast or extract.
        const queryEmbedding = (Array.isArray(output) && Array.isArray(output[0]))
            ? output[0]
            : output;

        // 2️⃣ Search top relevant properties
        const topProperties = searchProperties(queryEmbedding as number[]);

        // 3️⃣ Build context string
        const propertiesContext = topProperties.map((p: any) =>
            `- ${p.title} (${p.type}) in ${p.location}. Price: $${p.price.toLocaleString()}. ${p.bedrooms} bed, ${p.bathrooms} bath. ${p.description}`
        ).join("\n");

        const systemMessage = `
You are a helpful and professional real estate assistant for 'Nestelligence'.
Use the following context to answer the user's question.

${WEBSITE_CONTEXT}

RELEVANT PROPERTIES FOUND:
${propertiesContext || "No specific properties found matching the query."}

INSTRUCTIONS:
- If the user asks about contact info, use the specific details provided.
- If the user asks for properties, recommend the ones listed above.
- Be polite and concise.
`;

        // 4️⃣ Chat Completion
        // Note: We merge system prompt into user message because some inference providers 
        // on the free tier strictly enforce roles or don't support 'system'.
        const completion = await client.chatCompletion({
            model: "meta-llama/Meta-Llama-3-8B-Instruct",
            messages: [
                { role: "user", content: systemMessage + "\n\nUser Question: " + message },
            ],
            max_tokens: 500,
        });

        const reply = completion.choices[0]?.message?.content ?? "No reply.";

        return NextResponse.json({ reply });
    } catch (err: any) {
        console.error("Chat API error:", err);
        // Safely log error details if they exist in different structures
        if (err.body) console.error("Error body:", JSON.stringify(err.body, null, 2));
        if (err.response) console.error("Error response:", JSON.stringify(await err.response.text(), null, 2));

        return NextResponse.json({ error: "Failed to fetch reply" }, { status: 500 });
    }
}
