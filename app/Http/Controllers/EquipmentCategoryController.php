<?php

namespace App\Http\Controllers;

use App\Models\InventoryGroup;
use App\Models\EquipmentCategory;
use App\Models\BusinessSegment;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Resources\EquipmentCategoryResource;


use Illuminate\Http\Request;

class EquipmentCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return response()->json([
        'categories' => EquipmentCategory::orderBy('name')->with('inventory_groups')->with('parent')->paginate(10, ['*'], 'categories')->toArray(),
        'groups' => InventoryGroup::orderBy('name')->with('segment')->get()->toArray(),
        'parent_categories' => EquipmentCategory::orderBy('name')->where('parent_id', 0)->get()->toArray(),
        'segments' => BusinessSegment::orderBy('name')->get()->toArray()
      ], 200);
    }
    public function store(Request $request)
    {
      $validated = $request->validate([
        'name' => 'required',
        'parent_id' =>'nullable|numeric',
        'inventory_groups' => 'nullable|array'
      ]);

      $equipmentCategory = EquipmentCategory::create($validated);
      return response()->json([
        'category' => $equipmentCategory
      ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(EquipmentCategory $equipmentCategory)
    {
      return new EquipmentCategoryResource($equipmentCategory);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EquipmentCategory $equipmentCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EquipmentCategory $equipmentCategory)
    {
        $validated = $request->validate([
          'name' =>'required',
          'parent_id' =>'nullable|numeric',
          'inventory_groups' => 'nullable|array'
        ]);

        $equipmentCategory->update($validated);
        $equipmentCategory->inventory_groups()->sync($validated['inventory_groups']);

        dump($equipmentCategory);

        return response()->json([
          'category' => $equipmentCategory
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EquipmentCategory $equipmentCategory)
    {
        //
    }
}
