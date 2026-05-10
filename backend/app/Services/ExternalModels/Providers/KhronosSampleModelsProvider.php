<?php

namespace App\Services\ExternalModels\Providers;

use App\Services\ExternalModels\Contracts\ExternalModelProvider;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class KhronosSampleModelsProvider implements ExternalModelProvider
{
    public function source(): string
    {
        return 'khronos';
    }

    public function enabled(): bool
    {
        return true;
    }

    public function list(array $filters = []): array
    {
        $query = trim((string) Arr::get($filters, 'q', ''));
        $items = $this->models();

        if ($query !== '') {
            $q = Str::lower($query);
            $items = array_values(array_filter($items, function (array $item) use ($q) {
                $hay = Str::lower(($item['name'] ?? '') . ' ' . implode(' ', $item['tags'] ?? []));
                return Str::contains($hay, $q);
            }));
        }

        return array_map(fn (array $item) => $this->normalize($item, includeModelUrl: false), $items);
    }

    public function get(string $externalId): ?array
    {
        foreach ($this->models() as $item) {
            if (($item['externalId'] ?? '') === $externalId) {
                return $this->normalize($item, includeModelUrl: true);
            }
        }

        return null;
    }

    /**
     * Curated set of Khronos glTF sample models.
     * Uses stable raw GitHub URLs for GLB + screenshot.
     *
     * @return array<int, array<string, mixed>>
     */
    private function models(): array
    {
        $baseRaw = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0';

        return [
            [
                'externalId' => 'Duck',
                'name' => 'Duck',
                'category' => 'Samples',
                'image' => $baseRaw . '/Duck/screenshot/screenshot.png',
                'modelUrl' => $baseRaw . '/Duck/glTF-Binary/Duck.glb',
                'tags' => ['Duck', 'Sample', 'glTF', 'GLB'],
                'polygons' => 0,
            ],
            [
                'externalId' => 'Box',
                'name' => 'Box',
                'category' => 'Samples',
                'image' => $baseRaw . '/Box/screenshot/screenshot.png',
                'modelUrl' => $baseRaw . '/Box/glTF-Binary/Box.glb',
                'tags' => ['Box', 'Sample', 'glTF', 'GLB'],
                'polygons' => 0,
            ],
            [
                'externalId' => 'DamagedHelmet',
                'name' => 'Damaged Helmet',
                'category' => 'Samples',
                'image' => $baseRaw . '/DamagedHelmet/screenshot/screenshot.png',
                'modelUrl' => $baseRaw . '/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
                'tags' => ['Helmet', 'Sample', 'PBR', 'glTF', 'GLB'],
                'polygons' => 0,
            ],
            [
                'externalId' => 'Avocado',
                'name' => 'Avocado',
                'category' => 'Samples',
                'image' => $baseRaw . '/Avocado/screenshot/screenshot.png',
                'modelUrl' => $baseRaw . '/Avocado/glTF-Binary/Avocado.glb',
                'tags' => ['Avocado', 'Sample', 'glTF', 'GLB'],
                'polygons' => 0,
            ],
            [
                'externalId' => 'Lantern',
                'name' => 'Lantern',
                'category' => 'Samples',
                'image' => $baseRaw . '/Lantern/screenshot/screenshot.png',
                'modelUrl' => $baseRaw . '/Lantern/glTF-Binary/Lantern.glb',
                'tags' => ['Lantern', 'Sample', 'glTF', 'GLB'],
                'polygons' => 0,
            ],
            [
                'externalId' => 'WaterBottle',
                'name' => 'Water Bottle',
                'category' => 'Samples',
                'image' => $baseRaw . '/WaterBottle/screenshot/screenshot.png',
                'modelUrl' => $baseRaw . '/WaterBottle/glTF-Binary/WaterBottle.glb',
                'tags' => ['Bottle', 'Sample', 'glTF', 'GLB'],
                'polygons' => 0,
            ],
        ];
    }

    /**
     * @param array<string, mixed> $item
     */
    private function normalize(array $item, bool $includeModelUrl): array
    {
        $name = (string) ($item['name'] ?? $item['externalId'] ?? 'Sample Model');
        $externalId = (string) ($item['externalId'] ?? $name);

        return [
            'id' => $this->source() . ':' . $externalId,
            'externalId' => $externalId,
            'source' => $this->source(),
            'name' => $name,
            'title' => $name,
            'priceValue' => 0.0,
            'price' => '$0.00',
            'likes' => 0,
            'rating' => null,
            'reviews' => 0,
            'downloads' => 0,
            'views' => '—',
            'creator' => 'KhronosGroup',
            'verified' => true,
            'category' => (string) ($item['category'] ?? 'Samples'),
            'image' => (string) ($item['image'] ?? ''),
            'modelUrl' => $includeModelUrl ? (string) ($item['modelUrl'] ?? null) : null,
            'featured' => false,
            'trending' => false,
            'staffPick' => false,
            'description' => 'glTF Sample Model (for testing/viewing).',
            'polygons' => (int) ($item['polygons'] ?? 0),
            'vertices' => 0,
            'textures' => null,
            'formats' => '.GLB',
            'fileTypes' => ['GLB'],
            'rigged' => false,
            'animated' => false,
            'lowPoly' => null,
            'pbr' => null,
            'gameReady' => null,
            'license' => 'Sample (see upstream repo)',
            'updatedAt' => null,
            'tags' => array_values(array_filter((array) ($item['tags'] ?? []), 'is_string')),
        ];
    }
}
