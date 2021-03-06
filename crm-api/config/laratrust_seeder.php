<?php

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => true,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        'super-admin' => [
            'users' => 'c,r,u,d',
            'project' => 'c,r,u,d',
            'task' => 'c,r,u,d',
        ],
        'owner' => [
            'project' => 'c,r,u,d',
            'task' => 'c,r,u,d',
        ],
        'moderator' => [
            'project' => 'r,u',
            'task' => 'r,u',
        ],
        'guest' => [
            'project' => 'r',
            'task' => 'r',
        ],
    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete'
    ]
];
