<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'parent_id',
        'is_blocked',
        'type',
    ];

    /**
     * Get the user that owns the Contact
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    /**
     * Get contact user info.
     *
     * @return User|null
     */
    public function getContactInfoAttribute(): User|null
    {
        return User::with('images')
            ->firstWhere('id', $this->user_id);
    }
}