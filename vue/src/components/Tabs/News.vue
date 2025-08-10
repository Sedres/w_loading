<template>
   <v-card rounded theme="dark" class="pa-2 title-card">
      <v-card-title class="text-h4">{{ news?.Title }}</v-card-title>
      <v-card-subtitle class="text-body-1 text-h6">
         {{ news?.Subtitle }}
      </v-card-subtitle>
   </v-card>

   <v-fade-transition>
      <v-container class="news-container-wrapper">
         <v-card
            v-for="item in news?.News"
            :key="item.title"
            theme="dark"
            class="news-card"
         >
            <v-card class="text-h5 pa-2 news-title">{{ item.title }}</v-card>

            <v-container class="news-container">
               <v-card-text class="text-body-1 mt-3">{{
                  item.text
               }}</v-card-text>
               <v-img
                  v-if="item.img"
                  :src="item.img"
                  aspect-ratio="16/9"
                  class="mt-1 news-img"
                  cover
               ></v-img>
            </v-container>

            <v-card
               class="text-body-2 mt-4 pa-2 d-flex align-center justify-space-between news-author-info"
            >
               {{ item.date }} {{ item.time }}
               <v-card theme="dark" class="pa-2 news-author-name" rounded>
                  @{{ item.author }}
               </v-card>
            </v-card>

            <v-divider class="mt-10 mb-2"></v-divider>
         </v-card>
      </v-container>
   </v-fade-transition>
</template>

<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/stores/useConfigStore";

const store = useConfigStore();
const news = computed(() => store.news);

const titleColor = computed(() => news.value?.NewsTitleColor || "#FFFFFF");
const authorColor = computed(() => news.value?.NewsAuthorColor || "#FFFFFF");
</script>

<style scoped>
.title-card {
   position: sticky;
   top: 0;
   z-index: 1;
   background: var(--backgrounds);
   backdrop-filter: blur(10px);
   user-select: none;
}

.news-container-wrapper {
   margin: 0;
   padding: 10px 0 0;
}

.news-container {
   background: var(--backgrounds);
   border-radius: 10px;
}

.news-img {
   border-radius: 10px;
   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.603);
   width: 100%;
}

.news-author-info {
   background: var(--backgrounds);
   border-radius: 10px;
}

.news-author-name {
   background: v-bind(authorColor);
   border-radius: 10px;
}

.news-title {
   position: relative;
   top: 10px;
   left: 50%;
   transform: translateX(-50%);
   width: fit-content;
   background: v-bind(titleColor);
   border-radius: 10px;
   z-index: 1;
}

.news-card {
   background: none;
   box-shadow: none;
}

.expand-icon {
   position: absolute;
   right: 10px;
   top: 10px;
}
</style>
