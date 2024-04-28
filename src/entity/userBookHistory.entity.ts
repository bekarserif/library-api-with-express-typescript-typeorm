import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User, Book } from '.';

@Entity()
export class UserBookHistory {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @ManyToOne(() => User, (user) => user.pastUserBooks, {
    onDelete: 'CASCADE',
  })
  pastUser: User;

  @ManyToOne(() => Book, (book) => book.pastUserBooks, {
    onDelete: 'CASCADE',
  })
  pastBook: Book;

  @Column()
  pastScore: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
