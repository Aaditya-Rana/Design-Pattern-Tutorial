export interface Pattern {
    id: string;
    slug: string;
    name: string;
    type: 'Behavioral' | 'Structural' | 'Creational';
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const patterns: Pattern[] = [
    {
        id: '1',
        slug: 'observer',
        name: 'Observer',
        type: 'Behavioral',
        description: 'A subscription mechanism to notify multiple objects about any events that happen to the object they\'re observing.',
        difficulty: 'Beginner'
    },
    // Future patterns will be added here
];
