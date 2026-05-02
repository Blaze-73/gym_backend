<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    public function index()
    {
        $exercises = Exercise::all();
        return response()->json($exercises);
    }

    public function show($id)
    {
        $exercise = Exercise::find($id);
        if (!$exercise) {
            return response()->json(['message' => 'Exercise not found'], 404);
        }
        return response()->json($exercise);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'video_url' => 'nullable|string',
            'muscle_group' => 'nullable|string',
            'equipment' => 'nullable|string',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
        ]);

        $exercise = Exercise::create($validated);
        return response()->json([
            'message' => 'Exercise created successfully',
            'data' => $exercise
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $exercise = Exercise::find($id);
        if (!$exercise) {
            return response()->json(['message' => 'Exercise not found'], 404);
        }

        $exercise->update($request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'video_url' => 'nullable|string',
            'muscle_group' => 'nullable|string',
            'equipment' => 'nullable|string',
            'difficulty' => 'sometimes|required|in:beginner,intermediate,advanced',
        ]));

        return response()->json([
            'message' => 'Exercise updated successfully',
            'data' => $exercise
        ]);
    }

    public function destroy($id)
    {
        $exercise = Exercise::find($id);
        if (!$exercise) {
            return response()->json(['message' => 'Exercise not found'], 404);
        }

        $exercise->delete();
        return response()->json(['message' => 'Exercise deleted successfully']);
    }
}
