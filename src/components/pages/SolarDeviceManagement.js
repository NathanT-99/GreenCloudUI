import React from 'react'
import { Link } from 'react-router-dom'
import SideMenuBar from '../navigation/SideMenuBar'
import TopBarMenu from '../navigation/TopBarMenu'
import Table from 'react-bootstrap/Table'
import{FaSolarPanel,FaPlusCircle,FaCheck,FaCross,FaSquareFull} from 'react-icons/fa'
import FeatherIcon from 'feather-icons-react';

import { Button } from 'bootstrap'
import axios from 'axios'
import{useState,useEffect} from 'react'





export default function SolarDeviceManagement() {
    const data=[{
        deviceId:"SOLP001",
        name:"Panel 1"
    },
    {
        deviceId:"SOLP002",
        name:"Panel 2"
    },
    {
        deviceId:"SOLP003",
        name:"Panel 3"
    },
    {
        deviceId:"SOLP004",
        name:"Panel 4"
    },
    {
        deviceId:"SOLP005",
        name:"Panel 5"
    },
    {
        deviceId:"SOLP006",
        name:"Panel 6"
    }]
    const[solarData,setSolarData]=useState([])
    const [deleteIds,setDeeleteIds]=useState([])
    const [panelName,setPanelName]=useState("")
    const [name,setName]=useState("")
    const [id,setId]=useState("")
    const [model,setModel]=useState("")
    const [loc,setLoc]=useState("")
    const [manufacturer,setManufacturer]=useState("")
    const [price,setPrice]=useState("")
    const [dim,setDim]=useState("")
    const [cType,setCType]=useState("")
    const [iDate,setIdate]=useState("")

    const [dDate,setDDate]=useState("")
    const [nCells,setNCells]=useState("")
    const [selectedDevice,setSelectedDevice]= useState({})
    const[isSelected,setIsSelected]=useState(false)
    const [isAdd,setAdd]=useState(false)
    const [isEdit,setIsEdit]=useState(false)
    const[length,setLen]=useState(0)

    useEffect(() => {
        var url="http://localhost:3001/solar/device"
        axios.get(url).then(res=>{
            //.log("res-->",res)
            if(res && res.data && res.data.data && res.data.data.length>0){
                setSolarData(res.data.data)
            }
        }).catch(err=>{
            console.log("Err==>",err)
        })
      }, [])
  //console.log("solardataaa---->",selectedDevice)
   
    return (
        
        <div style={{flexDirection:'row'}} >
        <div style={{display:'flex',flexDirection:'row', backgroundImage: "linear-gradient(to right,rgba(145,135,186),#363740 )"}}>
           
                 <SideMenuBar/>
                 

           
            
             <div style={{width:'100%'}}>
             <TopBarMenu/>
            
             <div style={{marginLeft:10,width:'80%',marginTop:'3%'}}>
                 <div style={{height:30,backgroundColor:'#373741',width:'20%',justifyContent:'center',alignItems:'center',display:'flex',borderRadius:5}}>
                     <h6 style={{color:'white'}}>Device List</h6>

       </div> 
       
      <div style={{backgroundColor:'#F2F2F2',borderRadius:5,marginTop:'2%'}}>
          <div style={{display:'flex',flexDirection:'row',height:35,alignItems:'center'}}>
              <div style={{width:'10%',paddingLeft:5}}>
              <img src={require('../../assets/images/checkbox.png')} style={{height:20,width:20}} />

              </div>
              <div style={{width:'30%'}}>
                  Device ID
                  
                  </div>
                  <div style={{width:'40%'}}>
                      Device Name
                  
                  </div>
                  <div style={{width:'20%'}}>
                      View
                  
                  </div>
          </div>
          {solarData && solarData.length>0? solarData.map((ele,idx)=>{
              return(
                <div style={{display:'flex',flexDirection:'row',border:'1px solid gray',height:40,alignItems:'center',backgroundColor:idx %2==0?'#D9D9D9':'white'}}>
                <div style={{width:'10%',paddingLeft:5}}>
                    

                {/* <input style={{backgroundColor:'red'}} type="checkbox" /> */}
                <img src={require('../../assets/images/checkbox.png')} style={{height:20,width:20}} />
   
  
                </div>
                <div style={{width:'30%'}}>
                <img src={require('../../assets/images/solarpanel.png')} style={{height:20,width:20}} />
                    {ele.id}
                    
                    </div>
                    <div style={{width:'40%'}}>
                        {ele.name}
                    
                    </div>
                    <div onClick={()=>{
                        
                        setSelectedDevice(ele)
                        setIsSelected(!isSelected)

                    }} style={{width:'10%',backgroundColor:'#3C3CA8',opacity:'50%',color:'white',borderRadius:5,alignItems:'center',display:'flex',justifyContent:'center'}}>
                        {isSelected && selectedDevice.id == ele.id?"Viewing" : "View"}
                    
                    </div>
            </div>
              )
          }):null}
         

      </div>
     
         <div style={{}}>
        <div style={{height:30,marginTop:10,marginBottom:10, backgroundColor:'#373741',width:'20%',justifyContent:'center',alignItems:'center',display:'flex',borderRadius:5}}>
                     <h6 style={{color:'white'}}>Device Information</h6>

       </div> 

            <div style={{backgroundColor:'white', padding:20, flexDirection:'row',display:'flex',borderRadius:5}}>
                <div style={{width:'33%'}}>
                    <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{ backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    Device name:
                    </div>
                    {isSelected? 
                   <input
                   value = {isEdit && name.length>0 ? name : selectedDevice.name}
                        
                   onChange={(e)=>{
                       setIsEdit(true)

                       setName(e.target.value)
                   }}

                   style={{fontSize:10,width:'60%'}} type="text" />:
                        <input
                        onChange={(e)=>{
                            setName(e.target.value)
                        }}
     
                        style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>

                    
                    <div>
                    <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    Device ID:
                    </div>
                    {isSelected? 
                   <input
                   value = {isEdit && id.length>0 ? id : selectedDevice.id}
                        
                   onChange={(e)=>{
                       setIsEdit(true)
                       setId(e.target.value)
                   }}

                   style={{fontSize:10,width:'60%'}} type="text" />:
                        <input
                        
                        onChange={(e)=>{
                            setId(e.target.value)
                        }}
     
                        style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>
                        <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    Location:
                    </div>
                    {isSelected? 
                   <input
                   value = {isEdit && loc.length>0 ? loc : selectedDevice.location}
                        
                   onChange={(e)=>{
                       setIsEdit(true)
                       setLoc(e.target.value)
                   }}

                   style={{fontSize:10,width:'60%'}} type="text" />:
                        <input
                        onChange={(e)=>{
                            setLoc(e.target.value)
                        }}
     
                        style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>
                        <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    Manufacturer:
                    </div>
                    {isSelected? 
                   <input
                   value = {isEdit && manufacturer.length > 0 ? manufacturer : selectedDevice.manufacturer}
                        
                   onChange={(e)=>{
                       setIsEdit(true)
                       setManufacturer(e.target.value)
                   }}

                   style={{fontSize:10,width:'60%'}} type="text" />:
                        <input
                        onChange={(e)=>{
                            setManufacturer(e.target.value)
                        }}
     
                        style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>





                    </div>
                    
                    <div>
                        
                    </div>
                    </div>


                    <div style={{width:'33%'}}>
                    <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    Installation date:
                    </div>
                    {isSelected? 
                     <input
                     value = {"12/30/2022"}
                          
                     onChange={(e)=>{
                        //  setIsEdit(true)
                        //  setManufacturer(e.target.value)
                     }}
  
                     style={{fontSize:10,width:'60%'}} type="text" />:
                        <input
                        onChange={(e)=>{
                            setIdate(e.target.value)
                        }}
     
                        style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>

                    
                    <div>
                    <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    Deployment date: 
                    </div>
                    {isSelected? 
                     <input
                     value = {"01/03/2023"}
                          
                     onChange={(e)=>{
                        //  setIsEdit(true)
                        //  setManufacturer(e.target.value)
                     }}
  
                     style={{fontSize:10,width:'60%'}} type="text" />:
                        <input
                        onChange={(e)=>{
                            setIdate(e.target.value)
                        }}
     
                        style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>
                        <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                 Number of cells:
                    </div>
                    {isSelected? 
                   <input
                   value = {isEdit && nCells.length>0 ? nCells : selectedDevice.numberOfCells}
                        
                   onChange={(e)=>{
                       setIsEdit(true)
                       setCType(e.target.value)
                   }}

                   style={{fontSize:10,width:'60%'}} type="text" />:
                        <input style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>
                        <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                   Length:
                    </div>
                    {isSelected? 
  <input
  value = {isEdit && length.length>0 ? length : selectedDevice.length}
       
  onChange={(e)=>{
      setIsEdit(true)
      setLen(e.target.value)
  }}

  style={{fontSize:10,width:'60%'}} type="text" />
                        :
                        <input style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>





                    </div>
                    
                    <div>
                        
                    </div>
                    </div>


                    <div style={{width:'33%'}}>
                    <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    Model:
                    </div>
                    {isSelected? 
                   <input
                   value = {isEdit && model.length > 0 ? model: selectedDevice.model}
                        
                   onChange={(e)=>{
                       setIsEdit(true)
                       setModel(e.target.value)
                   }}

                   style={{fontSize:10,width:'60%'}} type="text" />:
                        <input
                        onChange={(e)=>{
                            setModel(e.target.value)
                        }}
     
                        style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>

                    
                    <div>
                    <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    Price:
                    </div>
                    {isSelected? 
                    <input
                    value = {isEdit && price.length>0 ? price : selectedDevice.price}
                         
                    onChange={(e)=>{
                        setIsEdit(true)
                        setPrice(e.target.value)
                    }}
 
                    style={{fontSize:10,width:'60%'}} type="text" />:
                        <input
                        onChange={(e)=>{
                            setPrice(e.target.value)
                        }}
     
                        style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>
                        <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                 Cell Type:
                    </div>
                    {isSelected? 
                    <input
                    value = {isEdit && cType.length>0 ? cType : selectedDevice.cellType}
                         
                    onChange={(e)=>{
                        setIsEdit(true)
                        setCType(e.target.value)
                    }}
 
                    style={{fontSize:10,width:'60%'}} type="text" />:
                        <input
                        onChange={(e)=>{
                            setCType(e.target.value)
                        }}
     
                        style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>
                        <div style={{flexDirection:'row',display:'flex',marginBottom:5}}>
                <div style={{backgroundColor:'#D3D3D3',fontSize:10,paddingRight:3,paddingLeft:3,display:'flex',alignItems:'center',justifyContent:'center'}}>
                   Width: 
                    </div>
                    {isSelected? 
                     <input
                     value = {'30'}
                          
                     onChange={(e)=>{
                        //  setIsEdit(true)
                        //  setManufacturer(e.target.value)
                     }}
  
                     style={{fontSize:10,width:'60%'}} type="text" />:
                        <input style={{fontSize:10,width:'60%'}} type="text" />}
                        </div>





                    </div>
                    
                    <div>
                        
                    </div>
                    </div>
                    


                </div>

        </div> 
        <div style={{marginTop:10,display:'flex',justifyContent:'center',backgroundColor:'lightgray'}}>
          
           <button style={{width:100,padding:5,backgroundColor:"#FAF9F6",border:'none',borderRadius:5,marginRight:20}}
           onClick={()=>{
            
            let body={
                
                    "name": name.length >0?name : selectedDevice.name,
                    "manufacturer": manufacturer.length?manufacturer : selectedDevice.manufacturer,
                    "model": model.length>0?model:selectedDevice.model,
                    "location": loc.length>0?loc:selectedDevice.location,
                    
                    "price": price.length>0?price:selectedDevice.price,
                    "installationDate": "2022-09-16",
                    "deploymentDate": "2022-09-19",
                    "numberOfCells": nCells.length>0?nCells:selectedDevice.numberOfCells,
                    "cellType": cType.length>0?cType:selectedDevice.cellType
                  
            }
            //console.log("body",body)
            axios.patch(`http://localhost:3001/solar/device?id=${selectedDevice.id}`,body).then(res=>{
                console.log("res in update",res)
                
            }).catch(err=>{
                console.log("Err==>",err)
            })
        }}
           
           >Edit</button>
           <button style={{width:100,padding:5,backgroundColor:"#CBC3E3",border:'none',borderRadius:5,marginRight:20}}
          onClick={()=>{
            var url="http://localhost:3001/solar/device"
            let body={
                
                    "name": name,
                    "manufacturer": manufacturer,
                    "model": model,
                    "location": loc,
                    "length": 44.57,
                    "width": 30.06,
                    "height": 1.57,
                    "price": price,
                    "installationDate": "2022-09-16",
                    "deploymentDate": "2022-09-19",
                    "numberOfCells": 60,
                    "cellType": cType
                  
            }
            console.log("body",body)
            axios.post(url,body).then(res=>{
                console.log("res in add",res)
                
            }).catch(err=>{
                console.log("Err==>",err)
            })
          }}
           >Add</button>
           <button
           onClick={()=>{
            var url="http://localhost:3001/solar/device?id="+selectedDevice.id
            axios.delete(`http://localhost:3001/solar/device?id=${selectedDevice.id}`).then(res=>{
                console.log("res in delete",res)
                
            }).catch(err=>{
                console.log("Err==>",err)
            })
           }}
           style={{width:100,padding:5,backgroundColor:"#FFB6C1",border:'none',borderRadius:5}}>Delete</button>
  
        </div>

        
            
    </div>
    </div>
    
    
   
    
            
           

        </div>
        
       
        
        
        </div>
    )
}