import { TopicSubject } from './TopicSubject';
import { Observer } from './interfaces';

describe('TopicSubject', () => {
    let subject: TopicSubject<string>;

    beforeEach(() => {
        subject = new TopicSubject('Initial');
    });

    it('should initialize with state', () => {
        expect(subject.getState()).toBe('Initial');
    });

    it('should attach observers', () => {
        const observer: Observer<string> = { id: '1', update: jest.fn() };
        subject.attach(observer);
        expect(subject.getObserverCount()).toBe(1);
    });

    it('should not attach duplicate observers', () => {
        const observer: Observer<string> = { id: '1', update: jest.fn() };
        subject.attach(observer);
        subject.attach(observer);
        expect(subject.getObserverCount()).toBe(1);
    });

    it('should detach observers', () => {
        const observer: Observer<string> = { id: '1', update: jest.fn() };
        subject.attach(observer);
        subject.detach('1');
        expect(subject.getObserverCount()).toBe(0);
    });

    it('should notify all observers', () => {
        const obs1: Observer<string> = { id: '1', update: jest.fn() };
        const obs2: Observer<string> = { id: '2', update: jest.fn() };

        subject.attach(obs1);
        subject.attach(obs2);

        subject.notify('New State');

        expect(obs1.update).toHaveBeenCalledWith('New State');
        expect(obs2.update).toHaveBeenCalledWith('New State');
        expect(subject.getState()).toBe('New State');
    });
});
