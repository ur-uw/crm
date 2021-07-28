<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
        * Default Statuses
        */
        Status::factory()->waiting()->create();
        Status::factory()->approved()->create();
        Status::factory()->inprogress()->create();
        Status::factory()->completed()->create();
        Status::factory()->rejected()->create();
    }
}
