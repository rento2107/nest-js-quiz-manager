import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { UserRoles } from '../../../../modules/user/enums/user.enum';

enum ColumnNames {
  userId = 'userId',
  firstName = 'firstName',
  lastName = 'lastName',
  displayName = 'displayName',
  userRole = 'userRole',
  email = 'email',
  phoneNumber = 'phoneNumber',
  password = 'password',
  refreshToken= 'refreshToken',
  createAt = 'createdAt',
  updateAt = 'updatedAt',

}

@Entity({ name: 'users', schema: 'rento'})
@Unique('user_unique_email', [ColumnNames.email])
@Unique('user_unique_phone_number', [ColumnNames.phoneNumber])
@Unique('user_unique_display_name', [ColumnNames.displayName])
@Index('user_email_index', [ColumnNames.email])
@Index('user_phone_number_index', [ColumnNames.phoneNumber])
export class UserEntity {
  
  public readonly ColumnName = ColumnNames

  @PrimaryGeneratedColumn({name: 'user_id'})
  userId: number;

  @Column({ 
    name: 'first_name', 
    type: 'varchar', 
    length: '30'
  })
  firstName: string;

  @Column({ 
    name: 'last_name',
    type: 'varchar',
    length: '30'
  })
    lastName: string;
  @Column({
    name: 'display_name',
    type: 'varchar',
    length: '30'
  })
  displayName: string;
  @Column({ 
    name: 'role',
    type: 'enum',
    default: UserRoles.member,
    enum: UserRoles,
  })
  role: UserRoles;

  @Column({
    name: 'email',
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  email: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: '15',
    nullable: true,
  })
  phoneNumber: string;

  @Column({ 
    name: 'password',
    type: 'varchar',
    length: '255', 
  })
  password: string;

  @Column({
    name: 'refresh_token',
    type: 'text',
    nullable: true,
  })
  refreshToken: string;
  @Column({ 
    name: 'created_at',
    type: 'timestamp',
    default: () => 'now()'
  })
  createAt: Date;

  @Column({ 
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'now()'
  })
  updatedAt: Date
}
