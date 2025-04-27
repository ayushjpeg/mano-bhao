import { useState } from "react"

export default function Text() {
  const [userInput, setUserInput] = useState<string>("")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [prediction, setPrediction] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    if (!userInput.trim() || !selectedModel) return

    setIsLoading(true)

    try {
      const res = await fetch("https://your-backend-url/predict-text-sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: userInput,
          model_name: selectedModel,
        }),
      })

      const data = await res.json()
      setPrediction(data.prediction)
    } catch (error) {
      console.error("Failed to predict sentiment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6 bg-black text-white overflow-hidden">
      <h1 className="text-3xl font-bold">Text Sentiment Detector</h1>

      <div className="w-full max-w-2xl flex flex-col items-center gap-4">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your text here..."
          className="w-full h-40 p-4 rounded-xl border-2 border-zinc-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-zinc-900 text-white placeholder-gray-400"
        />

        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full p-3 rounded-xl border-2 border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>Select a model</option>
          <option value="RNN">RNN</option>
          <option value="CNN">CNN</option>
          <option value="GNN">GNN</option>
          {/* Add more models as per your backend */}
        </select>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? "Analyzing..." : "Analyze Sentiment"}
        </button>
      </div>

      <div className="text-xl mt-4">
        {prediction && (
          <div>
            <span className="font-medium">Predicted Sentiment:</span>{" "}
            <span className="font-bold text-amber-300">{prediction}</span>
          </div>
        )}
      </div>
    </div>
  )
}
