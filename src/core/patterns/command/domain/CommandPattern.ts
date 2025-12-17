// Command Pattern Domain Logic

export interface Command {
    execute(): void;
    undo(): void;
    description: string;
}

export class AddTextCommand implements Command {
    description: string;
    private text: string;
    private position: number;
    private editor: TextEditor;

    constructor(editor: TextEditor, text: string, position: number) {
        this.editor = editor;
        this.text = text;
        this.position = position;
        this.description = `Add "${text}" at position ${position}`;
    }

    execute(): void {
        this.editor.insertText(this.text, this.position);
    }

    undo(): void {
        this.editor.deleteText(this.position, this.text.length);
    }
}

export class DeleteTextCommand implements Command {
    description: string;
    private text: string;
    private position: number;
    private length: number;
    private editor: TextEditor;

    constructor(editor: TextEditor, position: number, length: number) {
        this.editor = editor;
        this.position = position;
        this.length = length;
        this.text = editor.getText().substring(position, position + length);
        this.description = `Delete ${length} characters at position ${position}`;
    }

    execute(): void {
        this.editor.deleteText(this.position, this.length);
    }

    undo(): void {
        this.editor.insertText(this.text, this.position);
    }
}

export class TextEditor {
    private content: string = '';

    insertText(text: string, position: number): void {
        this.content = this.content.slice(0, position) + text + this.content.slice(position);
    }

    deleteText(position: number, length: number): void {
        this.content = this.content.slice(0, position) + this.content.slice(position + length);
    }

    getText(): string {
        return this.content;
    }

    setText(text: string): void {
        this.content = text;
    }
}

export class CommandHistory {
    private history: Command[] = [];
    private currentIndex: number = -1;

    execute(command: Command): void {
        // Remove any commands after current index
        this.history = this.history.slice(0, this.currentIndex + 1);

        command.execute();
        this.history.push(command);
        this.currentIndex++;
    }

    undo(): boolean {
        if (this.currentIndex >= 0) {
            this.history[this.currentIndex].undo();
            this.currentIndex--;
            return true;
        }
        return false;
    }

    redo(): boolean {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            this.history[this.currentIndex].execute();
            return true;
        }
        return false;
    }

    getHistory(): Command[] {
        return this.history.slice(0, this.currentIndex + 1);
    }

    canUndo(): boolean {
        return this.currentIndex >= 0;
    }

    canRedo(): boolean {
        return this.currentIndex < this.history.length - 1;
    }
}
