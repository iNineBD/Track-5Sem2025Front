import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProjectCard from '~/components/project-card.vue'

describe('ProjectCard', () => {
  it('renders project name and description', () => {
    const project = {
      id: 1,
      name: 'Test Project',
      description: 'This is a test project',
      created_date: '2023-01-01',
      finish_date: null,
      modified_date: '2023-01-10',
      logo_big_url: 'https://example.com/logo-big.png',
      logo_small_url: 'https://example.com/logo-small.png',
    }

    const wrapper = mount(ProjectCard, {
      props: { project },
    })

    expect(wrapper.text()).toContain('Test Project')
    expect(wrapper.text()).toContain('This is a test project')
  })
})
