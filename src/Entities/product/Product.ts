import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import OrderItem from '../orderItem/OrderItem';
import ProductGroup from '../productGroup/ProductGroup';
import { TimeStamp } from '../timestamp/TimeStamp';

@Entity()
class Product extends TimeStamp {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'boolean', default: false })
  soldOut: boolean;

  @ManyToOne((type) => ProductGroup, (productGroup) => productGroup.product)
  productGroup: ProductGroup[];

  @Column()
  productGroupId: number;

  @ManyToOne((type) => OrderItem, (orderItem) => orderItem.product)
  orderItem: OrderItem;
}

export default Product;
