import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { MyUser } from '../models';
import { MyUserRepository } from '../repositories';

export class MyuserController {
  constructor(
    @repository(MyUserRepository)
    public myUserRepository: MyUserRepository,
  ) { }

  @post('/my-users')
  @response(200, {
    description: 'MyUser model instance',
    content: { 'application/json': { schema: getModelSchemaRef(MyUser) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyUser, {
            title: 'NewMyUser',
            exclude: ['id'],
          }),
        },
      },
    })
    myUser: Omit<MyUser, 'id'>,
  ): Promise<MyUser> {
    const user = await this.myUserRepository.create(myUser);
    return user;
  }

  @get('/my-users/count')
  @response(200, {
    description: 'MyUser model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(MyUser) where?: Where<MyUser>,
  ): Promise<Count> {
    return this.myUserRepository.count(where);
  }

  @get('/my-users')
  @response(200, {
    description: 'Array of MyUser model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MyUser, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(MyUser) filter?: Filter<MyUser>,
  ): Promise<MyUser[]> {
    return this.myUserRepository.find(filter);
  }

  @patch('/my-users')
  @response(200, {
    description: 'MyUser PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyUser, { partial: true }),
        },
      },
    })
    myUser: MyUser,
    @param.where(MyUser) where?: Where<MyUser>,
  ): Promise<Count> {
    return this.myUserRepository.updateAll(myUser, where);
  }

  @get('/my-users/{id}')
  @response(200, {
    description: 'MyUser model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MyUser, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MyUser, { exclude: 'where' }) filter?: FilterExcludingWhere<MyUser>
  ): Promise<MyUser> {
    return this.myUserRepository.findById(id, filter);
  }

  @patch('/my-users/{id}')
  @response(204, {
    description: 'MyUser PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyUser, { partial: true }),
        },
      },
    })
    myUser: MyUser,
  ): Promise<void> {
    await this.myUserRepository.updateById(id, myUser);
  }

  @put('/my-users/{id}')
  @response(204, {
    description: 'MyUser PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() myUser: MyUser,
  ): Promise<void> {
    await this.myUserRepository.replaceById(id, myUser);
  }

  @del('/my-users/{id}')
  @response(204, {
    description: 'MyUser DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.myUserRepository.deleteById(id);
  }
}
