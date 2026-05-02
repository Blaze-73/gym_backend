<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('coaches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('specialization')->nullable();
            $table->text('bio')->nullable();
            $table->string('certifications')->nullable();
            $table->integer('experience_years')->default(0);
            $table->integer('clients_count')->default(0);
            $table->decimal('rating', 3, 2)->default(5.00);
            $table->boolean('is_available')->default(true);
            $table->decimal('hourly_rate', 10, 2)->nullable();
            $table->string('avatar')->nullable();
            $table->json('expertise_areas')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coaches');
    }
};
