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

  @OneToMany(() => UserBookPast, (userBook) => userBook.pastUser, {
    onDelete: 'CASCADE',
  })
  pastUserBooks: UserBookPast[];

  @ManyToOne(() => User, (user) => user.presentUserBooks, {
    onDelete: 'SET NULL',
  })
  presentUser: User | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
