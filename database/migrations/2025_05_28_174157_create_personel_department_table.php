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
        Schema::create(table: 'personel_department', callback: function (Blueprint $table): void {
            $table->timestamp(column: 'begin_date')->useCurrent();
            $table->timestamp(column: 'end_date')->nullable()->default(value: null);
            $table->bigInteger(column: 'personel_id');
            $table->bigInteger(column: 'department_id');
            $table->foreign(columns: 'personel_id')->references(columns: 'id')->on(table: 'personel');
            $table->foreign(columns: 'department_id')->references(columns: 'id')->on(table: 'department');
            $table->primary(columns: ['personel_id', 'department_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'personel_department');
    }
};
