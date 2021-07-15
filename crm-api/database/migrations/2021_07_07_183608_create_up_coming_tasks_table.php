<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUpComingTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('up_coming_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum(
                'status',
                [
                    'waiting', 'approved', 'inprogress', 'completed', 'denied'
                ]
            )->default('waiting');
            $table->string('taskId');
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
        Schema::dropIfExists('up_coming_tasks');
    }
}
