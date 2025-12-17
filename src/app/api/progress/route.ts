import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { UserProgress } from '@/lib/models/UserProgress';
import { verifyToken } from '@/lib/auth/utils';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        await connectDB();

        const progress = await UserProgress.find({ userId: payload.userId });

        return NextResponse.json({ progress });
    } catch (error) {
        console.error('Get progress error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const { patternSlug } = await request.json();

        if (!patternSlug) {
            return NextResponse.json({ error: 'Pattern slug is required' }, { status: 400 });
        }

        await connectDB();

        // Upsert progress
        const progress = await UserProgress.findOneAndUpdate(
            { userId: payload.userId, patternSlug },
            {
                userId: payload.userId,
                patternSlug,
                completed: true,
                completedAt: new Date(),
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({ progress });
    } catch (error) {
        console.error('Update progress error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
