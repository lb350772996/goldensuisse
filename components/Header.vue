<template>
    <div class="header-content w-100 d-flex navbar-expand">
        <img class="img-logo " src="/svg/icons8-top-menu-100 1.svg" />
        <a class="navbar-brand" href="">
            <img class="img-title" src="/svg/LogoGoldenSuisse_White-Transparent 1.svg" />
        </a>
        <section @click="close_t" data-v-3b6aeaf0="" class="header__menu">
            <svg data-v-0fb7651e="" data-v-3b6aeaf0="" class="menu">
                <line data-v-0fb7651e="" x1="0" x2="60" y1="1" y2="1" class="menu__rect"></line>
                <line data-v-0fb7651e="" x1="60" x2="0" y1="13" y2="13" class="menu__rect"></line>
            </svg>
        </section>
        <div class=" collapse navbar-collapse" :class="!h_title ? '' : 'title'" id="collapse" style="">
            <ul class="navbar-nav nav-list" :class="h_isWidth ? '' : 'flex-column'">
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
            h_screenWidth: 1040, // 屏幕宽度
            h_isWidth: false,
            h_title: false,
        }
    },
    mounted() {

        this.h_setClient();


    },
    methods: {
        h_setClient() {
            let that = this
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth

            if (this.screenWidth < 750) {// 1280是你想控制的屏幕大小临界值，可根据自己需求修改
                this.h_isWidth = false
            } else {
                this.h_isWidth = true
            }
        },
        close_t() {
            if (this.h_title == false) {
                this.h_title = true
            } else {
                this.h_title = false
            }

        }
    }
}
</script>

<style scoped>
.collapse {
    margin-left: 120px;
}

.header-content {
    height: 115px;
    background-color: #101010;
    align-items: center;
    position: relative;
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

.header__menu {
    display: none;
}

@media only screen and (max-width:750px) {
    .img-title {
        margin-left: 23px;
    }

    .header__menu {
        display: block;
    }

    .menu_closeHeight {
        transform: scale(.6666);
        height: 60px;
    }

    .menu__rect_animationCloseTop {
        transform: translateX(60px) translateY(0) rotate(135deg);
    }

    .menu__rect_animationCloseBot {
        transform: translateY(-10px) translateX(25px) rotate(45deg);
    }

    .menu {
        transform: scale(.6666);
        width: 60px;
        height: 14px;
        -webkit-animation: slidein-data-v-0fb7651e .1s;
        animation: slidein-data-v-0fb7651e .1s;
        cursor: pointer;
        pointer-events: auto;
        overflow: visible;
        padding: 0;
        margin: 0
    }

    .menu__rect {
        stroke: #fff;
        stroke-width: 2px;
        transform: translateX(0) translateY(0) rotate(0);
        transition: all .4s ease-in-out;

    }

    .collapse {
        margin-left: 0px;
        /* top: -270px !important; */
        /* left: 0px; */
        top: 115px;
        opacity: 0;
        position: absolute;
        z-index: -1;
        width: 100%;
        transition: all 0.7s;
    }

    .title {
        transition: all 0.7s;
        opacity: 1;
    }

    .header-content {
        position: relative;
        z-index: 1999;
        background-color: #101010;
    }

    .header {
        position: relative;
        z-index: 1999;
        background-color: #101010;
        align-items: center;
        height: 115px;
        flex-flow: row nowrap;
        justify-content: flex-start;
        width: 100% !important;
    }

    .nav-link {
        /* color: #181717; */
        text-align: center;
    }

    .nav-list {
        background-color: #101010;
        width: 100%;
    }

}
</style>