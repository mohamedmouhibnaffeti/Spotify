import React, { useEffect, useState } from "react"
import { Home, Login } from "./components"

const App = () => {
  const [token, setToken] = useState<string | null>("")
  useEffect(()=>{
    setToken(window.localStorage.getItem("token"))
  }, [])
  return(
    <div className='App'>
      {token ? <Home Token={token} /> : <Login/>}
    </div>
  )
}
export default App

