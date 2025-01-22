// src/composables/useWindowEventListener.ts
import { onMounted, onUnmounted } from 'vue'

/**
 * A composable for adding and removing window event listeners.
 *
 * @param event - The event type to listen for (e.g., "message", "DOMContentLoaded").
 * @param handler - The function to execute when the event occurs.
 * @param options - Optional event listener options.
 */
export function useWindowEventListener<K extends keyof WindowEventMap>(
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) {
  onMounted(() => {
    window.addEventListener(event, handler, options)
  })

  onUnmounted(() => {
    window.removeEventListener(event, handler, options)
  })
}
