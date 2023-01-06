import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCog, FaChargingStation, FaTint } from 'react-icons/fa';
import Avatar from 'react-avatar';
import SideMenuBar from '../navigation/SideMenuBar'
import TopBarMenu from '../navigation/TopBarMenu'

import { SideBarContext } from './LoginPage'
import MeterUpdate from '../MeterUpdateTable';
import Switch from '../Switch';

import '../../App.css'
import './MeterPage.css'
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS,LineController,LineElement,Title,Tooltip,Legend,CategoryScale,LinearScale,PointElement} from 'chart.js' 
ChartJS.register(
    Title,Tooltip,Legend,LineElement,
    CategoryScale,LinearScale,PointElement
)



export default function MeterPage() {
    //SideBar
    const {homeColor,setHomeColor} = React.useContext(SideBarContext);
    const {deviceMColor,setDeviceMColor}= React.useContext(SideBarContext);
    const {mtColor,setmtColor} = React.useContext(SideBarContext);
    const {ccColor,setccColor} = React.useContext(SideBarContext);

    //meter page
    const [electricityColor,setElectricityColor]=useState(0);
    const [waterColor,setWaterColor]=useState(0);
    const [dayColor,setDayColor]=useState(1);
    const [weekColor,setWeekColor]=useState(0);
    const [monthColor,setMonthColor]=useState(0);
    const [yearColor,setYearColor]=useState(0);
    //MT page
    const [MTgraph,setMTgraph]=useState('24 hr');


    const [electricMeterList, setElectricMeterList] = React.useState([{type:'electric',index:1,id:'EMETE001',name:'Electricity Meter 1',location:'Building A',manufacturer:'EKM Metering Inc.',model:'EKM-25XDSE',capacity:'100 Amps',method:'DIN Rail Mounted',accuracy:'12 watts',iDate:'8/15/2022',dimensions:'3.94 x 3.44 x 2.55 in.',dDate:'8/19/2022',power:'AC',elecCapacity:'70%',voltage:'200 V',current:'10 A',today:'60 KWh',hr:'70 KWh',week:'470 KWh',month:'2100 KWh',year:'21200 KWh',activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'Online'}]);
    const [waterMeterList, setWaterMeterList] = React.useState([{type:'water',index:1,id:'WMETE001',name:'Water Meter 1',location:'Building A',manufacturer:'Flume',model:'Flume 2',power:'Battery',batteries:'Yes',batteryType:'Lithium Metal',iDate:'8/15/2022',dimensions:'11.38 x 6.22 x 4.49 in.',dDate:'8/19/2022',weight:'2.4 lbs.',elecCapacity:'40%',voltage:'100 V',current:'5 A',today:'62 gal',hr:'72 gal',week:'510 gal',month:'2900 gal',year:'24900 gal',activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'Online'}]);
    const [showView, setShowView] = React.useState(false);
    const [showUpdate, setShowUpdate] = React.useState(false);
    const [showDelete, setShowDelete] = React.useState(false);
    const [updateIndex, setUpdateIndex] = React.useState(null);
    const [updateType, setUpdateType] = React.useState(null);
    const [updateFormData, setUpdateFormData] = React.useState({
        id:'',
        name:'',
        location:'',
        manufacturer:'',
        model:'',
        capacity:'',
        method:'',
        accuracy:'',
        iDate:'',
        dimensions:'',
        dDate:'',
        power:'',
        batteries:'',
        batteryType:'',
        weight:''
    });
    const [currentMeter, setCurrentMeter] = React.useState({});
    //CC page states
    const [showConfig, setShowConfig] = React.useState(false);

    const MeterList = () => (
        <table className='listTable'>
            <thead>
                <tr>
                    <th className='listCell'>Device ID</th>
                    <th className='listCell dmName'>Device Name</th>
                    <th className='listCell' style={{textAlign:'right',paddingRight:15}}>View<button style={{color:'#82848F',backgroundColor:'#f2f2f2',border:'2px solid #82848F',borderRadius:'50%',width:'1.8vw',fontSize:20,marginLeft:68}} onClick={handleAdd.bind(this)}>+</button></th>
                </tr>
            </thead>
            <tbody>
                {electricityColor?electricMeterList.map(item => (
                <ListItem key={item.index} item={item} />
                )):
                waterMeterList.map(item => (
                <ListItem key={item.index} item={item} />
                ))}
            </tbody>
        </table>
    );

    const ListItem = ({ item }) => (
        <tr className='listTR'>
            <td key={item.id} className='listCell'>{item.id}</td>
            <td key={item.name} className='listCell dmName'>{item.name}</td>
            <td key={item.view} className='listCell'>{<button id='view' style={{opacity:(showView||showUpdate||showDelete)&&currentMeter.index==item.index?1:0.7}} onClick={handleView.bind(this, item)}>{(showView||showUpdate||showDelete)&&currentMeter.index==item.index?'Viewing':'View'}</button>}</td>
        </tr>
    );

    const handleAdd = () => {
        if(electricityColor){
            const index = electricMeterList.length ? electricMeterList.length+1:1;
            const zeros = '000';
            const id = 'EMETE'+zeros.substring(0,3-index.toString().length)+index;
            const name = 'Electricity Meter '+index;
            setElectricMeterList(electricMeterList.concat({type:'electric',index:index,id:id,name:name,activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'N/A'}));    
        }
        else if(waterColor){
            const index = waterMeterList.length ? waterMeterList.length+1:1;
            const zeros = '000';
            const id = 'WMETE'+zeros.substring(0,3-index.toString().length)+index;
            const name = 'Water Meter '+index;
            setWaterMeterList(waterMeterList.concat({type:'water',index:index,id:id,name:name,activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'N/A'}));
        }
    }

    const DeleteView = () => (
        <>
        {showDelete?
        <>
        <span style={{textAlign:'center',justifyContent:'center',marginBottom:10,marginTop:10,marginLeft:30,fontSize:20,fontWeight:'bold'}}>Are you sure you want to delete {currentMeter.name}?</span>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'7%',marginBottom:50,flexShrink:0}}>
            <button style={{color:'white',backgroundColor:'firebrick',borderRadius:'50%',marginRight:20,width:'5%',height:'100%',fontSize:40}} onClick={cancelDelete.bind(this)}>X</button>
            <button style={{color:'white',backgroundColor:'forestgreen',borderRadius:'50%',marginLeft:20,width:'5%',height:'100%',fontSize:40}} onClick={deleteMeter.bind(this)}>&#10003;</button>
        </div>
        </>
        :null}
        </>
    );

    const handleDelete = () => {
        //if(index==currentMeter.index)
        //    setShowView(false);
        setShowDelete(true);
        setShowView(false);
        setShowUpdate(false);
    };

    const cancelDelete = () => {
        setShowDelete(false);
        setShowView(true);
    };

    const deleteMeter = () => {
        if(currentMeter.type==='electric')
            setElectricMeterList((current) => current.filter((item) => item.index !== currentMeter.index));
        else if(currentMeter.type==='water')
            setWaterMeterList((current) => current.filter((item) => item.index !== currentMeter.index));
        setShowDelete(false);
    };

    //Bottom Page Meter View
    const MeterControls = () => (
        <>
        {showView||showUpdate||showDelete?
        <div style={{position:'fixed',width:'80vw',bottom:0,backgroundColor:'#ffffff99',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5,marginTop:20}}>
            <div style={{padding:5}}>{<button id='update' onClick={handleUpdate.bind(this, currentMeter)}>Update</button>}</div>
            <div style={{padding:5}}>{<button id='delete' onClick={handleDelete.bind(this, currentMeter)}>Delete</button>}</div>
        </div>
        :null}
        </>
    );

    const MeterView = () => (
        <>
        {showView?
        <>
        <table className='listTable' key={currentMeter.index} style={{width:'90%',marginLeft:'5%',marginBottom:50}}>
        <tbody>
            <tr>
                <td className='viewCellStyle2'>Device Name:</td>
                <td className='viewClassStyle1'>{currentMeter.name}</td>
                <td className='viewCellStyle2'>Model:</td>
                <td className='viewClassStyle1'>{currentMeter.model}</td>
                <td className='viewCellStyle2'>Installation Date:</td>
                <td className='viewClassStyle1'>{currentMeter.iDate}</td>
            </tr>
            <tr>
                <td className='viewCellStyle2'>Device ID:</td>
                <td className='viewClassStyle1'>{currentMeter.id}</td>
                <td className='viewCellStyle2'>{currentMeter.type==='electric'?'Amperage Capacity:':'Power:'}</td>
                <td className='viewClassStyle1'>{currentMeter.type==='electric'?currentMeter.capacity:currentMeter.power}</td>
                <td className='viewCellStyle2'>Dimensions:</td>
                <td className='viewClassStyle1'>{currentMeter.dimensions}</td>
            </tr>
            <tr>
                <td className='viewCellStyle2'>Location:</td>
                <td className='viewClassStyle1'>{currentMeter.location}</td>
                <td className='viewCellStyle2'>{currentMeter.type==='electric'?'Installation Method:':'Batteries Included:'}</td>
                <td className='viewClassStyle1'>{currentMeter.type==='electric'?currentMeter.method:currentMeter.batteries}</td>
                <td className='viewCellStyle2'>Deployment Date:</td>
                <td className='viewClassStyle1'>{currentMeter.dDate}</td>
            </tr>
            <tr>
                <td className='viewCellStyle2'>Manufacturer:</td>
                <td className='viewClassStyle1'>{currentMeter.manufacturer}</td>
                <td className='viewCellStyle2'>{currentMeter.type==='electric'?'Measurement Accuracy:':'Battery Cell Type:'}</td>
                <td className='viewClassStyle1'>{currentMeter.type==='electric'?currentMeter.accuracy:currentMeter.batteryType}</td>
                <td className='viewCellStyle2'>{currentMeter.type==='electric'?'Power:':'Item Weight:'}</td>
                <td className='viewClassStyle1'>{currentMeter.type==='electric'?currentMeter.power:currentMeter.weight}</td>
            </tr>
        </tbody>
        </table>
        </>
        :null}
        </>
    );

    const handleView = item => {
        if(item.index===currentMeter.index)
            if(showDelete||showUpdate)
                setShowView(true);
            else
                setShowView(!showView)
        else
            setShowView(true);
        setShowUpdate(false);
        setShowDelete(false);
        setCurrentMeter(item);
    };

    const handleUpdate = item => {
        if(item.index===currentMeter.index)
            setShowUpdate(!showUpdate);
        else
            setShowUpdate(true);
        setShowView(!showView);
        setShowDelete(false);

        setUpdateFormData(item);
        //updateFormData.current = item;
        setUpdateIndex(item.index);
        setUpdateType(item.type)
    };

    const updateMeter = event => {
        event.preventDefault();

        const name = event.target.getAttribute("name");
        const value = event.target.value;

        const newMeter = {...updateFormData};
        newMeter[name] = value;

        setUpdateFormData(newMeter);
        //updateFormData.current = newMeter;
    };
    
    const handleSubmit = event => {
        event.preventDefault();
        
        const newMeter = {index:updateIndex,...updateFormData};

        let newList = [];
        let index = 0;
        if(updateType==='electric'){
            newList = [...electricMeterList];
            index = electricMeterList.findIndex((meter) => meter.index===updateIndex);
        }
        else if(updateType==='water'){
            newList = [...waterMeterList];
            index = waterMeterList.findIndex((meter) => meter.index===updateIndex);
        }

        newList[index] = newMeter;
        if(updateType==='electric')
            setElectricMeterList(newList);
        else if(updateType==='water')
            setWaterMeterList(newList);
        setUpdateIndex(null);
        setUpdateType(null);
    }

    //MT page
    const MTList = () => (
        <table id='MTList'>
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>Status</th>
                    <th>Electricity Capacity</th>
                    <th>Voltage</th>
                    <th>Current</th>
                    <th>Today's Usage</th>
                    <th>Last 24hr Usage</th>
                    <th>This Week's Usage</th>
                    <th>This Month's Usage</th>
                    <th>This Year's Usage</th>
                </tr>
            </thead>
            <tbody>
                {electricityColor?electricMeterList.map(item => (
                <ListMTItem key={item.index} item={item} />
                )):
                waterMeterList.map(item => (
                <ListMTItem key={item.index} item={item} />
                ))}
            </tbody>
        </table>
    );

    const ListMTItem = ({item}) => (
        <tr>
            <td>{item.name}</td>
            <td>{item.type==='electric'?<FaChargingStation size={50} color={'white'}/>:<FaTint size={50} color={'white'}/>}</td>
            <td>{item.status}</td>
            <td>{item.elecCapacity}</td>
            <td>{item.voltage}</td>
            <td>{item.current}</td>
            <td>{item.today}</td>
            <td>{item.hr}</td>
            <td>{item.week}</td>
            <td>{item.month}</td>
            <td>{item.year}</td>
        </tr>
    );

    const MTgraphView = () => (
        <>
        <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',flexShrink:0}}>
            <Dropdown label='View Legend'
            options={[
                {label:'placeholder',value:'N/A'},
            ]}
            value={'View Legend'}
            onChange={handleLegendDropdown.bind(this)}
            />
            <Dropdown label='Select Time'
            options={[
                {label:'24 hours',value:'24 hr'},
                {label:'7 days',value:'7 days'},
                {label:'31 days',value:'31 days'},
            ]}
            value={MTgraph}
            onChange={handleTimeDropdown.bind(this)}
            />
        </div>
        {MTgraph==='24 hr'?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10}}>
        {electricityColor?
            <Line  
            options={options}
            data={electricMThrData}></Line>
        :null}
        {waterColor?
            <Line  
            options={options}
            data={waterMThrData}></Line>
        :null}

        </div>:MTgraph==='24 hr'?<>24 Hours Graph</>:null}
        {MTgraph==='7 days'?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10}}>
        {electricityColor?
            <Line  
            options={options}
            data={electricMT7Data}></Line>
        :null}
        {waterColor?
            <Line  
            options={options}
            data={waterMT7Data}></Line>
        :null}

        </div>:MTgraph==='7 days'?<>7 Days Graph</>:null}
        {MTgraph==='31 days'?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10}}>
        {electricityColor?
            <Line  
            options={options}
            data={electricMT31Data}></Line>
        :null}
        {waterColor?
            <Line  
            options={options}
            data={waterMT31Data}></Line>
        :null}

        </div>:MTgraph==='31 days'?<>31 Days Graph</>:null}
        </>
    );

    const handleLegendDropdown = () => {
        return;
    }

    const handleTimeDropdown = event => {
        setMTgraph(event.target.value);
    };

    //CC page
    const CCList = () => (
        <table className='listTable'>
            <thead>
                <tr>
                    <th className='listCell'>Device ID</th>
                    <th className='listCell'>Device Name</th>
                    <th className='listCell'>Activate</th>
                    <th className='listCell'>Start/Stop</th>
                    <th className='listCell'>Cloud</th>
                    <th className='listCell' style={{width:'20%'}}></th>
                </tr>
            </thead>
            <tbody>
                {electricityColor?electricMeterList.map(item => (
                <ListCCItem key={item.index} item={item} />
                )):
                waterMeterList.map(item => (
                <ListCCItem key={item.index} item={item} />
                ))}
            </tbody>
        </table>
    );

    const ListCCItem = ({ item }) => (
        <tr className='listTR'>
            <td key={item.id} className='listCell'>{item.id}</td>
            <td key={item.name} className='listCell'>{item.name}</td>
            <td className='listCell'><Switch type='a' on={item.activate} on_off={handleToggle.bind(this, item, 'a')}/></td>
            <td className='listCell'><Switch type='s' on={item.start} on_off={handleToggle.bind(this, item, 's')}/></td>
            <td className='listCell'><Switch type='c' on={item.cloud} on_off={handleToggle.bind(this, item, 'c')}/></td>
            <td className='listCell' style={{width:'20%'}}><FaCog size={20} color={'black'} style={{opacity:showConfig&&currentMeter.index==item.index?0.8:0.4}} onClick={handleConfig.bind(this, item)}/></td>
        </tr>
    );

    const ConfigView = () => (
        <>
        {showConfig?
        <>
            <div style={{width:'20%',height:'7%',borderRadius:10,border:'1px solid white',backgroundColor:'#323232',color:'white',opacity:0.9,display:'flex',justifyContent:'center',alignItems:'center',margin:15,flexShrink:0}}>
                <h4 style={{fontSize:"120%"}}>Configuration</h4>          
            </div>
            <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',flexShrink:0}}>
                <Dropdown label='Communication Protocal'
                options={[
                    {label:'TCP/IP',value:'TCP/IP'},
                    {label:'Wi-Fi',value:'Wi-Fi'},
                ]}
                value={currentMeter.communication}
                onChange={handleComDropdown.bind(this)}
                />
                <Dropdown label='Data Reporting Interval'
                options={[
                    {label:'10 seconds',value:'10 sec'},
                    {label:'20 seconds',value:'20 sec'},
                    {label:'30 seconds',value:'30 sec'},
                    {label:'60 seconds',value:'60 sec'},
                ]}
                value={currentMeter.interval}
                onChange={handleIntervalDropdown.bind(this)}
                />
                <Dropdown label='Electronic Loads'
                options={[
                    {label:'AC loads',value:'AC'},
                ]}
                value={currentMeter.loads}
                onChange={handleLoadsDropdown.bind(this)}
                />
            </div>
        </>
        :null}
        </>
    );

    const Dropdown = ({ label, value, options, onChange }) => {
        return (
        <label style={{margin:15,marginLeft:50,marginRight:50,padding:5,justifyContent:'center',textAlign:'center',color:'whitesmoke'}}>
            {label}<br/>
            <select style={{backgroundColor:'#e3e3e3',borderRadius:10,padding:5}} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
              ))}
            </select>
        </label>
        );
    };

    const handleConfig = item => {
        if(item.index===currentMeter.index)
            setShowConfig(!showConfig);
        else
            setShowConfig(true);
        setCurrentMeter(item);
    };

    const handleToggle = (item,type) => {
        if(item.type==='electric'){
            setElectricMeterList(electricMeterList.map(meter => {
                if(meter.index===item.index){
                    if(type==='a')
                        return {...meter,activate:(!item.activate)};
                    else if(type==='s')
                        return {...meter,start:(!item.start)};
                    else if(type==='c')
                        return {...meter,cloud:(!item.cloud)};
                }
                else
                    return meter;
            }));
        }
        else if(item.type==='water'){
            setWaterMeterList(waterMeterList.map(meter => {
                if(meter.index===item.index){
                    if(type==='a')
                        return {...meter,activate:(!item.activate)};
                    else if(type==='s')
                        return {...meter,start:(!item.start)};
                    else if(type==='c')
                        return {...meter,cloud:(!item.cloud)};
                }
                else
                    return meter;
            }));
        }
    };

    const handleComDropdown = event => {
        if(currentMeter.type==='electric'){
            setElectricMeterList(electricMeterList.map(meter => {
                if(meter.index===currentMeter.index){
                    setCurrentMeter({...meter,communication:(event.target.value)});
                    return {...meter,communication:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentMeter.type==='water'){
            setWaterMeterList(waterMeterList.map(meter => {
                if(meter.index===currentMeter.index){
                    setCurrentMeter({...meter,communication:(event.target.value)});
                    return {...meter,communication:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
    };
    const handleIntervalDropdown = event => {
        if(currentMeter.type==='electric'){
            setElectricMeterList(electricMeterList.map(meter => {
                if(meter.index===currentMeter.index){
                    setCurrentMeter({...meter,interval:(event.target.value)});
                    return {...meter,interval:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentMeter.type==='water'){
            setWaterMeterList(waterMeterList.map(meter => {
                if(meter.index===currentMeter.index){
                    setCurrentMeter({...meter,interval:(event.target.value)});
                    return {...meter,interval:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
    };
    const handleLoadsDropdown = event => {
        if(currentMeter.type==='electric'){
            setElectricMeterList(electricMeterList.map(meter => {
                if(meter.index===currentMeter.index){
                    setCurrentMeter({...meter,loads:(event.target.value)});
                    return {...meter,loads:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentMeter.type==='water'){
            setWaterMeterList(waterMeterList.map(meter => {
                if(meter.index===currentMeter.index){
                    setCurrentMeter({...meter,loads:(event.target.value)});
                    return {...meter,loads:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
    };

    //meter placeholder data
    const [dayData,setDayData]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[{
            label:"Usage Chart",
            data:[4,12,27,31,29,25,37,47,61,84],
            borderColor:"orange",
            tension:0.4,
            pointRadius:0,
            backgroundColor:"orange"
        }]
    })
    const [weekData,setWeekData]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[{
            label:"Usage Chart",
            data:[10,15,21,31,25,22,31,45,67,89],
            borderColor:"orange",
            tension:0.4,
            pointRadius:0,
            backgroundColor:"orange"
        }]
    })
    const [monthData,setMonthData]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[{
            label:"Usage Chart",
            data:[1,9,14,25,29,27,37,43,51,74],
            borderColor:"orange",
            tension:0.4,
            pointRadius:0,
            backgroundColor:"orange"
        }]
    })
    const [yearData,setYearData]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[{
            label:"Usage Chart",
            data:[4,12,25,32,39,45,57,67,71,94],
            borderColor:"orange",
            tension:0.4,
            pointRadius:0,
            backgroundColor:"orange"
        }]
    })

    const [electricMThrData,setElectricMThrData]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[{
            label:"Usage Chart",
            data:[4,12,25,32,39,45,57,67,71,94],
            borderColor:"orange",
            tension:0.4,
            pointRadius:0,
            backgroundColor:"orange"
        }]
    })
    const [electricMT7Data,setElectricMT7Data]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[{
            label:"Usage Chart",
            data:[4,12,25,92,49,45,57,67,81,124],
            borderColor:"orange",
            tension:0.4,
            pointRadius:0,
            backgroundColor:"orange"
        }]
    })
    const [electricMT31Data,setElectricMT31Data]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[{
            label:"Usage Chart",
            data:[80,70,60,40,39,45,57,67,71,94],
            borderColor:"orange",
            tension:0.4,
            pointRadius:0,
            backgroundColor:"orange"
        }]
    })
    const [waterMThrData,setWaterMThrData]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[{
            label:"Usage Chart",
            data:[4,12,25,32,39,45,57,67,71,94],
            borderColor:"aqua",
            tension:0.4,
            pointRadius:0,
            backgroundColor:"aqua"
        }]
    })
    const [waterMT7Data,setWaterMT7Data]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[{
            label:"Usage Chart",
            data:[4,12,25,92,49,45,57,67,81,124],
            borderColor:"aqua",
            tension:0.4,
            pointRadius:0,
            backgroundColor:"aqua"
        }]
    })
    const [waterMT31Data,setWaterMT31Data]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[{
            label:"Usage Chart",
            data:[80,70,60,40,39,45,57,67,71,94],
            borderColor:"aqua",
            tension:0.4,
            pointRadius:0,
            backgroundColor:"aqua"
        }]
    })

    //placeholder graph options
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

    return(
    <>
    <div style={{width:'100%',height:'15%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',paddingBottom:'20px'}}>
        <div onClick={()=>{
            console.log("onclick")
            setElectricityColor(!electricityColor)
            setWaterColor(0)
            setShowUpdate(false)
            setShowView(false)
            setShowDelete(false)
            setShowConfig(false)

        }}id='EMeter' className='MeterLabel' style={{fontSize:1,opacity:electricityColor?1:0.6}}>
            <h6 style={{fontSize:14, color:'white',fontWeight:'bold'}}>Electricity Meter</h6>
        </div>
        <div 
        onClick={()=>{
            console.log("onclick")
            setWaterColor(!waterColor)
            setElectricityColor(0)
            setShowUpdate(false)
            setShowView(false)
            setShowDelete(false)
            setShowConfig(false)
            
        }}id='WMeter' className='MeterLabel' style={{fontSize:1,opacity:waterColor?1:0.6}}>
            <h6 style={{fontSize:14,color:'white',fontWeight:'bold'}}>Water Meter</h6>
        </div>
    </div>

    {electricityColor&&homeColor?
    <div>
    <div style={{height:'15%',flexDirection:'row',display:'flex'}}>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Today's Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>29 KWh</h4>

    </div>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Last 24hr Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>71 KWh</h4>

    </div>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Last Update</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>9/14/22</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>18:22</h4>

    </div>
    </div>

    <div style={{width:'20%',borderRadius:5, backgroundColor:"skyblue",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:5,marginTop:15,marginBottom:15,padding:5,flexShrink:0}}>
        <h4 style={{fontSize:"120%"}}>This Week's Overview</h4>
        
    </div>

    <div style={{height:'15%',flexDirection:'row',display:'flex'}}>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Total Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>574 KWh</h4>

    </div>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Avg. Daily Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>82 KWh</h4>

    </div>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Max Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>97 KWh</h4>

    </div>
    </div>

    <div style={{width:'20%',borderRadius:5, backgroundColor:"skyblue",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:5,marginTop:15,marginBottom:15,padding:5,flexShrink:0}}>
        <h4 style={{fontSize:"120%"}}>This Month's Overview</h4>
        
    </div>


    <div style={{height:'15%',flexDirection:'row',display:'flex'}}>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Total Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>2370 KWh</h4>

    </div>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Avg. Daily Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>79 KWh</h4>

    </div>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Max Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>112 KWh</h4>

    </div>
    </div>


    <div style={{height:'10%',flexDirection:'row',display:'flex',marginTop:50,paddingBlock:20}}>
        <div style={{width:'12%',borderRadius:5, backgroundColor:"skyblue",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:5,marginRight:400,flexShrink:0}}>
        <h4 style={{fontSize:"120%"}}>Usage Chart</h4>
        
        </div>
        <div onClick={()=>{
            console.log("onclick")
            setDayColor(1)
            setWeekColor(0)
            setMonthColor(0)
            setYearColor(0)

            }} style={{width:'7%',display:'flex',backgroundColor:"lightgray",backgroundSize:50,justifyContent:'center',textAlign:'center',alignItems:'center',flexDirection:'column',marginRight:10,flexShrink:0}}>
            <h6 style={{fontSize:14, color:dayColor?'green':'black',fontWeight:'bold'}}>Day</h6>
        </div>
        <div onClick={()=>{
            console.log("onclick")
            setDayColor(0)
            setWeekColor(1)
            setMonthColor(0)
            setYearColor(0)

            }} style={{width:'7%',display:'flex',backgroundColor:"lightgray",backgroundSize:50,justifyContent:'center',textAlign:'center',alignItems:'center',flexDirection:'column',marginRight:10,flexShrink:0}}>
            <h6 style={{fontSize:14, color:weekColor?'green':'black',fontWeight:'bold'}}>Week</h6>
        </div>
        <div onClick={()=>{
            console.log("onclick")
            setDayColor(0)
            setWeekColor(0)
            setMonthColor(1)
            setYearColor(0)

            }} style={{width:'7%',display:'flex',backgroundColor:"lightgray",backgroundSize:50,justifyContent:'center',textAlign:'center',alignItems:'center',flexDirection:'column',marginRight:10,flexShrink:0}}>
            <h6 style={{fontSize:14, color:monthColor?'green':'black',fontWeight:'bold'}}>Month</h6>
        </div>
        <div onClick={()=>{
            console.log("onclick")
            setDayColor(0)
            setWeekColor(0)
            setMonthColor(0)
            setYearColor(1)

            }} style={{width:'7%',display:'flex',backgroundColor:"lightgray",backgroundSize:50,justifyContent:'center',textAlign:'center',alignItems:'center',flexDirection:'column',marginRight:10,flexShrink:0}}>
            <h6 style={{fontSize:14, color:yearColor?'green':'black',fontWeight:'bold'}}>Year</h6>
        </div>
    </div>

        {dayColor?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10,flexShrink:0}}>
                        
        <Line  
            options={options}
            data={dayData}></Line>

        </div>:dayColor?<>Day Graph</>:null}
        {weekColor?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10,flexShrink:0}}>
                        
        <Line  
            options={options}
            data={weekData}></Line>

        </div>:weekColor?<>Week Graph</>:null}
        {monthColor?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10,flexShrink:0}}>
                        
        <Line  
            options={options}
            data={monthData}></Line>

        </div>:monthColor?<>Month Graph</>:null}
        {yearColor?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10,flexShrink:0}}>
                        
        <Line  
            options={options}
            data={yearData}></Line>

        </div>:yearColor?<>Year Graph</>:null}

    </div>:electricityColor&&homeColor?<>Electricity Meter</>:null}

    {waterColor&&homeColor?
    <div>
    <div style={{height:'15%',flexDirection:'row',display:'flex'}}>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Today's Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>29 gal</h4>

    </div>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Last 24hr Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>82 gal</h4>

    </div>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Last Update</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>9/14/22</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>18:22</h4>

    </div>
    </div>

    <div style={{width:'20%',borderRadius:5, backgroundColor:"skyblue",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:5,marginTop:15,marginBottom:15,padding:5,flexShrink:0}}>
        <h4 style={{fontSize:"120%"}}>This Week's Overview</h4>
        
    </div>

    <div style={{height:'15%',flexDirection:'row',display:'flex'}}>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Total Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>574 gal</h4>

    </div>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Avg. Daily Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>82 gal</h4>

    </div>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Max Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>97 gal</h4>

    </div>
    </div>

    <div style={{width:'20%',borderRadius:5, backgroundColor:"skyblue",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:5,marginTop:15,marginBottom:15,padding:5,flexShrink:0}}>
        <h4 style={{fontSize:"120%"}}>This Month's Overview</h4>
        
    </div>


    <div style={{height:'15%',flexDirection:'row',display:'flex'}}>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Total Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>2370 gal</h4>

    </div>
        <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
            <h4>Avg. Daily Usage</h4>
            <h4 style={{color:"darkgreen",fontSize:"150%"}}>79 gal</h4>

        </div>
    <div style={{width:'20%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:50,marginRight:50,flexShrink:0}}>
        <h4>Max Usage</h4>
        <h4 style={{color:"darkgreen",fontSize:"150%"}}>112 gal</h4>

    </div>
    </div>
    
    <div style={{height:'10%',flexDirection:'row',display:'flex',marginTop:50,paddingBlock:20}}>
        <div style={{width:'12%',borderRadius:5, backgroundColor:"skyblue",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:5,marginRight:400,flexShrink:0}}>
        <h4 style={{fontSize:"120%"}}>Usage Chart</h4>
        
        </div>
        <div onClick={()=>{
            console.log("onclick")
            setDayColor(1)
            setWeekColor(0)
            setMonthColor(0)
            setYearColor(0)

            }} style={{width:'7%',display:'flex',backgroundColor:"lightgray",backgroundSize:50,justifyContent:'center',textAlign:'center',alignItems:'center',flexDirection:'column',marginRight:10,flexShrink:0}}>
            <h6 style={{fontSize:14, color:dayColor?'green':'black',fontWeight:'bold'}}>Day</h6>
        </div>
        <div onClick={()=>{
            console.log("onclick")
            setDayColor(0)
            setWeekColor(1)
            setMonthColor(0)
            setYearColor(0)

            }} style={{width:'7%',display:'flex',backgroundColor:"lightgray",backgroundSize:50,justifyContent:'center',textAlign:'center',alignItems:'center',flexDirection:'column',marginRight:10,flexShrink:0}}>
            <h6 style={{fontSize:14, color:weekColor?'green':'black',fontWeight:'bold'}}>Week</h6>
        </div>
        <div onClick={()=>{
            console.log("onclick")
            setDayColor(0)
            setWeekColor(0)
            setMonthColor(1)
            setYearColor(0)

            }} style={{width:'7%',display:'flex',backgroundColor:"lightgray",backgroundSize:50,justifyContent:'center',textAlign:'center',alignItems:'center',flexDirection:'column',marginRight:10,flexShrink:0}}>
            <h6 style={{fontSize:14, color:monthColor?'green':'black',fontWeight:'bold'}}>Month</h6>
        </div>
        <div onClick={()=>{
            console.log("onclick")
            setDayColor(0)
            setWeekColor(0)
            setMonthColor(0)
            setYearColor(1)

            }} style={{width:'7%',display:'flex',backgroundColor:"lightgray",backgroundSize:50,justifyContent:'center',textAlign:'center',alignItems:'center',flexDirection:'column',marginRight:10,flexShrink:0}}>
            <h6 style={{fontSize:14, color:yearColor?'green':'black',fontWeight:'bold'}}>Year</h6>
        </div>
    </div>
        {dayColor?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10,flexShrink:0}}>
                        
        <Line  
            options={options}
            data={dayData}></Line>

        </div>:dayColor?<>Day Color</>:null}
        {weekColor?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10,flexShrink:0}}>
                        
        <Line  
            options={options}
            data={weekData}></Line>

        </div>:weekColor?<>Week Graph</>:null}
        {monthColor?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10,flexShrink:0}}>
                        
        <Line  
            options={options}
            data={monthData}></Line>

        </div>:monthColor?<>Month Graph</>:null}
        {yearColor?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10,flexShrink:0}}>
                        
        <Line  
            options={options}
            data={yearData}></Line>

        </div>:yearColor?<>Year Graph</>:null}

    </div>:waterColor&&homeColor?<>Water Meter</>:null}



    {deviceMColor&&electricityColor?
    <>
        <MeterList/>

        {showView||showUpdate?
        <div style={{width:'20%',height:'7%',borderRadius:10,border:'1px solid white',backgroundColor:'#323232',color:'white',opacity:0.9,display:'flex',justifyContent:'center',alignItems:'center',margin:15,flexShrink:0}}>
            <h4 style={{fontSize:"120%"}}>Device Information</h4>
        </div>
        :null}
        <MeterView/>
        <DeleteView/>
        
        <form key={updateIndex} style={{width:'90%',background:'inherit',marginLeft:'5%',padding:0,marginTop:0,border:0,marginBottom:50}} onSubmit={handleSubmit.bind(this)}>
        <MeterUpdate showUpdate={showUpdate} updateFormData={updateFormData} updateMeter={updateMeter} type='electric'/>
        <button type='submit' style={{height:0,width:0,background:'transparent',border:0,font:0}}></button>
        </form>
        <MeterControls/>
    </>:deviceMColor&&electricityColor?<>Device Management Page</>:null}
    {deviceMColor&&waterColor?
    <>
        <MeterList/>

        {showView||showUpdate?
        <div style={{width:'20%',height:'7%',borderRadius:10,border:'1px solid white',backgroundColor:'#323232',color:'white',opacity:0.9,display:'flex',justifyContent:'center',alignItems:'center',margin:15,flexShrink:0}}>
            <h4 style={{fontSize:"120%"}}>Device Information</h4>
        </div>
        :null}
        <MeterView/>
        <DeleteView/>

        <form key={updateIndex} style={{width:'90%',background:'inherit',marginLeft:'5%',padding:0,marginTop:0,border:0,columnGap:250}} onSubmit={handleSubmit.bind(this)}>
        <MeterUpdate showUpdate={showUpdate} updateFormData={updateFormData} updateMeter={updateMeter} type='water'/>
        <button type='submit' style={{height:0,width:0,background:'transparent',border:0,font:0}}></button>
        </form>
        <MeterControls/>
    </>:deviceMColor&&waterColor?<>Device Management Page</>:null}

    {mtColor&&electricityColor?
    <>
        <MTList/>

        <MTgraphView/>
    </>:mtColor&&electricityColor?<>Monitor & Tracking Page</>:null}
    {mtColor&&waterColor?
    <>
        <MTList/>

        <MTgraphView/>
    </>:mtColor&&waterColor?<>Monitor & Tracking Page</>:null}

    {ccColor&&electricityColor?
    <>
        <CCList/>

        <ConfigView/>
    </>:ccColor&&electricityColor?<>Control & Configuration Page</>:null}
    {ccColor&&waterColor?
    <>
        <CCList/>

        <ConfigView/>
    </>:ccColor&&waterColor?<>Control & Configuration Page</>:null}
    </>
    )
}