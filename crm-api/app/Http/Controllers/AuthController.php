<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
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
        try {
            $user = User::create($request->validated());
            $token = $user->createToken('authToken')->plainTextToken;
            return response()->json([
                'message' => 'User created',
                'user' => $user,
                'token' => $token,
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }
}
