<?php

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1'], function () {
    Route::get('/health', function () {
        $query = DB::connection()
            ->raw('SELECT version() as version;');
        $result = DB::select($query);

        $result = $result ? Arr::first($result) : '';

        if($result){
            return [
                "conectado com " . DB::connection()->getDatabaseName() . "na versão {$result->version}"
            ];
        }
    });

    Route::apiResources([
        'usuarios'            => App\Http\Controllers\API\UsuarioAPIController::class,
        'cursos'              => App\Http\Controllers\API\CursoAPIController::class,
        'videos'              => App\Http\Controllers\API\VideoAPIController::class,
        'perguntas'           => App\Http\Controllers\API\PerguntaAPIController::class,
        'respostas'           => App\Http\Controllers\API\RespostaAPIController::class,
        'perguntas.respostas' => App\Http\Controllers\API\PerguntaRespostasController::class,
    ]);

    Route::apiResource('videos.perguntas', App\Http\Controllers\API\VideoPerguntasAPIController::class)
        ->only('index', 'store');

    Route::apiResource('cursos.videos', App\Http\Controllers\API\CursoVideosAPIController::class)
        ->only('index', 'store', 'destroy');
});
