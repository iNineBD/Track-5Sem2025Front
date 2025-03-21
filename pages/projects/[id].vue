<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
useHead({
  title: `Home - Project ${ route.params.id }`
});
</script>
<template>
    <div>
        test-{{ $route.params.id }}
    </div>
</template>