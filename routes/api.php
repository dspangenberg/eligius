<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EqquipmentCategoryController;
use App\Http\Controllers\EqquipmentGroupController;
use App\Http\Controllers\FilingController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\OperatingInstructionController;
use App\Http\Controllers\StorageLocationController;

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->group(function () {
  // Route::resource('/users', UserController::class);
  Route::resource('/params/operating-instructions', OperatingInstructionController::class);
  Route::resource('/params/manufacturers', ManufacturerController::class);
  Route::resource('/params/eqquipment-groups', EqquipmentGroupController::class);
  Route::resource('/params/eqquipment-categories', EqquipmentCategoryController::class);
  Route::resource('/params/storage-locations', StorageLocationController::class);
  Route::resource('/params/filings', FilingController::class);
  Route::resource('/params/departments', DepartmentController::class);
});
