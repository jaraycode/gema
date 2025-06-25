<?php

namespace App\Http\Controllers;

use Exception;
use App\Http\Requests\Core\Personel\StorePersonelRequest;
use App\Http\Requests\Core\Personel\UpdatePersonelRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Service\Personel\PersonelService;
use Inertia\Response;

class PersonelController extends Controller
{
  public function __construct(protected PersonelService $personelService) {}
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $personelProps = $this->personelService->getMenu();
    $personels = $this->personelService->getAllPersonnel();

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
    $personnel = [
      "email" => $request->get("email"),
      "username" => $request->get("username"),
      "password" => $hashedPassword,
      "phone_number" => $request->get("phone_number"),
      "first_name" => $request->get("first_name"),
      "second_name" => $request->get("second_name"),
      "last_name" => $request->get("last_name"),
      "second_last_name" => $request->get("second_last_name"),
    ];

    $response = $this->personelService->storePersonnel($personnel);
    return $response;
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    try {
      $response = $this->personelService->getPersonnel(id: intval(value: $id));

      $dashboardProps = $this->personelService->getMenu();

      return Inertia::render('personel/profile', array_merge($dashboardProps, [
        'personel' => $response
      ]));
    } catch (Exception $e) {
      return redirect()->back()->with(key: "error", value: $e->getMessage());
    }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdatePersonelRequest $request, string $id)
  {
    return $this->personelService->updatePersonnel(id: intval(value: $id), personnel: $request->validated());
  }

  /**
   * Renders the update screen of the specified resource in storage.
   */
  public function edit(string $id): RedirectResponse | Response
  {
    try {
      $personnel = $this->personelService->getPersonnel(id: intval(value: $id));
      $dashboardProps = $this->personelService->getMenu();
      return Inertia::render(component: 'personel/edit', props: array_merge($dashboardProps, ['data' => $personnel]));
    } catch (Exception $e) {
      return redirect()->back()->with(key: 'error', value: $e->getMessage());
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    return $this->personelService->deletePersonnel(id: $id);
  }
}
