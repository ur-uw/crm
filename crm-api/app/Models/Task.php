<?php

namespace App\Models;

use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laratrust\Contracts\Ownable;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use Znck\Eloquent\Relations\BelongsToThrough;

class Task extends Model implements Ownable
{
    use HasFactory;
    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;
    use \Znck\Eloquent\Traits\BelongsToThrough;


    protected $fillable = [
        'title',
        'slug',
        'description',
        'start_date',
        'due_date',
        'status_id',
    ];

    public function ownerKey($owner)
    {
        return $this->users()->getParent()->id();
    }

    /**
     * Get the status that owns the Task
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    /**
     * The users that belong to the Task
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Scope a query to only include recent updated tasks.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $days
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeRecent($query)
    {
        return $query->whereColumn(
            'tasks.updated_at',
            '>',
            'tasks.created_at'
        )
            // * NOTE: IN HAS MANY THROUGH RELATIONS WE MUST THE FULL PATH TO COLUMN
            ->latest('tasks.updated_at');
    }

    /**
     * Get all of the teams for the Task
     *
     * @return HasManyDeep
     */
    public function teams(): HasManyDeep
    {
        return $this->hasManyDeep(Team::class, [
            'task_user', User::class, 'team_user'
        ]);
    }
}