import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSun,FaBell,FaCloud,FaCamera,FaBatteryFull,FaHouseUser,FaDashcube,FaParagraph,FaCalendar,FaFacebookMessenger,FaEnvelope,FAGear, FaSquare, FaAngular } from 'react-icons/fa';
import Avatar from 'react-avatar';

import '../../App.css'




export default function TopBarMenu() {
    const [meterColor,setmetercolor]=useState(0);
    const [solarColor,setsolarColor]=useState(0);
    const [storageColor,setstorageColor]=useState(0);
    const [cameraColor,setcameraColor]=useState(0);
    const [iotColor,setiotColor]=useState(0);
    return(


<div style={{height:'10%',backgroundColor:'#363740',display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:30,paddingRight:30,width:'100%'}}>
<div style={{width:'70%',flexDirection:'row',display:'flex'}}>
<div 
onClick={()=>{
    setsolarColor(1)
    //setoverviewColor(0)
    setcameraColor(0)
    setiotColor(0)
    setstorageColor(0)
    setmetercolor(0)
    

}}
onMouseEnter={(e)=>{
    //e.target.style.background = 'green';
}}
onMouseLeave={(e)=>{
   // e.target.style.background = '#C9CBD6';
}}


style={{width:'100%',display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',height:30,marginRight:20,fontFamily:'-moz-initial',fontWeight:'bold',borderBottom:solarColor?'1px solid white':null,color:solarColor?'1px solid white':'gray'}}>
   
  
   Solar
</div>
<div 
onClick={()=>{
    setsolarColor(0)
    //setoverviewColor(0)
    setcameraColor(0)
    setiotColor(0)
    setstorageColor(1)
    setmetercolor(0)
    

}}

style={{width:'100%',display:'flex',flexDirection:'column', justifyContent:'center',color:storageColor?'1px solid white':'gray',alignItems:'center',height:30,marginRight:20,fontFamily:'-moz-initial',fontWeight:'bold', borderBottom: storageColor?'1px solid white':null}}>
   
   Storage
</div>
<div 

onClick={()=>{
    setsolarColor(0)
    //setoverviewColor(0)
    setcameraColor(1)
    setiotColor(0)
    setstorageColor(0)
    setmetercolor(0)
    

}}
style={{width:'100%',display:'flex',flexDirection:'column', justifyContent:'center',
 borderBottom: cameraColor?'1px solid white':null ,color:cameraColor?'1px solid white':'gray'

,alignItems:'center',height:30,marginRight:20,fontFamily:'-moz-initial',fontWeight:'bold'}}>
   
Camera
</div>
<div 

onClick={()=>{
    setsolarColor(0)
    //setoverviewColor(0)
    setcameraColor(0)
    setiotColor(1)
    setstorageColor(0)
    setmetercolor(0)
    

}}
style={{width:'100%',display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',height:30,marginRight:20,fontFamily:'-moz-initial',fontWeight:'bold',
borderBottom: iotColor?'1px solid white':null,color:iotColor?'1px solid white':'gray'}}>
   
   IOT
</div>
<div 
onClick={()=>{
    setsolarColor(0)
    //ssetoverviewColor(0)
    setcameraColor(0)
    setiotColor(0)
    setstorageColor(0)
    setmetercolor(1)
    

}}

style={{width:'100%',display:'flex',flexDirection:'column', 
justifyContent:'center',
alignItems:'center',height:30,marginRight:20,fontFamily:'-moz-initial',
fontWeight:'bold',
borderBottom: meterColor?'1px solid white':null,
color:meterColor?'1px solid white':'gray'
}}>
   
   Meter
</div>
</div>
<div style={{width:'40%',flexDirection:'row',display:'flex',alignItems:'center'}}>
<input style={{width:'40%',borderRadius:3,height:'30%',fontSize:14}} placeholder={"Search"} type="text"/>


<FaBell size={15} color={'gray'} style={{marginLeft:10}}/>


    <p style={{marginRight:10,borderLeft:'1px solid #BCBDC3',marginLeft:10,paddingLeft:10,fontFamily:'-moz-initial'}}>Kevin Gao</p>
    <Avatar round={true} size={25} name="Foo Bar" />

</div>




 </div>
    )
}