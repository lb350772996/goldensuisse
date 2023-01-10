<template>
  <Layout :content="content" title="PROFILE"/>
</template>

<script>
import OverviewProfile from '../components/profile/Screen';
export default {
  name: 'PROFILE',
  components: [OverviewProfile],
  data() {
    return {
      content: OverviewProfile
    }
  },
  mounted() {

  },

}
</script>

