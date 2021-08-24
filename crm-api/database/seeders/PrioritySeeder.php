<?php

namespace Database\Seeders;

use App\Models\Priority;
use Illuminate\Database\Seeder;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // CREATE DEFAULT PRIORITIES
        Priority::create([
            'name' => 'High',
            'color' => '#ff3250'
        ]);
        Priority::create([
            'name' => 'Medium',
            'color' => '#ffbb00'
        ]);
        Priority::create([
            'name' => 'Low',
            'color' => '#707070'
        ]);
    }
}
