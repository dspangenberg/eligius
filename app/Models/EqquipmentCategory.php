<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EqquipmentGroup;
use Illuminate\Database\Eloquent\Relations\HasOne;


class EqquipmentCategory extends Model
{
    use HasFactory;

    protected $attributes = [
      'name' => '',
      'eqquipment_group_id' => 0
    ];


    protected $fillable = [
      'name',
      'eqquipment_group_id'
    ];

    public function group(): HasOne
    {
        return $this->hasOne(EqquipmentGroup::class, 'id', 'eqquipment_group_id');
    }
}
