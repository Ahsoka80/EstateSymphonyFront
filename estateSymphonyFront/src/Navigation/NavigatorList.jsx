import React from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { ListTest } from '../Componants/Items/ListTest';

export const NavigatorList = () => {

    const router = createBrowserRouter([
        {
            path: '/list',
            element: <ListTest/>
        }
    ])

    return (
        <RouterProvider router={router}/>
    )
}
