<?php

namespace App\Models;

use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laratrust\Contracts\Ownable;

class Task extends Model implements Ownable
{
    use HasFactory;
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
     * Get the project that owns the Task
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
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
     * Get all of the users that are assigned this task.
     */
    public function users()
    {
        return $this->morphedByMany(User::class, 'taskkable');
    }


    /**
     * Get all of the projects that are assigned this task.
     */
    public function projects()
    {
        return $this->morphedByMany(Project::class, 'taskkable');
    }

    /**
     * Get all of the teams that are assigned this task.
     */
    public function teams()
    {
        return $this->morphedByMany(Team::class, 'taskkable');
    }
}
