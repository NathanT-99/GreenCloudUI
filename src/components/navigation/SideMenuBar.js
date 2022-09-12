import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSun,FaBell,FaCloud,FaCamera,FaBatteryFull,FaHouseUser,FaDashcube,FaParagraph,FaCalendar,FaFacebookMessenger,FaEnvelope,FAGear, FaSquare, FaAngular } from 'react-icons/fa';
import Avatar from 'react-avatar';

import '../../App.css'




export default function SideMenuBar() {
    const[home,setHome]=useState(1)
    const[deviceManagement,setDeviceManagement]=useState(0)
    const[montoring,setMonitoring]=useState(0)
    const[control,setControl]=useState(0)
    const[calendar,setCalendar]=useState(0)
    const[billing,setBilling]=useState(0)
    const[messages,setMessages]=useState(0)
    return(
        <div style={{display:'flex',backgroundColor:'#363740',width:'20%',display:'flex',flexDirection:'column'}}>
        <div style={{height:'15%',flexDirection:'row',display:'flex',justifyContent:'center',paddingTop:'10%'}}>
            <div style={{height:30,width:30,borderRadius:15,backgroundColor:'green',justifyContent:'center',alignItems:'center',display:'flex',marginRight:5}}>
              <h4 style={{textAlign:'center',color:'white'}}>G</h4>
               


            </div>
            <h5 style={{color:'#9FA2B4',paddingTop:5}}>Green Energy Cloud</h5>


        </div>
        <div
        onClick={()=>{
            setHome(1)
            setMessages(0)
            setBilling(0)
            setMonitoring(0)
            setCalendar(0)
            setControl(0)
            setDeviceManagement(0)

        }}
        style={{display:'flex',height:40,alignItems:'center',backgroundColor:home?"#ABACAF":"#363740",paddingLeft:'8%'}}>
<FaHouseUser size={13} color={home?"green":"gray"} style={{alignSelf:'center'}}/>
<h7 style={{color:home?"green":"gray",marginLeft:5,fontSize:14}}>Home</h7>
</div>
<div
  onClick={()=>{
    setHome(0)
    setMessages(0)
    setBilling(0)
    setMonitoring(0)
    setCalendar(0)
    setControl(0)
    setDeviceManagement(1)

}}
 style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center',backgroundColor:deviceManagement?"#ABACAF":"#363740"}}>
<FaDashcube size={13} color={deviceManagement?"green":"gray"} style={{alignSelf:'center'}}/>
<h7 style={{color:deviceManagement?"green":"gray",marginLeft:5,fontSize:14}}>Device Management</h7>
</div>
<div
  onClick={()=>{
    setHome(0)
    setMessages(0)
    setBilling(0)
    setMonitoring(1)
    setCalendar(0)
    setControl(0)
    setDeviceManagement(0)

}}
style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center',backgroundColor:montoring?"#ABACAF":"#363740"}}>
<FaAngular size={13} color={montoring?"green":"gray"} style={{alignSelf:'center',fontSize:14}}/>
<h7 style={{color:montoring?"green":"gray",marginLeft:5,fontSize:14}}>Monitoring & Tracking</h7>
</div>
<div
  onClick={()=>{
    setHome(0)
    setMessages(0)
    setBilling(0)
    setMonitoring(0)
    setCalendar(0)
    setControl(1)
    setDeviceManagement(0)

}}
style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center',backgroundColor:control?"#ABACAF":"#363740"}}>
<FaSquare size={13} color={control?"green":"gray"} style={{alignSelf:'center',fontSize:14}}/>
<h7 style={{color:control?"green":"gray",marginLeft:5,fontSize:14}}>Control & Configuration</h7>
</div>
<div
  onClick={()=>{
    setHome(0)
    setMessages(0)
    setBilling(0)
    setMonitoring(0)
    setCalendar(1)
    setControl(0)
    setDeviceManagement(0)

}}
style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center',backgroundColor:calendar?"#ABACAF":"#363740"}}>
<FaCalendar size={13} color={calendar?"green":"gray"} style={{alignSelf:'center',fontSize:14}}/>
<h7 style={{color:calendar?"green":"gray",marginLeft:5}}>Calender</h7>
</div>
<div
  onClick={()=>{
    setHome(0)
    setMessages(0)
    setBilling(1)
    setMonitoring(0)
    setCalendar(0)
    setControl(0)
    setDeviceManagement(0)

}}
style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center',backgroundColor:billing?"#ABACAF":"#363740"}}>
<FaCalendar size={13} color={billing?"green":"gray"} style={{alignSelf:'center',fontSize:14}}/>
<h7 style={{color:billing?"green":"gray",marginLeft:5}}>Billing</h7>
</div>

<div
  onClick={()=>{
    setHome(0)
    setMessages(1)
    setBilling(0)
    setMonitoring(0)
    setCalendar(0)
    setControl(0)
    setDeviceManagement(0)

}}
style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center',backgroundColor:messages?"#ABACAF":"#363740"}}>
<FaFacebookMessenger size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
<h7 style={{color:"gray",marginLeft:5,fontSize:14}}>Messages</h7>
</div>
<div style={{height:1,backgroundColor:'gray'}}>

</div>
<div style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center',fontSize:14}}>
<FaSun size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
<h7 style={{color:"gray",marginLeft:5}}>Settings</h7>
</div>
<div style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center'}}>
<FaEnvelope size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
<h7 style={{color:"gray",marginLeft:5,fontSize:14}}>Subscription</h7>
</div>
        <div>

        </div>
     

    </div>
    )


}
