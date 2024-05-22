<?php

namespace App\Http\Controllers;

use App\Models\Manufacturer;
use Illuminate\Http\Request;

class ManufacturerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return response()->json([
        'manufacturers' => Manufacturer::orderBy('name')->paginate(10, ['*'], 'manufacturers')->toArray()
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

      $manufacturer = Manufacturer::create($validated);
      return response()->json([
        'manufacturer' => $manufacturer
      ], 200);
    }


    public function show(Manufacturer $manufacturer)
    {
      return response()->json([
        'manufacturer' => $manufacturer
      ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */

    public function update(Request $request, Manufacturer $manufacturer)
    {
      $validated = $request->validate([
        'name' => 'required',
      ]);

      $manufacturer->update($validated);

      return response()->json([
        'manufacturer' => $manufacturer
      ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Manufacturer $manufacturer)
    {
        //
    }
}
