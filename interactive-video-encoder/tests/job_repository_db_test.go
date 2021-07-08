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

func TestJobRepositoryInsert(t *testing.T)  {
	db := config.NewDbTest()
	defer db.Close()

	video := entities.NewVideo()
	video.ID = uuid.NewV4().String()
	video.FilePath = "path"
	video.CreatedAt = time.Now()

	repoVideo := repositories.VideoRepositotyDb{Db: db}
	repoVideo.Insert(video)

	job, err := entities.NewJob("path", "active", video)

	repo := repositories.JobRepositotyDb{Db: db}
	repo.Insert(job)

	j, err := repo.Find(job.ID)

	require.NotEmpty(t, j.ID)
	require.Nil(t, err)
	require.Equal(t, job.ID, j.ID)
	require.Equal(t, video.ID, j.VideoID)
}

func TestJobRepositoryUpdate(t *testing.T)  {
	db := config.NewDbTest()
	defer db.Close()

	video := entities.NewVideo()
	video.ID = uuid.NewV4().String()
	video.FilePath = "path"
	video.CreatedAt = time.Now()

	repoVideo := repositories.VideoRepositotyDb{Db: db}
	repoVideo.Insert(video)

	job, err := entities.NewJob("path", "active", video)

	repo := repositories.JobRepositotyDb{Db: db}
	repo.Insert(job)

	job.Status = "Completed"

	repo.Update(job)

	j, err := repo.Find(job.ID)

	require.NotEmpty(t, j.ID)
	require.Nil(t, err)
	require.Equal(t, job.ID, j.ID)
	require.Equal(t, video.ID, j.VideoID)
	require.Equal(t, j.Status, job.Status)
}