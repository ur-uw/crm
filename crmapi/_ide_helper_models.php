<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Today
 *
 * @property int $id
 * @property string $title
 * @property string $taskId
 * @property int $completed
 * @property int $approved
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\TodayFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Today newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Today newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Today query()
 * @method static \Illuminate\Database\Eloquent\Builder|Today whereApproved($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Today whereCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Today whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Today whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Today whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Today whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Today whereUpdatedAt($value)
 */
	class Today extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Upcoming
 *
 * @property int $id
 * @property string $title
 * @property int $completed
 * @property int $approved
 * @property int $waiting
 * @property string $taskId
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\UpcomingFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Upcoming newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Upcoming newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Upcoming query()
 * @method static \Illuminate\Database\Eloquent\Builder|Upcoming whereApproved($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Upcoming whereCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Upcoming whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Upcoming whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Upcoming whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Upcoming whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Upcoming whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Upcoming whereWaiting($value)
 */
	class Upcoming extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

