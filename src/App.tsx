// src/App.tsx
import { Navigate, Route, Routes } from "react-router-dom"

import Dashboard from "@/pages/Video"
import Text from "@/pages/Text"
import Layout from "@/components/layout/Layout"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/video" />} />
        <Route path="/video" element={<Dashboard />} />
        <Route path="/text" element={<Text />} />
      </Routes>
    </Layout>
  )
}

export default App
