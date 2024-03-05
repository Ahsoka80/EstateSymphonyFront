import React from 'react'
import { Link } from 'react-router-dom'

export const LoginScreens = () => {
  const list = [{
    id: 1,
    name : 'Toto',
    mark : 'super'
  },
  {
    id: 2,
    name : 'Caca'
  },
  {
    id: 3,
    name : 'Tata'
  }]
  return (
    <>
    {list.map((item, index) =>{
return(
<div key={index}>
  <Link to={`/details/${item.id}`}>vers {item.name}</Link>
  <div>{item.name}</div>
  </div>
)
    })}
    </>
  )
}
