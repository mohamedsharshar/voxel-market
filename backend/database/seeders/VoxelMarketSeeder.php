<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Creator;
use App\Models\VoxelModel;
use Illuminate\Support\Facades\Hash;

class VoxelMarketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Admin',
            'email' => 'admin@voxelmarket.com',
            'password' => Hash::make('password'),
            'role' => 'admin'
        ]);

        // Create Regular User
        User::create([
            'name' => 'John Doe',
            'email' => 'user@voxelmarket.com',
            'password' => Hash::make('password'),
            'role' => 'user'
        ]);

        // Create Creators
        $creatorsData = [
            [
                'name' => 'Kenji Makes',
                'handle' => '@kenjimakes',
                'initial' => 'K',
                'bio' => 'Sci-fi vehicles and hard-surface props for indie games.',
                'verified' => true,
                'followers' => 1250
            ],
            [
                'name' => 'Sofia Beasts',
                'handle' => '@sofiabeasts',
                'initial' => 'S',
                'bio' => 'Stylized creatures and friendly monsters.',
                'verified' => true,
                'followers' => 1180
            ],
            [
                'name' => 'Omar Builds',
                'handle' => '@omarbuilds',
                'initial' => 'O',
                'bio' => 'Architectural and environment kits for tabletop digital scenes.',
                'verified' => true,
                'followers' => 980
            ],
            [
                'name' => 'Lina Forge',
                'handle' => '@linaforge',
                'initial' => 'L',
                'bio' => 'Hand-painted weapons and fantasy gear.',
                'verified' => true,
                'followers' => 850
            ],
            [
                'name' => 'Aria Voxel',
                'handle' => '@ariavoxel',
                'initial' => 'A',
                'bio' => 'Stylized character artist with a love for low-poly heroes.',
                'verified' => true,
                'followers' => 720
            ],
            [
                'name' => 'Ravi Craft',
                'handle' => '@ravicraft',
                'initial' => 'R',
                'bio' => 'Indie game-ready props with a cozy aesthetic.',
                'verified' => false,
                'followers' => 320
            ],
        ];

        $creators = [];
        foreach ($creatorsData as $data) {
            $creators[] = Creator::create($data);
        }

        // Create Models
        $modelsData = [
            [
                'name' => 'Low Poly Dragon',
                'description' => 'A beautifully crafted low-poly dragon model perfect for fantasy games. Features clean topology and game-ready optimization.',
                'price' => 38.00,
                'category' => 'Creatures',
                'image' => 'https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
                'creator_id' => $creators[1]->id, // Sofia Beasts
                'featured' => true,
                'likes' => 234,
                'views' => 11200,
                'polygons' => 8420,
                'vertices' => 6320,
                'textures' => '2K PBR',
                'formats' => '.GLB, .FBX, .OBJ',
                'rigged' => true,
                'animated' => false
            ],
            [
                'name' => 'Medieval Castle Tower',
                'description' => 'Modular medieval castle tower with detailed textures. Perfect for building complete fortress environments.',
                'price' => 45.00,
                'category' => 'Environment',
                'image' => 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Box/glTF-Binary/Box.glb',
                'creator_id' => $creators[2]->id, // Omar Builds
                'featured' => true,
                'likes' => 189,
                'views' => 14200,
                'polygons' => 15200,
                'vertices' => 12100,
                'textures' => '4K PBR',
                'formats' => '.GLB, .FBX, .OBJ',
                'rigged' => false,
                'animated' => false
            ],
            [
                'name' => 'Sci-Fi Spaceship',
                'description' => 'Futuristic spaceship with detailed interior. Optimized for real-time rendering in games.',
                'price' => 32.00,
                'category' => 'Vehicles',
                'image' => 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Corset/glTF-Binary/Corset.glb',
                'creator_id' => $creators[0]->id, // Kenji Makes
                'featured' => true,
                'likes' => 156,
                'views' => 9800,
                'polygons' => 18500,
                'vertices' => 14200,
                'textures' => '4K PBR',
                'formats' => '.GLB, .FBX, .OBJ',
                'rigged' => false,
                'animated' => false
            ],
            [
                'name' => 'Fantasy Sword',
                'description' => 'Detailed fantasy sword with magical runes. Hand-painted textures and game-ready topology.',
                'price' => 12.00,
                'category' => 'Weapons',
                'image' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
                'creator_id' => $creators[3]->id, // Lina Forge
                'featured' => true,
                'likes' => 298,
                'views' => 2400,
                'polygons' => 3200,
                'vertices' => 2100,
                'textures' => '2K PBR',
                'formats' => '.GLB, .FBX, .OBJ',
                'rigged' => false,
                'animated' => false
            ],
            [
                'name' => 'Racing Car',
                'description' => 'High-performance racing car with detailed interior. Perfect for racing games.',
                'price' => 26.00,
                'category' => 'Vehicles',
                'image' => 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
                'creator_id' => $creators[0]->id, // Kenji Makes
                'featured' => true,
                'likes' => 412,
                'views' => 7100,
                'polygons' => 22000,
                'vertices' => 18500,
                'textures' => '4K PBR',
                'formats' => '.GLB, .FBX, .OBJ',
                'rigged' => true,
                'animated' => false
            ],
            [
                'name' => 'Knight Character',
                'description' => 'Fully rigged knight character ready for animation. Includes multiple armor pieces.',
                'price' => 24.00,
                'category' => 'Characters',
                'image' => 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
                'creator_id' => $creators[4]->id, // Aria Voxel
                'featured' => false,
                'likes' => 167,
                'views' => 4200,
                'polygons' => 12800,
                'vertices' => 9600,
                'textures' => '2K PBR',
                'formats' => '.GLB, .FBX, .OBJ',
                'rigged' => true,
                'animated' => true
            ],
            [
                'name' => 'Robot Companion',
                'description' => 'Cute robot companion with modular parts. Perfect for sci-fi games.',
                'price' => 28.00,
                'category' => 'Characters',
                'image' => 'https://images.unsplash.com/photo-1633398361623-b87e22135c36?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Lantern/glTF-Binary/Lantern.glb',
                'creator_id' => $creators[5]->id, // Ravi Craft
                'featured' => false,
                'likes' => 203,
                'views' => 5900,
                'polygons' => 8900,
                'vertices' => 7200,
                'textures' => '2K PBR',
                'formats' => '.GLB, .FBX, .OBJ',
                'rigged' => true,
                'animated' => false
            ],
            [
                'name' => 'Fantasy Tree',
                'description' => 'Stylized fantasy tree with glowing leaves. Great for magical forest environments.',
                'price' => 8.00,
                'category' => 'Environment',
                'image' => 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Avocado/glTF-Binary/Avocado.glb',
                'creator_id' => $creators[2]->id, // Omar Builds
                'featured' => false,
                'likes' => 345,
                'views' => 3300,
                'polygons' => 5600,
                'vertices' => 4200,
                'textures' => '2K PBR',
                'formats' => '.GLB, .FBX, .OBJ',
                'rigged' => false,
                'animated' => false
            ],
            [
                'name' => 'Laser Gun',
                'description' => 'Futuristic laser gun with animated parts. Includes muzzle flash effects.',
                'price' => 9.00,
                'category' => 'Weapons',
                'image' => 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80',
                'model_url' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
                'creator_id' => $creators[3]->id, // Lina Forge
                'featured' => false,
                'likes' => 128,
                'views' => 1800,
                'polygons' => 4200,
                'vertices' => 3100,
                'textures' => '2K PBR',
                'formats' => '.GLB, .FBX, .OBJ',
                'rigged' => false,
                'animated' => true
            ],
        ];

        foreach ($modelsData as $data) {
            VoxelModel::create($data);
        }

        $this->command->info('✅ Voxel Market data seeded successfully!');
        $this->command->info('📧 Admin: admin@voxelmarket.com | Password: password');
        $this->command->info('📧 User: user@voxelmarket.com | Password: password');
    }
}
