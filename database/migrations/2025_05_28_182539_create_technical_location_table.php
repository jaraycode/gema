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
        Schema::create(table: 'technical_location', callback: function (Blueprint $table): void {
            $table->id();
            $table->unsignedInteger(column: 'level1')->nullable();
            $table->unsignedInteger(column: 'level2')->nullable();
            $table->unsignedInteger(column: 'level3')->nullable();
            $table->unsignedInteger(column: 'level4')->nullable();
            $table->unsignedInteger(column: 'level5')->nullable();
            $table->unsignedInteger(column: 'level6')->nullable();
            $table->unsignedInteger(column: 'level7')->nullable();
            $table->foreign(columns: 'level1')->references(columns: 'id')->on(table: 'location');
            $table->foreign(columns: 'level2')->references(columns: 'id')->on(table: 'location');
            $table->foreign(columns: 'level3')->references(columns: 'id')->on(table: 'location');
            $table->foreign(columns: 'level4')->references(columns: 'id')->on(table: 'location');
            $table->foreign(columns: 'level5')->references(columns: 'id')->on(table: 'location');
            $table->foreign(columns: 'level6')->references(columns: 'id')->on(table: 'location');
            $table->foreign(columns: 'level7')->references(columns: 'id')->on(table: 'location');
            $table->timestamp('delete_at')->nullable();
            // $table->unique(['level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7']);
            $table->timestamps();
        });
        DB::statement('CREATE UNIQUE INDEX level_for_location ON technical_location (level1, level2, level3, level4, level5, level6, level7) NULLS NOT DISTINCT;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technical_location');
    }
};
