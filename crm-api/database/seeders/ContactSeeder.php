<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        $users->each(function (User $user) use ($users) {
            $contacts = $users->filter(fn (User $usr) => $usr->id != $user->id);
            $filtered_contacts = $contacts->random(rand(20, 25));
            $filtered_contacts->each(fn (User $contact) =>
            Contact::create([
                'parent_id' => $user->id,
                'user_id' => $contact->id,
            ]));
        });
    }
}