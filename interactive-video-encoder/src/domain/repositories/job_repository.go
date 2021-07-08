package repositories

import "thalfm/encoder/src/domain/entities"

type JobRepository interface {
	Insert(job *entities.Job) (*entities.Job, error)
	Find(id string) (*entities.Job, error)
	Update(job *entities.Job) (*entities.Job, error)
}
