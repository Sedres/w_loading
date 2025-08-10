<template>
   <div v-if="config">
      <!-- Imagen de fondo -->
      <v-img
         v-if="isImage"
         :src="`nui://w_loading/${background.Path}`"
         aspect-ratio="16/9"
         cover
         class="background-image"
         @error="handleImageError"
      ></v-img>

      <!-- Video local de fondo -->
      <video
         v-if="isVideo"
         ref="videoElement"
         :src="videoSource"
         loop
         muted
         autoplay
         preload="auto"
         class="background-video"
         @error="handleVideoError"
         @loadeddata="onVideoLoaded"
         @canplay="onVideoCanPlay"
         @stalled="onVideoStalled"
      ></video>

      <!-- Video de YouTube de fondo -->
      <iframe
         v-else-if="isYouTube"
         :src="youtubeURL"
         class="background-youtube"
         frameborder="0"
         allow="autoplay; encrypted-media"
         allowfullscreen
      ></iframe>
   </div>
</template>

<script setup>
import { useConfigStore } from "@/stores/useConfigStore";

const videoElement = ref(null);
const configStore = useConfigStore();

// Acceder a config desde el store
const config = computed(() => configStore.config);
const background = computed(() => config.value?.Background || {});

// Computed properties
const isImage = computed(
   () => background.value.IsImage && background.value.Path
);
const isVideo = computed(
   () => background.value.IsVideo && background.value.Path
);
const isYouTube = computed(
   () => background.value.IsYouTube && background.value.VideoId
);

const videoSource = computed(() =>
   isVideo.value ? `nui://w_loading/${background.value.Path}` : ""
);
const youtubeURL = computed(() => {
   const id = background.value.VideoId;
   return isYouTube.value
      ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${id}`
      : "";
});

// Recargar video si hay error
const reloadVideo = () => {
   if (videoElement.value) {
      console.warn("Recargando el video...");
      videoElement.value.pause();
      videoElement.value.currentTime = 0;
      videoElement.value.load();
      videoElement.value.play().catch((err) => {
         console.error("Error al intentar reproducir el video:", err);
      });
   }
};

// Manejo de eventos del video
const handleVideoError = (event) => {
   console.error("Error al cargar el video:", JSON.stringify(event));
   reloadVideo();
};
const onVideoLoaded = () => console.log("Video cargado.");
const onVideoCanPlay = () => console.log("Video listo para reproducirse.");
const onVideoStalled = () => {
   console.warn("Carga del video detenida.");
   reloadVideo();
};

// Imagen rota
const handleImageError = (event) => {
   console.error("Error al cargar la imagen:", event);
};

// Detectar cambios en config
watch(config, (newConfig) => {
   console.log("Config actualizada:", newConfig);
});

onMounted(() => {
   console.log("Componente de fondo montado.");
});
</script>

<style scoped>
.background-image,
.background-video,
.background-youtube {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   object-fit: cover;
   z-index: -1;
   pointer-events: none;
   user-select: none;
}

.background-youtube {
   top: -19%;
   left: -19%;
   width: 150%;
   height: 150%;
}
</style>
