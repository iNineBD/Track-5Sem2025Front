<template>
    <component
      data-component="text"
      :is="props.tag"
      :class="ui"
    >
      <slot />
    </component>
  </template>
  
  <script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { schema } from './text.schema';
  
  const props = withDefaults(defineProps<{
    tag?: string,
    align?: 'left' | 'center' | 'right',
    size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large',
    weight?: 'inherit' | 'normal' | 'middle' | 'strong',
    color?: 'inherit' | 'major' | 'minor' | 'interactive' | 'white' | 'su ccess' | 'danger' | 'warning' | 'info' | 'primary',
  }>(), {
    tag: 'span',
    align: undefined,
    size: 'medium',
    weight: 'normal',
    color: undefined,
  });
  
  const attrs = useAttrs();
  
  const ui = computed(() => schema({
    align: props.align,
    size: props.size,
    weight: props.weight,
    color: props.color,
    class: attrs.class as string,
  }));
  </script>
  