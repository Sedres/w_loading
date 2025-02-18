<script setup>
import { useJsonLoader } from '@/utils/useJsonLoader'

// Cargar JSONs desde la carpeta `/config/`
const { data: news } = useJsonLoader('News.json')
const { data: socials } = useJsonLoader('Socials.json')
const { data: team } = useJsonLoader('Team.json')
const { data: updates } = useJsonLoader('Updates.json')
const { data: config } = useJsonLoader('Config.json')
const { data: language } = useJsonLoader('Language.json')
const { data: music } = useJsonLoader('Music.json')
</script>

<template>
  <Background :config="config" />
  <InfoCard :news="news" :team="team" :updates="updates" :config="config" />
  <v-container class="bottom-container">
    <MusicPlayer :music="music" :config="config" />
    <Socials :socials="socials" :config="config" />
    <LoadingCard :config="config" :language="language" />
  </v-container>
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
