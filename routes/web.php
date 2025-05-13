<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/appointments', fn() => Inertia::render('Appointments'))->name('appointments');
    Route::get('/appointments/pending', fn() => Inertia::render('PendingAppointments'))->name('appointments.pending');
    Route::get('/appointments/create', fn() => Inertia::render('CreateAppointment'))->name('appointments.create');
    Route::get('/appointments/pending', fn() => Inertia::render('AcceptAppointment'))->name('appointments.accept');
});

Route::middleware(['auth', 'verified'])->prefix('api')->group(function () {
    // Appointment API routes
   Route::prefix('appointments')->group(function () {
       Route::get('/', [AppointmentController::class, 'index']);
       Route::post('/', [AppointmentController::class, 'store']);
       Route::put('/{id}/accept', [AppointmentController::class, 'accept']);
       Route::get('/pending', [AppointmentController::class, 'pending']);  // Added pending route
   });
});



require __DIR__.'/auth.php';
