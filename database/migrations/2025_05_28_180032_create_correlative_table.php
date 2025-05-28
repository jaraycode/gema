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
        Schema::create(table: 'correlative_equipment', callback: function (Blueprint $table): void {
            $table->id();
            $table->bigInteger(column: 'counter');
            $table->string(column: 'code', length: 4);
            $table->timestamps();
        });
        Schema::create(table: 'correlative_incidence', callback: function (Blueprint $table): void {
            $table->integer(column: 'year')->primary();
            $table->bigInteger(column: 'counter');
            $table->string(column: 'code', length: 4);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'correlative_equipment');
        Schema::dropIfExists(table: 'correlative_incidence');
    }
};
