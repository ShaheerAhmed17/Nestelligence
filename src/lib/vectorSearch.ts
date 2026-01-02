import properties from "../../data/properties_emb.json";

function cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

export function searchProperties(queryEmbedding: number[], topK = 3) {
    const results = properties
        .map((p: any) => ({
            ...p,
            score: cosineSimilarity(queryEmbedding, p.embedding),
        }))
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, topK);

    return results;
}
