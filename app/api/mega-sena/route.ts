import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

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

// GET - Buscar todos os votos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bolaoId = searchParams.get('bolaoId');

    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const filter = bolaoId ? { bolaoId } : {};

    const votes = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ 
      success: true, 
      votes: votes.map(vote => ({
        id: vote._id.toString(),
        name: vote.name,
        numbers: vote.numbers,
        createdAt: vote.createdAt,
        bolaoId: vote.bolaoId
      }))
    });
  } catch (error) {
    console.error('Erro ao buscar votos:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar votos',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// POST - Criar novo voto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, numbers, bolaoId } = body;

    // Validações
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Nome é obrigatório' },
        { status: 400 }
      );
    }

    if (!Array.isArray(numbers) || numbers.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Você deve selecionar exatamente 6 números' },
        { status: 400 }
      );
    }

    // Validar se todos os números estão entre 1 e 60
    const validNumbers = numbers.every(
      num => typeof num === 'number' && num >= 1 && num <= 60
    );

    if (!validNumbers) {
      return NextResponse.json(
        { success: false, error: 'Números devem estar entre 1 e 60' },
        { status: 400 }
      );
    }

    // Verificar se não há números duplicados
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== 6) {
      return NextResponse.json(
        { success: false, error: 'Não pode haver números duplicados' },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Se estiver em um bolão, verificar se já existe alguém com esse nome (case insensitive)
    if (bolaoId) {
      const existingVote = await collection.findOne({
        bolaoId,
        name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
      });

      if (existingVote) {
        return NextResponse.json(
          { success: false, error: 'Já existe uma pessoa com este nome neste bolão. Escolha outro nome.' },
          { status: 409 }
        );
      }
    }

    const vote = {
      name: name.trim(),
      numbers: numbers.sort((a: number, b: number) => a - b),
      createdAt: new Date().toISOString(),
      ...(bolaoId && { bolaoId }),
    };

    console.log('Salvando voto:', vote);

    const result = await collection.insertOne(vote);

    return NextResponse.json({
      success: true,
      vote: {
        id: result.insertedId.toString(),
        ...vote
      }
    });
  } catch (error) {
    console.error('Erro ao criar voto:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao criar voto',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// PUT - Atualizar números de um voto existente
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, numbers, bolaoId } = body;

    // Validações
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Nome é obrigatório' },
        { status: 400 }
      );
    }

    if (!Array.isArray(numbers) || numbers.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Você deve selecionar exatamente 6 números' },
        { status: 400 }
      );
    }

    // Validar se todos os números estão entre 1 e 60
    const validNumbers = numbers.every(
      num => typeof num === 'number' && num >= 1 && num <= 60
    );

    if (!validNumbers) {
      return NextResponse.json(
        { success: false, error: 'Números devem estar entre 1 e 60' },
        { status: 400 }
      );
    }

    // Verificar se não há números duplicados
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== 6) {
      return NextResponse.json(
        { success: false, error: 'Não pode haver números duplicados' },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Buscar voto existente (case insensitive)
    const filter: any = {
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
    };

    if (bolaoId) {
      filter.bolaoId = bolaoId;
    }

    const existingVote = await collection.findOne(filter);

    if (!existingVote) {
      return NextResponse.json(
        { success: false, error: 'Voto não encontrado' },
        { status: 404 }
      );
    }

    // Atualizar números
    const result = await collection.updateOne(
      { _id: existingVote._id },
      { 
        $set: { 
          numbers: numbers.sort((a: number, b: number) => a - b),
          updatedAt: new Date().toISOString()
        } 
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Erro ao atualizar voto' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      vote: {
        id: existingVote._id.toString(),
        name: existingVote.name,
        numbers: numbers.sort((a: number, b: number) => a - b),
        createdAt: existingVote.createdAt,
        updatedAt: new Date().toISOString(),
        bolaoId: existingVote.bolaoId
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar voto:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao atualizar voto',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// DELETE - Deletar um voto (opcional, para administração)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID é obrigatório' },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Voto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Voto deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar voto:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao deletar voto',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
