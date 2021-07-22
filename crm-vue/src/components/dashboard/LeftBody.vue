<template>
    <div id="left" class="p-5">
        <img src="../../assets/images/hamburger.png" class="hamburger" alt="hamburger" />
        <div class="profile">
            <h1>Hi Mohammed</h1>
            <h2>Let's make projects more amazing</h2>
            <div class="search">
                <input
                    type="text"
                    class="text-white outline-none"
                    placeholder="Search your project"
                />
                <img src="../../assets/images/search.png" alt="search" />
            </div>
        </div>
        <div class="project">
            <h3>Projects <span>(16)</span></h3>
            <div class="projects">
                <div class="a-project">
                    <div class="box-color">
                        <img src="../../assets/images/overlay.png" alt="overlay" />
                        <span>PT</span>
                        <h6>Development</h6>
                    </div>
                </div>

                <div class="a-project">
                    <div class="box-color">
                        <img src="../../assets/images/overlay.png" alt="overlay" />
                        <span>PT</span>
                        <h6>Design</h6>
                    </div>
                </div>

                <div class="a-project">
                    <div class="box-color">
                        <img src="../../assets/images/overlay.png" alt="overlay" />
                        <span>PT</span>
                        <h6>Testing</h6>
                    </div>
                </div>

                <div class="a-project">
                    <div class="box-color">
                        <img src="../../assets/images/overlay.png" alt="overlay" />
                        <span>PT</span>
                        <h6>Medium Draft</h6>
                    </div>
                </div>

                <div class="a-project">
                    <div class="box-color">
                        <img src="../../assets/images/overlay.png" alt="overlay" />
                        <span>PT</span>
                        <h6>Landing Page</h6>
                    </div>
                </div>

                <div class="a-project">
                    <div
                        class="
                            box-color
                            text-center text-white
                            d-flex
                            align-items-center
                            justify-content-center
                            flex-column
                        "
                    >
                        <fa icon="plus" class="display-4" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent } from "vue";
    import { useStore } from "@/use/useStore";
    import { User } from "@/interfaces/User";

    export default defineComponent({
        name: "LeftBody",
        setup() {
            const store = useStore();
        }
    });
</script>

<style lang="scss">
    #left {
        position: relative;

        .hamburger {
            position: absolute;
            top: 0%;
            left: 2%;
            cursor: pointer;
        }

        .profile {
            margin-top: 5px;

            h1 {
                font-family: "Open Sans", sans-serif;
                font-size: 34px;
                color: var(--white);
                font-weight: 500;
                text-transform: capitalize;
            }

            h2 {
                font-family: "Open Sans", sans-serif;
                font-size: 16px;
                color: var(--customgrey);
                font-weight: 300;
            }
        }
        .custom-middle {
            transition: 0.5s ease;
            opacity: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            .custom-middle {
                transition: 0.5s ease;
                opacity: 0;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                text-align: center;
                z-index: 1;
            }
            text-align: center;
            z-index: 1;
        }
        .search {
            border: unset;
            border-radius: 14px;
            padding: 17px 25px 17px 55px;
            margin-top: 39px;
            position: relative;
            background-color: #70707050;
            height: 53px;
            margin-bottom: 35px;
            width: 90%;

            img {
                @extend .custom-middle;
                opacity: 1;
                left: 25px;
                cursor: pointer;
            }

            input {
                border: unset;
                padding: 0.2em;
                background-color: transparent;
                width: 100%;
                height: 100%;
                caret-color: var(--white);

                &::placeholder {
                    background-color: unset;
                    color: var(--customgrey);
                    font-family: "Open Sans", sans-serif;
                    font-size: 14px;
                }
            }
        }

        .project {
            margin-bottom: 70px;

            h3 {
                font-family: "Open Sans", sans-serif;
                font-size: 19px;
                color: var(--white) !important;

                span {
                    font-size: 14px;
                    color: var(--customgrey);
                }
            }

            .projects {
                margin-top: 27px;
                display: grid;
                grid-template-columns: repeat(3, 112px);
                grid-auto-flow: dense;

                .a-project {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    cursor: pointer;
                    border-radius: 1em;
                    background-color: transparent;
                    margin-bottom: 1em;
                    padding: 0.5em;

                    span {
                        font-family: "MyriadProSemiBold", sans-serif;
                        font-size: 17px;
                        color: var(--white);
                    }

                    h6 {
                        margin-top: 16px;
                        font-family: "Open Sans", sans-serif;
                        font-size: 14px;
                        color: var(--white);
                    }

                    div.box-color {
                        border-radius: 1em;
                        margin-bottom: 1px;
                        overflow: hidden;
                        position: relative;

                        span {
                            @extend .custom-middle;
                            opacity: 1;
                        }

                        img {
                            width: 100%;
                            height: 100%;
                        }

                        &:hover {
                            border: 3px solid var(--custompink);
                            transition: border 250ms ease-in-out;
                        }
                    }

                    .customwidth {
                        width: 100px;
                        height: 94px !important;
                    }

                    &:nth-child(1) {
                        div.box-color {
                            background-color: var(--customblue);
                            @extend .customwidth;
                        }
                    }

                    &:nth-child(2) {
                        div.box-color {
                            background-color: var(--custompink);
                            @extend .customwidth;
                        }
                    }

                    &:nth-child(3) {
                        div.box-color {
                            background-color: var(--customeyellow);
                            @extend .customwidth;
                        }
                    }

                    &:nth-child(4) {
                        div.box-color {
                            background-color: var(--customgreen);
                            @extend .customwidth;
                        }
                    }

                    &:nth-child(5) {
                        div.box-color {
                            background-color: var(--custompurple);
                            @extend .customwidth;
                        }
                    }

                    &:nth-child(6) {
                        div.box-color {
                            background-color: var(--customblue);
                            @extend .customwidth;
                        }
                    }
                }
            }
        }

        .grid {
            bottom: 0;
            left: 0;
            position: absolute;
        }

        .grid-right {
            top: 0;
            right: -10%;
            position: absolute;
        }
    }
</style>
