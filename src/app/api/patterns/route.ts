import { NextResponse } from 'next/server';
import { patterns } from '@/core/data/patterns';

export async function GET() {
    return NextResponse.json(patterns);
}
