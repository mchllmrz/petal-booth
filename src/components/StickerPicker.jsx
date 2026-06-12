import usePhotoStore from '../store/usePhotoStore'
import { STICKERS } from '../lib/stickers'

function StickerPicker() {
    const addSticker = usePhotoStore((s) => s.addSticker)

    return (
        <div className="flex flex-col gap-2">
            <p className="font-pixel text-[7px] text-[#4858a0]">STICKERS</p>
            <div className="grid grid-cols-5 gap-2 max-h-[120px] overflow-y-auto scrollbar-hide py-2">
                {STICKERS.map((emoji, i) => {
                    const isText = /[A-Za-z0-9<>]/.test(emoji)
                    
                    return (
                        <button
                            key={i}
                            onClick={() => addSticker(emoji)}
                            className="flex items-center justify-center hover:scale-125 transition-transform hover:bg-[#e8ecf8] rounded w-10 h-10"
                        >
                            <span className={isText ? 'text-sticker text-[3px]' : 'text-2xl'}>
                                {emoji}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default StickerPicker