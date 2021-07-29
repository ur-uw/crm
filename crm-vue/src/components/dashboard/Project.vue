<template>
    <div class="a-project">
        <div class="box-color">
            <img src="../../assets/images/overlay.png" alt="overlay" />
            <span>{{ getLetters(project.name) }}</span>
        </div>
        <h6 class="text-white mt-2 text-center">{{ project.name }}</h6>
    </div>
</template>

<script lang="ts">
    import { Project } from "@/interfaces/Project";
    import { defineComponent, PropType } from "vue";
    export default defineComponent({
        name: "Project",
        props: {
            project: {
                type: Object as PropType<Project>,
                required: true
            }
        },
        setup() {
            const getLetters = (title: string) => {
                const words = title.split(" ");
                let letters = "";
                if (words.length >= 2) {
                    letters = words[0].substring(0, 1) + words[1].substring(0, 1);
                } else {
                    letters = words[0].substring(0, 1) + words[0].substring(1, 2);
                }
                return letters;
            };

            return { getLetters };
        }
    });
</script>
<style lang="scss" scoped>
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
    .customwidth {
        width: 100px;
        height: 94px !important;
    }
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
            color: var(--bs-white);
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
                border: 3px solid var(--bs-custom-pink);
                transition: border 250ms ease-in-out;
            }
        }
        h6 {
            width: 200%;
            font-size: 12px;
            font-family: "Open Sans", sans-serif;
        }

        &:nth-child(1) {
            div.box-color {
                background-color: var(--bs-blue);
                @extend .customwidth;
            }
        }

        &:nth-child(2) {
            div.box-color {
                background-color: var(--bs-custom-pink);
                @extend .customwidth;
            }
        }

        &:nth-child(3) {
            div.box-color {
                background-color: var(--bs-custom-yellow);
                @extend .customwidth;
            }
        }

        &:nth-child(4) {
            div.box-color {
                background-color: var(--bs-custom-green);
                @extend .customwidth;
            }
        }

        &:nth-child(5) {
            div.box-color {
                background-color: var(--bs-custom-purple);
                @extend .customwidth;
            }
        }

        &:nth-child(6) {
            div.box-color {
                background-color: var(--bs-blue);
                @extend .customwidth;
            }
        }
    }
</style>
