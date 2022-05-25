import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  userId: number;

  @Column()
  token: string;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  expiredAt: Date;
 
}