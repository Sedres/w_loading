<template>
  <v-card rounded theme="dark" class="pa-2 title-card">
    <v-card-title class="text-h4">{{ newsData.Title }}</v-card-title>
    <v-card-subtitle class="text-body-1 text-h6">
      {{ newsData.Subtitle }}
    </v-card-subtitle>
  </v-card>

  <v-fade-transition>
    <v-container class="news-container-wrapper">
      <v-card
        v-for="news in newsData.News"
        :key="news.title"
        theme="dark"
        class="news-card"
      >
        <v-card class="text-h5 pa-2 news-title">{{ news.title }}</v-card>

        <v-container class="news-container">
          <v-card-text class="text-body-1 mt-3">{{ news.text }}</v-card-text>
          <v-img
            v-if="news.img"
            :src="news.img"
            aspect-ratio="16/9"
            class="mt-1 news-img"
            cover
          ></v-img>
        </v-container>

        <v-card
          class="text-body-2 mt-4 pa-2 d-flex align-center justify-space-between news-author-info"
        >
          {{ news.date }} {{ news.time }}
          <v-card theme="dark" class="pa-2 news-author-name" rounded>
            @{{ news.author }}
          </v-card>
        </v-card>

        <v-divider class="mt-10 mb-2"></v-divider>
      </v-card>
    </v-container>
  </v-fade-transition>
</template>

<script setup>
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()

const newsData = globalStore.news
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
  background: v-bind('newsData.NewsAuthorColor');
  border-radius: 10px;
}

.news-title {
  position: relative;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  background: v-bind('newsData.NewsTitleColor');
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
