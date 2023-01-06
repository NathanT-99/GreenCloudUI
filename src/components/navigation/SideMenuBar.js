import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { FaSun,FaBell,FaCloud,FaCamera,FaBatteryFull,FaHouseUser,FaDashcube,FaParagraph,FaCalendar,FaFacebookMessenger,FaEnvelope,FAGear, FaSquare, FaAngular,FaCanadianMapleLeaf } from 'react-icons/fa';
import Avatar from 'react-avatar';

import '../../App.css'




export default function SideMenuBar() {
  const history=useHistory()
    const[home,setHome]=useState(1)
    const[deviceManagement,setDeviceManagement]=useState(0)
    const[montoring,setMonitoring]=useState(0)
    const[control,setControl]=useState(0)
    const[calendar,setCalendar]=useState(0)
    const[billing,setBilling]=useState(0)
    const[messages,setMessages]=useState(0)
    return(
        <div style={{display:'flex',backgroundColor:'#363740',width:'20%',display:'flex',flexDirection:'column',height:1000}}>
        <div style={{height:'10%',flexDirection:'row',display:'flex',justifyContent:'center',paddingTop:'10%'}}>
  <FaCanadianMapleLeaf color={"green"} size={40} style={{paddingTop:'5%'}} />
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
        style={{display:'flex',height:40,alignItems:'center',paddingLeft:'8%'}}>
<FaHouseUser size={13} color={home?"white":"gray"} style={{alignSelf:'center'}}/>
<h7 style={{color:home?"white":"gray",marginLeft:5,fontSize:14}}>Home</h7>
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
 style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center',}}>
<FaDashcube size={13} color={deviceManagement?"white":"gray"} style={{alignSelf:'center'}}/>
<h7 style={{color:deviceManagement?"white":"gray",marginLeft:5,fontSize:14}}>Device Management</h7>
</div>
<div
  onClick={()=>{
    console.log("hi")
    history.push("/devicemanagement")
   
    setHome(0)
    setMessages(0)
    setBilling(0)
    setMonitoring(0)
    setCalendar(0)
    setControl(0)
    setDeviceManagement(1)

}}
style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center'}}>
<FaAngular size={13} color={montoring?"white":"gray"} style={{alignSelf:'center',fontSize:14}}/>
<h7 style={{color:montoring?"white":"gray",marginLeft:5,fontSize:14}}>Monitoring & Tracking</h7>
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
style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center'}}>
<FaSquare size={13} color={control?"white":"gray"} style={{alignSelf:'center',fontSize:14}}/>
<h7 style={{color:control?"white":"gray",marginLeft:5,fontSize:14}}>Control & Configuration</h7>
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
style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center'}}>
<FaCalendar size={13} color={calendar?"white":"gray"} style={{alignSelf:'center',fontSize:14}}/>
<h7 style={{color:calendar?"white":"gray",marginLeft:5}}>Calender</h7>
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
style={{display:'flex',paddingLeft:'8%',height:40,alignItems:'center'}}>
<FaCalendar size={13} color={billing?"white":"gray"} style={{alignSelf:'center',fontSize:14}}/>
<h7 style={{color:billing?"white":"gray",marginLeft:5}}>Billing</h7>
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
