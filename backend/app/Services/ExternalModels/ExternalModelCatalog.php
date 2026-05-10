<?php

namespace App\Services\ExternalModels;

use App\Services\ExternalModels\Contracts\ExternalModelProvider;
use Illuminate\Support\Arr;

class ExternalModelCatalog
{
    /** @var array<string, ExternalModelProvider> */
    private array $providers;

    /**
     * @param array<int, ExternalModelProvider> $providers
     */
    public function __construct(array $providers)
    {
        $map = [];
        foreach ($providers as $provider) {
            $map[$provider->source()] = $provider;
        }
        $this->providers = $map;
    }

    /**
     * @return array<int, string>
     */
    public function sources(): array
    {
        return array_values(array_filter(array_keys($this->providers), function (string $key) {
            return $this->providers[$key]->enabled();
        }));
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function list(string $source, array $filters = []): array
    {
        if ($source === 'all') {
            $out = [];
            foreach ($this->providers as $provider) {
                if (!$provider->enabled()) continue;
                $out = array_merge($out, $provider->list($filters));
            }
            return $out;
        }

        $provider = Arr::get($this->providers, $source);
        if (!$provider || !$provider->enabled()) {
            return [];
        }

        return $provider->list($filters);
    }

    /**
     * @return array<string, mixed>|null
     */
    public function get(string $source, string $externalId): ?array
    {
        $provider = Arr::get($this->providers, $source);
        if (!$provider || !$provider->enabled()) {
            return null;
        }

        return $provider->get($externalId);
    }
}
