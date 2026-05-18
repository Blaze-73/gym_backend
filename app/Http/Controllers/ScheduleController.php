<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
    {
        try {
            $schedules = Schedule::all();
            return response()->json($schedules);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_name' => 'required|string|max:255',
            'day_of_week' => 'required|string',
            'start_time' => 'required',
            'end_time' => 'required',
            'capacity' => 'required|integer',
            'room' => 'nullable|string',
        ]);

        $schedule = Schedule::create($validated);

        return response()->json([
            'message' => 'Class scheduled successfully',
            'data' => $schedule
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $schedule = Schedule::find($id);
        if (!$schedule) return response()->json(['message' => 'Not found'], 404);

        $schedule->update($request->all());
        return response()->json(['message' => 'Updated successfully', 'data' => $schedule]);
    }

    public function destroy($id)
    {
        $schedule = Schedule::find($id);
        if (!$schedule) return response()->json(['message' => 'Not found'], 404);
        
        $schedule->delete();
        return response()->json(['message' => 'Class deleted successfully']);
    }
}
