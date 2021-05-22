<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Noticias</v-toolbar-title>
    </v-app-bar>

    <v-main>
        <v-container fluid>
          <MainContent :articles="articles"></MainContent>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MainContent from './components/MainContent';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    MainContent,
  },
  data: () => ({
    articles: []
  }),
  async created () {
    const response = await axios.get('news/treands');
    this.articles = response.data.articles;
  }
};
</script>
