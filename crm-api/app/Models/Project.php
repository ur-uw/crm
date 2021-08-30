<?php

namespace App\Models;

use App\Helpers\Utility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use \Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Project extends model implements \Laratrust\Contracts\Ownable
{
    use HasFactory, HasRelationships, HasSlug;

    protected $fillable = [
        'name',
        'description',
        'slug',
        'user_id',
    ];

    public function  ownerKey($owner)

    {
        return $this->user->id;
    }

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }
    /**
     * Get the user that owns the Project
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get all of the teams for the Project
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function teams(): HasMany
    {
        return $this->hasMany(Team::class);
    }

    /**
     * Get all of the users for the Project
     *
     * @return HasManyDeep
     */
    public function users(): HasManyDeep
    {
        return $this->hasManyDeep(User::class, [
            Team::class, 'team_user'
        ]);
    }

    /**
     * Get all of the tasks for the Project
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }



    /**
     * Get tasks progress based on tags
     *
     * @return \Illuminate\Support\Collection
     */
    public function getProjectTagsProgressAttribute()
    {

        // Getting all project tags and add them with task status to new collection
        $project_tasks_tags = new Collection();
        $project_tasks = $this->tasks()->with(['status', 'tags'])->get();
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


    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
