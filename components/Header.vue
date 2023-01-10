<template>
    <div class="header-content w-100 d-flex navbar-expand">
        <img class="img-logo" src="/svg/icons8-top-menu-100 1.svg"/>
        <a class="navbar-brand" href="">
            <img class="img-title" src="/svg/LogoGoldenSuisse_White-Transparent 1.svg" />
        </a>
        <div class="collapse navbar-collapse" style="margin-left: 120px;">
            <ul class="navbar-nav">
                <li class="nav-link">
                    <a>Holdings</a>
                </li>
                <li class="nav-link">
                    <a>Orders</a>
                </li>
                <li class="nav-link">
                    <a>Payments</a>
                </li>
                <li class="nav-link">
                    <a>Transfers</a>
                </li>
                <li class="nav-link">
                    <a>Exchange</a>
                </li>
                <li class="nav-link">
                    <a>Load Card</a>
                </li>
                <li class="nav-link">
                    <a>Personal Manager</a>
                </li>
            </ul>
        </div>
        <a class="navbar-setting" href="">
            <img class="img-title" src="/svg/icons8-automatic-100 2.svg" />
        </a>
        <a class="navbar-logout" href="">
            <img class="img-title" src="/svg/icons8-logout-100 1.svg" />
        </a>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {

        }
    },
    mothods: {

    }
}
</script>

<style scoped>
.header-content {
    height: 115px;
    background-color: #101010;
    align-items: center;
}

.img-logo {
    margin-left: 32px;
    height: 32px;
    width: 30px;
}

.img-title {
    margin-left: 63px;
}

.nav-link {
    margin-right: 20px;
    font-family: 'Arial';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;

    color: #FFFFFF;
}

.navbar-logout {
    margin-right: 80px;
    width: 30px;
    height: 30px;
}

.navbar-setting {
    margin-right: 40px;
    width: 40px;
    height: 40px;
}
</style>