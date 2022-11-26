import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Logs } from './logs.dto'
import { Team } from './team.dto'

@Entity()
export class User {
  constructor(user: Partial<User>) {
    Object.assign(this, user)
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @Column({ default: '' })
  englishLevel: string

  @Column({ default: '' })
  skills: string

  @Column({ default: '' })
  cvLink: string

  @Column({ default: false })
  isAdmin: boolean

  @Column({ default: false })
  isSuperadmin: boolean

  @Column({ nullable: true })
  teamId: number

  @ManyToOne(() => Team, (team) => team.users, { onDelete: 'SET NULL' })
  team: Team

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[]
}
