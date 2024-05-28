<?php

namespace App\Http\Controllers;

use App\Models\StorageLocation;
use Illuminate\Http\Request;
use App\Models\BusinessSegment;

class StorageLocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return response()->json([
        'locations' => StorageLocation::orderBy('name')->with('segment')->paginate(20, ['*'], 'locations')->toArray(),
        'segments' => BusinessSegment::orderBy('name')->get()->toArray()
      ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $validated = $request->validate([
        'name' => 'required',
        'business_segment_id' =>'required'
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
        'business_segment_id' =>'required'
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
