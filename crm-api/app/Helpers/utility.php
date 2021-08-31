<?php

namespace App\Helpers;

use App\Models\Tag;
use App\Models\Task;
use Illuminate\Support\Collection;

class Utility
{
    /**
     * Get project tag progress color based on it's completeness percentage
     *
     * @return string
     */
    public static function getProgressColor(float $percentage = 0)
    {
        if ($percentage <= 35.0) {
            return '#ffbb00';
        } else if ($percentage <= 65) {
            return '#894fc6';
        } else {
            return '#07e642';
        }
    }
    /**
     * Get each tag's progress in the project
     * @param mix $project_tasks
     * @return object|null
     */
    public static function get_project_tags_progress($project_tasks): object|null
    {
        $tasks_loaded = !($project_tasks instanceof \Illuminate\Http\Resources\MissingValue);
        if ($tasks_loaded && $project_tasks != null) {
            // Getting all project tags and add them with task status to new collection
            $project_tasks_tags = new Collection();

            // Store completed tags
            $completed_tags = new Collection();
            // Casting project tasks
            $project_tasks->each(
                fn (Task $task) => $task->tags->each(
                    function (Tag $tag) use ($project_tasks_tags, $task, $completed_tags) {
                        if ($task->status->slug === 'completed') {
                            $completed_tags->add(['tag_name' => $tag->name]);
                        }
                        $project_tasks_tags->add([
                            'tag_name' => $tag->name,
                        ]);
                    }
                )
            );
            // Getting progress for each tag
            $project_tasks_tag_count = $project_tasks_tags->countBy('tag_name');
            $project_tasks_completed_tag_count = $completed_tags->countBy('tag_name');
            // Getting progress percentage
            $percentages = new Collection();
            foreach ($project_tasks_tag_count as $key => $value) {

                if ($project_tasks_completed_tag_count->keys()->contains($key)) {
                    $percentage = ($project_tasks_completed_tag_count[$key] / $value) * 100;
                    $percentages->add([
                        'tag_name' => $key,
                        'percentage' => $percentage,
                        'color' => Utility::getProgressColor($percentage)
                    ]);
                } else {
                    $percentages->add([
                        'tag_name' => $key,
                        'percentage' => 0,
                        'color' => Utility::getProgressColor(0),
                    ]);
                }
            }
            return $percentages;
        }
        return null;
    }
}
