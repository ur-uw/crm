<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodayTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('today_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('taskId');
            $table->enum(
                'status',
                [
                    'inprogress', 'completed'
                ]
            )->default('inprogress');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('today_tasks');
    }
}
