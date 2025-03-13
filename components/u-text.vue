<template>
    <component
      :is="tag"
      :class="ui"
      data-component="z-text"
      class="my-2"
    >
      <slot />
    </component>
  </template>
  
  <script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  
  const props = withDefaults(defineProps<{
    tag?: string;
    align?: 'left' | 'center' | 'right';
    size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
    weight?: 'normal' | 'medium' | 'semi-bold' | 'bold';
    color?: 'inherit' | 'primary' | 'white' | 'success' | 'danger' | 'warning' | 'info';
  }>(), {
    tag: 'p',
    size: 'medium',
    weight: 'normal',
    color: 'inherit',
  });
  
  const attrs = useAttrs();
  
  const ui = computed(() => [
    {
      'text-left': props.align === 'left',
      'text-center': props.align === 'center',
      'text-right': props.align === 'right',
      'text-xs': props.size === 'extra-small',
      'text-sm': props.size === 'small',
      'text-base': props.size === 'medium',
      'text-lg': props.size === 'large',
      'text-2xl': props.size === 'extra-large',
      'font-normal': props.weight === 'normal',
      'font-medium': props.weight === 'medium',
      'font-semibold': props.weight === 'semi-bold',
      'font-bold': props.weight === 'bold',
      'text-primary': props.color === 'primary',
      'text-white': props.color === 'white',
      'text-green-500': props.color === 'success',
      'text-red-500': props.color === 'danger',
      'text-yellow-500': props.color === 'warning',
      'text-blue-400': props.color === 'info',
    },
    attrs.class, // Permite adicionar classes extras via `class=""` no componente
  ]);
  </script>
  