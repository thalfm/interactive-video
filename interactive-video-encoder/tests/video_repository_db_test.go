package tests

import (
	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/require"
	"testing"
	"thalfm/encoder/src/domain/entities"
	"thalfm/encoder/src/infra/config"
	"thalfm/encoder/src/infra/repositories"
	"time"
)

func TestVideoRepositoryInsert(t *testing.T)  {
	db := config.NewDbTest()
	defer db.Close()

	video := entities.NewVideo()
	video.ID = uuid.NewV4().String()
	video.ResouceID = "a"
	video.FilePath = "path"
	video.CreatedAt = time.Now()

	repo := repositories.VideoRepositotyDb{Db: db}
	repo.Insert(video)

	v, err := repo.Find(video.ID)

	require.NotEmpty(t, v.ID)
	require.Nil(t, err)
	require.Equal(t, video.ID, v.ID)
}