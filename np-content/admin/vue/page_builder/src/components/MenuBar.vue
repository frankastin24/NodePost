<template>
    <section id="menu" class="flex">
        
            <div class="indicator"><span v-if="store.unsavedChanges">*</span></div>
            <div class="menu-item">
                <p>File</p>
                <ul class="drop-down">
                    <li>Save CTR + s</li>
                    <li>Save As <span class="shortcut">CTR + Shift + s</span></li>
                    <li>Load Page/Post</li>
                    <li>Load Design File</li>
                </ul>
            </div>
            <div class="menu-item">
                <p>View</p>
                <ul class="drop-down">
                    <li @click="store.hideMenus = !store.hideMenus">Hide Menus <span class="shortcut">CTR + h</span></li>
                    <li @click="store.showGrid = !store.showGrid">View Grids <span class="shortcut">CTR + g</span></li>
                    <li @click="store.showGuides = !store.showGuides">View Guides</li>
                    <li>Grid Settings</li>
                    <li>Snap To Grid <span class="shortcut">CTR + Shift + g</span></li>
                </ul>
            </div>
            <div class="menu-item">
                <p>Help</p>
                <ul class="drop-down">
                    <li>Documentation</li>
                    <li>Support</li>
                    <li>About</li>
                </ul>
            </div>

    </section>

</template>

<script setup>
import { useAppStore } from '../store/store';   
const store = useAppStore();
</script>