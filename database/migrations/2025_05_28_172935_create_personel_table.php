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
        Schema::create(table: 'personel', callback: function (Blueprint $table): void {
            $table->id();
            $table->string(column: 'email')->unique();
            $table->string(column: 'username')->unique();
            $table->string(column: 'password');
            $table->string(column: 'phone_number');
            $table->string(column: 'first_name');
            $table->string(column: 'second_name')->nullable();
            $table->string(column: 'last_name');
            $table->string(column: 'second_last_name')->nullable();
            $table->timestamp(column: 'delete_at')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'personel');
    }
};
