<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laratrust\Contracts\Ownable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Storage;

class Image extends Model implements Ownable
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'name',
        'path',
        'slug'
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }
    public function ownerKey($owner)
    {
        return $this->imageable->id;
    }

    /**
     * Get image path from database with url.
     */
    public function getPathAttribute($value)
    {
        ////////////////////
        // NOTE: this could be used during development only in order to make the images from the seeder work
        if (env('APP_ENV') == 'local') {
            if (substr($value, 0, 6) == 'images') {
                return Storage::url($value);
            } else {
                return $value;
            }
        }
        ////////////////////
        return Storage::url($value);
    }


    /**
     * Get the parent imageable model .
     */
    public function imageable()
    {
        return $this->morphTo();
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
