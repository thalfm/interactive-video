package repositories

import (
	"fmt"
	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
	"thalfm/encoder/src/domain/entities"
)

type VideoRepositotyDb struct {
	Db *gorm.DB
}

func newVideoRepository(db *gorm.DB) *VideoRepositotyDb {
	return &VideoRepositotyDb{Db: db}
}

func (repo VideoRepositotyDb) Insert(video *entities.Video) (*entities.Video, error) {
	if video.ID == "" {
		video.ID = uuid.NewV4().String()
	}

	err := repo.Db.Create(video).Error

	if err != nil {
		return nil, err
	}

	return video, nil
}

func (repo VideoRepositotyDb) Find(id string) (*entities.Video, error) {
	var video entities.Video

	repo.Db.Preload("Jobs").First(&video, "id = ?", id)

	if video.ID == "" {
		return nil, fmt.Errorf("video does not exist")
	}

	return &video, nil
}
