<?php

namespace App\Http\Controllers;

use App\Models\UserProgram;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserProgramController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $programs = UserProgram::with('program')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($programs);
    }

    public function active()
{
    // Find the program for the user that is currently marked as 'active'
    $program = \App\Models\UserProgram::where('user_id', auth()->id())
        ->where('status', 'active')
        ->with('program')
        ->first();

    if (!$program) {
        return response()->json(['message' => 'No active program found'], 404);
    }

    return response()->json($program);
}


    public function enroll(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'program_id' => 'required|exists:programs,id',
        ]);

        // Check if already enrolled
        $existing = UserProgram::where('user_id', $user->id)
            ->where('program_id', $validated['program_id'])
            ->where('status', 'active')
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Already enrolled in this program'], 400);
        }

        $program = Program::find($validated['program_id']);
        $endDate = now()->addWeeks($program->duration_weeks);

        $userProgram = UserProgram::create([
            'user_id' => $user->id,
            'program_id' => $validated['program_id'],
            'start_date' => now(),
            'end_date' => $endDate,
            'current_week' => 1,
            'current_day' => 1,
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Enrolled successfully',
            'data' => $userProgram->load('program')
        ], 201);
    }

    public function progress(Request $request, $id)
    {
        $user = Auth::user();
        $userProgram = UserProgram::where('user_id', $user->id)->find($id);

        if (!$userProgram) {
            return response()->json(['message' => 'Program enrollment not found'], 404);
        }

        $validated = $request->validate([
            'current_week' => 'nullable|integer',
            'current_day' => 'nullable|integer',
            'completion_percentage' => 'nullable|integer|min:0|max:100',
        ]);

        $userProgram->update($validated);

        return response()->json([
            'message' => 'Progress updated',
            'data' => $userProgram->load('program')
        ]);
    }

    public function complete($id)
    {
        $user = Auth::user();
        $userProgram = UserProgram::where('user_id', $user->id)->find($id);

        if (!$userProgram) {
            return response()->json(['message' => 'Program enrollment not found'], 404);
        }

        $userProgram->update([
            'status' => 'completed',
            'completion_percentage' => 100,
            'end_date' => now(),
        ]);

        return response()->json([
            'message' => 'Program completed!',
            'data' => $userProgram
        ]);
    }
}
