<?php declare(strict_types=1);

namespace App\Observers;

use App\Http\Resources\CursoResource;
use Bschmitt\Amqp\Message;

class CursoObserver
{
    public function belongsToManyAttached($relation, $curso, $ids)
    {
        $json = (new CursoResource($curso))->toJson();

        $message = new Message($json);

        \Amqp::publish('model.curso.created', $message);
    }

    public function belongsToManyDetached($relation, $curso, $ids)
    {
        $json = (new CursoResource($curso))->toJson();

        $message = new Message($json);

        \Amqp::publish('model.curso.deleted', $message);
    }
}
