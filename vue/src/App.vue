<script setup>
// 🔹 Definir variables reactivas para los JSONs
const config = shallowRef(null)
const language = shallowRef(null)
const music = shallowRef(null)
const news = shallowRef(null)
const socials = shallowRef(null)
const team = shallowRef(null)
const updates = shallowRef(null)

// 🔹 Función para cargar un JSON
const loadJson = async (filename, refVar) => {
  try {
    const response = await fetch(`/config/${filename}`)
    if (!response.ok) throw new Error(`Failed to load ${filename}`)
    refVar.value = await response.json()
  } catch (error) {
    console.error(`Error loading ${filename}:`, error)
    refVar.value = null
  }
}

// 🔹 Cargar todos los JSONs en el montaje de la app
onBeforeMount(() => {
  Promise.all([
    loadJson('Config.json', config),
    loadJson('Language.json', language),
    loadJson('Music.json', music),
    loadJson('News.json', news),
    loadJson('Socials.json', socials),
    loadJson('Team.json', team),
    loadJson('Updates.json', updates)
  ])
})
</script>

<template>
  <!-- 🔹 Renderizar los componentes solo cuando los JSONs estén listos -->
  <template
    v-if="config && language && music && news && socials && team && updates"
  >
    <Background :config="config" />
    <InfoCard :news="news" :team="team" :updates="updates" :config="config" />
    <v-container class="bottom-container">
      <MusicPlayer :music="music" :config="config" />
      <Socials :socials="socials" :config="config" />
      <LoadingCard :config="config" :language="language" />
    </v-container>
  </template>
</template>

<style>
:root {
  --backgrounds: linear-gradient(
    -135deg,
    #00000091 0%,
    #1a1a1aab 50%,
    #333333 100%
  );
}
html {
  scrollbar-width: none;
  user-select: none;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.bottom-container {
  position: absolute;
  bottom: 0;
  left: 0;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: start;
  justify-content: space-between;
}
</style>
