import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Team {
  constructor(team: Partial<Team>) {
    Object.assign(this, team)
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  idAccount: number

  @Column()
  teamName: string
}
