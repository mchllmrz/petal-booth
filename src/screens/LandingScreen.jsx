
import usePhotoStore from "../store/usePhotoStore";

function LandingScreen(){
    const COUNT_OPTIONS = [3,4,6]
    const {photoCount, setPhotoCount, setScreen} = usePhotoStore();


    return(
        <>
        <div className="flex flex-col items-center justify-center gap-8 p-6">
            <div className="text-center">
                <h1 className="font-pixel text-2xl text-[#e4eaff] mb-3">
                    <span className="text-4xl">🌸</span>Petal.booth
                </h1>
                <p className="font-pixel text-[10px] text-[#f4f6ff] tracking-widest">✦ capture memories ✦</p>
            </div>

            <div className="border-2 border-[#4858a0] shadow-[4px_4px_0_#4858a0] ">
                <div className="bg-[#0c36ef] px-3 py-2 flex items-center justify-between">
                    <span className="font-pixel text-[8px] text-white ">
                        ♥ NEW_SESSION.EXE
                    </span>
                    <div className="flex gap-1">
                         <div className="w-3 h-3 bg-[#50c878] border border-black/30" />
                        <div className="w-3 h-3 bg-[#e0c040] border border-black/30" />
                        <div className="w-3 h-3 bg-[#e05858] border border-black/30" />
                    </div>
                </div>

                <div className="bg-[#f0f0f8] p-8 flex flex-col items-center gap-6">
                    <p className="font-pixel text-[9px] text-[#4858a0]">
                        Choose the number of photos you want to take
                    </p>

                    <div className="flex gap-3 items-center justify-center ">
                        {COUNT_OPTIONS.map(n =>(
                            <button
                            key={n}
                            onClick={() => setPhotoCount(n)}
                            className={`w-12 h-12 font-pixel  border-2 shadow-[2px_2px_0] transition-all 
                            ${photoCount === n
                            ? 'bg-[#0c36ef] text-white border-[#4858a0] shadow-[#4858a0] ' :
                            'bg-white text-[#4858a0] border-[#b0b8d8] shadow-[#b0b8d8] hover:border-[#7b6fd4] hover:shadow-[#0c36ef] '
                            }`}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                    
                    <button
                    onClick={() => setScreen('camera')}
                    className="font-pixel text-[9px] bg-[#0c36ef] text-white border-2 border-[#4858a0]
                    px-8 py-3 shadow-[3px_3px_0_#4858a0] hover:bg-[#3b5fff]
                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none "
                    >
                        ▶ START
                    </button>
                    
                </div>
            </div>
        </div>
        
        </>
    );

}

export default LandingScreen