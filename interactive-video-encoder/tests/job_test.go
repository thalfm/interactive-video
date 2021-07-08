package tests

import (
	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/require"
	"testing"
	"thalfm/encoder/src/domain/entities"
	"time"
)

func TestNewJob(t *testing.T)  {
	video := entities.NewVideo()
	video.ID = uuid.NewV4().String()
	video.ResouceID = "a"
	video.FilePath = "path"
	video.CreatedAt = time.Now()

	job, err := entities.NewJob("path", "active", video)

	require.NotNil(t, job)
	require.Nil(t, err)
}