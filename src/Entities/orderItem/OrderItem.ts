import { Column, Entity, OneToMany } from 'typeorm';
import Orders from '../order/Order';
import Product from '../product/Product';
import { TimeStamp } from '../timestamp/TimeStamp';

@Entity()
class OrderItem extends TimeStamp {
  @Column({ type: 'int' })
  quantity: number;

  @OneToMany((type) => Product, (product) => product.orderItem)
  product: Product[];

  @Column()
  productId: number;

  @OneToMany((type) => Orders, (order) => order.orderItem)
  order: Orders;
}

export default OrderItem;
