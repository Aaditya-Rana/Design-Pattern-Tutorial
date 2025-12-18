// Decorator Pattern Domain Logic

export interface Coffee {
  cost(): number;
  description(): string;
}

export class SimpleCoffee implements Coffee {
  cost(): number {
    return 5;
  }
  
  description(): string {
    return 'Simple Coffee';
  }
}

export class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  
  cost(): number {
    return this.coffee.cost() + 2;
  }
  
  description(): string {
    return this.coffee.description() + ', Milk';
  }
}

export class SugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  
  cost(): number {
    return this.coffee.cost() + 1;
  }
  
  description(): string {
    return this.coffee.description() + ', Sugar';
  }
}

export class WhipDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  
  cost(): number {
    return this.coffee.cost() + 3;
  }
  
  description(): string {
    return this.coffee.description() + ', Whipped Cream';
  }
}
