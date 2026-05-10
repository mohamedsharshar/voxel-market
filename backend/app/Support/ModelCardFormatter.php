<?php

namespace App\Support;

use App\Models\VoxelModel;
use Illuminate\Support\Str;

class ModelCardFormatter
{
    /**
     * @return array<string, mixed>
     */
    public static function fromVoxelModel(VoxelModel $model): array
    {
        $creator = $model->creator;
        $formats = $model->formats;
        $fileTypes = self::parseFileTypes($formats);

        return [
            'id' => $model->id,
            'source' => 'local',
            'externalId' => null,
            'name' => $model->name,
            'title' => $model->name,
            'priceValue' => (float) $model->price,
            'price' => '$' . number_format((float) $model->price, 2),
            'likes' => (int) $model->likes,
            'rating' => null,
            'reviews' => 0,
            'downloads' => 0,
            'views' => (string) $model->views,
            'creator' => $creator?->name ?? 'Unknown',
            'verified' => (bool) ($creator?->verified ?? false),
            'category' => (string) $model->category,
            'image' => self::toAbsoluteUrl((string) $model->image),
            'modelUrl' => self::toAbsoluteUrl((string) $model->model_url),
            'featured' => (bool) $model->featured,
            'trending' => (int) $model->likes >= 100,
            'staffPick' => false,
            'description' => (string) $model->description,
            'polygons' => (int) $model->polygons,
            'vertices' => (int) $model->vertices,
            'textures' => $model->textures,
            'formats' => $formats,
            'fileTypes' => $fileTypes,
            'rigged' => (bool) $model->rigged,
            'animated' => (bool) $model->animated,
            'lowPoly' => $model->polygons ? ((int) $model->polygons <= 10000) : null,
            'pbr' => null,
            'gameReady' => null,
            'license' => 'Commercial (site terms)',
            'updatedAt' => optional($model->updated_at)->toDateString(),
            'tags' => self::inferTags($model->name, (string) $model->category, $fileTypes),
        ];
    }

    /**
     * @param array<string, mixed> $external
     * @return array<string, mixed>
     */
    public static function fromExternal(array $external): array
    {
        // External providers already return UI-friendly cards.
        return $external;
    }

    /**
     * @return array<int, string>
     */
    private static function parseFileTypes(?string $formats): array
    {
        if (!$formats) return [];

        // Example: ".GLB, .FBX, .OBJ"
        preg_match_all('/\.(\w+)/', $formats, $matches);
        $types = array_map('strtoupper', $matches[1] ?? []);
        $types = array_values(array_unique(array_filter($types)));
        return $types;
    }

    private static function toAbsoluteUrl(string $value): string
    {
        $value = trim($value);
        if ($value === '') return $value;
        if (Str::startsWith($value, ['http://', 'https://'])) return $value;

        $base = rtrim(config('app.url') ?? 'http://localhost', '/');

        // Allow values like "/storage/x.png" or "storage/x.png"
        if (!Str::startsWith($value, '/')) {
            $value = '/' . $value;
        }

        return $base . $value;
    }

    /**
     * @return array<int, string>
     */
    private static function inferTags(string $name, string $category, array $fileTypes): array
    {
        $words = preg_split('/\s+/', trim($name)) ?: [];
        $words = array_values(array_filter(array_map(fn ($w) => trim($w, " ,.-_"), $words)));
        $words = array_slice($words, 0, 4);

        $tags = array_merge([$category], $words, $fileTypes);
        $tags = array_values(array_unique(array_filter(array_map(fn ($t) => (string) $t, $tags))));
        return array_slice($tags, 0, 12);
    }
}
