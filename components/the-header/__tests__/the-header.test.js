import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TheHeader from '../index.vue';

describe('TheHeader Component', () => {
  test('renders correctly', () => {
    const wrapper = mount(TheHeader, {
      global: {
        stubs: ['NuxtImg', 'NuxtLink', 'UButton', 'USlideover', 'Avatar'],
        mocks: {
          $route: { path: '/' }
        }
      }
    });

    expect(wrapper.exists()).toBe(true);
  });
});
