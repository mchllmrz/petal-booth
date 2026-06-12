import usePhotoStore from "./store/usePhotoStore";
import LandingScreen from "./screens/LandingScreen";
import CameraScreen from "./screens/CameraScreen";
import EditorScreen from './screens/EditorScreen'
import LoadingScreen from './screens/LoadingScreen'

function App(){
    const screen = usePhotoStore((s) => s.screen);

    return(
        <div className="w-screen h-screen bg-[#0e1020] overflow-hidden flex items-center justify-center ">
            {screen === 'landing' && <LandingScreen />}
            {screen === 'camera' && <CameraScreen />}
            {screen === 'editor' && <EditorScreen />}
            {screen === 'loading' && <LoadingScreen />}
        </div>

    );
}

export default App