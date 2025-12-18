export interface Observer<T> {
    id: string;
    update(data: T): void;
}

export interface Subject<T> {
    attach(observer: Observer<T>): void;
    detach(id: string): void;
    notify(data: T): void;
}
