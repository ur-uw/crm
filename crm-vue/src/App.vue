<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Mangee</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" to="dashboard">Dashboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="register">Register</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="login">Login</router-link>
                    </li>
                </ul>
                <form class="d-flex">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button class="btn btn-outline-custom-purple" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
    <router-view />
</template>

<style lang="scss">
    @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap");
    @font-face {
        font-family: "MyriadProLight";
        font-weight: normal;
        src: url("/src/assets/font/MyriadPro-Light.otf");
    }
    @font-face {
        font-family: "MyriadProSemiBold";
        font-weight: normal;
        src: url("/src/assets/font/MYRIADPRO-SEMIBOLD.OTF");
    }

    :root {
        --primary1: #15172b;
        --primary2: #262a41;
        --customblue: #0026ff;
        --custompink: #ff3250;
        --customeyellow: #ffbb00;
        --customgreen: #07e642;
        --custompurple: #894fc6;
        --customdarkblue: #121432;
        --white: #ffffff;
        --customgrey: #707070;
        --customgreen1: #15d4a1;
    }

    body {
        position: relative;
        font-family: "MyriadProSemiBold", sans-serif;
        background-color: var(--primary1);

        &::-webkit-scrollbar {
            display: none;
            scrollbar-width: none;
        }
    }
</style>
