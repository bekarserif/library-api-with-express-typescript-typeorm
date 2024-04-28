import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { UserBookPast, Book } from './';
@Entity()
export class User {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserBookPast, (userBook) => userBook.pastBook)
  pastUserBooks: UserBookPast[];

  @OneToMany(() => Book, (book) => book.presentUser)
  presentUserBooks: Book[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
