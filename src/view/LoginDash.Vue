<script setup>
/*eslint-disable*/
  import {onMounted} from 'vue';
  import {useCompetitorStore} from '../stores/competitor.js';
  import LoginDashboard from '../components/LoginDashboard.vue';

  // const competitorData = useCompetitorStore();
  // onMounted(async() => {
  //   await competitorData.getCompetitor();

  // });

</script>
<template>
  <div>
    <!-- {{competitorData.competitor}} -->
    <LoginDashboard/>
  </div>
</template>