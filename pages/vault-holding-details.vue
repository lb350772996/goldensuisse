<template>
  <Layout :content="content" title="HOLDING"/>
</template>

<script>
import OverviewHolding from '../components/vault_holding_details/Screen';
export default {
  name: 'HOLDING',
  components: [OverviewHolding],
  data() {
    return {
      content: OverviewHolding
    }
  },
  mounted() {

  },

}
</script>

