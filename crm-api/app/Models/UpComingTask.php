<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UpComingTask extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'status',
        'taskId',
    ];
}
