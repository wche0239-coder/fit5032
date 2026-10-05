<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BHeader from './components/BHeader.vue'

const route = useRoute()

// Pages that act as pure API endpoints (JSON only, no header)
const apiRoutes = ['CountBookAPI', 'GetAllBookAPI']

const showHeader = computed(() => {
  return !apiRoutes.includes(route.name)
})
</script>

<template>
  <BHeader v-if="showHeader" />
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
