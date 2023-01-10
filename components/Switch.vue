<template>
    <div class="switch-content d-flex flex-row">
        <a @click="toggleSwitch()">
            <img src="/svg/switch-toggle-on.svg" v-if="value"/>
            <img src="/svg/switch-toggle-off.svg" v-if="!value"/>
        </a>
        <label class="swith-label">{{ label }}</label>
    </div>
</template>

<script>
export default {
    props: [
        'value',
        'label',
    ],
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        toggleSwitch() {
            this.$emit('change', !this.value)
        }
    }
}
</script>

<style scoped>
.switch-content {
    height: 50px;
    align-items: center;
}

.swith-label {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    /* identical to box height */


    color: #0E0D0D;

    margin-left: 14px;
}
</style>