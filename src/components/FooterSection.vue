<script setup>
import HalftoneWordmarkFooter from './ui/HalftoneWordmarkFooter.vue'
import { personalData } from '../data/personal'
</script>

<template>
  <HalftoneWordmarkFooter
    :wordmark="personalData.nickName.toLowerCase()"
    :label="personalData.name"
    :meta="`© ${new Date().getFullYear()} · Yogyakarta, ID`"
    :palette="{
      background: '#1d3f6a',
      ink: '#f8fafc',
      warm: '#ffcd3c'
    }"
    height="480px"
    :dot-gap="6"
    :radius="85"
    :crop="0.18"
    :grain="0.45"
  />
</template>
