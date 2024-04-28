import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User, UserBookPast } from '.';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  name: string;

  @Column({ default: -1 })
  score: number;

  @OneToMany(() => UserBookPast, (userBook) => userBook.pastUser)
  pastUserBooks: UserBookPast[];

  @ManyToOne(() => User, (user) => user.presentUserBooks)
  presentUser: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
