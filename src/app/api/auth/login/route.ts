import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';
import { verifyPassword, generateToken } from '@/lib/auth/utils';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        await connectDB();

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Verify password
        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Generate token
        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
        });

        // Set cookie
        const response = NextResponse.json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });

        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
