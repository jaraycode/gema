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
        Schema::create(table: 'role', callback: function (Blueprint $table): void {
            $table->id();
            $table->string(column: 'name');
            $table->timestamp(column: 'delete_at')->nullable();
            $table->timestamps();
        });

        Schema::create(table: 'personnel_role', callback: function (Blueprint $table) {
            $table->id();
            $table->bigInteger('personnel_id');
            $table->bigInteger('role_id');
            $table->timestamp(column: 'delete_at')->nullable();
            $table->foreign(columns: 'personnel_id')->references(columns: 'id')->on(table: 'personel');
            $table->foreign(columns: 'role_id')->references(columns: 'id')->on(table: 'role');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role');
    }
};
