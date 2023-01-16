<template>
    <div class="overview-contnet h-100" style="background-color: #EAEAEA">
        <div class="text-username d-flex flex-column">
            <span>Welcome  </span>
            <span>{{ this.$store.state.firstname }} {{ this.$store.state.lastname }}</span>
            <div style="height: 1px; width: 240px; background-color: black; margin-top: 15px;"/>
        </div>
        <div class="text-holding-overview d-flex flex-column">
            <span>Holding Overview</span>
            <div style="height: 1px; width: 620px; background-color: black; margin-top: 15px;"/>
        </div>
        <div class="d-flex flex-column" style="margin-top: 30px">
            <div class="d-flex hold-overview" :class="isWidth ? 'flex-row' : 'flex-column'" style="margin-bottom: 15px">
                <div class="d-flex flex-column">
                    <span class="text-overview-title">Total</span>
                    <span class="text-overview-value">CHF {{ data.total_balance.toFixed(2) }}</span>
                </div>
                <div class="d-flex flex-column"  :style="isWidth ? 'flex-margin-left: 100px' : 'margin-top: 50px'">
                    <span class="text-overview-title">Performance</span>
                    <span class="text-overview-value">CHF {{ data.total_profit }}</span>
                </div>
            </div>
            <div style="height: 1px; width: 620px; background-color: black; margin-top: 15px;"/>
            
        </div>
       <div class="myChart"> <div id="myChart"  style="height: 496px;width: 496px;" ></div></div>
        <div class="d-flex justify-content-end" style="margin-top: 15px; width: 620px;">
          <ToggleSwitch :value="valueOrPercent" label="Value/Percent" @change="changeValueOrPercent"/>
        </div>

        <div class="d-flex flex-row justify-content-between w-100" style="margin-top: 60px">
          <div class="text-detail d-flex flex-column">
            <span>Vaults</span>
            <div style="height: 1px; width: 430px; background-color: black; margin-top: 15px;"/>
            <div class="d-flex flex-row" style="margin-top: 35px">
              <Card 
                type="Gold"
                :holdings="this.vaults.gold"
                :profit_loss="this.chartData[1][1]  "
                background="#EBBD4C"   :wei="this.wei" />
              <Card 
                type="Silver"
                :holdings="this.vaults.silver"
                :profit_loss="this.chartData[3][1] "
                background="#D1CFCD"   :wei="this.wei"
                style="margin-left: 27px"/>
            </div>
          </div>

          <div class="text-detail d-flex flex-column">
            <span>Account</span>
            <div style="height: 1px; width: 650px; background-color: black; margin-top: 15px;"/>
            <div class="d-flex flex-row" style="margin-top: 35px">
              <Card 
                type="CHF"
                holdings="5000"
                profit_loss="25,348"
                background="#FFFCFB" :pei="'Sfr' "  />
              <Card 
                type="EUR"
                holdings="150"
                profit_loss="25,348"
                background="#FFFCFB" :pei=" '€' "
                style="margin-left: 27px"/>
              <Card 
                type="Card"
                holdings="150"
                profit_loss="25,348"
                background="#FFFCFB" :pei="'€' "
                style="margin-left: 27px"/>
            </div>
          </div>

          <div class="card-category align-self-end d-flex flex-column">
            <div class="d-flex align-items-center" style="margin-top: 26px; margin-left: 30px">
              <img src="/svg/icon-gold.svg"/>
              <span class="text-type">Gold</span>
            </div>
            <div class="d-flex align-items-center" style="margin-top: 26px; margin-left: 30px">
              <img src="/svg/icon-silver.svg"/>
              <span class="text-type">Silver</span>
            </div>
            <div class="d-flex align-items-center" style="margin-top: 26px; margin-left: 30px">
              <img src="/svg/icon-funds.svg"/>
              <span class="text-type">Funds</span>
            </div>
          </div>
        </div>

        <div class="d-flex" style="margin-top: 45px;">
          <ToggleSwitch :value="ozOrKg" label="Oz/Kg" @change="changeOzOrKg"/>
        </div>
    </div>
</template>
  
<script>
  
  import { GChart } from 'vue-google-charts/legacy';
  import ToggleSwitch from '../Switch.vue';
  import Card from '../Card.vue';

  export default {
    name: 'OverviewContent',
    components: { 
        GChart, 
        ToggleSwitch,
        Card
    },
    data () {
      return {
        screenWidth:1040, // 屏幕宽度
		    isWidth: false ,
        wei : 'Oz',
        valueOrPercent: true,
        ozOrKg: false,
        vaults:{
          gold:0,
          silver:0,
        },
        data: {
          total_balance:0,
          total_profit:0,
          total_profit_c :0,
        },
        chartData: [
          ['Task', 'Hours per Day'],
          ['Work', 11],
          ['Eat', 2],
          ['Commute', 2],
          ['Watch TV', 2],
          ['Sleep', 7],
        ],
        chartOptions: {
          animation: {
            duration: 5000,
            easing: 'inAndOut',
            startup: true
          },
          pieHole: 0.4,
          backgroundColor: 'transparent',
          legend: {
            'position': 'none',
          },
          chartArea: {
            height: '100%',
            width: '100%',
            left: 64,
            right: 32,
            bottom: 48,
            position: 'top',
          },
          colors: ['#ebbd4c', '#ffc000', '#c4c4c4', '#7f7f7f', '#010101'],
        }
      };
    },
    mounted() {
      
      // this.$store.commit('setLoadingContent', true);
      this.setClient();
      this.fetchData();
     
      
    },
    watch: {
      screenWidth(val){
        console.log(val)
        this.screenWidth = val
      }
    },
    methods: {
      //判断屏幕大小
      setClient(){
          let that = this
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
   
          if (this.screenWidth < 750) {// 1280是你想控制的屏幕大小临界值，可根据自己需求修改
            this.isWidth = false
          } else {
            this.isWidth = true
          }
      },

      echartsInit () {
      // 找到容器 
      let myChart = this.$echarts.init(document.getElementById('myChart'))
       
      // 计算数学
      // s = (chartData[3][1]/(this.chartData[1][1]+ this.chartData[3][1])*100);//gold  chf
      // );
      let silverbai = Math.floor( (this.chartData[3][1]/(this.chartData[1][1]+ this.chartData[3][1]) * 10000) ) / 100
      let  glodbai = Math.floor( (this.chartData[1][1]/(this.chartData[1][1]+ this.chartData[3][1]) * 10000) ) / 100

      // chartData[3][1];//silver


      // 开始渲染
      myChart.setOption({
        tooltip: {
        trigger: 'item'
      },
      series: [
        {
          // name: 'Gold',
          type: 'pie',
          radius: ['30%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            normal: {
              color: function (colors) {
                var colorList = [
                  '#e0b655',
                  '#c4c4c4',
         
                ];
                return colorList[colors.dataIndex];
              },  
              borderColor: '#fff',
              borderWidth: 2,
            },

          },
          label: {
            show: true,
            position: 'inner',
            color : '#f0f0f0',
            fontSize : 14 
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            //this.chartData[3][1]+
            //this.chartData[1][1]+
            { value: glodbai, name: glodbai+'%' },
            { value: silverbai, name: silverbai+'%' },
          ]
        }
      ]
        })
      },

      async fetchData() {
        console.log('fetchData');
     

        const config = {
            headers:{
              AuthenticationToken: process.env.TEST_AUTH_TOKEN,
            }
          };

        // var currency_result = await this.$api.$get('exchange_price/type_based');

        var currency_result  = await this.$axios.$get('exchange_price/type_based',config)
       console.log(currency_result)
  
        var body = new FormData();
        body.append('username', 'yang@goldensuisse.com');
        // var balance_result = await this.$api.$post('getBalance', body);
        var balance_result = await this.$axios.$post('getBalance', body,config);
        console.log(balance_result);

        // var profitloss_array = await this.$api.$post('profit_loss/get_profit_loss', body);
        var profitloss_array = await this.$axios.$post('profit_loss/get_profit_loss' , body ,config)
        console.log(profitloss_array ,'ssssss');
  
        if (balance_result.ResponseCode != '0') {
          return;
        }
        if (profitloss_array.ResponseCode != '0') {
          return;
        }
  
        var total_purchase = 0;
        var total_profit = 0;
        var profitloss = {};
  
        for (let i = 0; i < profitloss_array.ResponseResult.length; i++) {
          var profitloss_item = profitloss_array.ResponseResult[i];
          profitloss[profitloss_item.Bullion] = profitloss_item;
          total_purchase += profitloss_item.accumulatedPurchases;
          total_profit += profitloss_item.profitLoss;         
        }
  
        var profit_percent = 0;
        if (total_purchase > 0) {
          profit_percent = total_profit * 100 / total_purchase;
        }
  
        var default_currency = this.$store.state.app_currency;
        var total_balance = 0;
        console.log(default_currency)
        // Gold Eagle
        var final_result = {
          gold: {
            balance: 1 * balance_result.ResponseResult.Gold.AvailableBalance,
            title: 'Gold Coins',
            conversion_rate: 1 * balance_result.ResponseResult.Gold.AvailableBalance * currency_result.ResponseResult.XAU[default_currency].buy_price,
            profit: profitloss.GEA.profitLoss,
            profit_percent: profitloss.GEA['%']
          }
        };
        this.vaults.gold = balance_result.ResponseResult.Gold.AvailableBalance
        this.vaults.silver = balance_result.ResponseResult.Silver.AvailableBalance

        total_balance += final_result.gold.conversion_rate;
  
        // Gold Bar
        if (balance_result.ResponseResult.Goldbar != null) {
          var goldbar_balance = balance_result.ResponseResult.Goldbar.AvailableBalance / process.env.CONVERSION_KG_OZ_VALUE;
          final_result = {
            ...final_result,
            goldbar: {
              balance: goldbar_balance,
              title: 'Gold Bars',
              conversion_rate: goldbar_balance * currency_result.ResponseResult.GBAR[default_currency].buy_price,
            }
          }
          total_balance += final_result.goldbar.conversion_rate;
        } else {
          final_result = {
            ...final_result,
            goldbar: {
              balance: null,
              title: 'Gold Bars',
              conversion_rate: 0
            }
          }
        }
        final_result.goldbar = {
          ...final_result.goldbar,
          profit: profitloss.XAU.profitLoss,
          profit_percent: profitloss.XAU['%']
        }
  
        // Silver Eagle
        final_result = {
          ...final_result,
          silver: {
            balance: 1 * balance_result.ResponseResult.Silver.AvailableBalance,
            title: 'Silver Coins',
            conversion_rate: 1 * balance_result.ResponseResult.Silver.AvailableBalance * currency_result.ResponseResult.XAU[default_currency].buy_price,
            profit: profitloss.SEA.profitLoss,
            profit_percent: profitloss.SEA['%']
          }
        }
        total_balance += final_result.silver.conversion_rate;
  
        // Silver Bar
        if (balance_result.ResponseResult.Silverbar != null) {
          var silverbar_balance = balance_result.ResponseResult.Silverbar.AvailableBalance / process.env.CONVERSION_KG_OZ_VALUE;
          final_result = {
            ...final_result,
            silverbar: {
              balance: silverbar_balance,
              title: 'Silver Bars',
              conversion_rate: silverbar_balance * currency_result.ResponseResult.SBAR[default_currency].buy_price,
            }
          }
          total_balance += final_result.silverbar.conversion_rate;
        } else {
          final_result = {
            ...final_result,
            silverbar: {
              balance: null,
              title: 'Silver Bars',
              conversion_rate: 0
            }
          }
        }
        final_result.silverbar = {
          ...final_result.silverbar,
          profit: profitloss.XAG.profitLoss,
          profit_percent: profitloss.XAG['%']
        }
  
        // Master Card
        this.$store.commit('setCardCurrency', 'EUR');
        if (balance_result.ResponseResult.Card != null) {
          this.$store.commit('setCardCurrency', balance_result.ResponseResult.Card.Currency);
          final_result = {
            ...final_result,
            card: {
              currency: balance_result.ResponseResult.Card.Currency,
              balance: 1 * balance_result.ResponseResult.Card.AvailableBalance,
              title: 'MasterCard'            
            }
          }
        }
        this.data = {
          result: final_result,
          total_balance: total_balance,
          total_profit: Number(total_profit),
          profit_percent: profit_percent
        }
        this.data.total_profit_c = this.data.total_profit;
        this.chartData = [
          ['Account', 'Available Balance'],
          ['Gold Coins', this.numberFormatter(this.data.result.gold.conversion_rate, 2) * 1],
          ['Gold Bars', this.numberFormatter(this.data.result.goldbar.conversion_rate, 2) * 1], 
          ['Silver Coins', this.numberFormatter(this.data.result.silver.conversion_rate, 2) * 1],
          ['Silver Bars', this.numberFormatter(this.data.result.silverbar.conversion_rate, 2) * 1],
          ['MasterCard', this.data.result.card ? this.numberFormatter(this.data.result.card.balance, 2) * 1 : 0],
        ];
        this.$store.commit('setLoadingContent', false);

        this.echartsInit();
      },
  
      changeValueOrPercent(value) {
        console.log(value);
        if(value){
          this.data.total_profit =  this.data.total_profit_c
        }else{
          this.data.total_profit  = this.data.total_profit/this.data.total_balance //this.vaults.gold/0.0283495    
          this.data.total_profit  =  (this.data.total_profit*100).toFixed(4)+"%"
        }
        this.valueOrPercent = value;
      },
      changeOzOrKg(value) {
        if(value){
          this.vaults.gold = this.vaults.gold*0.0283495
          this.vaults.silver = this.vaults.silver*0.0283495
          this.wei = 'Kg';
        }else{
          this.vaults.gold =this.vaults.gold/0.0283495
          this.vaults.silver =this.vaults.silver/0.0283495
          this.wei = 'Oz';
        }
        this.ozOrKg = value;
      },
      numberFormatter(value, decimal) {
        if (value == undefined) return '0.00';
        return value.toFixed(decimal).toLocaleString();
      },
      getCurrencySymbol(currency) {
        if (currency == 'USD') return '$';
        if (currency == 'EUR') return '€';
        if (currency == 'GBP') return '£';
        if (currency == 'CHF') return 'Fr';
      }
    },
    created() {
    },
  }
  </script>
  
<style scoped>
.overview-contnet {
    padding: 30px 120px 30px 120px;
    position: relative;
}
.myChart{
  position:absolute;
  z-index: 31;
  top: 50px;
  right: 0px;
  margin-right: 50px;
  /* background-color: aqua;  */
 
}

.text-username {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 35px;

    color: #000000;
}
.text-holding-overview {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 35px;

    color: #000000;

    margin-top: 110px;
}
.text-detail {
  font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 35px;

    color: #000000;  
}
.text-overview-title {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 29px;

    color: #000000;
}
.text-overview-value {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 29px;

    color: #000000;

    margin-top: 10px;
}
.card-category {
  width: 200px;
  height: 200px;

  background: #FFFEFE;
  border: 1px solid #000000;
}
.text-type {
  margin-left: 22px;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  color: #363636;
  text-decoration: underline;
}
@media only screen and (max-width:750px) {
    .overview-contnet{
      padding: 30px 30px 30px 30px;
    }
    .myChart{
      display: none;
    }
}
</style>  
