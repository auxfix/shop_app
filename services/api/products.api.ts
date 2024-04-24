import { Product, ProductDl } from '../data/products.dl';

export class ProductsApi {
  constructor(private productsDl: ProductDl) {}

  async getAll(): Promise<Product[]> {
    const products = await this.productsDl.findAll();
    return products;
  }

  async getDetails(productId: number): Promise<Product | undefined> {
    const product = await this.productsDl.findProduct(productId);
    return product;
  }

  async update(product: Product): Promise<Product | null> {
    const savedProduct = await this.productsDl.save(product);
    return savedProduct;
  }
}
