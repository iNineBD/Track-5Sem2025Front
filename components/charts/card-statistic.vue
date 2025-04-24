<template>
  <UCard class="h-full w-full">
    <div class="flex flex-row gap-4 items-center">
      <div :class="`w-10 h-10 ${iconBgColor} rounded-lg p-2`">
        <UIcon :name="iconName" :class="`w-full h-full ${iconColor}`" />
      </div>
      <UText
        size="extra-large"
        weight="semi-bold"
        class="mt-0 mb-0 line-clamp-1"
      >
        {{ value }} {{ text }}
      </UText>
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps({
  iconName: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
    required: true,
  },
  iconBgColor: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});
</script>
