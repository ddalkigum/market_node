import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import CategoryProduct from '../category/CategoryProduct';
import Product from '../product/Product';
import { TimeStamp } from '../timestamp/TimeStamp';

@Entity()
class ProductGroup extends TimeStamp {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  salesUnit: string;

  @Column({ type: 'varchar', length: 300 })
  thumbnail: string;

  @Column({ type: 'varchar', length: 45 })
  deliveryType: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  discountRate: number;

  @OneToMany((type) => Product, (product) => product.productGroup)
  product: Product;

  @ManyToOne(
    (type) => CategoryProduct,
    (categoryProduct) => categoryProduct.productGroup,
  )
  categoryProduct: CategoryProduct[];

  @Column({ default: 1 })
  categoryId: number;
}

export default ProductGroup;
