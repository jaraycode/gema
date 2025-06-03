<?php

namespace App\Http\Controllers;

use App\Http\Requests\Core\Personel\StorePersonelRequest;
use App\Http\Requests\Core\Personel\UpdatePersonelRequest;
use App\Models\Personel;
use Illuminate\Support\Facades\Hash;

class PersonelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $personels = Personel::paginate(10);

        //return view('personels.index', compact('personels'));
        return response()->json($personels, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonelRequest $request)
    {
        $password = $request->get('password');
        $hashedPassword = Hash::make($password);
        $personel = Personel::create([
            "email"=> $request->get("email"),
            "username" => $request->get("username"),
            "password" => $hashedPassword,
            "phone_number" => $request->get("phone_number"),
            "first_name" => $request->get("first_name"),
            "second_name" => $request->get("second_name"),
            "last_name" => $request->get("last_name"),
            "second_last_name" => $request->get("second_last_name"),
        ]);

        //return redirect("personels.index")
        return response()->json($personel, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $personel = Personel::all()->findOrFail($id);
        return response()->json($personel, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonelRequest $request, string $id)
    {
        $personel = Personel::all()->findOrFail($id);
        $personel->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $personel = Personel::all()->findOrFail($id);
        $personel->delete();

        return response()->json(null, 204);
    }
}
