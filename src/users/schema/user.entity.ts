import {
  BeforeInsert,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  userId: string;

  @Column()
  username: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  generateId() {
    return (this.userId = uuid());
  }
}
