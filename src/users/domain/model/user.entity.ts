import { Exclude } from 'class-transformer';
import { Role } from '../../../auth/application/enums/rol.enum';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/domain/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;
}
