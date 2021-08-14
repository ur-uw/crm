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
            'slug' => 'high',
            'color' => '#ff3250'
        ]);
        Priority::create([
            'name' => 'Medium',
            'slug' => 'medium',
            'color' => '#ffbb00'
        ]);
        Priority::create([
            'name' => 'Low',
            'slug' => 'low',
            'color' => '#707070'
        ]);
    }
}
