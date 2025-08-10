<template>
   <v-container class="music-player-container">
      <div class="music-avatar-container" @click="expand">
         <v-avatar
            v-if="currentSong"
            :image="currentSong.portrait"
            class="music-avatar"
            ripple="false"
            size="120"
            cover
            :class="{ expanded: expanded }"
         ></v-avatar>
         <div v-if="isPlaying" class="wave-container">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
         </div>
      </div>

      <v-expand-x-transition>
         <v-card
            theme="dark"
            class="music-player d-flex align-center"
            v-show="expanded"
         >
            <v-fade-transition>
               <v-container v-show="expanded" class="music-info">
                  <div class="info-and-controls">
                     <!-- Información de la canción -->
                     <div class="music-details">
                        <p class="song-title">
                           {{ currentSong?.title || "Song Title" }}
                        </p>
                        <p class="artist-name">
                           {{ currentSong?.artist || "Artist Name" }}
                        </p>
                     </div>

                     <!-- Controles -->
                     <div class="music-controls">
                        <v-btn
                           ripple="false"
                           variant="flat"
                           class="control-btn"
                           @click="previous"
                           icon="fa-solid fa-backward"
                        ></v-btn>
                        <v-btn
                           ripple="false"
                           variant="flat"
                           class="control-btn"
                           @click="togglePlay"
                           :icon="
                              isPlaying
                                 ? 'fa-solid fa-pause'
                                 : 'fa-solid fa-play'
                           "
                        ></v-btn>
                        <v-btn
                           ripple="false"
                           variant="flat"
                           class="control-btn"
                           @click="next"
                           icon="fa-solid fa-forward"
                        ></v-btn>
                     </div>
                  </div>

                  <!-- Barra de progreso -->
                  <v-progress-linear
                     class="progress-bar"
                     height="10"
                     :model-value="progress"
                     max="100"
                     clickable
                     @update:modelValue="handleProgressChange"
                  ></v-progress-linear>
               </v-container>
            </v-fade-transition>

            <!-- Control de volumen -->
            <v-fade-transition>
               <v-container class="slider" v-show="expanded">
                  <input
                     type="range"
                     class="level"
                     min="0"
                     max="100"
                     v-model="volume"
                     @input="updateVolume"
                     orient="vertical"
                  />
                  <v-icon class="volume">fa-solid fa-volume-high</v-icon>
               </v-container>
            </v-fade-transition>
         </v-card>
      </v-expand-x-transition>

      <audio autoplay id="player" ref="audioPlayer">
         <source
            v-if="currentSong"
            :src="currentSong.url ? 'nui://w_loading/' + currentSong.url : ''"
            type="audio/mp3"
         />
      </audio>
   </v-container>
</template>

<script setup>
import { useConfigStore } from "@/stores/useConfigStore";

const store = useConfigStore();
const music = computed(() => store.music);
const config = computed(() => store.config);

const playList = computed(() => music.value?.PlayList || []);
const currentSongIndex = ref(0);
const currentSong = computed(
   () => playList.value[currentSongIndex.value] || null
);

const isPlaying = ref(true);
const progress = ref(0);
const expanded = ref(false);
const volume = ref(music.value?.BaseVolume ?? 50);
const audioPlayer = ref(null);

const musicWaveColor = computed(
   () => music.value?.MusicWaveColor || "rgba(255, 255, 255, 0.664)"
);
const mainColor = computed(() => config.value?.MainColor || "#FFFFFF");

// Cambio de canción
watch(currentSong, (newSong) => {
   if (audioPlayer.value && newSong) {
      audioPlayer.value.src = "nui://w_loading/" + newSong.url;
      audioPlayer.value.load();
      progress.value = 0;
      isPlaying.value = true;
   }
});

// Funciones
const playSong = () => {
   if (audioPlayer.value) {
      audioPlayer.value.play().then(() => {
         isPlaying.value = true;
         updateProgress();
      });
   }
};

const pauseSong = () => {
   if (audioPlayer.value) {
      audioPlayer.value.pause();
      isPlaying.value = false;
   }
};

const togglePlay = () => {
   isPlaying.value ? pauseSong() : playSong();
};

const next = () => {
   if (playList.value.length > 0) {
      currentSongIndex.value =
         (currentSongIndex.value + 1) % playList.value.length;
   }
};

const previous = () => {
   if (playList.value.length > 0) {
      currentSongIndex.value =
         (currentSongIndex.value - 1 + playList.value.length) %
         playList.value.length;
   }
};

const handleProgressChange = (newValue) => {
   if (audioPlayer.value && audioPlayer.value.duration) {
      const seekTime = (newValue / 100) * audioPlayer.value.duration;
      audioPlayer.value.currentTime = seekTime;
   }
};

const updateProgress = () => {
   if (audioPlayer.value && audioPlayer.value.duration) {
      progress.value =
         (audioPlayer.value.currentTime / audioPlayer.value.duration) * 100;
      requestAnimationFrame(updateProgress);
   }
};

const updateVolume = () => {
   if (audioPlayer.value) {
      audioPlayer.value.volume = volume.value / 100;
   }
};

const expand = () => {
   expanded.value = !expanded.value;
};

// Inicialización
onMounted(() => {
   volume.value = music.value?.BaseVolume ?? 50;

   currentSongIndex.value = music.value
      ? Math.floor(Math.random() * playList.value.length)
      : 0;

   if (audioPlayer.value) {
      audioPlayer.value.addEventListener("timeupdate", updateProgress);
      audioPlayer.value.addEventListener("ended", next);
      updateVolume();
   }
});

onUnmounted(() => {
   if (audioPlayer.value) {
      audioPlayer.value.removeEventListener("timeupdate", updateProgress);
      audioPlayer.value.removeEventListener("ended", next);
   }

   currentSongIndex.value = music.value
      ? Math.floor(Math.random() * playList.value.length)
      : 0;
});
</script>

<style scoped>
/* Contenedor principal */
.music-player-container {
   width: fit-content;
   height: fit-content;
   margin: 0;
   padding: 0;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;

   background: var(--backgrounds);
   border-radius: 10px;
   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.603);
}

/* Reproductor */
.music-player {
   width: fit-content;
   height: fit-content;
   display: flex;
   align-items: center;

   background: none;
   box-shadow: none;
   transition: all 0.5s ease-in-out;
   transition-delay: 0.1s;
}

/* Contenedor del avatar */
.music-avatar-container {
   height: 100%;
   position: relative;
   user-select: none;
   cursor: pointer;
}
.music-avatar {
   border-radius: 10px;
   transition: all 0.5s ease-in-out;
}
.music-avatar.expanded {
   width: 100%;
   height: 100%;
   border-radius: 10px 0 0 10px;
}
.music-avatar-container:hover .music-avatar {
   box-shadow: 0px 0px 20px v-bind(ShadowColor);
}

/* Ondas de reproducción */
.wave-container {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   display: flex;
   gap: 4px;
}
.wave {
   width: 5px;
   height: 20px;
   background: v-bind(musicWaveColor);
   border-radius: 16px;
   animation: wave 1s infinite ease-in-out;
}

/* Información y controles */
.info-and-controls {
   display: flex;
   align-items: center;
   justify-content: space-between;

   width: 100%;
}

/* Detalles de la canción */
.music-details {
   display: flex;
   flex-direction: column;
   justify-content: center;
}
.song-title {
   min-width: 200px;
   width: 30%;
   margin: 0;
   font-size: 16px;
   font-weight: bold;
   color: #fff;
   text-wrap: nowrap;
}
.artist-name {
   margin: 0;
   font-size: 14px;
   color: rgba(255, 255, 255, 0.7);
}

/* Controles principales */
.music-controls {
   display: flex;
   align-items: center;
   justify-content: center;
}
.control-btn {
   border-radius: 10px;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 40px;
   height: 40px;
   color: #fff;
   font-size: 15px;
   background: none;
   border: none;
   cursor: pointer;
   transition: all 0.3s ease-in-out;
}
.control-btn:hover {
   transform: scale(1.1);
   box-shadow: inset 0px 0px 20px white;
}

/* Barra de progreso */
.progress-slider {
   margin-top: 10px;
   width: 100%;
   height: fit-content;
   --v-slider-track-color: rgba(255, 255, 255, 0.3);
   --v-slider-thumb-color: #fff;
   --v-slider-active-color: var(--MainColor);
}

.slider {
   --slider-width: 100%;
   --slider-height: 20px;
   --slider-bg: rgba(82, 82, 82, 0.3);
   --slider-border-radius: 10px;
   --level-color: v-bind(mainColor);
   --level-transition-duration: 0.1s;
}

.slider {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   gap: 10px;
   width: 120px;
   height: fit-content;
   rotate: -90deg;
   margin-left: -20px;
}

.slider .volume {
   font-size: 13px;
   color: #fff;
   user-select: none;
   rotate: 90deg;
}

.slider .level {
   -webkit-appearance: none;
   -moz-appearance: none;
   appearance: none;
   width: var(--slider-width);
   height: var(--slider-height);
   background: var(--slider-bg);
   overflow: hidden;
   border-radius: var(--slider-border-radius);
   -webkit-transition: height var(--level-transition-duration);
   -o-transition: height var(--level-transition-duration);
   transition: height var(--level-transition-duration);
   cursor: grab;
}

.slider .level::-webkit-slider-thumb {
   -webkit-appearance: none;
   width: 0;
   height: 0;
   -webkit-box-shadow: -200px 0 0 200px var(--level-color);
   box-shadow: -200px 0 0 200px var(--level-color);
}

.slider:hover .level {
   height: calc(var(--slider-height) * 2);
}
.slider:active .level {
   cursor: grabbing;
}
.wave:nth-child(1) {
   animation-delay: 0s;
}
.wave:nth-child(2) {
   animation-delay: 0.2s;
}
.wave:nth-child(3) {
   animation-delay: 0.4s;
}
@keyframes wave {
   0%,
   100% {
      transform: scaleY(1);
   }
   50% {
      transform: scaleY(1.5);
   }
}

.progress-bar {
   transition: transform 0.2s ease;
   margin-top: 15px;
   cursor: pointer;
   border-radius: 10px;
}

.progress-bar:hover {
   /* height: 30px !important; */
   transform: scale(1, 4);
}

.v-progress-linear.progress-bar {
   transition: transform 0.2s ease;
}
.v-progress-linear.progress-bar:hover {
   /* height: 30px !important; */
   transform: scale(1, 4);
}
</style>
