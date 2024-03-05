import { IconButton } from '@mui/material'
import React from 'react'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';


export const FavoriButton = () => {
  return (
    <IconButton color='primary' aria-label="favorie" size="">
        <FavoriteSharpIcon fontSize="inherit" />
    </IconButton>
  )
}
