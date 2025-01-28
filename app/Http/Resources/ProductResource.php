<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return [
        //     'id' => $this->id,
        //     'name' => $this->name,
        //     'description' => $this->description,
        //     'price' => $this->price,
        //     'stock' => $this->stock,
        //     'image' => $this->image,
        //     'category' => $this->category,
        // ];

        $data = parent::toArray($request);
        // Elimina las claves 'created_at' y 'updated_at' del array $data
        unset($data['created_at'], $data['updated_at']);
        return $data;
    }
}
