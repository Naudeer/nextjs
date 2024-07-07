import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { name, age } = await request.json();

  if (!name || !age) {
    return NextResponse.json({ error: 'Name and age are required' }, { status: 400 });
  }

  try {
    const result = await prisma.people.create({
      data: { name, age },
    });
    return NextResponse.json({ id: result.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating person:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
