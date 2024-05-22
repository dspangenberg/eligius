<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
  public function index()
  {
    return response()->json([
      'users' => User::paginate(10, ['*'], 'users')->toArray()
    ], 200);
  }

  public function show(User $user)
    {
      return response()->json([
        'user' => $user
      ], 200);
    }
}
