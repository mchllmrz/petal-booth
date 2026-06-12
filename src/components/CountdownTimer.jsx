
function CountdownTimer({count}){
    return(
       
        <div
        key={count}
        className="font-pixel text-6xl text-white text-opacity-40 text-whitedrop-shadow-[0_0_20px_rgba(155,143,244,0.8)]animate-flash select-none"
        >
            {count}
        </div>
        
    )
}

export default CountdownTimer