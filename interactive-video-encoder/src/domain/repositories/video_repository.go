package repositories

import "thalfm/encoder/src/domain/entities"

type VideoRepository interface {
	Insert(video *entities.Video) (*entities.Video, error)
	Find(id string) (*entities.Video, error)
}
