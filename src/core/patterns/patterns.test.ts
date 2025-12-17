import { TopicSubject } from './observer/domain/TopicSubject';
import { BubbleSortStrategy, QuickSortStrategy, SortContext } from './strategy/domain/SortStrategy';
import { Document } from './state/domain/DocumentState';

describe('Observer Pattern', () => {
    it('should notify all observers', () => {
        const subject = new TopicSubject('initial');
        const observer1 = { id: '1', update: jest.fn() };
        const observer2 = { id: '2', update: jest.fn() };

        subject.attach(observer1);
        subject.attach(observer2);
        subject.notify('new data');

        expect(observer1.update).toHaveBeenCalledWith('new data');
        expect(observer2.update).toHaveBeenCalledWith('new data');
    });
});

describe('Strategy Pattern', () => {
    it('should switch strategies', () => {
        const context = new SortContext(new BubbleSortStrategy());
        expect(context.getStrategyName()).toBe('Bubble Sort');

        context.setStrategy(new QuickSortStrategy());
        expect(context.getStrategyName()).toBe('Quick Sort');
    });

    it('should sort arrays', () => {
        const context = new SortContext(new BubbleSortStrategy());
        const result = context.executeStrategy([5, 2, 8, 1, 9]);

        expect(result.array).toEqual([1, 2, 5, 8, 9]);
        expect(result.steps.length).toBeGreaterThan(0);
    });
});

describe('State Pattern', () => {
    it('should transition between states', () => {
        const doc = new Document();

        expect(doc.getState().name).toBe('Draft');
        expect(doc.getState().canEdit).toBe(true);

        doc.nextState();
        expect(doc.getState().name).toBe('Review');
        expect(doc.getState().canEdit).toBe(false);

        doc.nextState();
        expect(doc.getState().name).toBe('Published');
        expect(doc.getState().canPublish).toBe(false);
    });

    it('should not transition beyond final state', () => {
        const doc = new Document();

        doc.nextState();
        doc.nextState();
        const finalState = doc.getState();

        doc.nextState();
        expect(doc.getState()).toBe(finalState);
    });
});
