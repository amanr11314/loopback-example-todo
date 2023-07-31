// my-user.repository.ts
import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { MyUser } from '../models';
import { inject } from '@loopback/core';
import { DbDataSource } from '../datasources';

export class MyUserRepository extends DefaultCrudRepository<
  MyUser,
  typeof MyUser.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MyUser, dataSource);
  }
}
