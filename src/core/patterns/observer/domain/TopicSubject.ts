import { Observer, Subject } from './interfaces';

export class TopicSubject<T> implements Subject<T> {
    private observers: Observer<T>[] = [];
    private state: T;

    constructor(initialState: T) {
        this.state = initialState;
    }

    public attach(observer: Observer<T>): void {
        const exists = this.observers.some((obs) => obs.id === observer.id);
        if (exists) {
            console.warn(`Observer ${observer.id} already attached.`);
            return;
        }
        this.observers.push(observer);
    }

    public detach(id: string): void {
        this.observers = this.observers.filter((obs) => obs.id !== id);
    }

    public notify(data: T): void {
        this.state = data;
        this.observers.forEach((observer) => observer.update(data));
    }

    public getState(): T {
        return this.state;
    }

    public getObserverCount(): number {
        return this.observers.length;
    }
}
