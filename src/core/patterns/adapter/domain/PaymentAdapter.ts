// Adapter Pattern Domain Logic

// Old payment system
export class LegacyPaymentSystem {
  processPayment(amount: number, currency: string): string {
    return `Legacy: Processing ${currency} ${amount}`;
  }
}

// New payment interface
export interface ModernPaymentProcessor {
  pay(amount: number): string;
  getCurrency(): string;
}

// Adapter
export class PaymentAdapter implements ModernPaymentProcessor {
  private legacySystem: LegacyPaymentSystem;
  private currency: string;

  constructor(currency: string = 'USD') {
    this.legacySystem = new LegacyPaymentSystem();
    this.currency = currency;
  }

  pay(amount: number): string {
    return this.legacySystem.processPayment(amount, this.currency);
  }

  getCurrency(): string {
    return this.currency;
  }
}
