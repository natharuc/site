import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB || 'megasena';
const collectionName = 'bolaos';

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

// PUT - Atualizar status do bolão (travar/destravar, marcar aposta)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { bolaoId, adminPassword, locked, betPlaced } = body;

    if (!bolaoId || !adminPassword) {
      return NextResponse.json(
        { success: false, error: 'ID do bolão e senha de admin são obrigatórios' },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Buscar bolão
    const bolao = await collection.findOne({ _id: new ObjectId(bolaoId) });

    if (!bolao) {
      return NextResponse.json(
        { success: false, error: 'Bolão não encontrado' },
        { status: 404 }
      );
    }

    // Verificar senha de admin
    if (bolao.adminPassword !== adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Senha de administração incorreta' },
        { status: 401 }
      );
    }

    // Atualizar campos
    const updates: { locked?: boolean; betPlaced?: boolean } = {};
    if (locked !== undefined) updates.locked = locked;
    if (betPlaced !== undefined) updates.betPlaced = betPlaced;

    await collection.updateOne(
      { _id: new ObjectId(bolaoId) },
      { $set: updates }
    );

    return NextResponse.json({
      success: true,
      bolao: {
        ...bolao,
        ...updates,
        id: bolao._id.toString()
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar bolão:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao atualizar bolão',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
