import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

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

// GET - Buscar bolão por nome e senha
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const password = searchParams.get('password');

    if (!name || !password) {
      return NextResponse.json(
        { success: false, error: 'Nome e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const votesCollection = db.collection('votes');

    const bolao = await collection.findOne({ 
      name: name.toLowerCase().trim() 
    });

    if (!bolao) {
      return NextResponse.json(
        { success: false, error: 'Bolão não encontrado' },
        { status: 404 }
      );
    }

    // Verificar senha
    if (bolao.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Senha incorreta' },
        { status: 401 }
      );
    }

    // Contar participantes
    const participants = await votesCollection.countDocuments({ 
      bolaoId: bolao._id.toString() 
    });

    console.log('Bolão ID:', bolao._id.toString(), 'Participantes:', participants);

    return NextResponse.json({
      success: true,
      bolao: {
        id: bolao._id.toString(),
        name: bolao.displayName || bolao.name,
        createdAt: bolao.createdAt,
        createdBy: bolao.createdBy,
        participants
      }
    });
  } catch (error) {
    console.error('Erro ao buscar bolão:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar bolão',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// POST - Criar novo bolão
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, password, createdBy } = body;

    // Validações
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Nome do bolão é obrigatório' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 4) {
      return NextResponse.json(
        { success: false, error: 'Senha deve ter no mínimo 4 caracteres' },
        { status: 400 }
      );
    }

    if (!createdBy || typeof createdBy !== 'string' || createdBy.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Nome do criador é obrigatório' },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Verificar se já existe um bolão com esse nome
    const existingBolao = await collection.findOne({ 
      name: name.toLowerCase().trim() 
    });

    if (existingBolao) {
      return NextResponse.json(
        { success: false, error: 'Já existe um bolão com este nome. Escolha outro nome.' },
        { status: 409 }
      );
    }

    const bolao = {
      name: name.toLowerCase().trim(),
      displayName: name.trim(),
      password,
      createdBy: createdBy.trim(),
      createdAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(bolao);

    return NextResponse.json({
      success: true,
      bolao: {
        id: result.insertedId.toString(),
        name: bolao.displayName,
        createdAt: bolao.createdAt,
        createdBy: bolao.createdBy,
        participants: 0
      }
    });
  } catch (error) {
    console.error('Erro ao criar bolão:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao criar bolão',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
