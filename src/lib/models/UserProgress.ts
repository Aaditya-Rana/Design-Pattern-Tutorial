import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProgress extends Document {
    userId: mongoose.Types.ObjectId;
    patternSlug: string;
    completed: boolean;
    completedAt?: Date;
}

const userProgressSchema = new Schema<IUserProgress>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    patternSlug: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
    },
});

// Compound index for unique user-pattern combination
userProgressSchema.index({ userId: 1, patternSlug: 1 }, { unique: true });

export const UserProgress =
    mongoose.models.UserProgress || mongoose.model<IUserProgress>('UserProgress', userProgressSchema);
