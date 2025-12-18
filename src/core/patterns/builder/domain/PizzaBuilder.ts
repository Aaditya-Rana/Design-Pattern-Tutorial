// Builder Pattern Domain Logic

export interface Pizza {
  size: string;
  crust: string;
  toppings: string[];
  cheese: boolean;
  price: number;
}

export class PizzaBuilder {
  private pizza: Partial<Pizza> = {
    toppings: [],
    cheese: false,
    price: 0,
  };

  setSize(size: 'small' | 'medium' | 'large'): this {
    this.pizza.size = size;
    this.pizza.price = (this.pizza.price || 0) + (size === 'small' ? 8 : size === 'medium' ? 12 : 16);
    return this;
  }

  setCrust(crust: 'thin' | 'thick' | 'stuffed'): this {
    this.pizza.crust = crust;
    this.pizza.price = (this.pizza.price || 0) + (crust === 'stuffed' ? 3 : 0);
    return this;
  }

  addTopping(topping: string): this {
    this.pizza.toppings = [...(this.pizza.toppings || []), topping];
    this.pizza.price = (this.pizza.price || 0) + 2;
    return this;
  }

  addCheese(): this {
    this.pizza.cheese = true;
    this.pizza.price = (this.pizza.price || 0) + 1;
    return this;
  }

  build(): Pizza {
    if (!this.pizza.size || !this.pizza.crust) {
      throw new Error('Size and crust are required');
    }
    return this.pizza as Pizza;
  }

  reset(): this {
    this.pizza = {
      toppings: [],
      cheese: false,
      price: 0,
    };
    return this;
  }
}
