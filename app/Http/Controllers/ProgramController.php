<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Workout;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::with('coach')->where('is_active', true)->get();
        return response()->json($programs);
    }

    public function show($id)
    {
        $program = Program::with(['coach', 'workouts'])->find($id);
        if (!$program) {
            return response()->json(['message' => 'Program not found'], 404);
        }
        return response()->json($program);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'duration_weeks' => 'required|integer',
            'days_per_week' => 'required|integer',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'goal' => 'nullable|string',
            'coach_id' => 'nullable|exists:users,id',
            'workouts' => 'nullable|array',
        ]);

        $program = Program::create($validated);

        if ($request->has('workouts')) {
            foreach ($request->workouts as $workoutData) {
                $program->workouts()->attach($workoutData['workout_id'], [
                    'week' => $workoutData['week'] ?? 1,
                    'day' => $workoutData['day'] ?? 1,
                    'order' => $workoutData['order'] ?? 1,
                ]);
            }
        }

        return response()->json([
            'message' => 'Program created successfully',
            'data' => $program->load('workouts')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $program = Program::find($id);
        if (!$program) {
            return response()->json(['message' => 'Program not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'duration_weeks' => 'sometimes|required|integer',
            'days_per_week' => 'sometimes|required|integer',
            'difficulty' => 'sometimes|required|in:beginner,intermediate,advanced',
            'goal' => 'nullable|string',
            'coach_id' => 'nullable|exists:users,id',
            'is_active' => 'sometimes|boolean',
        ]);

        $program->update($validated);
        return response()->json([
            'message' => 'Program updated successfully',
            'data' => $program->load('workouts')
        ]);
    }

    public function destroy($id)
    {
        $program = Program::find($id);
        if (!$program) {
            return response()->json(['message' => 'Program not found'], 404);
        }

        $program->delete();
        return response()->json(['message' => 'Program deleted successfully']);
    }
}
