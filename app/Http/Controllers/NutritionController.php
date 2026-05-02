<?php

namespace App\Http\Controllers;

use App\Models\NutritionLog;
use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NutritionController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $startDate = $request->input('start_date', now()->startOfMonth());
        $endDate = $request->input('end_date', now()->endOfMonth());

        $logs = NutritionLog::with('meals')
            ->where('user_id', $user->id)
            ->whereBetween('log_date', [$startDate, $endDate])
            ->orderBy('log_date', 'desc')
            ->get();

        return response()->json($logs);
    }

    public function show($date)
    {
        $user = Auth::user();
        $log = NutritionLog::with('meals')
            ->where('user_id', $user->id)
            ->where('log_date', $date)
            ->first();

        if (!$log) {
            return response()->json(['message' => 'No nutrition log for this date'], 404);
        }

        return response()->json($log);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'log_date' => 'required|date',
            'calories' => 'nullable|integer',
            'protein_g' => 'nullable|integer',
            'carbs_g' => 'nullable|integer',
            'fats_g' => 'nullable|integer',
            'water_ml' => 'nullable|integer',
            'target_calories' => 'nullable|integer',
            'target_protein_g' => 'nullable|integer',
            'target_carbs_g' => 'nullable|integer',
            'target_fats_g' => 'nullable|integer',
            'target_water_ml' => 'nullable|integer',
        ]);

        $log = NutritionLog::updateOrCreate(
            ['user_id' => $user->id, 'log_date' => $validated['log_date']],
            $validated
        );

        return response()->json([
            'message' => 'Nutrition log saved successfully',
            'data' => $log->load('meals')
        ]);
    }

    public function addMeal(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'nutrition_log_id' => 'required|exists:nutrition_logs,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'meal_type' => 'required|in:breakfast,lunch,dinner,snack',
            'calories' => 'required|integer',
            'protein_g' => 'nullable|integer',
            'carbs_g' => 'nullable|integer',
            'fats_g' => 'nullable|integer',
            'eaten_at' => 'nullable|date_format:H:i',
        ]);

        $meal = Meal::create([
            ...$validated,
            'user_id' => $user->id,
        ]);

        // Update nutrition log totals
        $log = NutritionLog::find($validated['nutrition_log_id']);
        $log->update([
            'calories' => $log->calories + $validated['calories'],
            'protein_g' => $log->protein_g + ($validated['protein_g'] ?? 0),
            'carbs_g' => $log->carbs_g + ($validated['carbs_g'] ?? 0),
            'fats_g' => $log->fats_g + ($validated['fats_g'] ?? 0),
        ]);

        return response()->json([
            'message' => 'Meal added successfully',
            'data' => $meal
        ], 201);
    }

    public function updateMeal(Request $request, $id)
    {
        $user = Auth::user();
        $meal = Meal::where('user_id', $user->id)->find($id);

        if (!$meal) {
            return response()->json(['message' => 'Meal not found'], 404);
        }

        $meal->update($request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'meal_type' => 'sometimes|required|in:breakfast,lunch,dinner,snack',
            'calories' => 'sometimes|required|integer',
            'protein_g' => 'nullable|integer',
            'carbs_g' => 'nullable|integer',
            'fats_g' => 'nullable|integer',
            'eaten_at' => 'nullable|date_format:H:i',
        ]));

        return response()->json([
            'message' => 'Meal updated successfully',
            'data' => $meal
        ]);
    }

    public function deleteMeal($id)
    {
        $user = Auth::user();
        $meal = Meal::where('user_id', $user->id)->find($id);

        if (!$meal) {
            return response()->json(['message' => 'Meal not found'], 404);
        }

        // Subtract from log totals
        $log = NutritionLog::find($meal->nutrition_log_id);
        if ($log) {
            $log->update([
                'calories' => max(0, $log->calories - $meal->calories),
                'protein_g' => max(0, $log->protein_g - ($meal->protein_g ?? 0)),
                'carbs_g' => max(0, $log->carbs_g - ($meal->carbs_g ?? 0)),
                'fats_g' => max(0, $log->fats_g - ($meal->fats_g ?? 0)),
            ]);
        }

        $meal->delete();
        return response()->json(['message' => 'Meal deleted successfully']);
    }
}
