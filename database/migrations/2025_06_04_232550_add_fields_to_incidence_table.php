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
        Schema::table('incidence', function (Blueprint $table) {
            $table->string('status')->after('description')->default('pendiente');
            $table->timestamp('resolved_at')->after('status')->nullable();
            $table->string('equipment_code')->after('inspection_guide')->nullable();

            // Clave foránea para Equipment
            $table->foreign('equipment_code')
                  ->references('code')->on('equipment')
                  ->onDelete('set null'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('incidence', function (Blueprint $table) {
            $table->dropForeign(['equipment_code']);

            // Eliminar columnas
            $table->dropColumn('equipment_code');
            $table->dropColumn('resolved_at');
            $table->dropColumn('status');
        });
    }
};