<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoxelModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'likes',
        'views',
        'creator_id',
        'category',
        'image',
        'model_url',
        'featured',
        'description',
        'polygons',
        'vertices',
        'textures',
        'formats',
        'rigged',
        'animated',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'featured' => 'boolean',
        'rigged' => 'boolean',
        'animated' => 'boolean',
    ];

    public function creator()
    {
        return $this->belongsTo(Creator::class);
    }
}
