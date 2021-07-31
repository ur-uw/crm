<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CRM</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                box-sizing: 0;
                font-family: 'Nunito', sans-serif;
                display: flex   ;
                align-content: center;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: #eaeaea;
            }
            a{
                text-decoration:none;
                font-weight: bold;
                letter-spacing: 0.2rem;
                padding: 1rem 0.5rem;
                color: rgb(22, 22, 22);
                border: 0.4px solid black;
                transition: 0.4s ;
            }
            a:hover{
                background: rgba(22, 22, 22, 1);
                color: white;
                box-shadow: rgba(0, 0, 0, 0.144) 3px 5px;
            }
        </style>
    </head>
    <body>
        <a href="/laratrust" class="text-white">
            Laratrust
        </a>
    </body>
</html>
