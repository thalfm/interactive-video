<?php

namespace App\Providers;

use App\Models\Curso;
use App\Observers\CursoObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Curso::observe(CursoObserver::class);
    }
}
