<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        return response()->json($user);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'fitness_goal' => 'nullable|string',
            'measurement_unit' => 'sometimes|required|in:metric,imperial',
            'height_cm' => 'nullable|integer',
            'weight_kg' => 'nullable|integer',
            'avatar' => 'nullable|string',
        ]);

        // Handle avatar upload if it's a file
        if ($request->hasFile('avatar')) {
            // Delete old avatar
            if ($user->avatar) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->avatar));
            }
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = Storage::url($avatarPath);
        }

        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }

    public function updatePassword(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'current_password' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['message' => 'Password updated successfully']);
    }

    public function updateSettings(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'workout_reminders' => 'sometimes|boolean',
            'nutrition_alerts' => 'sometimes|boolean',
            'system_updates' => 'sometimes|boolean',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Settings updated successfully',
            'user' => $user
        ]);
    }

    public function destroy()
    {
        $user = Auth::user();
        
        // Delete avatar if exists
        if ($user->avatar) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $user->avatar));
        }

        $user->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }
}
