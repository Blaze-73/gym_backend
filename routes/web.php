<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return file_get_contents(public_path('index.html'));
});

Route::get('{any}', function (Request $request) {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');