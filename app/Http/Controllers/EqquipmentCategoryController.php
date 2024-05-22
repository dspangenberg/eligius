<?php

namespace App\Http\Controllers;

use App\Models\EqquipmentCategory;
use App\Models\EqquipmentGroup;

use Illuminate\Http\Request;

class EqquipmentCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return response()->json([
        'categories' => EqquipmentCategory::orderBy('name')->with('group')->paginate(10, ['*'], 'categories')->toArray(),
        'groups' => EqquipmentGroup::orderBy('name')->get()->toArray()
      ], 200);
    }
    public function store(Request $request)
    {
      $validated = $request->validate([
        'name' => 'required',
        'eqquipment_group_id' => 'required'
      ]);

      $eqquipmentCategory = EqquipmentCategory::create($validated);
      return response()->json([
        'category' => $eqquipmentCategory
      ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(EqquipmentCategory $eqquipmentCategory)
    {
      return response()->json([
        'category' => $eqquipmentCategory
      ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EqquipmentCategory $eqquipmentCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EqquipmentCategory $eqquipmentCategory)
    {
        $validated = $request->validate([
          'name' =>'required',
          'eqquipment_group_id' =>'required'
        ]);

        $eqquipmentCategory->update($validated);

        return response()->json([
          'category' => $eqquipmentCategory
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EqquipmentCategory $eqquipmentCategory)
    {
        //
    }
}
