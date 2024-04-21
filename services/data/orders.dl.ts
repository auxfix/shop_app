export interface Order {
  id?: number;
  userId: number;
  totalPrice: number;
  firstName: string;
  lastName: string;
  email: string;
}

export class OrdersDl{
  private orders: Order[];
  
  constructor(){
    this.orders=[];
  }

  async findAll(): Promise<Order[]> {
    return this.orders.slice();
  }

  async findByOrderId(orderId: number): Promise<Order> {
    return this.orders.filter(o => o.id === orderId)[0];
  }

  async addOrder(order: Order): Promise<Order> {
    const lastOrderId = this.orders.sort((oA, oB) => oA.id! - oB.id!)[this.orders.length -1]?.id;
    order.id = (lastOrderId ? lastOrderId : 0) + 1;
    this.orders.push(order);

    return Object.create(order, {});
  }
}

export const orderDl = new OrdersDl();