import React from 'react'
import Nav from '../pages/Home/index'
import { Outlet } from 'react-router-dom'
import './index.css'

function Layout() {
    return (
        <div className='wrapper'>
            <Nav></Nav>
            <main><Outlet></Outlet></main>
        </div>
    )
}

export default Layout