import axios from 'axios';
import { BUSINESS_SYSTEM_PROMPT } from '../prompts/business.prompt';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export class GrokService {
  static async generateBusinessData(idea: string, location?: string, budget?: string) {
    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey) {
      throw new Error('GROK_API_KEY is not configured');
    }

    const userPrompt = `
      Idea: ${idea}
      Location: ${location || 'Global'}
      Budget: ${budget || 'Not specified'}
    `;

    try {
      const response = await axios.post(GROQ_URL, {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: BUSINESS_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error('Grok API Error:', error.response?.data || error.message);
      throw new Error('Failed to generate data from Grok');
    }
  }
}
