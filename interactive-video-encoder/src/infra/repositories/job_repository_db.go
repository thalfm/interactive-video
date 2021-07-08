package repositories

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"thalfm/encoder/src/domain/entities"
)

type JobRepositotyDb struct {
	Db *gorm.DB
}

func newJobRepository(db *gorm.DB) *JobRepositotyDb {
	return &JobRepositotyDb{Db: db}
}

func (repo JobRepositotyDb) Insert(job *entities.Job) (*entities.Job, error) {
	err := repo.Db.Create(job).Error

	if err != nil {
		return nil, err
	}

	return job, nil
}

func (repo JobRepositotyDb) Find(id string) (*entities.Job, error) {
	var job entities.Job

	repo.Db.Preload("Video").First(&job, "id = ?", id)

	if job.ID == "" {
		return nil, fmt.Errorf("job does not exist")
	}

	return &job, nil
}

func (repo JobRepositotyDb) Update(job *entities.Job) (*entities.Job, error) {
	err := repo.Db.Save(&job).Error

	if err != nil {
		return nil, err
	}

	return job, nil
}