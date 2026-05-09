<?php

namespace App\Http\Controllers;

use App\Models\Creator;
use Illuminate\Http\Request;

class CreatorController extends Controller
{
    /**
     * Display a listing of all creators.
     */
    public function index(Request $request)
    {
        $query = Creator::query();

        // Filter verified creators
        if ($request->has('verified')) {
            $query->where('verified', $request->boolean('verified'));
        }

        // Search by name or handle
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('handle', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortBy = $request->get('sort', 'sales');
        $sortDir = $request->get('direction', 'desc');
        $allowedSorts = ['name', 'models_count', 'sales', 'created_at'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir);
        }

        return response()->json($query->get());
    }

    /**
     * Display a specific creator with their models.
     */
    public function show($id)
    {
        $creator = Creator::with('voxelModels')->findOrFail($id);

        return response()->json($creator);
    }

    /**
     * Find a creator by name (for profile pages).
     */
    public function findByName($name)
    {
        $creator = Creator::with('voxelModels')
            ->where('name', 'like', str_replace('-', ' ', $name))
            ->firstOrFail();

        return response()->json($creator);
    }

    /**
     * Store a new creator (admin only).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'handle'       => 'required|string|unique:creators,handle',
            'initial'      => 'required|string|max:2',
            'bio'          => 'sometimes|string',
            'models_count' => 'sometimes|integer|min:0',
            'sales'        => 'sometimes|integer|min:0',
            'verified'     => 'sometimes|boolean',
        ]);

        $creator = Creator::create($validated);

        return response()->json($creator, 201);
    }

    /**
     * Update an existing creator (admin only).
     */
    public function update(Request $request, $id)
    {
        $creator = Creator::findOrFail($id);

        $validated = $request->validate([
            'name'         => 'sometimes|string|max:255',
            'handle'       => 'sometimes|string|unique:creators,handle,' . $creator->id,
            'initial'      => 'sometimes|string|max:2',
            'bio'          => 'sometimes|string',
            'models_count' => 'sometimes|integer|min:0',
            'sales'        => 'sometimes|integer|min:0',
            'verified'     => 'sometimes|boolean',
        ]);

        $creator->update($validated);

        return response()->json($creator);
    }

    /**
     * Delete a creator (admin only).
     */
    public function destroy($id)
    {
        $creator = Creator::findOrFail($id);
        $creator->delete();

        return response()->json(['message' => 'Creator deleted successfully.']);
    }
}
