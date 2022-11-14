import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
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
}
