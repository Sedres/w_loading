<template>
  <v-card rounded theme="dark" class="pa-2 title-card">
    <v-card-title class="text-h4">Updates</v-card-title>
    <v-card-subtitle class="text-body-1 text-h6">
      Here you can find the latest updates about the city
    </v-card-subtitle>
  </v-card>

  <v-timeline>
    <v-timeline-item
      v-for="update in updates?.Updates"
      :key="update.title"
      :icon="update.icon"
      :dot-color="update.color"
      class="pa-2"
      align="center"
      fill-dot
    >
      <template #opposite>
        <v-card theme="dark" class="pa-2 updates-author-info" rounded>
          {{ update.date }}
        </v-card>
      </template>

      <v-card theme="dark" class="pa-2 updates-card" rounded>
        <v-card-title>{{ update.title }}</v-card-title>
        <!-- Use v-html to render the text with newlines -->
        <v-card-text v-html="update.text.replace(/\n/g, '<br>')"></v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup>
// Recibir `updates` como prop desde el componente padre
defineProps({
  updates: Object
})
</script>

<style scoped>
.title-card {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--backgrounds);
  backdrop-filter: blur(10px);
  user-select: none;
}

.updates-author-info {
  width: fit-content;
  background: var(--backgrounds);
  border-radius: 10px;
}

.updates-card {
  background: var(--backgrounds);
}
</style>
