<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Role;
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
  public function __construct(
    protected PersonelService $personelService,
    protected Role $role,
    protected Department $department,
  ) {}
  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    $personelProps = $this->personelService->getMenu();
    $personels = $this->personelService->getAllPersonnel();
    return Inertia::render('persona/personel', array_merge($personelProps, [
      'personels' => $personels
    ]));
    //return response()->json($personels, 200);
  }

  public function create(): Response
  {
    $personelProps = $this->personelService->getMenu();

    return Inertia::render(
      component: 'persona/create',
      props: array_merge($personelProps, [
        'departamentos' => $this->department::all(),
        'cargos' => $this->role::all(),
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
      "dni" => $request->get("dni"),
      "phone_number" => $request->get("phone_number"),
      "first_name" => $request->get("first_name"),
      "second_name" => $request->get("second_name"),
      "last_name" => $request->get("last_name"),
      "second_last_name" => $request->get("second_last_name"),
      "department" => $request->get("department"),
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
      $response = $this->personelService->getPersonnel(id: intval($id));

      $dashboardProps = $this->personelService->getMenu();

      return Inertia::render('persona/profile', array_merge($dashboardProps, [
        'personel' => $response,
        'user' => $dashboardProps['user'] ?? null,
        'navMain' => $dashboardProps['navMain'] ?? null,
        'navSecondary' => $dashboardProps['navSecondary'] ?? null
      ]));
    } catch (Exception $e) {
      return redirect()->back()->with("error", $e->getMessage());
    }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdatePersonelRequest $request, string $id)
  {
    $personnel = [
      "email" => $request->get("email"),
      "phone_number" => $request->get("phone_number"),
      "dni" => $request->get("dni"),
      "first_name" => $request->get("first_name"),
      "second_name" => $request->get("second_name"),
      "last_name" => $request->get("last_name"),
      "second_last_name" => $request->get("second_last_name"),
      "department" => $request->get("department"),
    ];

    if ($request->has('password')) {
      $personnel['password'] = Hash::make($request->get('password'));
    }

    return $this->personelService->updatePersonnel(
      id: intval($id),
      personnel: $personnel
    );
  }
  /**
   * Renders the update screen of the specified resource in storage.
   */
  public function edit(string $id): RedirectResponse | Response
  {
    try {
      $personnel = $this->personelService->getPersonnel(id: intval($id));
      $personelProps = $this->personelService->getMenu();

      return Inertia::render('persona/edit', array_merge($personelProps, [
        'personel' => $personnel,
        'departamentos' => $this->department::all(),
        'cargos' => $this->role::all(),
      ]));
    } catch (Exception $e) {
      return redirect()->back()->with('error', $e->getMessage());
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
