<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EqquipmentGroup extends Model
{
    use HasFactory;

    protected $attributes = [
      'name' => '',
      'inventory_number_prefix' => '',
      'inventory_current_number' => 0
    ];


    protected $fillable = [
      'name',
      'inventory_number_prefix',
      'inventory_current_number'
    ];
}

