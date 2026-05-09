<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Default Users
        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@voxelmarket.com',
            'password' => bcrypt('admin123456'),
            'role' => 'admin',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Normal User',
            'email' => 'user@voxelmarket.com',
            'password' => bcrypt('user123456'),
            'role' => 'user',
        ]);

        // Creators
        $creators = [
            ['name' => 'Kenji Makes', 'handle' => '@kenjimakes', 'initial' => 'K', 'bio' => 'Sci-fi vehicles and hard-surface props for indie games.', 'models_count' => 2, 'sales' => 443, 'verified' => true],
            ['name' => 'Sofia Beasts', 'handle' => '@sofiabeasts', 'initial' => 'S', 'bio' => 'Stylized creatures and friendly monsters.', 'models_count' => 1, 'sales' => 421, 'verified' => true],
            ['name' => 'Omar Builds', 'handle' => '@omarbuilds', 'initial' => 'O', 'bio' => 'Architectural and environment kits for tabletop digital scenes.', 'models_count' => 2, 'sales' => 375, 'verified' => true],
            ['name' => 'Lina Forge', 'handle' => '@linaforge', 'initial' => 'L', 'bio' => 'Hand-painted weapons and fantasy gear.', 'models_count' => 2, 'sales' => 271, 'verified' => true],
            ['name' => 'Aria Voxel', 'handle' => '@ariavoxel', 'initial' => 'A', 'bio' => 'Stylized character artist with a love for low-poly heroes.', 'models_count' => 2, 'sales' => 238, 'verified' => true],
            ['name' => 'Ravi Craft', 'handle' => '@ravicraft', 'initial' => 'R', 'bio' => 'Indie game-ready props with a cozy aesthetic.', 'models_count' => 1, 'sales' => 52, 'verified' => false],
        ];

        foreach ($creators as $c) {
            \App\Models\Creator::create($c);
        }

        // Models
        $models = [
            [
                'name' => 'Low Poly Dragon', 'price' => 38.00, 'likes' => 1, 'views' => '11.2k',
                'creator_id' => 2, 'category' => 'Creatures', 'image' => 'https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
                'featured' => true, 'description' => 'A beautifully crafted low-poly dragon model perfect for fantasy games.',
                'polygons' => 8420, 'vertices' => 6320, 'textures' => '2K PBR', 'formats' => '.GLB, .FBX, .OBJ', 'rigged' => true, 'animated' => false
            ],
            [
                'name' => 'Medieval Castle Tower', 'price' => 45.00, 'likes' => 2, 'views' => '14.2k',
                'creator_id' => 3, 'category' => 'Environment', 'image' => 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Box/glTF-Binary/Box.glb',
                'featured' => true, 'description' => 'Modular medieval castle tower with detailed textures.',
                'polygons' => 15200, 'vertices' => 12100, 'textures' => '4K PBR', 'formats' => '.GLB, .FBX, .OBJ', 'rigged' => false, 'animated' => false
            ],
            [
                'name' => 'Sci-Fi Spaceship', 'price' => 32.00, 'likes' => 1, 'views' => '9.8k',
                'creator_id' => 1, 'category' => 'Vehicles', 'image' => 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Corset/glTF-Binary/Corset.glb',
                'featured' => true, 'description' => 'Futuristic spaceship with detailed interior.',
                'polygons' => 18500, 'vertices' => 14200, 'textures' => '4K PBR', 'formats' => '.GLB, .FBX, .OBJ', 'rigged' => false, 'animated' => false
            ],
            [
                'name' => 'Fantasy Sword', 'price' => 12.00, 'likes' => 3, 'views' => '2.4k',
                'creator_id' => 4, 'category' => 'Weapons', 'image' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
                'featured' => true, 'description' => 'Detailed fantasy sword with magical runes.',
                'polygons' => 3200, 'vertices' => 2100, 'textures' => '2K PBR', 'formats' => '.GLB, .FBX, .OBJ', 'rigged' => false, 'animated' => false
            ],
            [
                'name' => 'Racing Car', 'price' => 26.00, 'likes' => 3, 'views' => '7.1k',
                'creator_id' => 1, 'category' => 'Vehicles', 'image' => 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
                'featured' => true, 'description' => 'High-performance racing car with detailed interior.',
                'polygons' => 22000, 'vertices' => 18500, 'textures' => '4K PBR', 'formats' => '.GLB, .FBX, .OBJ', 'rigged' => true, 'animated' => false
            ]
        ];

        foreach ($models as $m) {
            \App\Models\VoxelModel::create($m);
        }
    }
}
