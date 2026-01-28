import { useRef , useState } from 'react';
import { Camera,Focus  } from 'lucide-react';
import './App.css'

function App() {
  const[capture, setCapture] = useState() //created a usestate to store the image data 
  const canvasRef = useRef(null) 
  const videoRef = useRef(null)
    const handleClick = async() =>{
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame to canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setCapture(imageData);
    }
  };
  console.log(capture);
  
  return (
    <>
      <div>
        <div className="header">
          <header>
          </header>
        </div>
        <div className="middle">
            <button onClick={handleClick}>
              <Camera color="red" size={48} />
            </button>
            <label className='text_middle' >click on camera to see the action </label> 
            <div>
              <video ref={videoRef} autoPlay playsInline />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <button onClick={capturePhoto}>
              Take Photo <Focus  size={20}/>
            </button>
              {capture && (
                <div>
                  <h3>Captured Photo:</h3>
                  <img src={capture} alt="Captured" width="640" height="480" />
                </div>
              )}

        </div>
        <div className="foterr">
          <footer>

          </footer>
        </div>

      </div>
    </>

  )
}

export default App
