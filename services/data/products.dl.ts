import { DataLayer } from './util.dl';

export interface Product  {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  img: string;
}

export class ProductDl {

  private products: Product[];
  
  constructor(){
    this.products = [
      {
        id: 1,
        sku: "SKU001",
        name: "Apple",
        description: "Fresh red apple",
        price: 1.50,
        img: "https://example.com/apple.jpg"
      },
      {
        id: 2,
        sku: "SKU002",
        name: "Banana",
        description: "Ripe banana",
        price: 0.75,
        img: "https://example.com/banana.jpg"
      },
      {
        id: 3,
        sku: "SKU003",
        name: "Milk",
        description: "Fresh milk",
        price: 2.00,
        img: "https://example.com/milk.jpg"
      },
      {
        id: 4,
        sku: "SKU004",
        name: "Bread",
        description: "Whole wheat bread",
        price: 1.25,
        img: "https://example.com/bread.jpg"
      },
      {
        id: 5,
        sku: "SKU005",
        name: "Eggs",
        description: "Farm fresh eggs",
        price: 2.50,
        img: "https://example.com/eggs.jpg"
      },
      {
        id: 6,
        sku: "SKU006",
        name: "Tomato",
        description: "Ripe red tomato",
        price: 0.99,
        img: "https://example.com/tomato.jpg"
      },
      {
        id: 7,
        sku: "SKU007",
        name: "Potato",
        description: "Fresh potato",
        price: 1.00,
        img: "https://example.com/potato.jpg"
      },
      {
        id: 8,
        sku: "SKU008",
        name: "Onion",
        description: "Organic onion",
        price: 0.75,
        img: "https://example.com/onion.jpg"
      }
    ];
  }

  async findAll(): Promise<Product[]> {
    return this.products.slice();
  }
  async findProduct(productId: number): Promise<Product | undefined> {
    return this.products.filter(pr => pr.id === productId)[0];
  }

  async save(product: Product): Promise<Product| null> {
    const prToUpDate = this.products.find(pr => pr.id === product.id);

    if (prToUpDate) {
      const updatedPr = { ...prToUpDate, ...product };
      const index = this.products.indexOf(prToUpDate);
      this.products[index] = updatedPr;

      return updatedPr;
    }

    return null;
  }
}

export const productDl = new ProductDl();