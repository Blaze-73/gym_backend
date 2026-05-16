<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->string('class_name');        // e.g., "Elite HIIT"
            $table->foreignId('coach_id')->constrained('users'); // The trainer
            $table->string('day_of_week');       // e.g., "Monday"
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('capacity');         // Max students
            $table->string('room')->nullable();  // e.g., "Zone A"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
