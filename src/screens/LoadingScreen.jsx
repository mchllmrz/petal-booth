import { useEffect, useState } from 'react'
import usePhotoStore from '../store/usePhotoStore'

export default function LoadingScreen() {
    const { setScreen, resetSession } = usePhotoStore()
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 15 
            })
        }, 150)

        const timer = setTimeout(() => {
            resetSession() 
            setScreen('landing') 
        }, 1500)

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        }
    }, [setScreen, resetSession])

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#0e0e1f] p-6 text-center">
            
            <h1 className="font-pixel text-xl md:text-3xl text-white mb-8 animate-pulse">
                REBOOTING SYSTEM...
            </h1>
            
            <div className="w-full max-w-[300px] border-4 border-white bg-black p-1 shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
                <div 
                    className="bg-white h-6 transition-all duration-150 ease-linear" 
                    style={{ width: `${progress}%` }}
                />
            </div>
            
            <p className="font-pixel text-[8px] text-white/70 mt-4">
                MEMORY CHECK: OK
            </p>
        </div>
    )
}