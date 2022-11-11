import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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

  @Column()
  english_level: string

  @Column()
  cv_link: string

  @Column()
  is_admin: boolean

  @Column()
  is_superadmin: boolean
}