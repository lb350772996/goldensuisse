<template>
  <Layout :content="content" title="LOADCARD"/>
</template>

<script>
import OverviewLoadcard from '../components/load_card/Screen';
export default {
  name: 'Loadcard',
  components: [OverviewLoadcard],
  data() {
    return {
      content: OverviewLoadcard
    }
  },
  mounted() {

  },

}
</script>
