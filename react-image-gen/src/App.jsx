import { useState } from 'react'
import  OpenAIApi  from 'openai';
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const openai = new OpenAIApi({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const generateImage = async () => {
    setLoading(true)
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false)
    setResult(response.data.data[0].url)
  };

  return (
    <div className="App">
      <h1>React AI Image Generator</h1>
      {loading ? (
        <h2> Image generation in progress ... Please wait</h2>
      ) : (<></>)}
      <div className="card">
        <textarea
          className="text-input"
          placeholder="Enter a prompt"
          onChange={(e) => setPrompt(e.target.value)}
          row="5"
          cols="50"
          style={{
            padding: '10px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            resize: 'none',
          }}
        />
        <p></p>
        <button className="button" onClick={generateImage}>Generate Image</button>
        {result.length > 0 ? (
            <img className="result-image" src={result} alt="Generated Image" />
          ) : (
            <></>
          )}
      </div>
      <p className="read-the-docs">
        Powered by OpenAI
      </p>
    </div>
  )
}

export default App
