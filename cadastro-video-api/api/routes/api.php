<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

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

Route::group(['prefix' => 'v1'], function () {
    Route::resource('usuarios', App\Http\Controllers\API\UsuarioAPIController::class);
    Route::resource('cursos', App\Http\Controllers\API\CursoAPIController::class);
    Route::resource('videos', App\Http\Controllers\API\VideoAPIController::class);
    Route::resource('perguntas', App\Http\Controllers\API\PerguntaAPIController::class);
    Route::resource('respostas', App\Http\Controllers\API\RespostaAPIController::class);

});
