<?php

namespace App\Providers;

use App\Observers\UserObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use App\Models\User;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;
use App\Interfaces\CentroCostoRepositoryInterface;
use App\Repositories\CentroCostoRepository;
use App\Interfaces\BeneficiarioRepositoryInterface;
use App\Repositories\BeneficiarioRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(CentroCostoRepositoryInterface::class, CentroCostoRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(BeneficiarioRepositoryInterface::class, BeneficiarioRepository::class);

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        app()->useLangPath(base_path('lang'));

        //Paginator::useBootstrap();

    }
}
