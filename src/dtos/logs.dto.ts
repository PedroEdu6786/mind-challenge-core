import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Team } from './team.dto'
import { User } from './user.dto'

@Entity()
export class Logs {
  constructor(logs: Partial<Logs>) {
    Object.assign(this, logs)
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  status: string

  @Column({ nullable: false })
  userId: number

  @Column({ nullable: false })
  teamId: number

  @Column({ nullable: false })
  accountId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Team, (team) => team.logs)
  teams: Team[]

  @ManyToOne(() => User, (user) => user.logs)
  user: User
}
