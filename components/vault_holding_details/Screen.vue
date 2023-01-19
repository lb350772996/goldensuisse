<template>
  <div class="d-flex flex-column overview-contnet " v-if="this.$store.state.loadingContent == false && data != null">
    <div class="text-username d-flex flex-column">
            <span>Welcome  </span>
            <span>{{ this.$store.state.firstname }} {{ this.$store.state.lastname }}</span>
            <div style="height: 1px; width: 240px; background-color: black; margin-top: 15px;"/>
    </div>
    <div class=" d-flex flex-column"   >
        <div class="d-flex flex-row" style="margin-top: 35px" >
              <Card 
                type="Gold"
                :holdings="this.contentData.lbl_gold_qty"
                :profit_loss="this.contentData.lbl_gold_total.slice(2)"
                background="#EBBD4C"   :wei="wei" />
              
        </div>
    </div>       
    <div class="text-holding-overview-detail d-flex flex-column">
        <span>Holding Overview</span>
    </div>  
    <div class="d-flex" style="margin-top: 25px;" >
          <ToggleSwitch :value="ozOrKg" label="Oz/Kg" @change="changeOzOrKg"/>
    </div>
    <!-- <div class="tab_section" >
        <ul class="nav nav-pills mb-3 float-left w-auto option_tab" id="pills-tab" role="tablist">
            <li class="nav-item">
                <a
                  :class="'nav-link toggle_title ' + (tabIndex == 0 ? 'active' : '')"
                  id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" title="GOLD" @click="change(0)">Vault Gold</a>
            </li>
            <li class="nav-item vault_sliver">
                <a
                  :class="'nav-link toggle_title ' + (tabIndex == 1 ? 'active' : '')"
                  id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" title="SILVER" @click="change(1)">Vault Silver</a>
            </li>
            <li class="nav-item vault_sliver">
                <a
                  :class="'nav-link toggle_title ' + (tabIndex == 2 ? 'active' : '')"
                  id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" title="MASTERCARD" @click="change(2)">MasterCard</a>
            </li>
        </ul>
        <div class="input-group mb-3 vault_slider_wrapper w-auto" v-show="tabIndex !== 2">
            <div class="input-group-append ml-3">
                <span class="input-group-text  ATM_withdrawal_switch_button" id="basic-addon2">
                    <ul class="list-group list-group-flush">
                        <li class="">
                            <label class="switch ">
                                <input type="checkbox" class="default" id="switch_oz_kg_option" value="oz" @click="switchValuePercent($event)">
                                <span class="slider switch_oz_kg"></span>
                            </label>
                        </li>
                    </ul>
                </span>
            </div>
            <div class="input-group-prepend" >
                <span class="input-group-text slider_text" v-if="valueOrPercent">Oz</span>
                <span class="input-group-text slider_text" v-else>Kg</span>
            </div>
        </div>
    </div> -->

    <div class="tab-content" id="pills-tabContent">
        <div
          :class="'tab-pane fade ' + (tabIndex == 0 ? 'show active' : '')"
          id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <!-- <p class="persona_screen">Gold Account</p> -->
            <!-- table section-->
            <div class="row">
                <div class="col-12 col-sm-12 col-xl-12 col-md-12 col-lg-12" style="padding: 0px;margin-top: 45px;">
                    <div class="table_section_paddinges">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="account_number_tables " style="width:23%;" >Bullion</th>
                                        <th class="account_number_tables " style="width:23%;" >Vault</th>
                                        <th class="account_number_tables " style="width:23%;" >Market Price</th>
                                        <th class="account_number_tables " style="width:23%;"  v-if="valueOrPercent">
                                            <span class="slider_text" >Oz</span>
                                        </th>
                                        <th class="account_number_tables " style="width:23%;"   v-else>
                                            <span class="slider_text">Kg</span>
                                        </th>
                                        <th class="account_number_tables " style="width:30%;" >Value </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="data.balance_result.gold != undefined && data.balance_result.goldbar != undefined">
                                        <td>Gold Bars Oz LBMA</td>
                                        <td>
                                            {{ data.balance_result.goldbar.account_no }}
                                        </td>
                                        <td id="lbl_gold_bar_market_price">
                                            {{ contentData.lbl_gold_bar_market_price  }}
                                        </td>
                                        <td id="lbl_gold_bar_qty">
                                            {{ contentData.lbl_gold_bar_qty }}
                                        </td>
                                        <td id="lbl_gold_bar_total">
                                            {{ contentData.lbl_gold_bar_total }}
                                        </td>
                                    </tr>
                                    <tr v-if="data.balance_result.gold.balance != undefined">
                                        <td>Gold Eagles American</td>
                                        <td>
                                            {{ data.balance_result.gold.account_no }}
                                        </td>
                                        <td id="lbl_gold_market_price">
                                            {{ contentData.lbl_gold_market_price }}
                                        </td>
                                        <td id="lbl_gold_qty">
                                            {{ contentData.lbl_gold_qty }}
                                        </td>
                                        <td id="lbl_gold_total">
                                            {{ contentData.lbl_gold_total }}
                                        </td>
                                    </tr>
                                    <tr v-if="data.balance_result.gold.balance != undefined">
                                        <td>Total in vault</td>
                                        <td colspan="2">&nbsp;</td>
                                        <td id="lbl_total_qty_gold_gold_bar">
                                            {{ contentData.lbl_total_qty_gold_gold_bar }}
                                        </td>
                                        <td id="lbl_total_gold_gold_bar">
                                            {{ contentData.lbl_total_gold_gold_bar }}
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="5" align="center">No Accounts found!!!</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
          :class="'tab-pane fade ' + (tabIndex == 1 ? 'show active' : '')"
          id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <p class="persona_screen">Silver Account</p>
            <div class="row">
                <div class="col-12 col-sm-12 col-xl-12 col-md-12 col-lg-12">
                    <div class="table_section_paddinges">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="account_number_tables w-25">Bullion</th>
                                        <th class="account_number_tables w-25">Vault</th>
                                        <th class="account_number_tables w-25">Market Price</th>
                                        <th class="account_number_tables w-25" v-if="valueOrPercent"><span class="slider_text">Oz</span></th>
                                        <th class="account_number_tables w-25" v-else><span class="slider_text">Kg</span></th>
                                        <th class="account_number_tables w-25">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="data.balance_result.silver != undefined && data.balance_result.silverbar != undefined">
                                        <td>Silver Bars Oz LBMA</td>
                                        <td>
                                            {{ data.balance_result.silverbar.account_no }}
                                        </td>
                                        <td id="lbl_silver_bar_market_price">
                                            {{ contentData.lbl_silver_bar_market_price }}
                                        </td>
                                        <td id="lbl_silver_bar_qty">
                                            {{ contentData.lbl_silver_bar_qty }}
                                        </td>
                                        <td id="lbl_silver_bar_total">
                                            {{ contentData.lbl_silver_bar_total }}
                                        </td>
                                    </tr>
                                    <tr v-if="data.balance_result.silver.balance != undefined">
                                        <td>Silver Eagles American</td>
                                        <td>
                                            {{ data.balance_result.silver.account_no }}
                                        </td>
                                        <td id="lbl_silver_market_price">
                                            {{ contentData.lbl_silver_market_price }}
                                        </td>
                                        <td id="lbl_silver_qty">
                                            {{ contentData.lbl_silver_qty }}
                                        </td>
                                        <td id="lbl_silver_total">
                                            {{ contentData.lbl_silver_total }}
                                            
                                        </td>
                                    </tr>
                                    <tr v-if="data.balance_result.silver.balance != undefined">
                                        <td>Total in vault</td>
                                        <td colspan="2">&nbsp;</td>
                                        <td id="lbl_total_qty_silver_silver_bar">
                                            {{ contentData.lbl_total_qty_silver_silver_bar }}
                                        </td>
                                        <td id="lbl_total_silver_silver_bar">
                                            {{ contentData.lbl_total_silver_silver_bar }}
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="5" align="center">No Accounts found!!!</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
          :class="'tab-pane fade ' + (tabIndex == 2 ? 'show active' : '')"
          id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
            <p class="persona_screen">MasterCard Account</p>
            <div class="row">
                <div class="col-12 col-sm-12 col-xl-12 col-lg-12 col-md-12">
                    <div class="table_section">
                        <div class="table-responsive">
                            <table class="table">
                                <tbody>
                                    <tr v-if="data.balance_result.card != null">
                                        <td>Account</td>
                                        <td class="text-right">
                                            {{ data.balance_result.card.account_no }}
                                        </td>
                                    </tr>
                                    <tr v-if="data.balance_result.card != null">
                                        <td>Cardholder Name</td>
                                        <td class="text-right">
                                            {{ this.$store.state.firstname }} {{ this.$store.state.lastname }}
                                        </td>
                                    </tr>
                                    <tr class="odd gradeX" v-else>
                                        <td colspan="4" align="center">No Accounts found!!!</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dashboard_image_section" v-if="data.balance_result.card != null">
                <div class="row">
                    <div class="col-12 col-sm-12 col-xl-6 col-lg-6 col-md-6">
                        <p class="Toatl_Gold_in_vault">Total Balance</p>
                    </div>
                    <div class="col-12 col-sm-12 col-xl-6 col-lg-6 col-md-6 text-right">
                        <p class="persona_screen pb-18">Premium</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-sm-12 col-xl-6 col-lg-6 col-md-6">
                        <p class="total_account">
                            {{ data.balance_result.card.balance != null ? getCurrencySymbol(data.balance_result.card.currency) + ' ' + data.balance_result.card.balance : '' }}
                        </p>
                        <table class="table card_operations">
                            <tr>
                                <td>
                                    <span class="pin_block" @click="onClickPinCode($event)">
                                        <span class="front">PIN</span>
                                        <span class="back" style="display: none;" id="pin_code"></span>
                                    </span>
                                </td>
                                <td class="text-right card_text">Retrieve PIN Code</td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="input-group-text border-0 m-0" id="basic-addon2">
                                        <label class="switch mb-0">
                                            <input type="checkbox" class="default" id="card_online_status" value="<?php echo ($balance_result['card']['online_status'] == 1) ? 1 : 0; ?>" >
                                            <span class="slider opt_card_online_purchase_status"></span>
                                        </label>
                                    </span>
                                </td>
                                <td class="text-right card_text">Lock/Unlock Online Purchase</td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="btn" class="btn btn_card_suspend">Suspended</button>
                                </td>
                                <td class="card_text text-right">Activate/Suspend Card</td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-12 col-sm-12 col-xl-6 col-lg-6 col-md-6 vault_card_wrapper">
                        <img class="card_img" src="beta/card.png">
                        <div class="card_no">5219 **** **** ****</div>
                        <div class="card_title">
                            {{ this.$store.state.firstname }} {{ this.$store.state.lastname }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
 import ToggleSwitch from '../Switch.vue';
 import Card from '../Card.vue';
export default {
    name: 'holding',
    components: { 
        ToggleSwitch,
        Card
    },
  data() {
    return {
        ozOrKg : false,
        wei: 'Oz',
        valueOrPercent: true,
        tabIndex : 0,
        data: null,
        conversion_oz_value: 1 * process.env.CONVERSION_KG_OZ_VALUE,
        pinCode: null,
        purchaseStatus: null,
        contentData: null
    }
  },

  mounted() {
    this.$store.commit('setLoadingContent', true);
    this.fetchData();
  },

  methods: {
    async fetchData(){
      console.log('fetchData， dgikubgs');
      const config = JSON.parse(localStorage.getItem('httpConfig'));
      var body = new FormData();
      body.append('username', 'yang@goldensuisse.com');
    //   var balance_result = await this.$api.$post('getBalance', body);
      var balance_result = await this.$axios.$post('getBalance',body,config)
      console.log(balance_result);

    //   var currency_result = await this.$api.$get('exchange_price/type_based');

      var currency_result = await this.$axios.$get('exchange_price/type_based',config);
      console.log(currency_result);

      var default_currency = this.$store.state.app_currency;

      // Gold Eagle
      var final_result = {
        gold: {
          balance: 1 * balance_result.ResponseResult.Gold.AvailableBalance,
          title: 'Gold Coins',
          conversion_rate: 1 * balance_result.ResponseResult.Gold.AvailableBalance * currency_result.ResponseResult.XAU[default_currency].buy_price,
          account_no: balance_result.ResponseResult.Gold.AccountNumber,
          market_price: currency_result.ResponseResult.XAU[default_currency].buy_price
        }
      };
      // Gold Bar
      if (balance_result.ResponseResult.Goldbar != null) {
        final_result = {
          ...final_result,
          goldbar: {
            balance: 1 * balance_result.ResponseResult.Goldbar.AvailableBalance,
            title: 'Gold Bars',
            conversion_rate: 1 * balance_result.ResponseResult.Goldbar.AvailableBalance * currency_result.ResponseResult.GBAR[default_currency].buy_price,
            account_no: balance_result.ResponseResult.Goldbar.AccountNumber,
            market_price: currency_result.ResponseResult.GBAR[default_currency].buy_price,
          }
        }
        // let gold_bar_per_market_price = Math.floor(final_result.goldbar.market_price/ $conversion_oz_value * 100) / 100;
        // let gold_bar_market_price = gold_bar_per_market_price * final_result.goldbar.balance;
        // gold_bar_qty = 
      }

      // Silver Eagle
      final_result = {
        ...final_result,
        silver: {
            balance: 1 * balance_result.ResponseResult.Silver.AvailableBalance,
            title: 'Silver Coins',
            conversion_rate: 1 * balance_result.ResponseResult.Silver.AvailableBalance * currency_result.ResponseResult.XAU[default_currency].buy_price,
            account_no: balance_result.ResponseResult.Silver.AccountNumber,
            market_price: currency_result.ResponseResult.XAG[default_currency].buy_price            
        }
      }

      // Silver Bar
      if (balance_result.ResponseResult.Silverbar != null) {
        final_result = {
          ...final_result,
          silverbar: {
            balance: 1 * balance_result.ResponseResult.Silverbar.AvailableBalance,
            title: 'Silver Bars',
            conversion_rate: 1 * balance_result.ResponseResult.Silverbar.AvailableBalance * currency_result.ResponseResult.SBAR[default_currency].buy_price,
            account_no: balance_result.ResponseResult.Silverbar.AccountNumber,
            market_price: currency_result.ResponseResult.SBAR[default_currency].buy_price
          }
        }
      }

      // Master Card
      if (balance_result.ResponseResult.Card != null) {
        final_result = {
          ...final_result,
          card: {
            account_no: balance_result.ResponseResult.Card.AccountNumber,
            balance: balance_result.ResponseResult.Card.AvailableBalance,
            title: 'MasterCard',
            currency: this.$store.state.app_currency
          }
        }
      }
      this.data = {
        balance_result: final_result,
        default_currency: default_currency,
        conversion_oz_value: process.env.CONVERSION_KG_OZ_VALUE
      }
      console.log(this.data);
      this.getContentData();

      this.$store.commit('setLoadingContent', false);
    },

    async loadPinCode() {
        console.log(this.$session.getAll());
        // let account = this.$session.get('account');
        // console.log(account);

        // let cardNumber = account.IntercashCardsSAN;
        // if (!cardNumber) {
        //     cardNumber = account.IntercashEURSAN;
        // }
        // if (!cardNumber) {
        //     cardNumber = account.IntercashUSDSAN
        // }

        // var body = new FormData();
        // body.append('cardnumber', cardNumber);
        // var balance_result = await this.$api.$post('intercash/GetCardPin', body);
        // console.log(balance_result);

        // return {
        //     status: balance_result.ResponseCode,
        //     pin: balance_result.ResponseResult.Pin,
        //     message: balance_result.ResponseMessage,
        //     redirect_url: process.env.REDIRECT_URL
        // }
    },

    async updateMastercardPurchaseStatus(status) {
        var body = new FormData();
        body.append('username', 'yang@goldensuisse.com');
        var balance_result = await this.$api.$post('getBalance', body);
        console.log(balance_result);

        let param = {
            cardnumber: balance_result.ResponseResult.Card.AccountNumber,
            enable: status
        }

        card_online_txn_result = await this.$api.$post('intercash/enable_disable_ecommerce_txn', param);
        console.log(card_online_txn_result);
        this.purchaseStatus = {
            status: balance_result.ResponseCode,
            message: balance_result.ResponseMessage,
            redirect_url: process.env.REDIRECT_URL
        }
    },

    change(index) {
      this.tabIndex = index;
    },
    changeOzOrKg(value) {
        this.ozOrKg = value;
        this.valueOrPercent = value;
        if(value){
            this.wei = 'Oz'
        }else{
            this.wei = 'Kg'
        }
        this.getContentData();
    },
    
    getContentData() {
        if (!this.valueOrPercent) {
            //Calculate Gold Bar - Market Price
            let gbar_qty = this.data.balance_result.goldbar.balance / this.conversion_oz_value;
            let gbar_total_market_price = this.data.balance_result.goldbar.market_price * gbar_qty;

            //Calculate Gold - Market Price
            let g_qty = this.data.balance_result.gold.balance / this.conversion_oz_value;
            let g_market_price = this.data.balance_result.gold.market_price * this.conversion_oz_value;
            let g_total_market_price = g_market_price * g_qty;

            //Total
            let g_total_qty = (1 * gbar_qty + 1 * g_qty).toFixed(2);
            let g_grand_total = gbar_total_market_price + g_total_market_price;

            let currency = this.getCurrencySymbol(this.$store.state.app_currency);
            this.contentData = {
                lbl_gold_bar_market_price: currency + ' ' + this.numberFormatter(this.data.balance_result.goldbar.market_price, 2),
                lbl_gold_bar_qty: this.numberFormatter(Math.floor(gbar_qty * 100) / 100, 2),
                lbl_gold_bar_total: currency + ' ' + this.numberFormatter(gbar_total_market_price, 2),

                lbl_gold_market_price: currency + ' ' + this.numberFormatter(g_market_price, 2),
                lbl_gold_qty: this.numberFormatter(g_qty, 2),
                lbl_gold_total: currency + ' ' + this.numberFormatter(g_total_market_price, 2),

                lbl_total_qty_gold_gold_bar: this.numberFormatter(g_total_qty, 2),
                lbl_total_gold_gold_bar: currency + ' ' + this.numberFormatter(g_grand_total, 2)
            }

            //Calculate Silver Bar - Market Price
            let sbar_qty = this.data.balance_result.silverbar.balance / this.conversion_oz_value;
            let sbar_total_market_price = this.data.balance_result.silverbar.market_price * sbar_qty;

            //Calculate Silver - Market Price
            let s_qty = this.data.balance_result.silver.balance / this.conversion_oz_value;
            let s_market_price = this.data.balance_result.silver.market_price * this.conversion_oz_value;
            let s_total_market_price = s_market_price * s_qty;

            let s_total_qty = (1 * sbar_qty + 1 * s_qty).toFixed(2);
            let s_grand_total = sbar_total_market_price + s_total_market_price;

            this.contentData = {
                ...this.contentData,
                lbl_silver_bar_market_price: currency + ' ' + this.numberFormatter(this.data.balance_result.silverbar.market_price, 2),
                lbl_silver_bar_qty: this.numberFormatter(Math.floor(sbar_qty * 100) / 100, 2),
                lbl_silver_bar_total: currency + ' ' + this.numberFormatter(sbar_total_market_price, 2),

                lbl_silver_market_price: currency + ' ' + this.numberFormatter(s_market_price, 2),
                lbl_silver_qty: this.numberFormatter(s_qty, 2),
                lbl_silver_total: currency + ' ' + this.numberFormatter(s_total_market_price, 2),

                lbl_total_qty_silver_silver_bar: this.numberFormatter(s_total_qty, 2),
                lbl_total_silver_silver_bar: currency + ' ' + this.numberFormatter(s_grand_total, 2)
            }

            // console.log(this.contentData);
        } else {

            //Calculate Gold Bar - Market Price
            let gbar_qty = this.data.balance_result.goldbar.balance;
            let gbar_market_price = this.data.balance_result.goldbar.market_price / this.conversion_oz_value;
            let gbar_total_market_price = gbar_market_price * gbar_qty;

            //Calculate Gold - Market Price
            let g_qty = this.data.balance_result.gold.balance;
            let g_market_price = this.data.balance_result.gold.market_price;
            let g_total_market_price = g_market_price * g_qty;

            //Total
            let g_total_qty = (1 * gbar_qty + 1 * g_qty).toFixed(2);
            let g_grand_total = gbar_total_market_price + g_total_market_price;

            let currency = this.getCurrencySymbol(this.$store.state.app_currency);
            this.contentData = {
                lbl_gold_bar_market_price: currency + ' ' + this.numberFormatter(gbar_market_price, 2),
                lbl_gold_bar_qty: this.numberFormatter(Math.floor(gbar_qty * 100) / 100, 2),
                lbl_gold_bar_total: currency + ' ' + this.numberFormatter(gbar_total_market_price, 2),

                lbl_gold_market_price: currency + ' ' + this.numberFormatter(g_market_price, 2),
                lbl_gold_qty: this.numberFormatter(g_qty, 2),
                lbl_gold_total: currency + ' ' + this.numberFormatter(g_total_market_price, 2),

                lbl_total_qty_gold_gold_bar: this.numberFormatter(g_total_qty, 2),
                lbl_total_gold_gold_bar: currency + ' ' + this.numberFormatter(g_grand_total, 2)
            }

            //Calculate Silver Bar - Market Price
            let sbar_qty = this.data.balance_result.silverbar.balance;
            let sbar_market_price = this.data.balance_result.silverbar.market_price / this.conversion_oz_value;
            let sbar_total_market_price = sbar_market_price * sbar_qty;

            //Calculate Silver - Market Price
            let s_qty = this.data.balance_result.silver.balance;
            let s_market_price = this.data.balance_result.silver.market_price;
            let s_total_market_price = s_market_price * s_qty;

            let s_total_qty = (1 * sbar_qty + 1 * s_qty).toFixed(2);
            let s_grand_total = sbar_total_market_price + s_total_market_price;

            this.contentData = {
                ...this.contentData,
                lbl_silver_bar_market_price: currency + ' ' + this.numberFormatter(sbar_market_price, 2),
                lbl_silver_bar_qty: this.numberFormatter(Math.floor(sbar_qty * 100) / 100, 2),
                lbl_silver_bar_total: currency + ' ' + this.numberFormatter(sbar_total_market_price, 2),

                lbl_silver_market_price: currency + ' ' + this.numberFormatter(s_market_price, 2),
                lbl_silver_qty: this.numberFormatter(s_qty, 2),
                lbl_silver_total: currency + ' ' + this.numberFormatter(s_total_market_price, 2),

                lbl_total_qty_silver_silver_bar: this.numberFormatter(s_total_qty, 2),
                lbl_total_silver_silver_bar: currency + ' ' + this.numberFormatter(s_grand_total, 2)
            }
        }
    },

    async onClickPinCode(event) {
        console.log(event);
        this.$store.commit('setLoadingContent', true);
        const pin = await this.loadPinCode();
        console.log(pin);
        this.$store.commit('setLoadingContent', false);
    },

    switchValuePercent(event) {
      this.valueOrPercent = !event.target.checked;
      this.getContentData();
    },
    numberFormatter(value, decimal) {
      if (value == undefined) return '0.00';
      return (1 * value).toFixed(decimal).toLocaleString();
    },
    getCurrencySymbol(currency) {
      if (currency == 'USD') return '$';
      if (currency == 'EUR') return '€';
      if (currency == 'GBP') return '£';
      if (currency == 'CHF') return 'Fr';
    }
  }

}
</script>
<style>
.text-username {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 35px;

    color: #000000;
}
.overview-contnet {
    padding: 30px 120px 30px 120px;

}
.text-holding-overview-detail{
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 46px;

    color: #000000;
    margin-top: 35px;
}
</style>