<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar')->nullable()->after('email');
            $table->string('phone')->nullable()->after('avatar');
            $table->date('birth_date')->nullable()->after('phone');
            $table->string('fitness_goal')->nullable()->after('birth_date');
            $table->string('measurement_unit')->default('metric')->after('fitness_goal');
            $table->integer('height_cm')->nullable()->after('measurement_unit');
            $table->integer('weight_kg')->nullable()->after('height_cm');
            $table->boolean('workout_reminders')->default(true)->after('weight_kg');
            $table->boolean('nutrition_alerts')->default(true)->after('workout_reminders');
            $table->boolean('system_updates')->default(false)->after('nutrition_alerts');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'avatar', 'phone', 'birth_date', 'fitness_goal', 'measurement_unit',
                'height_cm', 'weight_kg', 'workout_reminders', 'nutrition_alerts', 'system_updates'
            ]);
        });
    }
};
