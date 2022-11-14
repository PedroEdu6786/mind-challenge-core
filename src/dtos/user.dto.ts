import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
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
  cvLink: string

  @Column({ default: false })
  isAdmin: boolean

  @Column({ default: false })
  isSuperadmin: boolean

  @Column({ nullable: true })
  teamId: number

  @ManyToOne(() => Team, (team) => team.users)
  team: Team
}
