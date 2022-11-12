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

  @Column({ default: '' })
  english_level: string

  @Column({ default: '' })
  cv_link: string

  @Column({ default: false })
  is_admin: boolean

  @Column({ default: false })
  is_superadmin: boolean
}
