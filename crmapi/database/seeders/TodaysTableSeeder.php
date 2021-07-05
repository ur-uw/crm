<?php

namespace Database\Seeders;

use App\Models\Today;
use Illuminate\Database\Seeder;

class TodaysTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Today::factory()->count(5)->create();
    }
}