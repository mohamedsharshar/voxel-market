<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Creator extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'handle',
        'initial',
        'bio',
        'models_count',
        'sales',
        'verified',
    ];

    protected $casts = [
        'verified' => 'boolean',
    ];

    public function voxelModels()
    {
        return $this->hasMany(VoxelModel::class);
    }
}
