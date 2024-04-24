export interface OrderItem {
  id?: number;
  orderId: number;
  productId: number;
  productName: string;
}

export class OrderItemsDl {
  private ordersItems: OrderItem[];

  constructor() {
    this.ordersItems = [];
  }

  async addOrderItem(orderItem: OrderItem): Promise<OrderItem> {
    const lastOrderItem = this.ordersItems.sort((oA, oB) => oA.id! - oB.id!)[
      this.ordersItems.length - 1
    ]?.id;
    orderItem.id = (lastOrderItem ? lastOrderItem : 0) + 1;
    this.ordersItems.push(orderItem);
    return orderItem;
  }

  async listOrderItems(orderId: number): Promise<OrderItem[]> {
    return this.ordersItems.filter((oi) => oi.orderId === orderId).slice();
  }
}

export const orderItemsDl = new OrderItemsDl();
