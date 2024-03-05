import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
export const Details = () => {
    const {id} = useParams()
    const [item, setItem]= useState(null)
    useEffect(()=>{ 
        if(!item){
            let temp = list.filter((value)=> value.id === parseInt(id))
            setItem(temp)
        }
    }, [item])
    console.log(item);
  return (
    !item ? 'Chargement'
    : (
        <>
<div className={item[0].mark === 'super' ? 'super-cool' : ''}>{item[0].name}</div>
        </>
    )
  )
}
