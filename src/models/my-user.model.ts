// my-user.model.ts
import { model, property } from '@loopback/repository';
import { User as LoopbackUser } from '@loopback/authentication-jwt';

@model()
export class MyUser extends LoopbackUser {
  @property({
    type: 'string',
    required: true,
  })
  customProperty: string;

  constructor(data?: Partial<MyUser>) {
    super(data);
  }
}
