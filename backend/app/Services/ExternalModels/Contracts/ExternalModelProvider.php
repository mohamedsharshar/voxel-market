<?php

namespace App\Services\ExternalModels\Contracts;

interface ExternalModelProvider
{
    /**
     * Stable provider key (e.g. "polyhaven", "github-samples").
     */
    public function source(): string;

    /**
     * Whether the provider is enabled in the current environment.
     */
    public function enabled(): bool;

    /**
     * List/search models.
     *
     * @return array<int, array<string, mixed>> Normalized model cards.
     */
    public function list(array $filters = []): array;

    /**
     * Get full model details.
     *
     * @return array<string, mixed>|null Normalized model detail.
     */
    public function get(string $externalId): ?array;
}
