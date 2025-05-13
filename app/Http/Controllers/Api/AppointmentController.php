<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Appointment;

class AppointmentController extends Controller
{
    public function index()
    {
        return Appointment::where('user_id', Auth::id())
                          ->orderBy('appointment_time', 'desc')
                          ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'appointment_time' => 'required|date|after_or_equal:now',
        ]);

        $appointment = Appointment::create([
            'user_id' => Auth::id(),
            'appointment_time' => $request->appointment_time,
            'status' => 'pending',
        ]);

        return response()->json($appointment, 201);
    }

    public function accept(string $id)
    {
        $appointment = Appointment::findOrFail($id);

        $appointment->status = 'accepted';
        $appointment->save();

        return response()->json(['message' => 'Appointment accepted']);
    }

    public function pending()
    {
        return Appointment::where('status', 'pending')->get();
    }
}
