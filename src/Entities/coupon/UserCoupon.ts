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
import User from '../user/User';
import Coupon from './Coupon';

@Entity()
class UserCoupon extends TimeStamp {
  @ManyToOne((type) => User, (user) => user.userCoupon)
  user: User[];

  @Column()
  userId: number;

  @ManyToOne((type) => Coupon, (coupon) => coupon.userCoupon)
  coupon: Coupon[];

  @Column()
  couponId: number;
}

export default UserCoupon;
