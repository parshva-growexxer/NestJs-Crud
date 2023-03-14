import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'message' })
export class Message {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  public id: number;

  @Column({
    name: 'content',
  })
  public content: string;
}
