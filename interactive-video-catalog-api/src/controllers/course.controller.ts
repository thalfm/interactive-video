import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where,} from '@loopback/repository';
import {get, getModelSchemaRef, param, response,} from '@loopback/rest';
import {Course} from '../models';
import {CourseRepository} from '../repositories';

export class CourseController {
  constructor(
    @repository(CourseRepository)
    public courseRepository : CourseRepository,
  ) {}

  @get('/courses/count')
  @response(200, {
    description: 'Course model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Course) where?: Where<Course>,
  ): Promise<Count> {
    return this.courseRepository.count(where);
  }

  @get('/courses')
  @response(200, {
    description: 'Array of Course model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Course, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Course) filter?: Filter<Course>,
  ): Promise<Course[]> {
    return this.courseRepository.find(filter);
  }

  @get('/courses/{id}')
  @response(200, {
    description: 'Course model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Course, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Course, {exclude: 'where'}) filter?: FilterExcludingWhere<Course>
  ): Promise<Course> {
    return this.courseRepository.findById(id, filter);
  }
}
