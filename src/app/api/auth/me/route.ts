import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';
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

        const user = await User.findById(payload.userId).select('-passwordHash');
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
