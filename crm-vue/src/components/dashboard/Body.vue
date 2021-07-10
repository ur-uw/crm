<template>
    <div id="body" class="">
        <div class="row">
            <div class="col-md-6 col-lg-4 col-sm-12">
                <LeftBody />
            </div>
            <div class="col-md-6 col-lg-8 col-sm-12">
                <RightBody />
            </div>
        </div>
    </div>
</template>

<script>
import LeftBody from '@/components/dashboard/LeftBody.vue';
import RightBody from './RightBody.vue';

export default {
    name: 'Body',
    components: {
        LeftBody,
        RightBody,
    },
};
</script>

<style lang="scss">
#body {
    padding: 16px;
    font-family: 'MyriadProRegular', sans-serif;
    min-height: 100vh;
    background-color: var(--primary1);
}
</style>
