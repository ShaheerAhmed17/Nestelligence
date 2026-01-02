
import fs from 'fs';
import path from 'path';
import { HfInference } from '@huggingface/inference';
import { properties } from '../src/data/properties';

// Load .env manually
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, ...values] = line.split('=');
        if (key && values.length > 0) {
            // Handle quotes
            let value = values.join('=');
            value = value.replace(/^["'](.*)["']$/, '$1'); // Remove surrounding quotes
            if (!process.env[key.trim()]) {
                process.env[key.trim()] = value.trim();
            }
        }
    });
}

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function generateEmbeddings() {
    console.log("Generating embeddings...");
    const propertiesWithEmbeddings = [];

    for (const property of properties) {
        // Construct text representation
        // Type check for property fields to be safe
        const textToEmbed = `${property.title} ${property.description} ${property.location} ${property.type} ${('features' in property) ? property.features : ''}`;

        try {
            const response = await hf.featureExtraction({
                model: "sentence-transformers/all-MiniLM-L6-v2",
                inputs: textToEmbed,
            });

            // Handle response type
            // HfInference featureExtraction returns (number | number[])[] or number[]
            // We want number[]. If it's number[][] (batch), take [0].
            let embedding: number[];

            if (Array.isArray(response)) {
                if (Array.isArray(response[0])) {
                    // It's number[][]
                    embedding = response[0] as number[];
                } else {
                    // It's number[]
                    embedding = response as number[];
                }
            } else {
                console.error("Unexpected response format");
                continue;
            }

            propertiesWithEmbeddings.push({
                ...property,
                embedding: embedding
            });
            console.log(`Generated embedding for ${property.title}`);
        } catch (e) {
            console.error(`Failed for ${property.title}:`, e);
        }
    }

    const outputDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outputDir, 'properties_emb.json'), JSON.stringify(propertiesWithEmbeddings, null, 2));
    console.log("Done.");
}

generateEmbeddings().catch(console.error);
