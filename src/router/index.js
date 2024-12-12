// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomeView.vue';
import DictionaryPage from '../views/DictionaryView.vue';
import AboutView from '@/views/AboutView.vue';
import ContactUsView from '@/views/ContactUsView.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/dictionary',
    name: 'DictionaryPage',
    component: DictionaryPage,
  },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView,
  },
  {
    path: '/contact-us',
    name: 'ContactUsView',
    component: ContactUsView,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
