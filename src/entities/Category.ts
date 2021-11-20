import {
  Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Book } from './Book';

@Entity('categories')
class Category {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Category };
