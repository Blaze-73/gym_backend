<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WorkoutController extends Controller
{
    public function index()
    {
        $workouts = Workout::with('coach')->where('is_active', true)->get();
        return response()->json($workouts);
    }

    public function show($id)
    {
        $workout = Workout::with(['coach', 'exercises'])->find($id);
        if (!$workout) {
            return response()->json(['message' => 'Workout not found'], 404);
        }
        return response()->json($workout);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'duration_minutes' => 'required|integer',
            'calories_burned' => 'nullable|integer',
            'body_focus' => 'nullable|string',
            'equipment_needed' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'video_url' => 'nullable|string',
            'coach_id' => 'nullable|exists:users,id',
            'exercises' => 'nullable|array',
        ]);

        $workout = Workout::create($validated);

        if ($request->has('exercises')) {
            foreach ($request->exercises as $index => $exercise) {
                $workout->exercises()->attach($exercise['exercise_id'], [
                    'order' => $index + 1,
                    'sets' => $exercise['sets'] ?? 3,
                    'reps' => $exercise['reps'] ?? null,
                    'duration_seconds' => $exercise['duration_seconds'] ?? null,
                    'rest_seconds' => $exercise['rest_seconds'] ?? 60,
                    'notes' => $exercise['notes'] ?? null,
                ]);
            }
        }

        return response()->json([
            'message' => 'Workout created successfully',
            'data' => $workout->load('exercises')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $workout = Workout::find($id);
        if (!$workout) {
            return response()->json(['message' => 'Workout not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'sometimes|required|in:beginner,intermediate,advanced',
            'duration_minutes' => 'sometimes|required|integer',
            'calories_burned' => 'nullable|integer',
            'body_focus' => 'nullable|string',
            'equipment_needed' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'video_url' => 'nullable|string',
            'coach_id' => 'nullable|exists:users,id',
            'is_active' => 'sometimes|boolean',
        ]);

        $workout->update($validated);

        return response()->json([
            'message' => 'Workout updated successfully',
            'data' => $workout->load('exercises')
        ]);
    }

    public function destroy($id)
    {
        $workout = Workout::find($id);
        if (!$workout) {
            return response()->json(['message' => 'Workout not found'], 404);
        }

        $workout->delete();
        return response()->json(['message' => 'Workout deleted successfully']);
    }
}
