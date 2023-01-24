import React from 'react'

const FormBox = ({children}) => {
  return (
    <div>   
        <h1>Título Principal</h1>
        <main>
            {children}
        </main>        
    </div>
  )
}

export default FormBox