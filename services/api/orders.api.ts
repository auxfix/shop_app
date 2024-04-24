import { CartDl } from '../data/cart.dl';
import { OrderItem, OrderItemsDl } from '../data/order.itm.dl';
import { OrdersDl } from '../data/orders.dl';

export interface Order {
  id?: number;
  userId: number;
  totalPrice: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface OrderDetails {
  order: Order;
  orderItems: OrderItem[];
}

export class OrderApi {
  private ordersDl: OrdersDl;
  private orderItemsDl: OrderItemsDl;
  private cartDl: CartDl;

  constructor(ordersDl: OrdersDl, orderItemsDl: OrderItemsDl, cartDl: CartDl) {
    this.ordersDl = ordersDl;
    this.orderItemsDl = orderItemsDl;
    this.cartDl = cartDl;
  }

  async addOrder(order: Order): Promise<Order> {
    const newOrder = await this.ordersDl.addOrder(order);
    const cartItems = await this.cartDl.getCartByUserId(newOrder.userId);

    for (let i = 0; i < cartItems.length; i++) {
      await this.orderItemsDl.addOrderItem({
        orderId: newOrder.id!,
        productId: cartItems[i].productId!,
        productName: cartItems[i].productName!,
      });
    }

    await this.cartDl.cleanCartByUserId(order.userId);

    return newOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.ordersDl.findAll();
  }

  async getOrderAndOrderItems(orderId: number): Promise<OrderDetails> {
    const order = await this.ordersDl.findByOrderId(orderId);
    const orderItems = await this.orderItemsDl.listOrderItems(orderId);

    return { order, orderItems };
  }
}
