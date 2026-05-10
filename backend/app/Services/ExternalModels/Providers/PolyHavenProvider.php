<?php

namespace App\Services\ExternalModels\Providers;

use App\Services\ExternalModels\Contracts\ExternalModelProvider;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class PolyHavenProvider implements ExternalModelProvider
{
    public function source(): string
    {
        return 'polyhaven';
    }

    public function enabled(): bool
    {
        return (bool) config('services.polyhaven.base_url');
    }

    public function list(array $filters = []): array
    {
        $query = trim((string) Arr::get($filters, 'q', ''));
        $limit = (int) Arr::get($filters, 'limit', 60);
        $limit = max(1, min(200, $limit));

        $assets = Cache::remember('external_models.polyhaven.assets', now()->addMinutes(30), function () {
            $baseUrl = rtrim((string) config('services.polyhaven.base_url'), '/');
            $userAgent = (string) config('services.polyhaven.user_agent');

            $resp = Http::withHeaders([
                'User-Agent' => $userAgent,
                'Accept' => 'application/json',
            ])
                ->timeout(12)
                ->retry(1, 250)
                ->get($baseUrl . '/assets', ['type' => 'models']);

            if (!$resp->ok()) {
                return [];
            }

            // Response is a JSON object where keys are asset IDs.
            return (array) $resp->json();
        });

        $rows = [];
        foreach ($assets as $assetId => $payload) {
            if (!is_array($payload)) continue;

            $name = (string) Arr::get($payload, 'name', $assetId);
            $description = (string) Arr::get($payload, 'description', '');
            $tags = array_values(array_filter((array) Arr::get($payload, 'tags', []), 'is_string'));
            $categories = array_values(array_filter((array) Arr::get($payload, 'categories', []), 'is_string'));

            if ($query !== '') {
                $haystack = Str::lower($name . ' ' . $description . ' ' . implode(' ', $tags) . ' ' . implode(' ', $categories));
                if (!Str::contains($haystack, Str::lower($query))) {
                    continue;
                }
            }

            $rows[] = $this->normalizeCard($assetId, $payload);
            if (count($rows) >= $limit) break;
        }

        return $rows;
    }

    public function get(string $externalId): ?array
    {
        $baseUrl = rtrim((string) config('services.polyhaven.base_url'), '/');
        $userAgent = (string) config('services.polyhaven.user_agent');

        $infoResp = Http::withHeaders([
            'User-Agent' => $userAgent,
            'Accept' => 'application/json',
        ])
            ->timeout(12)
            ->retry(1, 250)
            ->get($baseUrl . '/info/' . urlencode($externalId));

        if (!$infoResp->ok()) {
            return null;
        }

        $info = (array) $infoResp->json();

        $filesResp = Http::withHeaders([
            'User-Agent' => $userAgent,
            'Accept' => 'application/json',
        ])
            ->timeout(12)
            ->retry(1, 250)
            ->get($baseUrl . '/files/' . urlencode($externalId));

        $files = $filesResp->ok() ? (array) $filesResp->json() : [];

        $modelUrl = $this->pickGltfUrl($files);

        $card = $this->normalizeCard($externalId, $info);
        $card['modelUrl'] = $modelUrl;
        $card['formats'] = $card['formats'] ?? '.GLTF';
        $card['fileTypes'] = $card['fileTypes'] ?? ['GLTF'];
        $card['license'] = 'CC0';

        return $card;
    }

    /**
     * @param array<string, mixed> $payload
     * @return array<string, mixed>
     */
    private function normalizeCard(string $assetId, array $payload): array
    {
        $name = (string) Arr::get($payload, 'name', $assetId);
        $tags = array_values(array_filter((array) Arr::get($payload, 'tags', []), 'is_string'));
        $categories = array_values(array_filter((array) Arr::get($payload, 'categories', []), 'is_string'));

        $polycount = (int) Arr::get($payload, 'polycount', 0);

        $thumbnail = (string) Arr::get($payload, 'thumbnail_url', '');
        if ($thumbnail === '') {
            $thumbnail = 'https://cdn.polyhaven.com/asset_img/thumbs/' . rawurlencode($assetId) . '.png?width=512&height=512';
        } else {
            $thumbnail = preg_replace('/width=\d+&height=\d+/', 'width=512&height=512', $thumbnail) ?? $thumbnail;
        }

        $category = $categories[0] ?? 'External';
        $creatorName = (string) array_key_first((array) Arr::get($payload, 'authors', []));
        if ($creatorName === '') $creatorName = 'Poly Haven';

        return [
            'id' => $this->source() . ':' . $assetId,
            'externalId' => $assetId,
            'source' => $this->source(),
            'name' => $name,
            'title' => $name,
            'priceValue' => 0.0,
            'price' => '$0.00',
            'likes' => 0,
            'rating' => null,
            'reviews' => 0,
            'downloads' => (int) Arr::get($payload, 'download_count', 0),
            'views' => '—',
            'creator' => $creatorName,
            'verified' => true,
            'category' => Str::title(str_replace('_', ' ', $category)),
            'image' => $thumbnail,
            'modelUrl' => null,
            'featured' => false,
            'trending' => false,
            'staffPick' => false,
            'description' => (string) Arr::get($payload, 'description', ''),
            'polygons' => $polycount,
            'vertices' => 0,
            'textures' => null,
            'formats' => null,
            'fileTypes' => [],
            'rigged' => false,
            'animated' => false,
            'lowPoly' => null,
            'pbr' => true,
            'gameReady' => null,
            'license' => 'CC0',
            'updatedAt' => null,
            'tags' => array_slice($tags, 0, 12),
        ];
    }

    /**
     * @param array<string, mixed> $files
     */
    private function pickGltfUrl(array $files): ?string
    {
        $gltf = Arr::get($files, 'gltf');
        if (!is_array($gltf)) return null;

        // Prefer 2k, then 1k, then 4k.
        foreach (['2k', '1k', '4k'] as $res) {
            $node = Arr::get($gltf, $res);
            if (!is_array($node)) continue;
            $entry = Arr::get($node, 'gltf');
            if (!is_array($entry)) continue;
            $url = Arr::get($entry, 'url');
            if (is_string($url) && $url !== '') return $url;
        }

        return null;
    }
}
