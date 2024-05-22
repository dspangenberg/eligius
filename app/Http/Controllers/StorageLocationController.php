<?php

namespace App\Http\Controllers;

use App\Models\StorageLocation;
use Illuminate\Http\Request;

class StorageLocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return response()->json([
        'locations' => StorageLocation::orderBy('name')->paginate(10, ['*'], 'locations')->toArray()
      ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $validated = $request->validate([
        'name' => 'required'
      ]);

      $location = StorageLocation::create($validated);
      return response()->json([
        'location' => $location
      ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(StorageLocation $storageLocation)
    {
      return response()->json([
        'location' => $storageLocation
      ], 200);
    }

    public function update(Request $request, StorageLocation $storageLocation)
    {
      $validated = $request->validate([
        'name' => 'required',
      ]);

      $storageLocation->update($validated);

      return response()->json([
        'location' => $storageLocation
      ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StorageLocation $storageLocation)
    {
        //
    }
}
