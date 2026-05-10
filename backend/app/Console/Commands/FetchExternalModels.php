<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\VoxelModel;
use App\Models\Creator;
use Illuminate\Support\Str;

class FetchExternalModels extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'models:fetch {--limit=10}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch 3D models from external APIs (PolyHaven, Sketchfab) and insert them into the database.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to fetch models from external APIs...');
        
        $limit = $this->option('limit');
        
        // Fetch from Poly Haven
        $this->fetchPolyHaven($limit);
        
        // Fetch from Sketchfab
        $this->fetchSketchfab($limit);

        $this->info('Successfully fetched models!');
    }

    private function fetchPolyHaven($limit)
    {
        $this->info("Fetching up to {$limit} models from Poly Haven...");
        $response = Http::get('https://api.polyhaven.com/assets?t=models');
        
        if ($response->successful()) {
            $data = $response->json();
            $count = 0;
            
            foreach ($data as $id => $item) {
                if ($count >= $limit) break;
                
                // Get creator
                $authorName = "Poly Haven";
                if (isset($item['authors']) && count($item['authors']) > 0) {
                    $authorName = array_key_first($item['authors']);
                }
                
                $creator = $this->getOrCreateCreator($authorName);
                
                // Poly Haven gives thumbnails representing the actual model
                $image = $item['thumbnail_url'] ?? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
                
                // Convert ID to a readable name if not provided
                $name = Str::title(str_replace('_', ' ', $id));
                $category = isset($item['categories'][0]) ? ucfirst($item['categories'][0]) : 'Props';
                
                VoxelModel::updateOrCreate(
                    ['model_url' => "https://polyhaven.com/a/{$id}"],
                    [
                        'name' => $name,
                        'price' => rand(0, 1) ? 0 : rand(5, 50),
                        'likes' => rand(10, 500),
                        'views' => rand(100, 5000) . '',
                        'creator_id' => $creator->id,
                        'category' => $category,
                        'image' => $image,
                        'featured' => rand(0, 10) > 7,
                        'description' => $item['description'] ?? "High quality 3D model from Poly Haven.",
                        'polygons' => $item['polycount'] ?? rand(1000, 50000),
                        'vertices' => $item['polycount'] ?? rand(1000, 50000),
                        'textures' => 'PBR',
                        'formats' => '.GLTF, .BLEND',
                        'rigged' => false,
                        'animated' => false,
                    ]
                );
                
                $count++;
            }
            $this->info("Successfully fetched {$count} models from Poly Haven.");
        } else {
            $this->error('Failed to fetch from Poly Haven.');
        }
    }

    private function fetchSketchfab($limit)
    {
        $this->info("Fetching up to {$limit} models from Sketchfab...");
        // Use a public search endpoint
        $response = Http::get('https://api.sketchfab.com/v3/search', [
            'type' => 'models',
            'downloadable' => 'true',
            'is_free' => 'true',
            'count' => $limit,
            'sort_by' => '-likeCount', // Get popular ones
        ]);
        
        if ($response->successful()) {
            $data = $response->json();
            $results = $data['results'] ?? [];
            $count = 0;
            
            foreach ($results as $item) {
                if ($count >= $limit) break;
                
                $authorName = $item['user']['displayName'] ?? $item['user']['username'] ?? 'Sketchfab User';
                $creator = $this->getOrCreateCreator($authorName);
                
                // Get the best thumbnail
                $image = null;
                if (!empty($item['thumbnails']['images'])) {
                    // Try to get a reasonably sized thumbnail (e.g. width around 1024 or the largest one)
                    $images = $item['thumbnails']['images'];
                    usort($images, fn($a, $b) => $b['width'] <=> $a['width']);
                    $image = $images[0]['url'];
                }
                
                if (!$image) {
                    $image = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
                }
                
                $category = 'Art';
                if (!empty($item['categories'])) {
                    $category = $item['categories'][0]['name'] ?? 'Art';
                }
                
                VoxelModel::updateOrCreate(
                    ['model_url' => $item['viewerUrl']],
                    [
                        'name' => $item['name'] ?? 'Sketchfab Model',
                        'price' => 0, // It's free
                        'likes' => $item['likeCount'] ?? rand(10, 500),
                        'views' => ($item['viewCount'] ?? rand(100, 5000)) . '',
                        'creator_id' => $creator->id,
                        'category' => $category,
                        'image' => $image,
                        'featured' => $item['staffpickedAt'] ? true : false,
                        'description' => Str::limit($item['description'] ?? 'A cool 3D model from Sketchfab.', 500),
                        'polygons' => $item['faceCount'] ?? rand(1000, 50000),
                        'vertices' => $item['vertexCount'] ?? rand(1000, 50000),
                        'textures' => 'Included',
                        'formats' => '.GLTF, .GLB',
                        'rigged' => $item['isRigged'] ?? false,
                        'animated' => $item['isAnimated'] ?? false,
                    ]
                );
                
                $count++;
            }
            $this->info("Successfully fetched {$count} models from Sketchfab.");
        } else {
            $this->error('Failed to fetch from Sketchfab.');
        }
    }

    private function getOrCreateCreator($name)
    {
        $handle = '@' . Str::slug($name, '');
        $initial = strtoupper(substr($name, 0, 1));
        
        return Creator::firstOrCreate(
            ['handle' => $handle],
            [
                'name' => $name,
                'initial' => $initial,
                'bio' => "A talented 3D artist known as {$name}.",
                'models_count' => rand(5, 50),
                'sales' => rand(100, 1000) . '+',
                'followers' => rand(1000, 10000) . '+',
                'verified' => rand(0, 1) == 1,
            ]
        );
    }
}
