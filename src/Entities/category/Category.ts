import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CategoryProduct from './CategoryProduct';

@Entity()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @OneToMany(
    (type) => CategoryProduct,
    (categoryProduct) => categoryProduct.category,
  )
  categoryProduct: CategoryProduct;
}

export default Category;
