import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const { name, age } = await request.json();

  if (!id || !name || !age) {
    return NextResponse.json({ error: 'ID, name, and age are required' }, { status: 400 });
  }

  try {
    const person = await prisma.people.update({
      where: { id: parseInt(id, 10) },
      data: { name, age },
    });

    return NextResponse.json(person, { status: 200 });
  } catch (error) {
    console.error('Error updating person:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await prisma.people.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: 'Person deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting person:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const person = await prisma.people.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }

    return NextResponse.json(person, { status: 200 });
  } catch (error) {
    console.error('Error fetching person:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
