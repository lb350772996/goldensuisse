<template>
    <div class="card-content d-flex flex-column" :style="'background: ' + background">
        <span class="text-type">{{ type }}</span>
        <div class="line"/>
        <span class="text-holdings">{{ holdings }} {{ wei }}</span>
        <span class="text-profit-loss">CHF {{ profit_loss }}</span>
    </div>
</template>

<script>
export default {
    props: [
        'type',
        'holdings',
        'profit_loss',
        'background',
        'ozOrKg',
        'wei'
    ],
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        
    }
}
</script>

<style scoped>
.card-content {
    width: 200px;
    height: 200px;
    border: 1px solid #000000;
}

.line {
    background-color: black;
    height: 1px;
    width: 178px;

    margin-top: 13px;
    margin-left: 11px;
}

.text-type {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;

    color: #000000;

    margin-left: 14px;
    margin-top: 14px;
}

.text-holdings {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 34px;

    color: #000000;

    margin-top: 39px;
    align-self: center;
}

.text-profit-loss {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    color: #000000;

    margin-top: 38px;
    align-self: flex-end;
    margin-right: 12px;
}
</style>