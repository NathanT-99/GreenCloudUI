import React from 'react'
import { Link } from 'react-router-dom'
import SideMenuBar from '../navigation/SideMenuBar'
import TopBarMenu from '../navigation/TopBarMenu'

export default function HomePage() {
    return (
        <div style={{height:'100vh',display:'flex',flexDirection:'row'}}>
            <SideMenuBar/>
            <TopBarMenu/>
        </div>
    )
}
