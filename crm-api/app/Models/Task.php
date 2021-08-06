<?php

namespace App\Models;

use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Auth;
use Laratrust\Contracts\Ownable;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;

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
        return $this->created_by ?? $this->users()->getParent()->id;
    }

    /**
     * Get the user that owns the Task
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
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
        return $this->belongsToMany(User::class)
            ->withTimestamps();
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

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::creating(function (Task $task) {
            if (Auth::user()) {
                $task->created_by = Auth::user()->id;
            }
        });
    }
}