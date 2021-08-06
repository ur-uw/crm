### Get team's taks

-   [x] team->ManyToMany->user->ManyToMany->task

### Get project's users

-   [x] project->hasMany->team->ManyToMany->user

### Get project taks

-   [x] project->hasMany->team->ManyToMany->user->ManyToMany->tak

### Get task's teams

-   [x] task->ManyToMany->user->ManyToMany->team

### Get task's project

-   [ ] task->belongsToMany->user->belongsToMany->team->belongsTo->project
