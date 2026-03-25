import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { GrokService } from './services/grok.service';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'ai-service' });
});

app.post('/generate', async (req: Request, res: Response) => {
  try {
    const { idea, location, budget } = req.body;
    
    if (!idea) {
      return res.status(400).json({ error: 'Business idea is required' });
    }

    const aiResponseString = await GrokService.generateBusinessData(idea, location, budget);
    console.log('AI Response String:', aiResponseString);
    const aiResponse = JSON.parse(aiResponseString);
    console.log('Parsed AI Response:', JSON.stringify(aiResponse, null, 2));

    res.json(aiResponse);
  } catch (error: any) {
    console.error('!!! AI Generation Error !!!');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
    res.status(500).json({ error: error.message || 'Failed to generate business plan' });
  }
});

app.listen(port, () => {
  console.log(`AI Service listening at http://localhost:${port}`);
});
