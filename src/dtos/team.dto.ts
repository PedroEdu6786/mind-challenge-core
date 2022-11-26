import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { Account } from './account.dto'
import { Logs } from './logs.dto'
import { User } from './user.dto'

@Entity()
export class Team {
  constructor(team: Partial<Team>) {
    Object.assign(this, team)
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  accountId: number

  @Column({ default: '' })
  teamName: string

  @ManyToOne(() => Account, (account) => account.users, {
    onDelete: 'CASCADE',
  })
  account: Account

  @OneToMany(() => User, (user) => user.team)
  users: Team[]

  @OneToMany(() => Logs, (logs) => logs.teams, {
    onDelete: 'SET NULL',
  })
  logs: Logs[]
}
