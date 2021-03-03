import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TimeStamp } from '../timestamp/TimeStamp';
import User from '../user/User';

@Entity()
class Grade extends TimeStamp {
  @Column({ type: 'int' })
  name: number;

  @Column({ type: 'int' })
  accurRate: number;

  @OneToMany((type) => User, (user) => user.grade)
  user: User;
}

export default Grade;
