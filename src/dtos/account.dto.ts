import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Team } from './team.dto'

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

  @OneToMany(() => Team, (team) => team.users)
  users: Team[]
}
