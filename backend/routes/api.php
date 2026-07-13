<?php

use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\DownloadStatController;
use Illuminate\Support\Facades\Route;

Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);

Route::get('/download-stats', [DownloadStatController::class, 'index']);
Route::post('/download-stats/increment', [DownloadStatController::class, 'increment']);