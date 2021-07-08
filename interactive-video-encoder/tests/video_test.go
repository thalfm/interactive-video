package tests

import (
	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/require"
	"testing"
	"thalfm/encoder/src/domain/entities"
	"time"
)

func TestValidateIfVideoIsEmpty(t *testing.T)  {
	video := entities.NewVideo()
	err := video.Validate()

	require.Error(t, err)
}

func TestVideoIdIsNotUuid(t *testing.T)  {
	video := entities.NewVideo()
	video.ID = "abc"
	video.ResouceID = "a"
	video.FilePath = "path"
	video.CreatedAt = time.Now()
	err := video.Validate()

	require.Error(t, err)
}

func TestValidVideo(t *testing.T)  {
	video := entities.NewVideo()
	video.ID = uuid.NewV4().String()
	video.ResouceID = "a"
	video.FilePath = "path"
	video.CreatedAt = time.Now()

	err := video.Validate()

	require.Nil(t, err)
}
