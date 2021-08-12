<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    // get user data
    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }


    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'auth_error' => ['The provided credentials are incorrect.'],
            ]);
        }
        $token = $user->createToken($request->device_name)->plainTextToken;
        return response()->json([
            'message' => 'Login Success',
            'user' => $user,
            'token' => $token,
        ]);
    }
    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());
        $token = $user->createToken($request->device_name)->plainTextToken;
        return response()->json([
            'message' => 'User created',
            'user' => $user,
            'token' => $token,
        ]);
    }
    public function logOut(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $request->user()->tokens()->delete();
            return response()->json(
                [
                    'message' => 'Tokens Deleted!',
                ],
                Response::HTTP_NO_CONTENT
            );
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
