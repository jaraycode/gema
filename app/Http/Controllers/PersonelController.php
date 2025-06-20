<?php

namespace App\Http\Controllers;

use App\Http\Requests\Core\Personel\StorePersonelRequest;
use App\Http\Requests\Core\Personel\UpdatePersonelRequest;
use App\Models\Personel;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Service\Personel\PersonelService;

class PersonelController extends Controller
{
  public function __construct(protected PersonelService $personelService) {}
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $personelProps = $this->personelService->getMenu();
    $personels = Personel::paginate(10);

    return Inertia::render('persona/personel', array_merge($personelProps, [
      'personels' => $personels
    ]));
    //return response()->json($personels, 200);
  }

  public function create()
  {
    $personelProps = $this->personelService->getMenu();

    return Inertia::render(
      component: 'persona/create',
      props: array_merge($personelProps, [
        'departamentos' => ['SGMREF', 'RH', 'Finanzas', 'TI'],
        'cargos' => ['Jefe', 'Supervisor', 'Analista', 'Asistente'],
      ])
    );
  }


  /**
   * Store a newly created resource in storage.
   */
  public function store(StorePersonelRequest $request)
  {
    $password = $request->get('password');
    $hashedPassword = Hash::make($password);
    $personel = Personel::create([
      "email" => $request->get("email"),
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
  public function show()
  {
    /*  $personel = Personel::all()->findOrFail($id);
    return response()->json($personel, 200); */
    $dashboardProps = $this->dashboardService->getMenu();

    return Inertia::render('persona/profile', array_merge($dashboardProps, []));
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
