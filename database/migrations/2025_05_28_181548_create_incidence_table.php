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
        Schema::create(table: 'incidence', callback: function (Blueprint $table): void {
            $table->string(column: 'code');
            $table->date(column: 'year')->useCurrent();
            $table->string(column: 'cause');
            $table->string(column: 'description');
            $table->string(column: 'petionier');
            $table->jsonb(column: 'inspection_guide');
            $table->primary(columns: ['code', 'year']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidence');
    }
};
