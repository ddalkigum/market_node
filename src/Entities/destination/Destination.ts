import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../user/User';

@Entity()
class Destination extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'varchar', length: 120 })
  address: string;

  @Column({ type: 'boolean', default: false })
  mainAddress: boolean;

  @OneToMany((type) => User, (user) => user.destination)
  user: User[];

  @Column()
  userId: number;
}

export default Destination;
