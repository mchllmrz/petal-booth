import { create } from "zustand"

const usePhotoStore = create((set, get) =>({
    screen: 'landing',
    setScreen: (s) => set({screen: s}),

    photoCount: 3,
    setPhotoCount: (count) =>set({photoCount: count}),

    photos: [],
    addPhoto: (dataUrl) => set((state) => ({
        photos: [...state.photos, dataUrl]
    })),
    clearPhotos: () => set({photos: []}),

    activeTheme: 'pink',
    setActiveTheme: (t) => set({activeTheme: t}),

    frameShape: 'rectangle',
    setFrameShape: (shape) => set({frameShape: shape}),

    activeFilter: 'none',
    setActiveFilter: (f) => set({activeFilter: f}),

    stickers: [],
    addSticker: (newSticker) => set((state) => ({
        stickers: [...state.stickers, {
            id: newSticker.id || crypto.randomUUID(), 
            ...newSticker 
        }]
    })),

    updateSticker: (id, changes) => set((state) =>({
        stickers: state.stickers.map(s =>
            s.id===id ? {...s, ...changes} : s
        )
    })),

    removeSticker: (id) => set((state) => ({
        stickers: state.stickers.filter(s=> s.id !== id)
    })),

    clearStickers: () => set({stickers: []}),

    selectedStickerId: null,
    setSelectedSticker: (id) => set({ selectedStickerId: id }),
   
    resetSession: () => set({
        screen: 'landing',
        photos: [],
        stickers: [],
        selectedStickerId: null,
        activeTheme: 'pink',
        activeFilter: 'none',
    }),

}))

export default usePhotoStore