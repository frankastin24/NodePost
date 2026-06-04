<template>
    <div class="top-bar" v-if="!store.hideMenus">
        
        <div class="left-section flex">
            <button :class="(store.leftMenu == 'elements' ? 'active' : '')" @click="store.leftMenu = 'elements'">Elements</button>
            <button :class="(store.leftMenu == 'properties' ? 'active' : '')" @click="store.leftMenu = 'properties'">Properties</button>
        </div>

        <div class="breakpoints flex">
            <button :class="['breakpoint',(store.currentBreakpoint == 'desktop' ? 'active':'')]" @click="store.currentBreakpoint = 'desktop'">D</button>
            <button :class="['breakpoint',(store.currentBreakpoint == 'laptop' ? 'active':'')]" @click="store.currentBreakpoint = 'laptop'">L</button>
            <button :class="['breakpoint',(store.currentBreakpoint == 'tablet' ? 'active':'')]" @click="store.currentBreakpoint = 'tablet'">T</button>
            <button :class="['breakpoint',(store.currentBreakpoint == 'mobile' ? 'active':'')]" @click="store.currentBreakpoint = 'mobile'">M</button>
        </div>

        <div class="design-modes flex">
            <button :class="['design-mode',(store.disignMode == 'design' ? 'active':'')]" @click="store.disignMode = 'design'">Design</button>
            <button :class="['design-mode',(store.disignMode == 'responsive' ? 'active':'')]" @click="store.disignMode = 'responsive'">Responsive</button>
            <button class="responsify">Responsify</button>
        </div>
        
        <div class="snap flex">

            <button :class="['snap-button', (store.snapToGrid ? 'active' : '')]" @click="store.snapToGrid = !store.snapToGrid">Snap</button>
            
            <div>
                
                <p>Snap Resolution</p>
            
                <select v-model="store.snapToResolution">
                    <option :value="resolution" v-for="resolution in store.snapToResolutions" :key="resolution">{{ resolution }}</option>
                </select>

            </div>
        </div>

        <div class="preview">
            <button>Preview</button>
        </div>

    </div>
</template>
<script setup>
import { useAppStore } from '../store/store';   
const store = useAppStore();
</script>