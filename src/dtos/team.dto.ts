import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
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
  idAccount: number

  @Column({ default: '' })
  teamName: string

  @OneToMany(() => User, (user) => user.team)
  users: Team[]

  @OneToMany(() => Logs, (logs) => logs.teams)
  logs: Logs[]
}
