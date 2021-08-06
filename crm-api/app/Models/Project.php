<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use \Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Project extends model implements \Laratrust\Contracts\Ownable
{
    use HasFactory, HasRelationships;

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
     * @return HasManyDeep
     */
    public function tasks(): HasManyDeep
    {
        return $this->hasManyDeep(Task::class, [
            Team::class, 'team_user', User::class, 'task_user'

        ]);
    }
}