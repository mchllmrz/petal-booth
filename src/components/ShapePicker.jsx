import usePhotoStore from '../store/usePhotoStore'

export const FRAME_SHAPES = {
    rectangle: { id: 'rectangle', name: 'SQUARE', borderRadius: '0px' },
    rounded: { id: 'rounded', name: 'ROUND', borderRadius: '16px' },
    circle: { id: 'circle', name: 'CIRCLE', borderRadius: '50%' },
    arch: { id: 'arch', name: 'ARCH', borderRadius: '100px 100px 8px 8px' },
};

export default function ShapePicker() {
    const { frameShape, setFrameShape } = usePhotoStore()

    return (
        <div className="flex flex-col gap-2">
            <p className="font-pixel text-[7px] text-[#4858a0]">FRAME SHAPE</p>
            
            <div className="flex gap-2">
                {Object.values(FRAME_SHAPES).map((shape) => (
                    <button
                        key={shape.id}
                        onClick={() => setFrameShape(shape.id)}
                        title={shape.name}
                        className={`flex-1 h-10 border-2 transition-all duration-200 flex items-center justify-center group
                            ${frameShape === shape.id
                                ? 'border-[#f8f9ff] bg-[#0c36ef] shadow-[2px_2px_0_#b0b8d8] translate-y-[1px]'
                                : 'border-gray-300 bg-white shadow-[2px_2px_0_#b0b8d8] hover:border-[#0c36ef] hover:-translate-y-[1px]'
                            }`}
                    >
                        <div 
                            className={`w-4 h-4 border-2 ${frameShape === shape.id ? 'border-white bg-white/20' : 'border-gray-400'}`}
                            style={{ borderRadius: shape.borderRadius }}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}