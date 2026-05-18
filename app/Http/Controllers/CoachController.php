<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use App\Models\UserCoach;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CoachController extends Controller
{
    public function index()
    {
        $coaches = Coach::where('is_available', true)->get();
        return response()->json($coaches);
    }

    public function show($id)
    {
        $coach = Coach::find($id);
        if (!$coach) {
            return response()->json(['message' => 'Coach not found'], 404);
        }
        return response()->json($coach);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'specialization' => 'nullable|string',
            'bio' => 'nullable|string',
            'certifications' => 'nullable|string',
            'experience_years' => 'nullable|integer',
            'hourly_rate' => 'nullable|numeric',
            'avatar' => 'nullable|string',
            'expertise_areas' => 'nullable|array',
        ]);

        $coach = Coach::create($validated);
        return response()->json([
            'message' => 'Coach profile created successfully',
            'data' => $coach
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $coach = Coach::find($id);
        if (!$coach) {
            return response()->json(['message' => 'Coach not found'], 404);
        }

        $coach->update($request->validate([
            'specialization' => 'nullable|string',
            'bio' => 'nullable|string',
            'certifications' => 'nullable|string',
            'experience_years' => 'nullable|integer',
            'hourly_rate' => 'nullable|numeric',
            'avatar' => 'nullable|string',
            'expertise_areas' => 'nullable|array',
            'is_available' => 'sometimes|boolean',
        ]));

        return response()->json([
            'message' => 'Coach profile updated successfully',
            'data' => $coach
        ]);
    }

    public function assignCoach(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'coach_id' => 'required|exists:coaches,id',
        ]);

        $assignment = UserCoach::create([
            'user_id' => $user->id,
            'coach_id' => $validated['coach_id'],
            'status' => 'active',
            'started_at' => now(),
        ]);

        // Increment coach client count
        $coach = Coach::find($validated['coach_id']);
        $coach->increment('clients_count');

        return response()->json([
            'message' => 'Coach assigned successfully',
            'data' => $assignment
        ], 201);
    }

    public function myCoach()
    {
        $user = Auth::user();
        $assignment = UserCoach::with('coach.user')
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->first();

        if (!$assignment) {
            return response()->json(['message' => 'No active coach assigned'], 404);
        }

        return response()->json($assignment);
    }
}
