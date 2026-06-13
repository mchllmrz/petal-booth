import usePhotoStore from '../store/usePhotoStore'
import { FRAME_SHAPES } from './ShapePicker' 

function PhotoStrip({ photos, theme }) {
    const photoCount = usePhotoStore(s => s.photoCount);
    const displayPhotos = photos?.length > 0 ? photos : Array(photoCount || 4).fill('');
    const isGrid = displayPhotos.length === 6;
    const frameShapeId = usePhotoStore(s => s.frameShape);
    const activeShape = FRAME_SHAPES[frameShapeId] || FRAME_SHAPES.rectangle;

    return (
        <div
            className="flex flex-col shadow-[6px_6px_0px_#4858a0] transition-all duration-300"
            style={{
                background: theme?.bgImage ? `url(${theme.bgImage}) center/cover no-repeat` : '#f0f0f8',
                border: '4px groove white',
                padding: '12% 8%', 
                width: '100%',
                maxWidth: isGrid ? '350px' : '220px',      
                height: 'fit-content'   
            }}
        >
  
            <div
                style={{
                    display: isGrid ? 'grid' : 'flex',
                    gridTemplateColumns: isGrid ? 'repeat(2, 1fr)' : 'none',
                    flexDirection: isGrid ? 'row' : 'column',
                    gap: '12px',
                    width: '100%',
                    marginBottom: '16px' 
                }}
            >
                {displayPhotos.map((src, i) => (
                    <div
                        key={i}
                        style={{
                            border: '3px solid #111',
                            background: 'rgba(255, 255, 255, 0.4)',
                            overflow: 'hidden',
                            width: '100%',
                            aspectRatio: '4 / 3',
                            boxShadow: '3px 3px 0 rgba(17,17,17,0.8)',
                            borderRadius: activeShape.borderRadius,
                            transition: 'border-radius 0.3s ease-in-out'
                        }}
                    >
                        {src ? (
                            <img
                                src={src}
                                alt={`photo ${i + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: 'scaleX(-1)', 
                                }}
                            />
                        ) : null}
                    </div>
                ))}
            </div>

            <div
                style={{
                    textAlign: 'center',
                    marginTop: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: theme?.textColor || '#ffffff',
                    letterSpacing: '2px',
                    textShadow: '1px 1px 0px rgba(0,0,0,0.3)' 
                }}
            >
                ✦ petal.booth ✦
            </div>
        </div>
    )
}

export default PhotoStrip