<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable();
            $table->integer('duration_weeks')->default(6);
            $table->integer('days_per_week')->default(4);
            $table->string('difficulty')->default('intermediate');
            $table->string('goal')->nullable(); // hypertrophy, strength, endurance, weight_loss
            $table->boolean('is_active')->default(true);
            $table->foreignId('coach_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
