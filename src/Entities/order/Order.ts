import { Column, Entity, ManyToOne } from 'typeorm';
import OrderItem from '../orderItem/OrderItem';
import { TimeStamp } from '../timestamp/TimeStamp';
import User from '../user/User';

@Entity()
class Orders extends TimeStamp {
  @Column({ type: 'varchar', length: 20 })
  status: string;

  @ManyToOne((type) => OrderItem, (orderItem) => orderItem.order)
  orderItem: OrderItem[];

  @Column()
  orderItemId: number;

  @ManyToOne((type) => User, (user) => user.order)
  user: User[];

  @Column()
  userId: number;
}

export default Orders;
