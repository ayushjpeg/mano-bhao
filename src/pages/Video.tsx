import { useEffect, useRef, useState } from "react"

export default function Dashboard() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const [customEmotion, setCustomEmotion] = useState<string | null>(null) // Custom model emotion
  const [deepFaceEmotion, setDeepFaceEmotion] = useState<string | null>(null) // DeepFace emotion

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing webcam:", err)
      }
    }

    startCamera()

    const interval = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return

      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
      if (!context) return

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      const boxX = canvas.width / 2 - 100
      const boxY = canvas.height / 2 - 100
      const boxWidth = 200
      const boxHeight = 200

      const cropped = context.getImageData(boxX, boxY, boxWidth, boxHeight)

      const tempCanvas = document.createElement("canvas")
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) return

      tempCanvas.width = boxWidth
      tempCanvas.height = boxHeight
      tempCtx.putImageData(cropped, 0, 0)

      const blob = await new Promise<Blob | null>((resolve) => {
        tempCanvas.toBlob((b) => resolve(b), "image/jpeg")
      })

      if (blob) {
        const formData = new FormData()
        formData.append("file", blob, "frame.jpg")

        try {
          const res = await fetch("https://7cf1-49-37-44-112.ngrok-free.app/predict-emotion", {
            method: "POST",
            body: formData,
          })

          const data = await res.json()
          // Set both the custom model's emotion and DeepFace emotion
          setCustomEmotion(data.custom_model_emotion)
          setDeepFaceEmotion(data.deepface_emotion)
        } catch (error) {
          console.error("Failed to send image:", error)
        }
      }
    }, 1000) // Capture image every second

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 flex flex-col items-center justify-center h-screen gap-6 text-white">
      <h1 className="text-3xl font-bold">Live Emotion Detector</h1>

      <div className="relative border-4 border-zinc-700 rounded-xl overflow-hidden w-full max-w-4xl aspect-video shadow-xl">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        {/* Overlay Box */}
        <div
          ref={overlayRef}
          className="absolute border-2 border-blue-500"
          style={{
            width: 200,
            height: 200,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="text-xl mt-4">
        <div>
          <span className="font-medium">Custom Model Emotion:</span>{" "}
          <span className="font-bold text-amber-300">
            {customEmotion ?? "Loading..."}
          </span>
        </div>
        <div>
          <span className="font-medium">DeepFace Emotion:</span>{" "}
          <span className="font-bold text-amber-300">
            {deepFaceEmotion ?? "Loading..."}
          </span>
        </div>
      </div>
    </div>
  )
}
