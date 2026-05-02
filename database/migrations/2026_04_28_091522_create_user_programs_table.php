<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_programs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('program_id')->constrained()->onDelete('cascade');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('current_week')->default(1);
            $table->integer('current_day')->default(1);
            $table->integer('completion_percentage')->default(0);
            $table->string('status')->default('active'); // active, completed, paused
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_programs');
    }
};
