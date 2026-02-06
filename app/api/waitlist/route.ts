import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const WAITLIST_PATH = path.join(process.cwd(), 'waitlist.json');

async function getEmails(): Promise<string[]> {
  try {
    const data = await readFile(WAITLIST_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmed)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const emails = await getEmails();

    if (emails.includes(trimmed)) {
      return NextResponse.json({ message: "You're already on the list!" });
    }

    emails.push(trimmed);
    await writeFile(WAITLIST_PATH, JSON.stringify(emails, null, 2));

    return NextResponse.json({ message: "You're on the list!" });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
