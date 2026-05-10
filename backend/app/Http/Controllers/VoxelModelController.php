<?php

namespace App\Http\Controllers;

use App\Models\VoxelModel;
use App\Services\ExternalModels\ExternalModelCatalog;
use App\Support\ModelCardFormatter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class VoxelModelController extends Controller
{
    /**
     * Display a listing of all models.
     */
    public function index(Request $request, ExternalModelCatalog $catalog)
    {
        $format = $request->get('format');
        $source = $request->get('source', 'local');

        $query = VoxelModel::with('creator');

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Filter by featured
        if ($request->has('featured')) {
            $query->where('featured', $request->boolean('featured'));
        }

        // Filter by price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Search by name
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sort
        $sortBy = $request->get('sort', 'created_at');
        $sortDir = $request->get('direction', 'desc');
        $allowedSorts = ['name', 'price', 'likes', 'created_at'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir);
        }

        // Default behavior (backwards compatible): return raw local DB models.
        if ($format !== 'card' && ($source === null || $source === '' || $source === 'local')) {
            return response()->json($query->get());
        }

        $localCards = ($source === null || $source === '' || $source === 'local' || $source === 'all')
            ? $query->get()->map(fn (VoxelModel $model) => ModelCardFormatter::fromVoxelModel($model))->values()->all()
            : [];

        if ($source === null || $source === '' || $source === 'local') {
            return response()->json($localCards);
        }

        $filters = [
            // Prefer q, fallback to search.
            'q' => (string) ($request->get('q') ?? $request->get('search') ?? ''),
            'limit' => (int) ($request->get('limit') ?? 60),
        ];

        $externalCards = $catalog->list((string) $source, $filters);

        if ($source === 'all') {
            return response()->json(array_values(array_merge($localCards, $externalCards)));
        }

        return response()->json($externalCards);
    }

    /**
     * Display a specific model.
     */
    public function show(Request $request, ExternalModelCatalog $catalog, $id)
    {
        // External model IDs look like: "source:externalId".
        if (!is_numeric($id) && is_string($id) && Str::contains($id, ':')) {
            [$source, $externalId] = explode(':', $id, 2);
            $external = $catalog->get((string) $source, (string) $externalId);
            if (!$external) {
                abort(404);
            }

            return response()->json(ModelCardFormatter::fromExternal($external));
        }

        $model = VoxelModel::with('creator')->findOrFail($id);

        if ($request->get('format') === 'card') {
            return response()->json(ModelCardFormatter::fromVoxelModel($model));
        }

        return response()->json($model);
    }

    /**
     * Store a new model (admin only).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
            'creator_id'  => 'required|exists:creators,id',
            'category'    => 'required|string',
            'image'       => 'required|string',
            'model_url'   => 'required|string',
            'description' => 'required|string',
            'polygons'    => 'sometimes|integer|min:0',
            'vertices'    => 'sometimes|integer|min:0',
            'textures'    => 'sometimes|string',
            'formats'     => 'sometimes|string',
            'featured'    => 'sometimes|boolean',
            'rigged'      => 'sometimes|boolean',
            'animated'    => 'sometimes|boolean',
        ]);

        $model = VoxelModel::create($validated);

        return response()->json($model->load('creator'), 201);
    }

    /**
     * Update an existing model (admin only).
     */
    public function update(Request $request, $id)
    {
        $model = VoxelModel::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'price'       => 'sometimes|numeric|min:0',
            'creator_id'  => 'sometimes|exists:creators,id',
            'category'    => 'sometimes|string',
            'image'       => 'sometimes|string',
            'model_url'   => 'sometimes|string',
            'description' => 'sometimes|string',
            'polygons'    => 'sometimes|integer|min:0',
            'vertices'    => 'sometimes|integer|min:0',
            'textures'    => 'sometimes|string',
            'formats'     => 'sometimes|string',
            'featured'    => 'sometimes|boolean',
            'rigged'      => 'sometimes|boolean',
            'animated'    => 'sometimes|boolean',
        ]);

        $model->update($validated);

        return response()->json($model->load('creator'));
    }

    /**
     * Delete a model (admin only).
     */
    public function destroy($id)
    {
        $model = VoxelModel::findOrFail($id);
        $model->delete();

        return response()->json(['message' => 'Model deleted successfully.']);
    }

    /**
     * Upload/replace thumbnail image for a local model (admin only).
     */
    public function uploadThumbnail(Request $request, $id)
    {
        $model = VoxelModel::findOrFail($id);

        $validated = $request->validate([
            'image' => 'required|file|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $file = $validated['image'];

        $path = Storage::disk('public')->putFile('model-thumbs', $file);
        $model->image = '/storage/' . ltrim($path, '/');
        $model->save();

        return response()->json(ModelCardFormatter::fromVoxelModel($model->load('creator')));
    }

    /**
     * Get all unique categories with counts.
     */
    public function categories()
    {
        $categories = VoxelModel::selectRaw('category as name, count(*) as count')
            ->groupBy('category')
            ->orderBy('count', 'desc')
            ->get();

        return response()->json($categories);
    }

    /**
     * Like a model.
     */
    public function like($id)
    {
        $model = VoxelModel::findOrFail($id);
        $model->increment('likes');

        return response()->json(['likes' => $model->fresh()->likes]);
    }
}
