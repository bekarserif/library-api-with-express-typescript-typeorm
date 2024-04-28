import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { UserBookPast, Book } from './';
@Entity()
export class User {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserBookPast, (userBook) => userBook.pastBook, {
    onDelete: 'CASCADE',
  })
  pastUserBooks: UserBookPast[];

  @OneToMany(() => Book, (book) => book.presentUser, {
    onDelete: 'SET NULL',
  })
  presentUserBooks: Book[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
