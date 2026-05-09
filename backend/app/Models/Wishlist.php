<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'voxel_model_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function voxelModel()
    {
        return $this->belongsTo(VoxelModel::class);
    }
}
