<template>
  <Layout :content="content" title="OVERVIEW"/>
</template>

<script>
import OverviewContent from '../components/pages/Overview';
export default {
  name: 'Overview',
  components: [OverviewContent],
  data() {
    return {
      content: OverviewContent
    }
  },
  mounted() {

  },

}
</script>

