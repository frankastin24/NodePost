import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
    state: () => ({ 
        step : 1,
        database : 'sqlite',
        lang: 'en',
        langObj : {},
    }),
  })