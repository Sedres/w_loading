<template>
   <!-- ✅ Renderizar componentes solo si todos los JSON están cargados -->
   <template v-if="configStore.allDataReady">
      <Background :config="configStore.config" />

      <InfoCard
         :news="configStore.news"
         :team="configStore.team"
         :updates="configStore.updates"
         :config="configStore.config"
      />

      <v-container class="bottom-container">
         <MusicPlayer :music="configStore.music" :config="configStore.config" />
         <Socials :socials="configStore.socials" :config="configStore.config" />
         <LoadingCard
            :config="configStore.config"
            :language="configStore.language"
         />
      </v-container>
   </template>
</template>
<script setup>
import { useConfigStore } from "@/stores/useConfigStore";

const configStore = useConfigStore();

onBeforeMount(() => {
   configStore.loadAllConfigs();
});
</script>
<style scoped>
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
   align-items: flex-start;
   justify-content: space-between;
}
</style>
