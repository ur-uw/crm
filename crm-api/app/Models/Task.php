<?php

namespace App\Models;

use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'slug',
        'description',
        'start_date',
        'due_date',
        'status_id',
        'user_id',
        'project_id',
    ];

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
}