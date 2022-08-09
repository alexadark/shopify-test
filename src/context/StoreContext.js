import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_STORE_URL,
  storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
})

const defaultValues = {
  client,
  addProductToCart: () => {
    console.log("added")
  },
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const addProductToCart = async variantId => {
    try {
      const newCheckout = await client.checkout.create()
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ]

      const addItems = await client.checkout.addLineItems(
        newCheckout.id,
        lineItems
      )
      console.log(addItems.webUrl)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <StoreContext.Provider value={{ ...defaultValues, addProductToCart }}>
      {children}
    </StoreContext.Provider>
  )
}
