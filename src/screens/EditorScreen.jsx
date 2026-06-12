import { useEffect, useState, useRef } from "react"
import usePhotoStore from "../store/usePhotoStore"
import PhotoStrip from "../components/PhotoStrip"
import ThemePicker from "../components/ThemePicker"
import StickerLayer from "../components/StickerLayer"
import {THEMES} from "../lib/themes";
import StickerPicker from "../components/StickerPicker"
import html2canvas from "html2canvas"

function EditorScreen(){
    const{
        photos, activeTheme, stickers,
        selectedStickerId, setSelectedSticker,
        updateSticker, removeSticker, resetSession,
        setScreen,
    } = usePhotoStore()

    const stripRef = useRef(null)

    const [visible, setVisible] = useState(false)
    const theme = THEMES[activeTheme] || THEMES.holo
    const [isDownloading, setisDownloading] = useState(false)
    const [downloadProgress, setDownloadProgress] = useState(0)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(t)
    }, [])

    const selectedSticker = stickers.find(s => s.id === selectedStickerId)

    async function handleDownload() {
        if (!stripRef.current || isDownloading) return

        setisDownloading(true)
        
        setSelectedSticker(null)
        
    setTimeout(async () => {
        try {
            const canvas = await html2canvas(stripRef.current, {
                useCORS: true,
                scale: 2, 
                backgroundColor: null, 
            })
            
            const link = document.createElement('a')
            link.download = `petal-booth-${Date.now()}.png`
            link.href = canvas.toDataURL('image/png')
            link.click()
            
        } catch (error) {
            console.error("Failed to save image:", error)
            alert("Oops! Something went wrong saving your strip.")
        } finally {
            setIsDownloading(false)
        }
    }, 150)
    }

    return(
        <>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-center justify-center p-4 md:p-6 w-full h-full overflow-y-auto overflow-x-hidden">
            <div className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div
                ref={stripRef}
                className="relative"
                onClick={() => setSelectedSticker(null)}
                >
                    <PhotoStrip photos={photos} theme={theme}></PhotoStrip>
                    <StickerLayer/>
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-[320px] md:min-w-[240px] ">
                <div className="border-2 border-[#4858a0] shadow-[4px_4px_0_#4858a0] bg-[#f0f0f8]">
                <div className="bg-[#6b7cc4] px-3 py-2 flex items-center justify-between">
                    <span className="font-pixel text-[7px] text-white">♥ EDITOR.EXE</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-[#50c878] border border-black/30"/>
                        <div className="w-3 h-3 bg-[#e0c040] border border-black/30"/>
                        <div className="w-3 h-3 bg-[#e05858] border border-black/30"/>
                    </div>
                </div>
                

                <div className="bg-[#f0f0f8] p-4 flex flex-col gap-4">
                    <ThemePicker/>
                    <StickerPicker/>

                    {selectedSticker && (
                        <div className="flex flex-col gap-2">
                            <p className="font-pixel text-[7px] text-[#4858a0] ">SIZE</p>
                            <input type="range"
                            min="10" max="100"
                            value={selectedSticker.size}
                            onChange={e =>updateSticker(
                                selectedStickerId,
                                {size: Number(e.target.value)}
                            )}
                            className="accent-[#7b6fd4]" />

                            <button
                            onClick={()=>{
                                removeSticker(selectedStickerId)
                                setSelectedSticker(null)
                            }}
                            className="font-pixel text-[7px] text-[#e05858] border border-[#e05858] px-2 py-1 hover:bg-[#e05858] hover:text-white"
                            > REMOVE</button>
                        </div>
                    )}

                    <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className={`font-pixel text-[8px] text-white border-2 border-[#4858a0] py-3 shadow-[3px_3px_0_#4858a0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full transition-all
        ${isDownloading ? 'bg-[#9b8ff4] cursor-not-allowed' : 'bg-[#7b6fd4] hover:bg-[#9b8ff4]'}`}> 
                    DOWNLOAD </button>

                    <button 
                   
                    onClick={() => {
                        resetSession()
                        setScreen('loading')
                    }}
                    className="bg-[#7b6fd4] hover:bg-[#9b8ff4] font-pixel text-[8px] text-white border-2  border-[#4858a0] py-3 shadow-[3px_3px_0_#4858a0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full transition-all"
                    > RESTART</button>
                </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default EditorScreen