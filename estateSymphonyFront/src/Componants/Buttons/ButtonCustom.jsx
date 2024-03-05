import React from 'react'
import { Button, Icon} from '@mui/material'
//import { MaterialIcons } from "@mui/material";

import { IconButton } from '@mui/material'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import SearchIcon from '@mui/icons-material/Search';


export const ButtonCustom = (props) => {

  const {
    onClick, 
    text,
    icon,
    iconPosition,
    type  
  } = props 


  return (
    <>
      <Button 
      
        variant={type} 
        onClick={onClick}
        my={2}
        endIcon={
          iconPosition == "right" ? (<Icon>  as={<MaterialIcons name={icon}  size={5} />}</Icon> ): null}

        startIcon={
          iconPosition == "left" ? (<Icon> as={<MaterialIcons name={icon} size={5} mr={"2"}/>} </Icon>) : null } > 
          
          {text}

      </Button>

      {/* <IconButton color='primary' aria-label="search" onClick={ButtonSearch}>
        <SearchIcon fontSize="inherit" />
      </IconButton>

      <IconButton color='primary' aria-label="favorie" onClick={ButtonFavori}>
        <FavoriteSharpIcon fontSize="inherit" />
      </IconButton> */}
    </>
  )
}
