import React from 'react'
import { FavoriteProvider } from './FavoriteContext'
import { UserProvider } from './UserContext'

const Providers = ({children}) => {
  return (
    <UserProvider>
        <FavoriteProvider>
            {children}
        </FavoriteProvider>
    </UserProvider>    
  )
}

export default Providers