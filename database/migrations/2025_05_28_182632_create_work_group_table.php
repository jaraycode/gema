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
        Schema::create(table: 'work_group', callback: function (Blueprint $table): void {
            $table->bigInteger(column: 'personel_id');
            $table->bigInteger(column: 'report_id');
            $table->foreign(columns: 'personel_id')->references(columns: 'id')->on(table: 'personel');
            $table->foreign(columns: 'report_id')->references(columns: 'id')->on(table: 'technical_report');
            $table->primary(columns: ['personel_id', 'report_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_group');
    }
};
