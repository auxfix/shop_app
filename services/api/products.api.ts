import { OrderItem, OrderItemsDl } from '../data/order.itm.dl';
import { Product, ProductDl } from '../data/products.dl';



export class ProductsApi {
  static async getAll(): Promise<Product[]> {
    const productDl = new ProductDl();

    const products = await productDl.findAll();
    return products;
  }

  static async getDetails(productId: number): Promise<Product | undefined> {
    const productDl = new ProductDl();

    const product = await productDl.findProduct(productId)
    return product;
  }

  static async update(product: Product): Promise<Product> {
    const productDl = new ProductDl();
    const savedProduct = await productDl.save(product);
    return savedProduct;
  }
}