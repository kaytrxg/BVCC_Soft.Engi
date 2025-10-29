import "dotenv/config";
import express from 'express';
import cors from 'cors';
import { generateText, generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import OpenAI from 'openai';
import { z } from 'zod';

// Configure providers/clients
const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'AI insight server is running' });
});

// /insight - supports two modes:
// - text (default): returns { insight: string }
// - object: returns structured object { summary, anomalies } using a simple schema
const objectSchema = z.object({
  summary: z.string(),
  anomalies: z.array(z.string()),
});

app.post('/insight', async (req, res) => {
  try {
    const { prompt, mode } = req.body || {};
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    if (mode === 'object') {
      // Return a structured object using the `ai` helper
      const result = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: objectSchema,
        prompt,
      });
      const obj = result?.object;
      return res.json({ summary: obj?.summary ?? '', anomalies: obj?.anomalies ?? [] });
    }

    // Default: plain text insight
    const textResult = await generateText({
      model: openai('gpt-4o-mini'),
      prompt,
      maxTokens: 500,
    });
    const insightText = textResult?.text ?? '';
    return res.json({ insight: insightText });
  } catch (error) {
    console.error('Error on /insight:', error);
    return res.status(500).json({ error: 'AI call failed' });
  }
});

// /generate-image - uses OpenAI images API via openaiClient
app.post('/generate-image', async (req, res) => {
  try {
    const { prompt, size = '1024x1024' } = req.body || {};
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    // Use the images API. Model name may vary; keep it configurable in future.
    const response = await openaiClient.images.generate({
      model: 'dall-e-3',
      prompt,
      size,
      response_format: 'b64_json',
    });

    const b64 = response?.data?.[0]?.b64_json;
    if (!b64) {
      return res.status(502).json({ error: 'No image returned from provider' });
    }
    const dataUrl = `data:image/png;base64,${b64}`;
    return res.json({ image: dataUrl });
  } catch (err) {
    console.error('Error generating image', err);
    return res.status(500).json({ error: 'Image generation failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 AI insight and image server listening on port ${PORT}`);
});
