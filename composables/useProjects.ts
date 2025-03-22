import { useNuxtApp, useRuntimeConfig } from '#app'

export function useProjects() {
  const { $api } = useNuxtApp()
  const config = useRuntimeConfig()

  const { data, pending, error: _error } = useAsyncData('fetchProjects', async () => {
    try {
      const response = await $api.get(`${config.public.apiServer}/projects/data`)
      return { projects: response.data.success }
    }
    catch (error) {
      console.error('Erro ao buscar projetos:', error)
      return { projects: [], error: error instanceof Error ? error.message : 'Erro desconhecido' }
    }
  })

  return {
    data: computed(() => data.value?.projects || []),
    pending,
    error: computed(() => data.value?.error || null),
  }
}
