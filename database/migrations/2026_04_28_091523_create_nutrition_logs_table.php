<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nutrition_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('log_date');
            $table->integer('calories')->default(0);
            $table->integer('protein_g')->default(0);
            $table->integer('carbs_g')->default(0);
            $table->integer('fats_g')->default(0);
            $table->integer('water_ml')->default(0);
            $table->integer('target_calories')->default(2500);
            $table->integer('target_protein_g')->default(180);
            $table->integer('target_carbs_g')->default(300);
            $table->integer('target_fats_g')->default(80);
            $table->integer('target_water_ml')->default(3000);
            $table->timestamps();
            
            $table->unique(['user_id', 'log_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nutrition_logs');
    }
};
