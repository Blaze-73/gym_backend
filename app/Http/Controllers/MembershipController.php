<?php

namespace App\Http\Controllers;

use App\Models\Membership;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function index()
    {
        return response()->json(Membership::with(['user','plan'])->get());
    }

    /**
     * Store a newly created resource in storage.
     * UPDATED: Sets status to 'pending' instead of 'active'
     */
   public function store(Request $request)
{
    // Remove user_id from validation since we get it from the Auth token
    $request->validate([
        'plan_id' => 'required|exists:plans,id',
        'start_date' => 'required|date',
    ]);

    $plan = Plan::find($request->plan_id);
    $start = Carbon::parse($request->start_date);
    $end = $start->copy()->addDays($plan->duration);

    $membership = Membership::create([
        'user_id' => $request->user()->id, // ✅ SECURE: Gets ID from the token
        'plan_id' => $request->plan_id,
        'start_date' => $start,
        'end_date' => $end,
        'status' => 'pending' 
    ]);

    return response()->json([
        'message' => 'Membership request submitted for approval',
        'membership' => $membership
    ], 201);
}

    /**
     * NEW: Get pending memberships for Admin Notifications
     */
    public function pending()
    {
        $pending = Membership::with(['user', 'plan'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($pending);
    }

    public function show(string $id)
    {
        $membership = Membership::with(['user','plan'])->find($id);
        if(!$membership){
            return response()->json(['message' => 'Membership not found'], 404);
        }
        return response()->json($membership);
    }   

    public function update(Request $request, string $id)
    {
        $membership = Membership::find($id);
         if(!$membership){
            return response()->json(['message' => 'membership not found'], 404);
         }
         
         $membership->update($request->all());
         return response()->json([
             'message' => 'Membership status updated successfully',
             'membership' => $membership
         ]);
    }
    public function me()
    {
        // This finds the membership for the user currently logged in
        $membership = \App\Models\Membership::where('user_id', auth()->id())
            ->with('plan') 
            ->first();

        if (!$membership) {
            // Return 404 if they haven't requested any plan yet
            return response()->json(['message' => 'No membership found'], 404);
        }

        return response()->json($membership);
    }


    public function destroy(string $id)
    {
        $membership = Membership::find($id);
        if (!$membership){
            return response()->json(['message' => 'Membership not found'], 404);
        }
        $membership->delete();
        return response()->json(['message' => 'membership deleted']);
    }
}
