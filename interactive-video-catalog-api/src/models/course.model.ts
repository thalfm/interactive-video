import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Course extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id_cursos?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome_curso: string;

  @property({
    type: 'string',
    required: true,
  })
  descricao_curso: string;

  @property({
    type: 'string',
    required: true,
  })
  imagem_curso: string;

  @property({
    type: 'boolean',
    default: true,
  })
  ativo: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
