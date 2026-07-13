<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['name', 'email', 'role', 'avatar', 'content', 'rating', 'is_published'];

    protected $casts = [
        'is_published' => 'boolean',
        'rating' => 'integer',
    ];
}