//* Factory Method Example
// Step 1: Define the Product interface
interface Product {
  getDescription(): string;
}

// Step 2: Create concrete products implementing Product interface
class ConcreteProductA implements Product {
  getDescription(): string {
    return "Description of Product A";
  }
}

class ConcreteProductB implements Product {
  getDescription(): string {
    return "Description of Product B";
  }
}

// Step 3: Define an abstract Creator class with the factory method
abstract class Creator {
  // Factory method to be overridden by subclasses
  public abstract factoryMethod(): Product;

  // Some operation that uses the product returned by factoryMethod
  public someOperation(): string {
    const product = this.factoryMethod();
    return `Creator: ${product.getDescription()}`;
  }
}

// Step 4: Create concrete creators that override the factory method
class ConcreteCreatorA extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

// Usage example
const creatorA = new ConcreteCreatorA();
console.log(creatorA.someOperation()); // Output: Creator: Description of Product A

const creatorB = new ConcreteCreatorB();
console.log(creatorB.someOperation()); // Output: Creator: Description of Product B
