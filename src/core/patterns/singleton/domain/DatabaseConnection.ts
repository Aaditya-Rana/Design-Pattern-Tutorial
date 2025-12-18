// Singleton Pattern Domain Logic

export class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;
  private connectionId: string;
  private connected: boolean = false;
  private queries: string[] = [];

  private constructor() {
    this.connectionId = Math.random().toString(36).substring(7);
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public connect(): void {
    this.connected = true;
  }

  public disconnect(): void {
    this.connected = false;
  }

  public isConnected(): boolean {
    return this.connected;
  }

  public getConnectionId(): string {
    return this.connectionId;
  }

  public executeQuery(query: string): void {
    if (!this.connected) {
      throw new Error('Not connected to database');
    }
    this.queries.push(query);
  }

  public getQueries(): string[] {
    return [...this.queries];
  }

  public static resetInstance(): void {
    DatabaseConnection.instance = null;
  }
}
