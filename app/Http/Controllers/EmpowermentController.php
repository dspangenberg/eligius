<?php

namespace App\Http\Controllers;

use App\Models\Empowerment;
use Illuminate\Http\Request;

class EmpowermentController extends Controller
{
    public function index()
    {
      return response()->json([
        'empowerments' => Empowerment::orderBy('name')->paginate(10, ['*'], 'empowerments')->toArray()
      ], 200);
    }

    public function store(Request $request)
    {
      $validated = $request->validate([
        'name' =>'required'
      ]);

      $empowerment = Empowerment::create($validated);
      return response()->json([
        'empowerment' => $empowerment,
        'abbreviation' => 'nullable'
      ], 200);
    }

    public function show(Empowerment $empowerment)
    {
      return response()->json([
        'empowerment' => $empowerment
      ], 200);
    }


    public function update(Request $request, Empowerment $empowerment)
    {
      $validated = $request->validate([
        'name' =>'required',
        'abbreviation' => 'nullable'
      ]);

      $empowerment->update($validated);

      return response()->json([
        'empowerment' => $empowerment
      ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Empowerment $empowerment)
    {
        //
    }
}
