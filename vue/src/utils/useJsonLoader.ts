import { shallowRef, onMounted } from 'vue'

export function useJsonLoader<T>(filename: string) {
  const data = shallowRef<T | null>(null)

  const loadJson = async () => {
    try {
      const response = await fetch(`/config/${filename}`)
      if (!response.ok) throw new Error(`Failed to load ${filename}`)
      const jsonData = (await response.json()) as T
      data.value = jsonData
    } catch (error) {
      console.error(`Error loading ${filename}:`, error)
      data.value = null
    }
  }

  onMounted(loadJson)

  return { data }
}
