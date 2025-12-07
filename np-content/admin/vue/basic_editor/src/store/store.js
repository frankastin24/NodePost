import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
    state: () => ({ 
        rootElement : [],
        currentElement : null,
        currentContainer:null,
        containers : [],

        displayFileBrowser : false,
        fileBrowserMode : 'images',
        currentFolder : '/',
        
        /* image, document, video */

        imageType: 'image',
        currentGallery: null,
        featuredImage: false,
        imageMode: 'container',
        
        /*  featured , container , gallery*/

        displayElements:true,
        activeTab:1,
        revisions: [],
        postStatus: 'Draft',
        postID: null,
        postTitle: '',
        day: '01',
        month : '01',
        year : '2025',
        hour : '00',
        min : '00',
        postSlug : '',
       

    }),
  })