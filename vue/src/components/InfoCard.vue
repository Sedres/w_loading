<template>
  <v-sheet class="card-container" width="35%" height="100%">
    <v-card theme="dark" width="100%" height="100%" class="card-content pa-2">
      <!-- Tabs Header -->
      <div class="tab-header-wrapper">
        <v-tabs v-model="tab" class="tab-header">
          <v-tab
            v-for="t in tabs"
            :key="t.value"
            :value="t.value"
            class="tab-button"
            :ripple="false"
            variant="text"
            v-show="expanded"
          >
            <v-icon class="tab-icon">{{ t.icon }}</v-icon>
          </v-tab>
          <v-tab
            value="expand"
            class="tab-button"
            @click="expanded = !expanded"
          >
            <v-icon class="tab-icon">
              {{
                expanded
                  ? 'fa-solid fa-chevron-right'
                  : 'fa-solid fa-chevron-left'
              }}
            </v-icon>
          </v-tab>
        </v-tabs>
      </div>

      <!-- Tabs Content -->
      <v-tabs-window v-model="tab" class="tab-content" v-show="expanded">
        <v-tabs-window-item value="news" class="news-container">
          <News :newsData="news" />
        </v-tabs-window-item>
        <v-tabs-window-item value="team" class="team-container pa-1">
          <Team :teamData="team" :config="config" />
        </v-tabs-window-item>
        <v-tabs-window-item value="updates">
          <Updates :updates="updates" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue'

// Recibir `config`, `news`, `team`, `updates` desde el padre
const props = defineProps({
  config: Object,
  news: Object,
  team: Object,
  updates: Object
})

const expanded = ref(false)
const tab = ref('expand')

const tabs = [
  { icon: 'fa-solid fa-newspaper', value: 'news' },
  { icon: 'fa-solid fa-users', value: 'team' },
  { icon: 'fa-solid fa-scroll', value: 'updates' }
]

// Computed para colores dinámicos basados en la configuración
const mainColor = computed(() => props.config?.MainColor || '#FFFFFF')
const shadowColor = computed(() => props.config?.ShadowColor || '#FFFFFF')
</script>

<style scoped>
/* Main container styles */
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: none;
  border-radius: 10px;
  box-shadow: none;
  position: fixed;
  top: 1%;
  right: 0;
}

/* Card content (Tabs + Windows) */
.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: none;
  gap: 20px;
  border-radius: 10px;
  box-shadow: none;
}

/* Wrapper for centering the tabs header */
.tab-header-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: auto;
}

/* Tabs header styles */
.tab-header {
  width: fit-content;
  flex: 0 0 auto;
  background: var(--backgrounds);
  border-radius: 5px;
  z-index: 1;
}

/* Individual tab button styles */
.tab-button {
  color: v-bind(mainColor);
}

.tab-icon {
  color: #ffffff;
  font-size: 20px;
}

.tab-button:hover .tab-icon {
  text-shadow: 0px 0px 20px v-bind(shadowColor);
  scale: 1.1;
}

.tab-button:active .tab-icon {
  transform: scale(0.95);
}

/* Tabs window content */
.tab-content {
  flex: 1 1 auto;
  overflow-y: auto;
  position: relative;
}

.news-container,
.team-container {
  user-select: none;
}
</style>
