import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Account {
  constructor(account: Partial<Account>) {
    Object.assign(this, account)
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  accountName: string

  @Column()
  clientName: string

  @Column()
  headOfOperation: string
}
