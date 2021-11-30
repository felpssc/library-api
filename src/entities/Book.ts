import {
  Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Author } from './Author';
import { Category } from './Category';

@Entity('books')
class Book {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  published_year: number;

  @Column()
  author_id: string;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Book };
