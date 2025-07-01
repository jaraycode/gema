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
        //
        Schema::table(table: 'equipment', callback: function (Blueprint $table): void {
            $table->integer(column: 'technical_location');
            $table->foreign(columns: 'technical_location', name: 'technical_location_fk')->references(columns: 'id')->on(table: 'technical_location');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropColumns(table: 'equipment', columns: ['technical_location']);
        Schema::dropForeign('technical_location_fk');
    }
};
