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
    {
        id: '2',
        slug: 'strategy',
        name: 'Strategy',
        type: 'Behavioral',
        description: 'Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime.',
        difficulty: 'Beginner'
    },
    {
        id: '3',
        slug: 'state',
        name: 'State',
        type: 'Behavioral',
        description: 'Allow an object to alter its behavior when its internal state changes.',
        difficulty: 'Intermediate'
    },
    {
        id: '4',
        slug: 'command',
        name: 'Command',
        type: 'Behavioral',
        description: 'Encapsulate a request as an object, allowing undo/redo operations.',
        difficulty: 'Intermediate'
    },
    {
        id: '5',
        slug: 'factory',
        name: 'Factory Method',
        type: 'Creational',
        description: 'Define an interface for creating objects, but let subclasses decide which class to instantiate.',
        difficulty: 'Beginner'
    },
    {
        id: '6',
        slug: 'singleton',
        name: 'Singleton',
        type: 'Creational',
        description: 'Ensure a class has only one instance and provide a global access point to it.',
        difficulty: 'Beginner'
    },
    {
        id: '7',
        slug: 'builder',
        name: 'Builder',
        type: 'Creational',
        description: 'Separate the construction of a complex object from its representation.',
        difficulty: 'Intermediate'
    },
    {
        id: '8',
        slug: 'adapter',
        name: 'Adapter',
        type: 'Structural',
        description: 'Convert the interface of a class into another interface clients expect.',
        difficulty: 'Beginner'
    },
    {
        id: '9',
        slug: 'decorator',
        name: 'Decorator',
        type: 'Structural',
        description: 'Attach additional responsibilities to an object dynamically.',
        difficulty: 'Intermediate'
    },
    {
        id: '10',
        slug: 'proxy',
        name: 'Proxy',
        type: 'Structural',
        description: 'Provide a surrogate or placeholder for another object to control access to it.',
        difficulty: 'Intermediate'
    },
    // Future patterns will be added here
];
