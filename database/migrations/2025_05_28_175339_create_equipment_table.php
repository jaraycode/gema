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
        Schema::create(table: 'equipment', callback: function (Blueprint $table): void {
            $table->string(column: 'code')->primary();
            $table->string(column: 'model');
            $table->string(column: 'brand');
            $table->string(column: 'serial');
            $table->string(column: 'description');
            $table->integer(column: 'status');
            $table->timestamp(column: 'delete_at')->nullable()->default(value: null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'equipment');
    }
};
