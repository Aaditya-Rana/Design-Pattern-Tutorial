import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';
import { hashPassword } from '@/lib/auth/utils';

export async function POST(request: NextRequest) {
    try {
        const { email, password, name } = await request.json();

        // Validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Email, password, and name are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        // Create user
        const passwordHash = await hashPassword(password);
        const user = await User.create({
            email,
            passwordHash,
            name,
        });

        // Return success without setting auth token
        return NextResponse.json(
            {
                message: 'Account created successfully. Please login.',
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

