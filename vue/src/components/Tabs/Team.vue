<template>
  <v-card rounded theme="dark" class="pa-2 title-card">
    <v-card-title class="text-h4">{{ teamData.Title }}</v-card-title>
    <v-card-subtitle class="text-body-1 text-h6">{{
      teamData.Subtitle
    }}</v-card-subtitle>
  </v-card>

  <v-container class="team-container">
    <v-card
      v-for="member in teamData.Members"
      theme="dark"
      class="team-card"
      rounded
    >
      <v-container class="team-avatar-container">
        <v-avatar
          :image="member.img"
          class="team-avatar"
          :key="member.name"
        ></v-avatar>
        <v-container class="team-avatar-background">
          <v-card-title class="text-h5 pa-2">{{ member.name }}</v-card-title>
          <v-card-subtitle class="text-body-2 pa-2">{{
            member.role
          }}</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text class="text-body-1 pa-2 text-justify"
            >{{ member.description }}
          </v-card-text>
        </v-container>
      </v-container>

      <!-- Redes sociales -->

      <v-divider
        v-if="member.socials"
        theme="dark"
        class="pa-2"
        width="100%"
      ></v-divider>
      <v-container v-if="member.socials" class="team-socials-container">
        <v-btn
          v-for="social in member.socials"
          :key="social.name"
          :prepend-icon="social.icon"
          :ripple="false"
          variant="text"
          class="team-socials-btn text-body-1"
        >
          {{ social.link }}
        </v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
import { MainColor, ShadowColor } from '../../../../config/Config.json'
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()

const teamData = globalStore.team
</script>

<style scoped>
.title-card {
  position: sticky;
  top: 0;
  z-index: 1;

  background: var(--backgrounds);
  backdrop-filter: blur(10px);
}
.team-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 10px 0 0 0;
}
.team-avatar-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.team-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: fit-content;
  background: var(--backgrounds);
  border-radius: 16px;
}

.team-card:hover {
  box-shadow: inset 0px 0px 10px v-bind(MainColor);
}
.team-avatar {
  user-select: none;
  border-radius: 16px;
  height: 100%;
  width: 25%;
}

.team-socials-container {
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.team-socials-btn {
  width: 100%; /* Asegura que ocupen todo el ancho de la celda */
  max-width: 200px; /* Evita botones demasiado grandes */
  height: 50px;
  color: #fff;
  border-radius: 10px;
  background: var(--backgrounds);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: auto;
}

.team-socials-btn:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 10px v-bind(ShadowColor);
}
</style>
