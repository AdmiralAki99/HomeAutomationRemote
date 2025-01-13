import { createElectronRouter } from "electron-router-dom";

export const {Router,registerRoute} = createElectronRouter({
    types:{
        ids:['main']
    },
})