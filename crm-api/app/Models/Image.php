<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laratrust\Contracts\Ownable;

class Image extends Model implements Ownable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'path',
        'slug'
    ];
    public function ownerKey($owner)
    {
        return $this->imageable->id;
    }

    /**
     * Get the parent imageable model .
     */
    public function imageable()
    {
        return $this->morphTo();
    }
}
