<template>
    <div class="info">
        <div class="left">
            <label class="myCheckbox">
                <input type="checkbox" name="test" :checked="task.completed" />
                <span></span>
            </label>

            <h4>{{ task.title }}</h4>
        </div>
        <div class="right">
            <img src="../../assets/images/edit.png" />
            <img src="../../assets/images/del.png" />

            <button
                v-bind:class="{
                    inprogress: !task.approved,
                    approved: task.approved,
                }"
            >
                {{ task.approved ? 'Approved' : 'In progress' }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { DailyTask } from '@/interfaces/Task';
import { defineComponent, PropType } from 'vue';
export default defineComponent({
    name: 'TodayTask',
    props: {
        task: {
            type: Object as PropType<DailyTask>,
            required: true,
        },
    },
});
</script>

<style lang="scss">
.info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0 0.3em;
    border-radius: 0 0.3em 3em;

    &:hover {
        background-color: #70707010;
        transition: all 400ms ease-in-out;
    }

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;

        label {
            cursor: pointer;
            margin-top: 0.3em;
            padding-top: 0.4em;

            input {
                display: none;
            }

            span {
                height: 20px;
                width: 20px;
                display: inline-block;
                position: relative;
                border-radius: 50px;
                border: 2px solid var(--customgreen1);
            }

            [type='checkbox']:checked + span:before {
                content: '\2714';
                height: 20px;
                width: 20px;
                border-radius: 50px;
                border: 2px solid var(--customgreen1);
                background-color: var(--customgreen1);
                opacity: 1;
                font-size: 12px;
                top: 45%;
                color: #fff;
            }
        }

        h4 {
            margin-left: 15px;
            font-family: 'Open Sans', sans-serif;
            font-size: 13px;
            color: var(--primary2);
            font-weight: 600;
        }
    }

    .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        img {
            margin-right: 1em;
            cursor: pointer;
        }

        button {
            padding: 5px 31px;
            border-radius: 50px;
            border: unset;
            box-shadow: unset !important;
            width: 120px;
            font-family: 'Open Sans', sans-serif;
            font-size: 12px;
            white-space: nowrap;
        }
    }
}
</style>
