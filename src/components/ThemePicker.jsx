import usePhotoStore from '../store/usePhotoStore'
import { THEMES } from '../lib/themes'

function ThemePicker() {
    const { activeTheme, setActiveTheme } = usePhotoStore()

    return (
        <div className="flex flex-col gap-2">
            <p className="font-pixel text-[7px] text-[#4858a0]">STRIP DESIGN</p>
            
            {/* Horizontal scroll container for the swatches */}
            <div className="flex gap-3 overflow-x-auto pb-3 pt-1 px-1 scrollbar-hide max-w-full">
                {Object.values(THEMES).map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => setActiveTheme(theme.id)}
                        title={theme.name}
                        className={`flex flex-col items-center flex-shrink-0 w-16 h-20 transition-all duration-200 cursor-pointer overflow-hidden relative group
                            ${activeTheme === theme.id
                                ? '-translate-y-1 shadow-[4px_4px_0_#4858a0] z-10 border-2 border-[#4858a0]'
                                : 'border-2 border-gray-300 shadow-[2px_2px_0_#b0b8d8] hover:-translate-y-1 hover:shadow-[4px_4px_0_#7b6fd4]'
                            }`}
                        style={{
                            // Directly points to your Canva PNGs
                            background: `url(${theme.bgImage}) center/cover no-repeat`
                        }}
                    >
                        {/* Static Mock Photo Box */}
                        <div className="w-10 h-8 mt-2 mb-auto bg-white/80 border border-[#111] opacity-80" />
                        
                        {/* Label Bar */}
                        <div className="w-full bg-black/70 mt-auto py-1 backdrop-blur-sm border-t border-white/20">
                            <span className="font-pixel text-[5px] tracking-wider block text-center text-white">
                                {theme.name}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ThemePicker