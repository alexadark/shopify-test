import React from "react"
import "./src/styles/global.css"
import { StoreProvider } from "./src/context/StoreContext"
export const wrapRootElement = ({ element }) => {
  return <StoreProvider>{element}</StoreProvider>
}
