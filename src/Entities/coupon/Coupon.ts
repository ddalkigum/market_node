import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp/TimeStamp';
import UserCoupon from './UserCoupon';

@Entity()
class Coupon extends TimeStamp {
  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'int', nullable: true })
  discountRate: number;

  @Column({ type: 'int', nullable: true })
  discountPrice: string;

  @Column({ type: 'datetime' })
  endDate: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany((type) => UserCoupon, (userCoupon) => userCoupon.coupon)
  userCoupon: UserCoupon;
}

export default Coupon;
