import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProgress extends Document {
    userId: mongoose.Types.ObjectId;
    patternSlug: string;
    status: 'not-started' | 'in-progress' | 'completed';
    completedAt?: Date;
    updatedAt: Date;
}

const userProgressSchema = new Schema<IUserProgress>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        patternSlug: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['not-started', 'in-progress', 'completed'],
            default: 'not-started',
        },
        completedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

// Compound index for unique user-pattern combination
userProgressSchema.index({ userId: 1, patternSlug: 1 }, { unique: true });

export const UserProgress =
    mongoose.models.UserProgress || mongoose.model<IUserProgress>('UserProgress', userProgressSchema);
