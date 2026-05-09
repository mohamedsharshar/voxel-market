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
        // ─── Default Users ──────────────────────────────────────────
        User::factory()->create([
            'name'     => 'Admin User',
            'email'    => 'admin@voxelmarket.com',
            'password' => bcrypt('admin123456'),
            'role'     => 'admin',
        ]);

        User::factory()->create([
            'name'     => 'Normal User',
            'email'    => 'user@voxelmarket.com',
            'password' => bcrypt('user123456'),
            'role'     => 'user',
        ]);

        // ─── Creators ──────────────────────────────────────────────
        $creators = [
            ['name' => 'Kenji Makes',  'handle' => '@kenjimakes',  'initial' => 'K', 'bio' => 'Sci-fi vehicles and hard-surface props for indie games.',                   'models_count' => 2, 'sales' => 443, 'verified' => true],
            ['name' => 'Sofia Beasts', 'handle' => '@sofiabeasts', 'initial' => 'S', 'bio' => 'Stylized creatures and friendly monsters.',                                  'models_count' => 1, 'sales' => 421, 'verified' => true],
            ['name' => 'Omar Builds',  'handle' => '@omarbuilds',  'initial' => 'O', 'bio' => 'Architectural and environment kits for tabletop digital scenes.',             'models_count' => 2, 'sales' => 375, 'verified' => true],
            ['name' => 'Lina Forge',   'handle' => '@linaforge',   'initial' => 'L', 'bio' => 'Hand-painted weapons and fantasy gear.',                                     'models_count' => 2, 'sales' => 271, 'verified' => true],
            ['name' => 'Aria Voxel',   'handle' => '@ariavoxel',   'initial' => 'A', 'bio' => 'Stylized character artist with a love for low-poly heroes.',                 'models_count' => 2, 'sales' => 238, 'verified' => true],
            ['name' => 'Ravi Craft',   'handle' => '@ravicraft',   'initial' => 'R', 'bio' => 'Indie game-ready props with a cozy aesthetic.',                              'models_count' => 1, 'sales' => 52,  'verified' => false],
        ];

        foreach ($creators as $c) {
            \App\Models\Creator::create($c);
        }

        // ─── Voxel Models (all 9 from frontend data.js) ────────────
        $models = [
            [
                'name'        => 'Low Poly Dragon',
                'price'       => 38.00,
                'likes'       => 1,
                'views'       => '11.2k',
                'creator_id'  => 2, // Sofia Beasts
                'category'    => 'Creatures',
                'image'       => 'https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&q=80',
                'model_url'   => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
                'featured'    => true,
                'description' => 'A beautifully crafted low-poly dragon model perfect for fantasy games. Features clean topology and game-ready optimization.',
                'polygons'    => 8420,
                'vertices'    => 6320,
                'textures'    => '2K PBR',
                'formats'     => '.GLB, .FBX, .OBJ',
                'rigged'      => true,
                'animated'    => false,
            ],
            [
                'name'        => 'Medieval Castle Tower',
                'price'       => 45.00,
                'likes'       => 2,
                'views'       => '14.2k',
                'creator_id'  => 3, // Omar Builds
                'category'    => 'Environment',
                'image'       => 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80',
                'model_url'   => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Box/glTF-Binary/Box.glb',
                'featured'    => true,
                'description' => 'Modular medieval castle tower with detailed textures. Perfect for building complete fortress environments.',
                'polygons'    => 15200,
                'vertices'    => 12100,
                'textures'    => '4K PBR',
                'formats'     => '.GLB, .FBX, .OBJ',
                'rigged'      => false,
                'animated'    => false,
            ],
            [
                'name'        => 'Sci-Fi Spaceship',
                'price'       => 32.00,
                'likes'       => 1,
                'views'       => '9.8k',
                'creator_id'  => 1, // Kenji Makes
                'category'    => 'Vehicles',
                'image'       => 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=800&q=80',
                'model_url'   => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Corset/glTF-Binary/Corset.glb',
                'featured'    => true,
                'description' => 'Futuristic spaceship with detailed interior. Optimized for real-time rendering in games.',
                'polygons'    => 18500,
                'vertices'    => 14200,
                'textures'    => '4K PBR',
                'formats'     => '.GLB, .FBX, .OBJ',
                'rigged'      => false,
                'animated'    => false,
            ],
            [
                'name'        => 'Fantasy Sword',
                'price'       => 12.00,
                'likes'       => 3,
                'views'       => '2.4k',
                'creator_id'  => 4, // Lina Forge
                'category'    => 'Weapons',
                'image'       => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
                'model_url'   => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
                'featured'    => true,
                'description' => 'Detailed fantasy sword with magical runes. Hand-painted textures and game-ready topology.',
                'polygons'    => 3200,
                'vertices'    => 2100,
                'textures'    => '2K PBR',
                'formats'     => '.GLB, .FBX, .OBJ',
                'rigged'      => false,
                'animated'    => false,
            ],
            [
                'name'        => 'Racing Car',
                'price'       => 26.00,
                'likes'       => 3,
                'views'       => '7.1k',
                'creator_id'  => 1, // Kenji Makes
                'category'    => 'Vehicles',
                'image'       => 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=800&q=80',
                'model_url'   => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
                'featured'    => true,
                'description' => 'High-performance racing car with detailed interior. Perfect for racing games.',
                'polygons'    => 22000,
                'vertices'    => 18500,
                'textures'    => '4K PBR',
                'formats'     => '.GLB, .FBX, .OBJ',
                'rigged'      => true,
                'animated'    => false,
            ],
            [
                'name'        => 'Knight Character',
                'price'       => 24.00,
                'likes'       => 1,
                'views'       => '4.2k',
                'creator_id'  => 5, // Aria Voxel
                'category'    => 'Characters',
                'image'       => 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
                'model_url'   => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
                'featured'    => false,
                'description' => 'Fully rigged knight character ready for animation. Includes multiple armor pieces.',
                'polygons'    => 12800,
                'vertices'    => 9600,
                'textures'    => '2K PBR',
                'formats'     => '.GLB, .FBX, .OBJ',
                'rigged'      => true,
                'animated'    => true,
            ],
            [
                'name'        => 'Robot Companion',
                'price'       => 28.00,
                'likes'       => 2,
                'views'       => '5.9k',
                'creator_id'  => 6, // Ravi Craft
                'category'    => 'Characters',
                'image'       => 'https://images.unsplash.com/photo-1633398361623-b87e22135c36?w=800&q=80',
                'model_url'   => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Lantern/glTF-Binary/Lantern.glb',
                'featured'    => false,
                'description' => 'Cute robot companion with modular parts. Perfect for sci-fi games.',
                'polygons'    => 8900,
                'vertices'    => 7200,
                'textures'    => '2K PBR',
                'formats'     => '.GLB, .FBX, .OBJ',
                'rigged'      => true,
                'animated'    => false,
            ],
            [
                'name'        => 'Fantasy Tree',
                'price'       => 8.00,
                'likes'       => 3,
                'views'       => '3.3k',
                'creator_id'  => 3, // Omar Builds
                'category'    => 'Environment',
                'image'       => 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
                'model_url'   => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Avocado/glTF-Binary/Avocado.glb',
                'featured'    => false,
                'description' => 'Stylized fantasy tree with glowing leaves. Great for magical forest environments.',
                'polygons'    => 5600,
                'vertices'    => 4200,
                'textures'    => '2K PBR',
                'formats'     => '.GLB, .FBX, .OBJ',
                'rigged'      => false,
                'animated'    => false,
            ],
            [
                'name'        => 'Laser Gun',
                'price'       => 9.00,
                'likes'       => 1,
                'views'       => '1.8k',
                'creator_id'  => 4, // Lina Forge
                'category'    => 'Weapons',
                'image'       => 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80',
                'model_url'   => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
                'featured'    => false,
                'description' => 'Futuristic laser gun with animated parts. Includes muzzle flash effects.',
                'polygons'    => 4200,
                'vertices'    => 3100,
                'textures'    => '2K PBR',
                'formats'     => '.GLB, .FBX, .OBJ',
                'rigged'      => false,
                'animated'    => true,
            ],
        ];

        foreach ($models as $m) {
            \App\Models\VoxelModel::create($m);
        }
    }
}
