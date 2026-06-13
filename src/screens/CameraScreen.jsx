import { useRef, useState, useEffect } from "react"
import Webcam from "react-webcam"
import usePhotoStore from "../store/usePhotoStore"
import CountdownTimer from "../components/CountdownTimer" 

function CameraScreen(){
    const webcamRef = useRef(null)
    const isProcessingRef = useRef(false)
    const {photoCount, addPhoto, photos, setScreen, clearPhotos, activeFilter, setActiveFilter} = usePhotoStore()
    const [countdown, setCountdown] = useState(null)
    //const [isCapturing, setIsCapturing] = useState(false)
    const [flashOn, setFlashOn] = useState(false)
    const [shotsTaken, setShotsTaken] = useState(0)
    const [isReady, setIsReady] = useState(false)

    const FILTERS = [
        { id: 'none',       label: 'NORMAL',   css: 'none' },
        { id: 'grayscale',  label: 'B&W',      css: 'grayscale(100%)' },
        { id: 'sepia',      label: 'SEPIA',    css: 'sepia(80%)' },
        { id: 'vivid',      label: 'VIVID',    css: 'saturate(200%) contrast(110%)' },
        { id: 'cool',       label: 'COOL',     css: 'hue-rotate(30deg) saturate(120%)' },
        { id: 'warm',       label: 'WARM',     css: 'sepia(40%) saturate(150%)' },
        { id: 'fade',       label: 'FADE',     css: 'opacity(80%) saturate(60%) brightness(110%)' },
        { id: 'dramatic',   label: 'DRAMA',    css: 'contrast(140%) brightness(90%)' },
    ]

    useEffect(() => {
        clearPhotos()
        
        async function runIntroTimer() {
            for (let i = 3; i >= 1; i--) {
                setCountdown(i)
                await delay(1000)
            }
            setCountdown(null)
            setIsReady(true) 
        }
        
        runIntroTimer()
    }, [])

    useEffect(() => {
        if (shotsTaken === photoCount && shotsTaken > 0) {
            setTimeout(() => setScreen('editor'), 1200)
        }
    }, [shotsTaken, photoCount, setScreen])

    async function takePhoto() {
        if (!isReady || shotsTaken >= photoCount) return

        setFlashOn(true)
        if (webcamRef.current) {
            const imageSrc = await captureWithFilter()
            if (imageSrc) addPhoto(imageSrc)
        }
        
        setTimeout(() => setFlashOn(false), 300)
        setShotsTaken(prev => prev + 1)
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function captureWithFilter() {
        const video    = webcamRef.current.video
        const canvas   = document.createElement('canvas')
        canvas.width   = video.videoWidth
        canvas.height  = video.videoHeight
        const ctx      = canvas.getContext('2d')
        const filter   = FILTERS.find(f => f.id === activeFilter)?.css || 'none'
        ctx.filter     = filter
        ctx.scale(-1, 1)                          
        ctx.drawImage(video, -canvas.width, 0)
        return canvas.toDataURL('image/jpeg')
    }

    return(
        <>
            <div className="flex flex-col items-center justify-center gap-4 p-4 relative w-full h-full">
                
                {/* Progress Indicator */}
                <div className="flex gap-2 mb-2">
                    {Array.from({length: photoCount}).map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 border-2 border-[#4858a0] ${i < shotsTaken ? 'bg-[#7b6fd4]' : 'bg-[#1a1c2e]'} `}
                        />
                    ))}
                </div>

                {/* Vintage Camera Shape */}
                <div className="relative">
                    <div className="relative bg-[#b3d5f0ad] border-4 border-[#4858a0] shadow-[6px_6px_0_#4858a0] rounded-lg px-6 pt-4 pb-6">
                        
                        {/* Top Bar */}
                        <div className="flex items-center justify-between mb-3 px-1 ">
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#e05858] border border-[#a03030] "/>
                                <div className="w-2 h-2 rounded-full bg-[#e0c040] border border-[#a08020]" />
                            </div>
                            <span className="font-pixel text-[9px] text-[#ffffff] ">CAM.EXE</span>
                            <div className="w-4 h-2 bg-[#777b94] border border-[#5060b0] rounded-sm" />
                        </div>

                        {/* Lens & Webcam */}
                        <div className="relative">
                            <div className="w-[460px] h-[360px] rounded-full border-4 border-[#3848a0] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden relative bg-black">
                                <div className="absolute inset-2 rounded-full border-4 border-[#bdc7f5] overflow-hidden">
                                    <Webcam
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        className="w-full h-full object-cover scale-x-[-1] "
                                        mirrored={true}
                                        style={{ filter: FILTERS.find(f => f.id === activeFilter)?.css || 'none' }}
                                    />
                                </div>
                                {flashOn && (
                                    <div className="absolute inset-0 bg-white animate-shutter rounded-full z-10"></div>
                                )}
                                
                                {countdown && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full z-20">
                                        <CountdownTimer count={countdown} /> 
                                    </div>
                                )}
                            </div>

                            <div className="absolute top-3 left-6 w-8 h-4 bg-white/10 rounded-full rotate-[-30deg] pointer-events-none"></div>
                        </div>

                        {/* Bottom Camera Details */}
                        <div className="flex items-center justify-between mt-4 px-2">
                            <div className="w-3 h-3 rounded-full bg-[#e0c040] border-2 border-[#a08020]" />
                            <p className="font-pixel text-[7px] text-[#f1f4ff] ">{shotsTaken}/{photoCount}</p>
                            <div className="w-5 h-3 bg-[#e0e8ff]/20 border border-[#5060a0] rounded-sm" />
                        </div>

                    </div>
                </div>

                {/* Filter Picker */}
                <div className="flex gap-2 overflow-x-auto max-w-[360px] py-1 scrollbar-hide">
                {FILTERS.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`flex-shrink-0 font-pixel text-[8px] px-2 py-1
                                    border transition-all
                                    ${activeFilter === f.id
                                        ? 'bg-[#0c36ef] text-white border-[#9b8ff4]'
                                        : 'bg-[#f6f6f8] text-[#5060a0] border-[#2e3260] hover:border-[#7b6fd4]'
                                    }`}
                    >
                    {f.label}
                    </button>
                ))}
                </div>

                <button
                    onClick={takePhoto}
                    disabled={!isReady || shotsTaken >= photoCount}
                    className={`font-pixel text-[10px] border-2 border-[#4858a0] px-8 py-3 mt-2 shadow-[3px_3px_0_#4858a0] transition-all
                        ${isReady && shotsTaken < photoCount 
                            ? 'bg-[#d8513f] text-white hover:bg-[#f71919] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none' 
                            : 'bg-[#2a2e5a] text-[#5060a0] border-[#2e3260] cursor-not-allowed shadow-none'}`}
                >
                    {shotsTaken >= photoCount ? 'DEVELOPING...' : '📸 SNAP'}
                </button>
                
                {/* Decorative Camera Strap Loops */}
                <div className="absolute -top-2 left-4 w-3 h-3 border-2 border-[#4858a0] bg-[#1a1c2e] rounded-sm" />
                <div className="absolute -top-2 right-4 w-3 h-3 border-2 border-[#4858a0] bg-[#1a1c2e] rounded-sm" />
            
            
                {/* Back / Cancel Button */}
                <button
                    onClick={() => setScreen('landing')}
                    className="font-pixel text-[8px] text-[#ffffff] border border-[#2e3260] px-3 py-1 mt-2 hover:text-[#000000] hover:border-[#9098c8]"
                >
                    ← CANCEL
                </button>
            </div>
        </>
    )
}

export default CameraScreen