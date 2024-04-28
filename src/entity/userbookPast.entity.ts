import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User, Book } from '.';

@Entity()
export class UserBookPast {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @ManyToOne(() => User, (user) => user.pastUserBooks)
  pastUser: User;

  @ManyToOne(() => Book, (book) => book.pastUserBooks)
  pastBook: Book;

  @Column()
  pastScore: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
