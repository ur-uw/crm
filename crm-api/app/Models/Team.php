<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laratrust\Models\LaratrustTeam;
use \Staudenmeir\EloquentHasManyDeep\HasRelationships;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;

class Team extends LaratrustTeam
{

    use HasFactory, HasRelationships;
    public $guarded = [];

    /**
     * Get the project that owns the Team
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * The users that belong to the Team
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withTimestamps();
    }

    /**
     * Get all of the tasks for the Team
     *
     * @return HasManyDeep
     */
    public function tasks(): HasManyDeep
    {
        return $this->hasManyDeep(
            Task::class,
            ['team_user', User::class, 'task_user']
        );
    }
}