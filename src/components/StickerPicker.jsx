import usePhotoStore from '../store/usePhotoStore'
import { STICKERS } from '../lib/stickers'

function StickerPicker() {
    const addSticker = usePhotoStore((s) => s.addSticker)

    return (
    <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto custom-scrollbar">
            {STICKERS.map((sticker, i) => (
                <button
                    key={i}
                    onClick={() => addSticker({ 
                        id: Date.now(), 
                        type: 'image', 
                        src: sticker.src, 
                        x: 50, 
                        y: 50, 
                        size: 50 
                    })}
                    className="hover:scale-125 transition-transform active:scale-95 flex items-center justify-center p-1"
                >
                    <img src={sticker.src} alt="sticker" className="w-8 h-8 object-contain drop-shadow-md" />
                </button>
            ))}
        </div>
    )
}

export default StickerPicker