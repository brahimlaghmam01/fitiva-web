<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DownloadStat extends Model
{
    protected $fillable = ['platform', 'count'];

    protected $casts = [
        'count' => 'integer',
    ];
}