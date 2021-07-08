package entities

import (
	"github.com/asaskevich/govalidator"
	"time"
)

type Video struct {
	ID        string    `json:"encoded_video_folder" valid:"uuid" gorm:"type:uuid;primary_key"`
	ResouceID string    `json:"resource_id" valid:"notnull"`
	FilePath  string    `json:"file_path" valid:"notnull"`
	CreatedAt time.Time `json:"-" valid:"-"`
	Jobs      []*Job    `json:"-" valid:"-" gorm:"ForeignKey:VideoID"`
}

func init() {
	govalidator.SetFieldsRequiredByDefault(true)
}

func NewVideo() *Video {
	return &Video{}
}

func (v Video) Validate() error {
	_, err := govalidator.ValidateStruct(v)

	if err != nil {
		return err
	}

	return nil
}
