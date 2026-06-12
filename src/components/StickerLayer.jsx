import { useRef } from 'react' 
import Draggable from 'react-draggable'
import usePhotoStore from '../store/usePhotoStore'

function DraggableSticker({ sticker, updateSticker, setSelectedSticker, selectedStickerId }) {
    const nodeRef = useRef(null)
    const isText = /[A-Za-z0-9<>]/.test(sticker.emoji)

    return (
        <Draggable
            nodeRef={nodeRef} 
            defaultPosition={{ x: sticker.x, y: sticker.y }}
            onStop={(e, data) => updateSticker(sticker.id, { x: data.x, y: data.y })}
        >
            <div
                ref={nodeRef} 
                onClick={(e) => {
                    e.stopPropagation()
                    setSelectedSticker(sticker.id)
                }}
                className={isText ? 'text-sticker' : ''}
                style={{
                    position: 'absolute',
                    fontSize: sticker.size, 
                    lineHeight: 1,
                    cursor: 'grab',
                    userSelect: 'none',
                    pointerEvents: 'all',
                    outline: selectedStickerId === sticker.id ? '2px dashed #9b8ff4' : 'none',
                    touchAction: 'none'
                }}
            >
                {sticker.emoji}
            </div>
        </Draggable>
    )
}

function StickerLayer({ readonly = false }) {
    const { stickers, selectedStickerId, setSelectedSticker, updateSticker } = usePhotoStore()

    return (
        <div className="absolute inset-0 pointer-events-none z-50">
            {stickers.map(sticker => (
                readonly ? (
                    <div
                        key={sticker.id}
                        style={{
                            position: 'absolute',
                            left: sticker.x,
                            top: sticker.y,
                            fontSize: sticker.size,
                            lineHeight: 1,
                        }}
                    >
                        {sticker.emoji}
                    </div>
                ) : (
                    <DraggableSticker
                        key={sticker.id}
                        sticker={sticker}
                        updateSticker={updateSticker}
                        setSelectedSticker={setSelectedSticker}
                        selectedStickerId={selectedStickerId}
                    />
                )
            ))}
        </div>
    )
}

export default StickerLayer