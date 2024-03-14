<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-title>Konomic</v-app-bar-title>
      <template v-slot:append>
        <v-btn to="/settings">Настройки</v-btn>
        <v-btn to="/">Order Book</v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>
