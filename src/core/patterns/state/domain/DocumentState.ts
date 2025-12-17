// State Pattern Domain Logic

export interface DocumentState {
    name: string;
    canEdit: boolean;
    canPublish: boolean;
    canReview: boolean;
    next(): DocumentState | null;
    previous(): DocumentState | null;
}

export class DraftState implements DocumentState {
    name = 'Draft';
    canEdit = true;
    canPublish = false;
    canReview = true;

    next(): DocumentState {
        return new ReviewState();
    }

    previous(): DocumentState | null {
        return null;
    }
}

export class ReviewState implements DocumentState {
    name = 'Review';
    canEdit = false;
    canPublish = true;
    canReview = false;

    next(): DocumentState {
        return new PublishedState();
    }

    previous(): DocumentState {
        return new DraftState();
    }
}

export class PublishedState implements DocumentState {
    name = 'Published';
    canEdit = false;
    canPublish = false;
    canReview = false;

    next(): DocumentState | null {
        return null;
    }

    previous(): DocumentState {
        return new ReviewState();
    }
}

export class Document {
    private state: DocumentState;
    public content: string;

    constructor() {
        this.state = new DraftState();
        this.content = '';
    }

    public getState(): DocumentState {
        return this.state;
    }

    public nextState(): void {
        const next = this.state.next();
        if (next) {
            this.state = next;
        }
    }

    public previousState(): void {
        const prev = this.state.previous();
        if (prev) {
            this.state = prev;
        }
    }
}
