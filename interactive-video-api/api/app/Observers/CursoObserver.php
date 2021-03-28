<?php declare(strict_types=1);

namespace App\Observers;

use App\Models\Curso;
use Bschmitt\Amqp\Message;

class CursoObserver
{
    public function created(Curso $curso)
    {
        $message = new Message($curso->toJson());

        \Amqp::publish('model.curso.created', $message);
    }

    public function updated(Curso $curso)
    {
        $message = new Message($curso->toJson());

        \Amqp::publish('model.curso.updated', $message);
    }

    public function deleted(Curso $curso)
    {
        $message = new Message($curso->toJson());

        \Amqp::publish('model.curso.deleted', $message);
    }
}
