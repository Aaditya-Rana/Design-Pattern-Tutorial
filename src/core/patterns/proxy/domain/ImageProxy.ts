// Proxy Pattern Domain Logic

export interface Image {
  display(): string;
  getSize(): number;
}

export class RealImage implements Image {
  private filename: string;
  private size: number;
  private loaded: boolean = false;

  constructor(filename: string) {
    this.filename = filename;
    this.size = Math.floor(Math.random() * 5000) + 1000; // Random size
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    this.loaded = true;
  }

  display(): string {
    return `Displaying ${this.filename}`;
  }

  getSize(): number {
    return this.size;
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}

export class ImageProxy implements Image {
  private realImage: RealImage | null = null;
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  display(): string {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    return this.realImage.display();
  }

  getSize(): number {
    if (!this.realImage) {
      return 0; // Not loaded yet
    }
    return this.realImage.getSize();
  }

  isLoaded(): boolean {
    return this.realImage !== null && this.realImage.isLoaded();
  }
}
