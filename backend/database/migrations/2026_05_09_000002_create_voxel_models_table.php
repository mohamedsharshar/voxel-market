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
        Schema::create('voxel_models', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->integer('likes')->default(0);
            $table->string('views')->default('0'); // e.g. "11.2k"
            $table->foreignId('creator_id')->constrained('creators')->onDelete('cascade');
            $table->string('category');
            $table->string('image');
            $table->string('model_url');
            $table->boolean('featured')->default(false);
            $table->text('description');
            $table->integer('polygons')->default(0);
            $table->integer('vertices')->default(0);
            $table->string('textures')->nullable(); // e.g. "2K PBR"
            $table->string('formats')->nullable(); // e.g. ".GLB, .FBX"
            $table->boolean('rigged')->default(false);
            $table->boolean('animated')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voxel_models');
    }
};
