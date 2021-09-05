<?php

namespace App\Http\Controllers;

use App;
use App\Http\Requests\Contact\StoreContactRequest;
use App\Http\Requests\Contact\UpdateContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use App\Models\User;
use Auth;
use Hash;
use Str;
use Symfony\Component\HttpFoundation\Response;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contacts = Auth::user()->contacts;
        return ContactResource::collection($contacts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Contact\StoreContactRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreContactRequest $request)
    {
        $data = $request->validated();
        $auth_user = Auth::user();

        // Check if the email is implemented if true get the user else create new user
        $contact_user = User::firstWhere('email', $data['user_email']);

        if (!$contact_user) {
            // TODO: send password via email
            $regular_pass = Str::random(8);
            $hashed_password = Hash::make($regular_pass);
            $name_to_be_stored = substr(
                $data['user_email'],
                0,
                strrpos($data['user_email'], '@')
            );

            // Creation of new user
            $contact_user = User::create([
                'first_name' => $name_to_be_stored,
                'last_name' => $name_to_be_stored,
                'email' => $data['user_email'],
                'password' => $hashed_password,
            ]);
        }

        //TODO: Check if the user already have this contact

        // Creation of the new contact
        $new_contact = Contact::create([
            'parent_id' => $auth_user->id,
            'user_id' => $contact_user->id,
            'type' => $data['type'],
        ]);

        return ContactResource::make($new_contact);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Contact\UpdateContactRequest  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $contact_exists = Auth::user()->contacts->contains($contact);
        if (!$contact_exists) {
            return response()->json(
                [
                    'message' => 'Contact does not exists.',
                ],
                Response::HTTP_NOT_FOUND,
            );
        }

        // Updating contact
        $contact->update($request->validated());
        return ContactResource::make($contact);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        $auth_user = Auth::user();
        $contact_exists = $auth_user->contacts->contains($contact);
        if (!$contact_exists) {
            return response()->json(
                [
                    'message' => 'Contact does not exists.',
                ],
                Response::HTTP_NOT_FOUND,
            );
        }

        // Deleting the contact

        $auth_user->contacts()->delete($contact);
        return  response()->json(
            [
                'message' => 'Contact deleted'
            ],
            Response::HTTP_NO_CONTENT
        );;
    }
}