import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Token {
  @ObjectIdColumn()
  id: string;

  @Column()
  userId: string;

  @Column({ unique: true })
  token: string;
}
