<script setup>
  import {onMounted} from 'vue';
  import {useCompetitorStore} from '../stores/competitor.js';

  const competitorData = useCompetitorStore();
  onMounted(async() => {
    await competitorData.getCompetitor();

  });

</script>
<template>
   {{competitorData.competitor}}
</template>