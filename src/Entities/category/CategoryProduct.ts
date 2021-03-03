import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ProductGroup from '../productGroup/ProductGroup';
import Category from './Category';

@Entity()
class CategoryProduct extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne((type) => Category, (category) => category.categoryProduct)
  category: Category[];

  @Column()
  categoryId: number;

  @ManyToOne(
    (type) => ProductGroup,
    (productGroup) => productGroup.categoryProduct,
  )
  productGroup: ProductGroup[];

  @Column()
  productGroupId: number;
}

export default CategoryProduct;
