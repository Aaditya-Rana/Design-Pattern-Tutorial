// Strategy Pattern Domain Logic

export interface SortStrategy {
    name: string;
    sort(arr: number[]): { array: number[]; steps: SortStep[] };
}

export interface SortStep {
    array: number[];
    comparing?: [number, number];
    swapping?: [number, number];
    sorted?: number[];
}

export class BubbleSortStrategy implements SortStrategy {
    name = 'Bubble Sort';

    sort(arr: number[]): { array: number[]; steps: SortStep[] } {
        const steps: SortStep[] = [];
        const array = [...arr];
        const n = array.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                steps.push({ array: [...array], comparing: [j, j + 1] });

                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    steps.push({ array: [...array], swapping: [j, j + 1] });
                }
            }
        }

        steps.push({ array: [...array], sorted: array.map((_, i) => i) });
        return { array, steps };
    }
}

export class QuickSortStrategy implements SortStrategy {
    name = 'Quick Sort';

    sort(arr: number[]): { array: number[]; steps: SortStep[] } {
        const steps: SortStep[] = [];
        const array = [...arr];

        const quickSort = (low: number, high: number) => {
            if (low < high) {
                const pi = partition(low, high);
                quickSort(low, pi - 1);
                quickSort(pi + 1, high);
            }
        };

        const partition = (low: number, high: number): number => {
            const pivot = array[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                steps.push({ array: [...array], comparing: [j, high] });

                if (array[j] < pivot) {
                    i++;
                    [array[i], array[j]] = [array[j], array[i]];
                    if (i !== j) {
                        steps.push({ array: [...array], swapping: [i, j] });
                    }
                }
            }

            [array[i + 1], array[high]] = [array[high], array[i + 1]];
            steps.push({ array: [...array], swapping: [i + 1, high] });
            return i + 1;
        };

        quickSort(0, array.length - 1);
        steps.push({ array: [...array], sorted: array.map((_, i) => i) });
        return { array, steps };
    }
}

export class MergeSortStrategy implements SortStrategy {
    name = 'Merge Sort';

    sort(arr: number[]): { array: number[]; steps: SortStep[] } {
        const steps: SortStep[] = [];
        const array = [...arr];

        const mergeSort = (left: number, right: number) => {
            if (left < right) {
                const mid = Math.floor((left + right) / 2);
                mergeSort(left, mid);
                mergeSort(mid + 1, right);
                merge(left, mid, right);
            }
        };

        const merge = (left: number, mid: number, right: number) => {
            const leftArr = array.slice(left, mid + 1);
            const rightArr = array.slice(mid + 1, right + 1);

            let i = 0,
                j = 0,
                k = left;

            while (i < leftArr.length && j < rightArr.length) {
                steps.push({ array: [...array], comparing: [left + i, mid + 1 + j] });

                if (leftArr[i] <= rightArr[j]) {
                    array[k] = leftArr[i];
                    i++;
                } else {
                    array[k] = rightArr[j];
                    j++;
                }
                steps.push({ array: [...array] });
                k++;
            }

            while (i < leftArr.length) {
                array[k] = leftArr[i];
                steps.push({ array: [...array] });
                i++;
                k++;
            }

            while (j < rightArr.length) {
                array[k] = rightArr[j];
                steps.push({ array: [...array] });
                j++;
                k++;
            }
        };

        mergeSort(0, array.length - 1);
        steps.push({ array: [...array], sorted: array.map((_, i) => i) });
        return { array, steps };
    }
}

export class SortContext {
    private strategy: SortStrategy;

    constructor(strategy: SortStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: SortStrategy) {
        this.strategy = strategy;
    }

    executeStrategy(arr: number[]) {
        return this.strategy.sort(arr);
    }

    getStrategyName(): string {
        return this.strategy.name;
    }
}
