import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Book } from './Book';

@Entity('authors')
class Author {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => Book, (book) => book.author)
  books?: Book[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Author };
