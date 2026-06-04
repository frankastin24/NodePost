import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
    state: () => ({ 
        rootElement : [],
        properties: [[],[],[],[]],
        unsavedChanges : false,
        currentElement : null,
        currentContainer:null,
        containers : [],
        leftMenu: 'elements',
        hideMenus: false,
        showGrid: false,
        gridSize: 10,
        
        showGuides: true,

        snapToGrid: true,
        snapToResolution: '10px',
        snapToResolutions : ['5px','10px','15px','20px','25px','30px','40px','50px'],
        
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
        disignMode : 'design',
        breakpoints : ['desktop','laptop','tablet','mobile'],
        currentBreakpoint : 'desktop',
        unsavedChanges : false,
        revisions: [],
        postType : '',
        postStatus: 'Draft',
        postID: null,
        postTitle: '',
        day: '01',
        month : '01',
        year : '2025',
        hour : '00',
        min : '00',
        postSlug : '',
        hasSlugChanged : false,
        customFields : []
       

    }),
  })