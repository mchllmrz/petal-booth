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

    activeTheme: 'holo',
    setActiveTheme: (t) => set({activeTheme: t}),

    activeFilter: 'none',
    setActiveFilter: (f) => set({activeFilter: f}),

    stickers: [],
    addSticker: (emoji) => set((state) =>{
        const isText = /[A-Za-z0-9<>]/.test(emoji)

        return{
            stickers: [...state.stickers, {
                id: crypto.randomUUID(),
                emoji,
                x: 60,
                y: 60,
                size: isText ? 24 : 40,
            }]
        }
    }),

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
        activeTheme: 'holo',
        activeFilter: 'none',
    }),

}))

export default usePhotoStore