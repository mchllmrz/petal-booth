function PhotoStrip({ photos, theme }) {
    return (
        <div
        className="flex flex-col"
        style={{
            background:   theme.bg,
            backgroundSize: theme.bgSize || 'auto',
            border:       `${theme.borderWidth || '3px'} solid ${theme.border}`,
            boxShadow:    `4px 4px 0 ${theme.border}`,
            padding:      theme.padding  || '12px',
            gap:          theme.gap      || '8px',
            width:        '200px',
            borderRadius: theme.stripRadius || '0px',
        }}
        >
        {photos.map((src, i) => (
            <div
            key={i}
            style={{
                border:       `2px solid ${theme.border}`,
                background:   theme.stripBg,
                overflow:     'hidden',
                width:        '100%',
                aspectRatio:  '4 / 3',
                borderRadius: theme.photoRadius || '0px',
            }}
            >
            <img
                src={src}
                alt={`photo ${i + 1}`}
                style={{
                width:      '100%',
                height:     '100%',
                objectFit:  'cover',
                transform:  'scaleX(-1)',
                }}
            />
            </div>
        ))}

        <div
            style={{
            textAlign:     'center',
            marginTop:     '4px',
            fontFamily:    'monospace',
            fontSize:      '9px',
            fontWeight:    'bold',
            color:         theme.labelColor || theme.accent,
            letterSpacing: '2px',
            }}
        >
            ✦ petal.booth ✦
        </div>

        </div>
    )
}

export default PhotoStrip