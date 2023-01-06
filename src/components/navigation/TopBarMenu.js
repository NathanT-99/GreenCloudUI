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


<div style={{height:'100%',width:'100%',backgroundColor:'white',display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:30,paddingRight:30}}>
<div style={{width:'100%',flexDirection:'row',display:'flex'}}>
<div 
onClick={()=>{
    setsolarColor(!solarColor)
    //setoverviewColor(0)
    setcameraColor(0)
    setiotColor(0)
    setstorageColor(0)
    setmetercolor(0)

}}
onMouseEnter={(e)=>{
    e.target.style.background = 'blue';
}}
onMouseLeave={(e)=>{
    e.target.style.background = '#C9CBD6';
}}


style={{width:'100%',display:'flex',flexDirection:'column', justifyContent:'center',backgroundColor:"#C9CBD6",alignItems:'center',height:30,marginRight:20,fontFamily:'-moz-initial',fontWeight:'bold'}}>
   
  
   Solar
</div>
<div 
onClick={()=>{
    setsolarColor(0)
    //setoverviewColor(0)
    setcameraColor(0)
    setiotColor(0)
    setstorageColor(!storageColor)
    setmetercolor(0)

}}
onMouseEnter={(e)=>{
    e.target.style.background = 'blue';
}}
onMouseLeave={(e)=>{
    e.target.style.background = '#C9CBD6';
}}
style={{width:'100%',display:'flex',flexDirection:'column', justifyContent:'center',backgroundColor:"#C9CBD6",alignItems:'center',height:30,marginRight:20,fontFamily:'-moz-initial',fontWeight:'bold'}}>
   
   Storage
</div>
<div 
onMouseEnter={(e)=>{
    e.target.style.background = 'blue';
}}
onMouseLeave={(e)=>{
    e.target.style.background = '#C9CBD6';
}}
onClick={()=>{
    setsolarColor(!solarColor)
    //setoverviewColor(0)
    setcameraColor(0)
    setiotColor(0)
    setstorageColor(0)
    setmetercolor(0)

}}
style={{width:'100%',display:'flex',flexDirection:'column', justifyContent:'center',backgroundColor:"#C9CBD6",alignItems:'center',height:30,marginRight:20,fontFamily:'-moz-initial',fontWeight:'bold'}}>
   
Camera
</div>
<div 
onMouseEnter={(e)=>{
    e.target.style.background = 'blue';
}}
onMouseLeave={(e)=>{
    e.target.style.background = '#C9CBD6';
}}
onClick={()=>{
    setsolarColor(!solarColor)
    //setoverviewColor(0)
    setcameraColor(0)
    setiotColor(0)
    setstorageColor(0)
    setmetercolor(0)

}}
style={{width:'100%',display:'flex',flexDirection:'column', justifyContent:'center',backgroundColor:"#C9CBD6",alignItems:'center',height:30,marginRight:20,fontFamily:'-moz-initial',fontWeight:'bold'}}>
   
   IOT
</div>
<div 
onClick={()=>{
    setsolarColor(0)
    //ssetoverviewColor(0)
    setcameraColor(0)
    setiotColor(0)
    setstorageColor(0)
    setmetercolor(!meterColor)

}}
onMouseEnter={(e)=>{
    e.target.style.background = 'blue';
}}
onMouseLeave={(e)=>{
    e.target.style.background = '#C9CBD6';
}}
style={{width:'100%',display:'flex',flexDirection:'column', justifyContent:'center',backgroundColor:"#C9CBD6",alignItems:'center',height:30,marginRight:20,fontFamily:'-moz-initial',fontWeight:'bold',color:meterColor?'green':'black'}}>
   
   Meter
</div>

</div>
<div style={{width:'40%',flexDirection:'row',display:'flex',alignItems:'center'}}>
<input style={{width:'40%',borderRadius:3,backgroundColor:'#EDEEF4',height:'30%',fontSize:14}} placeholder={"Search"} type="text"/>


<FaBell size={15} color={'gray'} style={{marginLeft:10}}/>


    <p style={{marginRight:10,borderLeft:'1px solid #BCBDC3',marginLeft:10,paddingLeft:10,fontFamily:'-moz-initial'}}>Kevin Gao</p>
    <Avatar round={true} size={25} name="Foo Bar" />

</div>




 </div>
    )
}