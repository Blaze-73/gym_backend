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
    // Delete the old table if it exists
    Schema::dropIfExists('schedules');

    Schema::create('schedules', function (Blueprint $table) {
        $table->id();
        $table->string('class_name');
        $table->string('day_of_week');
        $table->time('start_time');
        $table->time('end_time');
        $table->integer('capacity');
        $table->string('room')->nullable();
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('schedules');
}

};
