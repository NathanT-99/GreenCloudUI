import React, { useRef, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import { FaSun,FaBell,FaCloud,FaCamera,FaBatteryFull,FaHouseUser,FaDashcube,FaParagraph,FaCalendar,FaFacebookMessenger,FaEnvelope,FAGear, FaSquare, FaAngular, FaRegLaughBeam } from 'react-icons/fa';
import Avatar from 'react-avatar';

import MeterPage from './MeterPage';
import IOTPage from './IOTPage';

import '../../App.css'
import './LoginPage.css'
import bg from '../../assets/images/bg.png'
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS,LineController,LineElement,Title,Tooltip,Legend,CategoryScale,LinearScale,PointElement} from 'chart.js' 
import Switch from '../Switch';
ChartJS.register(
    Title,Tooltip,Legend,LineElement,
    CategoryScale,LinearScale,PointElement
)

export const SideBarContext = React.createContext(null);

export default function SignInPage() {
    const [overviewColor,setoverviewColor]=useState(0);
    const [solarColor,setsolarColor]=useState(0);
    const [storageColor,setstorageColor]=useState(0);
    const [cameraColor,setcameraColor]=useState(0);
    const [iotColor,setiotColor]=useState(0);
    const [meterColor,setmeterColor]=useState(0);
    //SideBar
    const [homeColor,setHomeColor]=useState(1);
    const [deviceMColor,setDeviceMColor]=useState(0);
    const [mtColor,setmtColor]=useState(0);
    const [ccColor,setccColor]=useState(0);
    const value = React.useMemo(() => {
        return {
            homeColor,
            setHomeColor,
            deviceMColor,
            setDeviceMColor,
            mtColor,
            setmtColor,
            ccColor,
            setccColor,
            log: (t) => console.log(t)
        }
    }, [homeColor, deviceMColor, mtColor, ccColor]);

    const [data,setData]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[
            {
                label:"Data Set",
               
                data:[10,20,30,42,51,82,31,59,61,73,91,40],
               
                borderColor:"blue",
                tension:0.5,
                pointRadius:0
            }
        ]
    })
    
    var options = {
        scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: true
              }
            }
          }
    }
  
    return (
    <>
    <div id='background'></div>
     <div style={{height:'100vh',display:'flex',flexDirection:'row',overflowY:'auto',overflowX:'hidden'}}>
        
         <div style={{height:'100vh',backgroundColor:'#363740',width:'20%',flexDirection:'column'}}>
             <div style={{height:'15%',flexDirection:'row',display:'flex',justifyContent:'center',paddingTop:'10%'}}>
                 <div style={{height:30,width:30,borderRadius:15,backgroundColor:'green',justifyContent:'center',alignItems:'center',display:'flex',marginRight:5}}>
                   <h4 style={{textAlign:'center',color:'white',paddingTop:10}}>G</h4>
                    


                 </div>
                 <h5 style={{color:'#9FA2B4',paddingTop:5}}>Green Cloud</h5>


             </div>
             <div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaHouseUser size={13} color={'gray'} style={{alignSelf:'center'}}/>
    <div onClick={()=>{
    console.log("onclick")
    setHomeColor(!homeColor)
    setDeviceMColor(0)
    setmtColor(0)
    setccColor(0)

    }} style={{display:'flex',justifyContent:'center'}}>
        <h6 style={{fontSize:14, marginLeft:5, color:homeColor?'green':'gray'}}>Home</h6>
</div>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaDashcube size={13} color={'gray'} style={{alignSelf:'center'}}/>
    <div onClick={()=>{
    console.log("onclick")
    setHomeColor(0)
    setDeviceMColor(!deviceMColor)
    setmtColor(0)
    setccColor(0)

}} style={{display:'flex',justifyContent:'center'}}>
    <h6 style={{fontSize:14, marginLeft:5, color:deviceMColor?'green':'gray'}}>Device Management</h6>
</div>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaAngular size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <div onClick={()=>{
    console.log("onclick")
    setHomeColor(0)
    setDeviceMColor(0)
    setmtColor(!mtColor)
    setccColor(0)

}} style={{display:'flex',justifyContent:'center'}}>
    <h6 style={{color:mtColor?'green':'gray',marginLeft:5,fontSize:14}}>Monitor & Tracking</h6>
</div>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaSquare size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <div onClick={()=>{
    console.log("onclick")
    setHomeColor(0)
    setDeviceMColor(0)
    setmtColor(0)
    setccColor(!ccColor)

}} style={{display:'flex',justifyContent:'center'}}>
    <h6 style={{color:ccColor?'green':'gray',marginLeft:5,fontSize:14}}>Control & Config</h6>
</div>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaCalendar size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <h6 style={{color:"gray",marginLeft:5}}>Calender</h6>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaFacebookMessenger size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <h6 style={{color:"gray",marginLeft:5,fontSize:14}}>Messages</h6>
</div>
<div style={{height:1,backgroundColor:'gray'}}>

</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center',fontSize:14}}>
    <FaSun size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <h6 style={{color:"gray",marginLeft:5}}>Settings</h6>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaEnvelope size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <h6 style={{color:"gray",marginLeft:5,fontSize:14}}>Subscription</h6>
</div>
             <div>

             </div>
          

         </div>
         <div style={{display:'flex',width:'80%',paddingRight:'5%',flexDirection:'column'}}>
         <div style={{position:'relative',height:'10%',width:'80vw',backgroundColor:'#29292F',display:'flex',flexDirection:'row',alignItems:'center',paddingBottom:'20px',paddingTop:'20px'}}>
<div onClick={()=>{
    console.log("onclick")
    setoverviewColor(!overviewColor)
    setcameraColor(0)
    setiotColor(0)
    setstorageColor(0)
    setsolarColor(0)
    setmeterColor(0)

}} style={{width:'10%',display:'flex',justifyContent:'center'}}>
    <h6 style={{fontSize:14, color:overviewColor?'green':'gray',borderBottom:overviewColor?'1px solid green':'0px solid white'}}>Overview</h6>
</div>
<div 
onClick={()=>{
    setsolarColor(!solarColor)
    setoverviewColor(0)
    setcameraColor(0)
    setiotColor(0)
    setstorageColor(0)
    setmeterColor(0)
    

}}
style={{width:'10%',display:'flex',borderBottom:solarColor?'1px solid green':'0px solid white',justifyContent:'center'}}>
    <FaSun size={14} color={solarColor?"green":'gray' } style={{alignSelf:'center'}}/>
    <h6 style={{fontSize:14,color:solarColor?"green":'gray' ,marginLeft:5}}>Solar</h6>
</div>
<div style={{width:'10%',display:'flex',borderBottom:storageColor?'1px solid green':'0px solid white',justifyContent:'center'}}>
<FaBatteryFull 
onClick={()=>{
    
    setstorageColor(!storageColor)
    setoverviewColor(0)
    setcameraColor(0)
    setiotColor(0)
   
    setsolarColor(0)
    setmeterColor(0)

}}
size={14} color={storageColor?"green":'gray'} style={{alignSelf:'center'}}/>
    <h6 style={{fontSize:14,color:"gray",marginLeft:5}}>Storage</h6>
</div>
<div style={{width:'10%',display:'flex',justifyContent:'center', borderBottom:cameraColor?'1px solid green':'0px solid white'}}>
<FaCamera
onClick={()=>{
    setcameraColor(!cameraColor)
    setoverviewColor(0)
   
    setiotColor(0)
    setstorageColor(0)
    setsolarColor(0)
    setmeterColor(0)

}} size={14} color={cameraColor?'green':"gray"} style={{alignSelf:'center'}}/>
    <h6 style={{fontSize:14,color:cameraColor?'green':"gray",marginLeft:5}}>Camera</h6>
</div>
<div onClick={()=>{
    setiotColor(!iotColor)
    setoverviewColor(0)
    setcameraColor(0)
    setstorageColor(0)
    setsolarColor(0)
    setmeterColor(0)

}} style={{width:'10%',display:'flex',justifyContent:'center'}}>
    <h6 style={{fontSize:14, color:iotColor?'white':'gray',borderBottom:iotColor?'1px solid white':'0px solid'}}>Iot</h6>
</div>
<div onClick={()=>{
    console.log("onclick")
    setoverviewColor(0)
    setcameraColor(0)
    setiotColor(0)
    setstorageColor(0)
    setsolarColor(0)
    setmeterColor(!meterColor)

}} style={{width:'10%',display:'flex',justifyContent:'center'}}>
    <h6 style={{fontSize:14, color:meterColor?'white':'gray',borderBottom:meterColor?'1px solid white':'0px solid'}}>Meter</h6>
</div>

<div style={{flex:'display',flexDirection:'column'}}>
<input style={{width:'100%',borderRadius:3,backgroundColor:'#EDEEF4',height:'30%',fontSize:14}} placeholder={"Search"} type="text"/>

</div>
<FaBell size={15} color={'gray'} style={{marginLeft:10}}/>
<div style={{display:'flex',justifyContent:'flex-end',width:'30%',alignItems:'center',marginRight:20}}>

    <p style={{marginRight:10,marginTop:15}}>Kevin Gao</p>
    <Avatar round={true} size={25} name="Foo Bar" />
</div>




 </div>
 {solarColor?
 <div>

 <div style={{height:'20%',flexDirection:'row',display:'flex'}}>
  <div style={{width:'30%',borderRadius:5, backgroundImage: `url(${bg})`,opacity:0.6, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:10,marginRight:10}}>
      <h4>Main Office</h4>
      <h4>43</h4>

  </div>
 
  <div style={{width:'30%',borderRadius:5,backgroundImage: `url(${bg})`,opacity:0.6, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:10,marginRight:10}}>
      <h4>Apartments</h4>
      <h4>16</h4>

  </div>
  <div style={{width:'30%',borderRadius:5,backgroundImage: `url(${bg})`, backgroundSize:210,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:10,marginRight:10}}>
      <h4>Laundry Room</h4>
      <h4>13</h4>

  </div>
  <div style={{width:'30%',borderRadius:5,backgroundImage: `url(${bg})`, opacity:0.6, backgroundSize:210,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}>
      <h4 style={{textAlign:'center'}}>Maintenece Rooms</h4>
      <h4>13</h4>

  </div>
 </div>
          
             <div style={{borderRadius:5,border:'1px solid lightGray',marginTop:'5%',flexDirection:'row',display:'flex',height:300}}>
                 <div style={{width:'70%',borderLeft:'1px solid lightGray',marginTop:10,marginBottom:10}}>
                   
                 <Line 
                 
             options={options}
             data={data}>hello</Line>

                 </div>
                 <div style={{width:'30%',height:500}}>
                 <div style={{borderLeft:'1px solid lightGray'}}>

       
<div style={{height:60,display:'flex',justifyContent:'center',alignItems:'center',borderBottom:'1px solid lightGray',fontWeight:'bold'}}>
    449

</div>
<div style={{height:60,display:'flex',justifyContent:'center',alignItems:'center',borderBottom:'1px solid lightGray',fontWeight:'bold'}}>
    426

</div>
<div style={{height:60,display:'flex',justifyContent:'center',alignItems:'center',borderBottom:'1px solid lightGray',fontWeight:'bold'}}>
    33

</div>
<div style={{height:60,display:'flex',justifyContent:'center',alignItems:'center',borderBottom:'1px solid lightGray',fontWeight:'bold'}}>
    3h 8m

</div>
<div style={{height:60,display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
    94%

</div>
</div>

                     
                     

                 </div>
            

             </div>
             <div style={{display:'flex',flexDirection:'row',marginTop:'5%',}}>
                 <div style={{width:'50%',paddingLeft:10,borderRadius:5,border:'1px solid lightgray',paddingRight:10,paddingTop:10}}>
                     <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between'}}>
                     <h6 style={{fontSize:16,fontFamily:'-moz-initial',fontWeight
                    :'bold'}}>Unresolved tickets</h6>
                    <a style={{color:'blue',fontSize:12}}>View details</a>

                     </div>
                     <div style={{fontWeight:'initial',fontSize:12,marginBottom:25}}>
                         Group : Support
                     </div>
                     <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',height:40,alignItems:'center',borderBottom:'1px solid lightgray'}}>
                     <h6 style={{fontSize:13,fontFamily:'-moz-initial',fontWeight
                    :'bold',color:'#252733'}}>Waiting on feature request</h6>
                    <a style={{color:'gray',fontSize:12}}>13</a>

                     </div>
                     <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',height:40,alignItems:'center',borderBottom:'1px solid lightgray'}}>
                     <h6 style={{fontSize:13,fontFamily:'-moz-initial',fontWeight
                    :'bold',color:'#252733'}}>Awaiting cuteomer response</h6>
                    <a style={{color:'gray',fontSize:12}}>45</a>

                     </div>
                     <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',height:40,alignItems:'center',borderBottom:'1px solid lightgray'}}>
                     <h6 style={{fontSize:13,fontFamily:'-moz-initial',fontWeight
                    :'bold',color:'#252733'}}>Awaiting developer fix</h6>
                    <a style={{color:'gray',fontSize:12}}>60</a>

                     </div>
                     <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',height:40,alignItems:'center',borderBottom:'1px solid lightgray'}}>
                     <h6 style={{fontSize:13,fontFamily:'-moz-initial',fontWeight
                    :'bold',color:'#252733'}}>Pending</h6>
                    <a style={{color:'gray',fontSize:12}}>281</a>

                     </div>
        
                     

                 </div>
             <div style={{width:'50%'}}>
                

             </div>
         </div>
         </div>:storageColor?<div>Storage</div>:null}
            

{iotColor?
<SideBarContext.Provider value={value}>
    <IOTPage/>
</SideBarContext.Provider>:iotColor?<>IOT Page</>:null}

{meterColor?
<SideBarContext.Provider value={value}>
    <MeterPage/>
</SideBarContext.Provider>:meterColor?<>Meter Page</>:null}

         </div>       
        

     </div>
     </>
    )


}
