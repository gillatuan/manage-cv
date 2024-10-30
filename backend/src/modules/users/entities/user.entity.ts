import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { RoleEnum } from '../dto/user.dto';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  providerId?: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  image: string;

  @Column({ default: RoleEnum.Member })
  role: RoleEnum;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  codeId: string;

  @Column()
  codeExpired: string;

  @Column({ default: new Date() })
  createdAt?: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
