import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('app', {
  state: () => ({
    config: {}, // Inicializado como un objeto vacío
    language: null,
    music: null,
    news: null,
    socials: null,
    team: null,
    updates: null
  }),

  actions: {
    async loadJson(filename, key) {
      try {
        const response = await fetch(`/config/${filename}`)
        if (!response.ok) throw new Error(`Failed to load ${filename}`)
        this[key] = await response.json()
      } catch (error) {
        console.error(`Error loading ${filename}:`, error)
      }
    },

    async loadAllConfigs() {
      const configFiles = {
        news: 'News.json',
        socials: 'Socials.json',
        team: 'Team.json',
        updates: 'Updates.json'
      }

      await Promise.all(
        Object.entries(configFiles).map(([key, file]) =>
          this.loadJson(file, key)
        )
      )
    }
  }
})
