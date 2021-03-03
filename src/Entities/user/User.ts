import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import UserCoupon from '../coupon/UserCoupon';
import Destination from '../destination/Destination';
import Grade from '../grade/Grade';
import Orders from '../order/Order';

import { TimeStamp } from '../timestamp/TimeStamp';

@Entity()
class User extends TimeStamp {
  @Column({ type: 'varchar', length: 45, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @OneToMany((type) => Grade, (grade) => grade.user)
  grade: Grade;

  @OneToMany((type) => UserCoupon, (userCoupon) => userCoupon.user)
  userCoupon: UserCoupon;

  @OneToMany((type) => Destination, (destination) => destination.user)
  destination: Destination;

  @OneToMany((type) => Orders, (order) => order.user)
  order: Orders;
}

export default User;
