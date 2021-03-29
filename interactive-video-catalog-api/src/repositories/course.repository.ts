import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Esv7DataSource} from '../datasources';
import {Course, CourseRelations} from '../models';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id_cursos,
  CourseRelations
> {
  constructor(
    @inject('datasources.esv7') dataSource: Esv7DataSource,
  ) {
    super(Course, dataSource);
  }
}
