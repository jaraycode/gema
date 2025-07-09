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
        Schema::create(table: 'technical_report', callback: function (Blueprint $table): void {
            $table->id();
            $table->string(column: 'status');
            $table->timestamp(column: 'resolved_date')->nullable()->default(value: null);
            $table->string(column: 'equipment_id');
            $table->string(column: 'incidence_id');
            $table->date(column: 'incidence_date');
            $table->foreign(columns: 'equipment_id')->references(columns: 'code')->on(table: 'equipment');
            $table->foreign(columns: ['incidence_id', 'incidence_date'])->references(columns: ['code', 'year'])->on(table: 'incidence');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technical_report');
    }
};
