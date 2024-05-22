<?php

namespace App\Http\Controllers;

use App\Models\EqquipmentGroup;
use Illuminate\Http\Request;

class EqquipmentGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return response()->json([
        'groups' => EqquipmentGroup::orderBy('name')->paginate(10, ['*'], 'groups')->toArray()
      ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $validated = $request->validate([
        'name' => 'required',
        'inventory_number_prefix' => 'required',
        'inventory_current_number' => 'required',
      ]);

      $eqquipmentGroup = EqquipmentGroup::create($validated);
      return response()->json([
        'group' => $eqquipmentGroup
      ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(EqquipmentGroup $eqquipmentGroup)
    {
      return response()->json([
        'group' => $eqquipmentGroup
      ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EqquipmentGroup $eqquipmentGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EqquipmentGroup $eqquipmentGroup)
    {
      $validated = $request->validate([
        'name' => 'required',
        'inventory_number_prefix' => 'required',
        'inventory_current_number' => 'required'
      ]);

      $eqquipmentGroup->update($validated);

      return response()->json([
        'group' => $eqquipmentGroup
      ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EqquipmentGroup $eqquipmentGroup)
    {
        //
    }
}
