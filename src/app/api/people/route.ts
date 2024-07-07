import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const people = await prisma.people.findMany();
    return NextResponse.json(people, { status: 200 });
  } catch (error) {
    console.error('Error retrieving people:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}