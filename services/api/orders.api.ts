import { OrderItem, OrderItemsDl } from '../data/order.itm.dl';
import { OrdersDl } from '../data/orders.dl';
import { CartDl } from '../data/cart.dl';

export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  firstName: string;
  lastName: string;
  email: string;
}

export class OrderApi {
  static async addOrder(order: Order): Promise<Order> {
    const orderDl = new OrdersDl();
    const orderItemsDl = new OrderItemsDl();
    const cartDl = new CartDl();
    const newOrder = await orderDl.addOrder(order);

    const cartItems = await cartDl.getCartByUserId(order.userId);

    for (let i = 0; i < cartItems.length; i++) {
      await orderItemsDl.addOrderItem({ 
        orderId: newOrder.id,
        productId: cartItems[i].productId,
        productName: cartItems[i].productName,
      })
    }

    await cartDl.cleanCartByUserId(order.userId);

    return newOrder;
  }

  static async getAllOrders(): Promise<Order[]> {
    const orderDl = new OrdersDl();

    return orderDl.findAll();
  }

  static async getOrderAndOrderItems(orderId: number): Promise<[Order, OrderItem[]]> {
    const orderDl = new OrdersDl();
    const orderItemsDl = new OrderItemsDl();

    const order = await orderDl.findByOrderId(orderId);
    const orderItems = await orderItemsDl.listOrderItems(orderId);

    return [order, orderItems]
  }
}