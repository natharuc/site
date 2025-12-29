import { NextRequest } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB || 'megasena';
const collectionName = 'votes';

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!uri) {
    throw new Error('MONGODB_URI não está configurado no arquivo .env');
  }

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

// Server-Sent Events para mudanças em tempo real
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bolaoId = searchParams.get('bolaoId');

  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const client = await connectToDatabase();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Configurar Change Stream
        const pipeline = bolaoId 
          ? [{ $match: { 'fullDocument.bolaoId': bolaoId } }]
          : [];

        const changeStream = collection.watch(pipeline, { 
          fullDocument: 'updateLookup' 
        });

        // Enviar mensagem inicial de conexão
        const data = encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);
        controller.enqueue(data);

        // Escutar mudanças
        changeStream.on('change', (change) => {
          console.log('Change detected:', change.operationType);
          
          // Apenas processar eventos que têm fullDocument
          if (change.operationType === 'insert' || 
              change.operationType === 'update' || 
              change.operationType === 'replace') {
            const eventData = {
              type: change.operationType,
              document: 'fullDocument' in change ? change.fullDocument : null,
              timestamp: new Date().toISOString()
            };

            const message = encoder.encode(`data: ${JSON.stringify(eventData)}\n\n`);
            controller.enqueue(message);
          } else if (change.operationType === 'delete') {
            // Para delete, enviar apenas o tipo
            const eventData = {
              type: 'delete',
              documentId: 'documentKey' in change ? change.documentKey : null,
              timestamp: new Date().toISOString()
            };

            const message = encoder.encode(`data: ${JSON.stringify(eventData)}\n\n`);
            controller.enqueue(message);
          }
        });

        changeStream.on('error', (error) => {
          console.error('Change stream error:', error);
          controller.close();
        });

        // Cleanup quando a conexão for fechada
        request.signal.addEventListener('abort', () => {
          changeStream.close();
          controller.close();
        });

        // Keep-alive a cada 30 segundos
        const keepAliveInterval = setInterval(() => {
          try {
            const keepAlive = encoder.encode(': keep-alive\n\n');
            controller.enqueue(keepAlive);
          } catch (error) {
            clearInterval(keepAliveInterval);
          }
        }, 30000);

        request.signal.addEventListener('abort', () => {
          clearInterval(keepAliveInterval);
        });

      } catch (error) {
        console.error('Stream error:', error);
        const errorMsg = encoder.encode(`data: ${JSON.stringify({ 
          type: 'error', 
          message: error instanceof Error ? error.message : 'Unknown error' 
        })}\n\n`);
        controller.enqueue(errorMsg);
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
