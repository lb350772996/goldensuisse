<template>
    <div class="footer-content w-100 d-flex">
        <span class="text-copyright">Copyright 2017 - 2022 GCB Suisse AG. All rights reserved</span>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
        }
    },
    mothods: {
    }
}
</script>

<style scoped>
.footer-content {
    height: 69px;
    background-color: #101010;
    align-items: center;
}
.text-copyright {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 17px;

    color: #FFFFFF;
    
    margin-left: 122px;
}
</style>