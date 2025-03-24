import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TheHeader from '~/components/the-header/index.vue'

describe('TheHeader', () => {
  it('renders the header with logo and navigation', () => {
    const wrapper = mount(TheHeader, {
      global: {
        mocks: {
          $route: { path: '/' },
        },
      },
    })

    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('renders avatar dropdown with user name', () => {
    const wrapper = mount(TheHeader, {
      global: {
        mocks: {
          $route: { path: '/' },
        },
      },
    })

    const avatarDropdown = wrapper.findComponent({ name: 'avatarDropdown' })
    expect(avatarDropdown.exists()).toBe(true)
    expect(avatarDropdown.props('avatarAlt')).toBeDefined()
  })
})
