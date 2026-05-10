<?php

namespace App\Providers;

use App\Services\ExternalModels\ExternalModelCatalog;
use App\Services\ExternalModels\Providers\KhronosSampleModelsProvider;
use App\Services\ExternalModels\Providers\PolyHavenProvider;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ExternalModelCatalog::class, function () {
            return new ExternalModelCatalog([
                new PolyHavenProvider(),
                new KhronosSampleModelsProvider(),
            ]);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
