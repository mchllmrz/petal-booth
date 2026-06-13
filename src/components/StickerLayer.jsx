import { useRef } from 'react' 
import Draggable from 'react-draggable'
import usePhotoStore from '../store/usePhotoStore'

function DraggableSticker({ sticker, updateSticker, setSelectedSticker, selectedStickerId }) {
    const nodeRef = useRef(null)
    const isSelected = selectedStickerId === sticker.id

    return (
        <Draggable
            nodeRef={nodeRef} 
            defaultPosition={{ x: sticker.x, y: sticker.y }}
            onStop={(e, data) => updateSticker(sticker.id, { x: data.x, y: data.y })}
            bounds="parent" 
        >

            <div
                ref={nodeRef} 
                className="absolute top-0 left-0 z-20"
                style={{
                    width: `${sticker.size}px`,
                    height: `${sticker.size}px`,
                    touchAction: 'none' 
                }}
            >

                <div 
                    onClick={(e) => {
                        e.stopPropagation()
                        setSelectedSticker(sticker.id)
                    }}
                    className={`w-full h-full cursor-grab active:cursor-grabbing hover:scale-110 transition-transform ${isSelected ? 'ring-2 ring-dashed ring-[#ff77a9] bg-white/10' : ''}`}
                >
                    <img 
                        src={sticker.src} 
                        alt="placed-sticker" 
                        className="w-full h-full object-contain pointer-events-none drop-shadow-lg"
                        draggable={false}
                    />
                </div>
            </div>
        </Draggable>
    )
}

function StickerLayer() {
    const { stickers, selectedStickerId, setSelectedSticker, updateSticker } = usePhotoStore()

    return (
        <>
            {stickers.map(sticker => (
                <DraggableSticker 
                    key={sticker.id}
                    sticker={sticker}
                    updateSticker={updateSticker}
                    setSelectedSticker={setSelectedSticker}
                    selectedStickerId={selectedStickerId}
                />
            ))}
        </>
    )
}

export default StickerLayer