import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCog, FaCloudSunRain, FaSeedling, FaLightbulb, FaFan } from 'react-icons/fa';

import { SideBarContext } from './LoginPage'
import IOTUpdate from '../IOTUpdateTable';
import Switch from '../Switch';
import ProgressBar from '../ProgressBar';

import '../../App.css'
import './IOTPage.css'
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS,LineController,LineElement,Title,Tooltip,Legend,CategoryScale,LinearScale,PointElement} from 'chart.js' 
ChartJS.register(
    Title,Tooltip,Legend,LineElement,
    CategoryScale,LinearScale,PointElement
)

export default function IOTPage() {
    //SideBar
    const {homeColor,setHomeColor} = React.useContext(SideBarContext);
    const {deviceMColor,setDeviceMColor}= React.useContext(SideBarContext);
    const {mtColor,setmtColor} = React.useContext(SideBarContext);
    const {ccColor,setccColor} = React.useContext(SideBarContext);

    //iot page
    const [weatherColor,setWeatherColor]=useState(0);
    const [soilColor,setSoilColor]=useState(0);
    const [lightColor,setLightColor]=useState(0);
    const [fanColor,setFanColor]=useState(0);
    const [dayColor,setDayColor]=useState(1);
    const [weekColor,setWeekColor]=useState(0);
    const [monthColor,setMonthColor]=useState(0);
    const [yearColor,setYearColor]=useState(0);
    //MT page
    const [MTgraph,setMTgraph]=useState('24 hr');

    //Home Page info
    const [weatherHumidity,setWeatherHumidity]=useState(70);
    const [soilHumidity,setSoilHumidity]=useState(65);
    const [temperature,setTemperature]=useState(85);
    const [luminosity,setLuminosity]=useState(82);
    const [pHValue,setpHValue]=useState(4.6);
    const [fanSpeed,setFanSpeed]=useState(4000);


    const [weatherList, setWeatherList] = React.useState([{type:'weather',index:1,id:'WEAS001',name:'Weather Sensor 1',location:'Building B',manufacturer:'AcuRite',tempRange:'-40 to 158°F',tempAccuracy:'+/- 1°F',humidityRange:'1-99% RH',humidityAccuracy:'+/- 2% RH',iDate:'8/16/2022',dimensions:'5.3 x 1 x 3.8 in.',dDate:'8/19/2022',power:'4 AA Alkine Batteries',temp:'75°F',relHumidity:'70%',windSpeed:'144 mph',airPressure:'144 kPa',precipitation:'0.33 mm',voltage:'10 V',current:'5 A',activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'Online'}]);
    const [soilList, setSoilList] = React.useState([{type:'soil',index:1,id:'SOIL001',name:'Soil Sensor 1',location:'Building C',manufacturer:'AcuRite',tempRange:'-40 to 158°F',tempAccuracy:'+/- 1°F',humidityRange:'1-99% RH',humidityAccuracy:'+/- 3% RH',iDate:'8/16/2022',dimensions:'4.3 x 1 x 5.8 in.',dDate:'8/19/2022',power:'4 AA Alkine Batteries',temp:'72°F',relHumidity:'70%',waterContent:'30%',waterTension:'30 cb',voltage:'9 V',current:'6 A',activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'Online'}]);
    const [lightList, setLightList] = React.useState([{type:'light',index:1,id:'LIGHT001',name:'Light 1',location:'Building C',manufacturer:'GVSHINE',model:'GV1006',illumination:'2 * 1 watt bulbs',illumTime:'13 hours',wattage:'12 watts',iDate:'8/17/2022',dimensions:'3.54 x 9.45 x 7.48 in.',dDate:'8/19/2022',power:'PV powered',inputPower:'40 KW',lumEfficacy:'70%',lumFlux:'4.6 lm',lumIntensity:'23 cd',voltage:'10 V',current:'7 A',activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'Online'}]);
    const [fanList, setFanList] = React.useState([{type:'fan',index:1,id:'FAN001',name:'Fan 1',location:'Building B',manufacturer:'HealSmart',model:'Wall Mount Fan',numOfSpeeds:'5',fanDesign:'Wall Fan',weight:'31 lbs.',iDate:'8/17/2022',dimensions:'27.6 x 16.5 x 20.5 in.',dDate:'8/19/2022',power:'Corded Electric',fanSpeed:'8.2 m/s',speedSetting:'4',rotationDirection:'Clockwise',voltage:'115 V',current:'122 A',activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'Online'}]);
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
        tempRange:'',
        tempAccuracy:'',
        humidityRange:'',
        humidityAccuracy:'',
        iDate:'',
        dimensions:'',
        dDate:'',
        power:'',
        model:'',
        illumination:'',
        illumTime:'',
        wattage:'',
        numOfSpeeds:'',
        fanDesign:'',
        weight:''
    });
    const [currentIOT, setCurrentIOT] = React.useState({});
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
                {weatherColor?weatherList.map(item => (
                <ListItem key={item.index} item={item} />
                )):null}
                {soilColor?soilList.map(item => (
                <ListItem key={item.index} item={item} />
                )):null}
                {lightColor?lightList.map(item => (
                <ListItem key={item.index} item={item} />
                )):null}
                {fanColor?fanList.map(item => (
                <ListItem key={item.index} item={item} />
                )):null}
            </tbody>
        </table>
    );

    const ListItem = ({ item }) => (
        <tr className='listTR'>
            <td key={item.id} className='listCell'>{item.id}</td>
            <td key={item.name} className='listCell dmName'>{item.name}</td>
            <td key={item.view} className='listCell'>{<button id='view' style={{opacity:(showView||showUpdate||showDelete)&&currentIOT.index==item.index?1:0.7}} onClick={handleView.bind(this, item)}>{(showView||showUpdate||showDelete)&&currentIOT.index==item.index?'Viewing':'View'}</button>}</td>
        </tr>
    );

    const handleAdd = () => {
        if(weatherColor){
            const index = weatherList.length ? weatherList.length+1:1;
            const zeros = '000';
            const id = 'WEAS'+zeros.substring(0,3-index.toString().length)+index;
            const name = 'Weather Sensor '+index;
            setWeatherList(weatherList.concat({type:'weather',index:index,id:id,name:name,activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'N/A'}));    
        }
        else if(soilColor){
            const index = soilList.length ? soilList.length+1:1;
            const zeros = '000';
            const id = 'SOIL'+zeros.substring(0,3-index.toString().length)+index;
            const name = 'Soil Sensor '+index;
            setSoilList(soilList.concat({type:'soil',index:index,id:id,name:name,activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'N/A'}));
        }
        else if(lightColor){
            const index = lightList.length ? lightList.length+1:1;
            const zeros = '000';
            const id = 'LIGHT'+zeros.substring(0,3-index.toString().length)+index;
            const name = 'Light '+index;
            setLightList(lightList.concat({type:'light',index:index,id:id,name:name,activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'N/A'}));
        }
        else if(fanColor){
            const index = fanList.length ? fanList.length+1:1;
            const zeros = '000';
            const id = 'FAN'+zeros.substring(0,3-index.toString().length)+index;
            const name = 'Fan '+index;
            setFanList(fanList.concat({type:'fan',index:index,id:id,name:name,activate:false,start:false,cloud:false,communication:'',interval:'',loads:'',status:'N/A'}));
        }
    }

    const DeleteView = () => (
        <>
        {showDelete?
        <>
        <span style={{textAlign:'center',justifyContent:'center',marginBottom:10,marginTop:10,marginLeft:30,fontSize:20,fontWeight:'bold'}}>Are you sure you want to delete {currentIOT.name}?</span>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'7%',marginBottom:50,flexShrink:0}}>
            <button style={{color:'white',backgroundColor:'firebrick',borderRadius:'50%',marginRight:20,width:'5%',height:'100%',fontSize:40}} onClick={cancelDelete.bind(this)}>X</button>
            <button style={{color:'white',backgroundColor:'forestgreen',borderRadius:'50%',marginLeft:20,width:'5%',height:'100%',fontSize:40}} onClick={deleteMeter.bind(this)}>&#10003;</button>
        </div>
        </>
        :null}
        </>
    );

    const handleDelete = () => {
        //if(index==currentIOT.index)
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
        if(currentIOT.type==='weather')
            setWeatherList((current) => current.filter((item) => item.index !== currentIOT.index));
        else if(currentIOT.type==='soil')
            setSoilList((current) => current.filter((item) => item.index !== currentIOT.index));
        else if(currentIOT.type==='light')
            setLightList((current) => current.filter((item) => item.index !== currentIOT.index));
        else if(currentIOT.type==='fan')
            setFanList((current) => current.filter((item) => item.index !== currentIOT.index));
        setShowDelete(false);
    };

    //Bottom Page Meter View
    const MeterControls = () => (
        <>
        {showView||showUpdate||showDelete?
        <div style={{position:'fixed',width:'80vw',bottom:0,backgroundColor:'#ffffff99',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5,marginTop:20}}>
            <div style={{padding:5}}>{<button id='update' onClick={handleUpdate.bind(this, currentIOT)}>Update</button>}</div>
            <div style={{padding:5}}>{<button id='delete' onClick={handleDelete.bind(this, currentIOT)}>Delete</button>}</div>
        </div>
        :null}
        </>
    );

    const MeterView = () => (
        <>
        {showView?
        <>
        <table className='listTable' key={currentIOT.index} style={{width:'90%',marginLeft:'5%',marginBottom:50}}>
        <tbody>
            <tr>
                <td className='viewCellStyle2'>Device Name:</td>
                <td className='viewClassStyle1'>{currentIOT.name}</td>
                <td className='viewCellStyle2'>{currentIOT.type==='weather'||currentIOT.type==='soil'?'Temperature Range:':'Model:'}</td>
                <td className='viewClassStyle1'>{currentIOT.type==='weather'||currentIOT.type==='soil'?currentIOT.tempRange:currentIOT.model}</td>
                <td className='viewCellStyle2'>Installation Date:</td>
                <td className='viewClassStyle1'>{currentIOT.iDate}</td>
            </tr>
            <tr>
                <td className='viewCellStyle2'>Device ID:</td>
                <td className='viewClassStyle1'>{currentIOT.id}</td>
                <td className='viewCellStyle2'>{currentIOT.type==='weather'||currentIOT.type==='soil'?'Temperature Accuracy:':null}{currentIOT.type==='light'?'Illumination:':null}{currentIOT.type==='fan'?'Number of Speeds:':null}</td>
                <td className='viewClassStyle1'>{currentIOT.type==='weather'||currentIOT.type==='soil'?currentIOT.tempAccuracy:null}{currentIOT.type==='light'?currentIOT.illumination:null}{currentIOT.type==='fan'?currentIOT.numOfSpeeds:null}</td>
                <td className='viewCellStyle2'>Dimensions:</td>
                <td className='viewClassStyle1'>{currentIOT.dimensions}</td>
            </tr>
            <tr>
                <td className='viewCellStyle2'>Location:</td>
                <td className='viewClassStyle1'>{currentIOT.location}</td>
                <td className='viewCellStyle2'>{currentIOT.type==='weather'||currentIOT.type==='soil'?'Humidity Range:':null}{currentIOT.type==='light'?'Illumination Time:':null}{currentIOT.type==='fan'?'Fan Design:':null}</td>
                <td className='viewClassStyle1'>{currentIOT.type==='weather'||currentIOT.type==='soil'?currentIOT.humidityRange:null}{currentIOT.type==='light'?currentIOT.illumTime:null}{currentIOT.type==='fan'?currentIOT.fanDesign:null}</td>
                <td className='viewCellStyle2'>Deployment Date:</td>
                <td className='viewClassStyle1'>{currentIOT.dDate}</td>
            </tr>
            <tr>
                <td className='viewCellStyle2'>Manufacturer:</td>
                <td className='viewClassStyle1'>{currentIOT.manufacturer}</td>
                <td className='viewCellStyle2'>{currentIOT.type==='weather'||currentIOT.type==='soil'?'Humidity Accuracy:':null}{currentIOT.type==='light'?'Wattage:':null}{currentIOT.type==='fan'?'Weight:':null}</td>
                <td className='viewClassStyle1'>{currentIOT.type==='weather'||currentIOT.type==='soil'?currentIOT.humidityAccuracy:null}{currentIOT.type==='light'?currentIOT.wattage:null}{currentIOT.type==='fan'?currentIOT.weight:null}</td>
                <td className='viewCellStyle2'>Power:</td>
                <td className='viewClassStyle1'>{currentIOT.power}</td>
            </tr>
        </tbody>
        </table>
        </>
        :null}
        </>
    );

    const handleView = item => {
        if(item.index===currentIOT.index)
            if(showDelete||showUpdate)
                setShowView(true);
            else
                setShowView(!showView)
        else
            setShowView(true);
        setShowUpdate(false);
        setShowDelete(false);
        setCurrentIOT(item);
    };

    const handleUpdate = item => {
        if(item.index===currentIOT.index)
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

    const updateIOT = event => {
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
        if(updateType==='weather'){
            newList = [...weatherList];
            index = weatherList.findIndex((meter) => meter.index===updateIndex);
        }
        else if(updateType==='soil'){
            newList = [...soilList];
            index = soilList.findIndex((meter) => meter.index===updateIndex);
        }
        else if(updateType==='light'){
            newList = [...lightList];
            index = lightList.findIndex((meter) => meter.index===updateIndex);
        }
        else if(updateType==='fan'){
            newList = [...fanList];
            index = fanList.findIndex((meter) => meter.index===updateIndex);
        }

        newList[index] = newMeter;
        if(updateType==='weather')
            setWeatherList(newList);
        else if(updateType==='soil')
            setSoilList(newList);
        else if(updateType==='light')
            setLightList(newList);
        else if(updateType==='fan')
            setFanList(newList);
        setUpdateIndex(null);
        setUpdateType(null);
    }

    //MT page
    const MTList = () => (
        <table id='MTList'>
            <thead>
                {weatherColor?<tr>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>Status</th>
                    <th>Temperature</th>
                    <th>Relative Humidity</th>
                    <th>Wind Speed</th>
                    <th>Air Pressure</th>
                    <th>Precipitation</th>
                    <th>Voltage</th>
                    <th>Current</th>
                </tr>:null}
                {soilColor?<tr>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>Status</th>
                    <th>Temperature</th>
                    <th>Relative Humidity</th>
                    <th>Water Content</th>
                    <th>Water Tension</th>
                    <th>Voltage</th>
                    <th>Current</th>
                </tr>:null}
                {lightColor?<tr>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>Status</th>
                    <th>Input Power</th>
                    <th>Luminous Efficacy</th>
                    <th>Luminous Flux</th>
                    <th>Luminous Intensity</th>
                    <th>Voltage</th>
                    <th>Current</th>
                </tr>:null}
                {fanColor?<tr>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>Status</th>
                    <th>Fan Speed</th>
                    <th>Speed Setting</th>
                    <th>Rotation Direction</th>
                    <th>Voltage</th>
                    <th>Current</th>
                </tr>:null}
            </thead>
            <tbody>
                {weatherColor?weatherList.map(item => (
                <ListIOTItem key={item.index} item={item} />
                )):null}
                {soilColor?soilList.map(item => (
                <ListIOTItem key={item.index} item={item} />
                )):null}
                {lightColor?lightList.map(item => (
                <ListIOTItem key={item.index} item={item} />
                )):null}
                {fanColor?fanList.map(item => (
                <ListIOTItem key={item.index} item={item} />
                )):null}
            </tbody>
        </table>
    );

    const ListIOTItem = ({item}) => (
        <>
        {weatherColor?<tr>
            <td>{item.name}</td>
            <td><FaCloudSunRain size={50} color={'white'}/></td>
            <td>{item.status}</td>
            <td>{item.temp}</td>
            <td>{item.relHumidity}</td>
            <td>{item.windSpeed}</td>
            <td>{item.airPressure}</td>
            <td>{item.precipitation}</td>
            <td>{item.voltage}</td>
            <td>{item.current}</td>
        </tr>:null}
        {soilColor?<tr>
            <td>{item.name}</td>
            <td><FaSeedling size={50} color={'white'}/></td>
            <td>{item.status}</td>
            <td>{item.temp}</td>
            <td>{item.relHumidity}</td>
            <td>{item.waterContent}</td>
            <td>{item.waterTension}</td>
            <td>{item.voltage}</td>
            <td>{item.current}</td>
        </tr>:null}
        {lightColor?<tr>
            <td>{item.name}</td>
            <td><FaLightbulb size={50} color={'white'}/></td>
            <td>{item.status}</td>
            <td>{item.inputPower}</td>
            <td>{item.lumEfficacy}</td>
            <td>{item.lumFlux}</td>
            <td>{item.lumIntensity}</td>
            <td>{item.voltage}</td>
            <td>{item.current}</td>
        </tr>:null}
        {fanColor?<tr>
            <td>{item.name}</td>
            <td><FaFan size={50} color={'white'}/></td>
            <td>{item.status}</td>
            <td>{item.fanSpeed}</td>
            <td>{item.speedSetting}</td>
            <td>{item.rotationDirection}</td>
            <td>{item.voltage}</td>
            <td>{item.current}</td>
        </tr>:null}
        </>
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
        {weatherColor?
            <Line  
            options={options}
            data={weatherMThrData}></Line>
        :null}
        {soilColor?
            <Line  
            options={options}
            data={soilMThrData}></Line>
        :null}
        {lightColor?
            <Line  
            options={options}
            data={lightMThrData}></Line>
        :null}
        {fanColor?
            <Line  
            options={options}
            data={fanMThrData}></Line>
        :null}

        </div>:MTgraph==='24 hr'?<>24 Hours Graph</>:null}
        {MTgraph==='7 days'?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10}}>
        {weatherColor?
            <Line  
            options={options}
            data={weatherMT7Data}></Line>
        :null}
        {soilColor?
            <Line  
            options={options}
            data={soilMT7Data}></Line>
        :null}
        {lightColor?
            <Line  
            options={options}
            data={lightMT7Data}></Line>
        :null}
        {fanColor?
            <Line  
            options={options}
            data={fanMT7Data}></Line>
        :null}

        </div>:MTgraph==='7 days'?<>7 Days Graph</>:null}
        {MTgraph==='31 days'?
        <div style={{width:'70%',display:'flex',borderLeft:'1px solid lightGray',paddingBottom:10}}>
        {weatherColor?
            <Line  
            options={options}
            data={weatherMT31Data}></Line>
        :null}
        {soilColor?
            <Line  
            options={options}
            data={soilMT31Data}></Line>
        :null}
        {lightColor?
            <Line  
            options={options}
            data={lightMT31Data}></Line>
        :null}
        {fanColor?
            <Line  
            options={options}
            data={fanMT31Data}></Line>
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
                {weatherColor?weatherList.map(item => (
                <ListCCItem key={item.index} item={item} />
                )):null}
                {soilColor?soilList.map(item => (
                <ListCCItem key={item.index} item={item} />
                )):null}
                {lightColor?lightList.map(item => (
                <ListCCItem key={item.index} item={item} />
                )):null}
                {fanColor?fanList.map(item => (
                <ListCCItem key={item.index} item={item} />
                )):null}
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
            <td className='listCell' style={{width:'20%'}}><FaCog size={20} color={'black'} style={{opacity:showConfig&&currentIOT.index==item.index?0.8:0.4}} onClick={handleConfig.bind(this, item)}/></td>
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
                value={currentIOT.communication}
                onChange={handleComDropdown.bind(this)}
                />
                <Dropdown label='Data Reporting Interval'
                options={[
                    {label:'10 seconds',value:'10 sec'},
                    {label:'20 seconds',value:'20 sec'},
                    {label:'30 seconds',value:'30 sec'},
                    {label:'60 seconds',value:'60 sec'},
                ]}
                value={currentIOT.interval}
                onChange={handleIntervalDropdown.bind(this)}
                />
                <Dropdown label='Electronic Loads'
                options={[
                    {label:'AC loads',value:'AC'},
                ]}
                value={currentIOT.loads}
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
        if(item.index===currentIOT.index)
            setShowConfig(!showConfig);
        else
            setShowConfig(true);
        setCurrentIOT(item);
    };

    const handleToggle = (item,type) => {
        if(item.type==='weather'){
            setWeatherList(weatherList.map(meter => {
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
        else if(item.type==='soil'){
            setSoilList(soilList.map(meter => {
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
        else if(item.type==='light'){
            setLightList(lightList.map(meter => {
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
        else if(item.type==='fan'){
            setFanList(fanList.map(meter => {
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
        if(currentIOT.type==='weather'){
            setWeatherList(weatherList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,communication:(event.target.value)});
                    return {...meter,communication:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentIOT.type==='soil'){
            setSoilList(soilList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,communication:(event.target.value)});
                    return {...meter,communication:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentIOT.type==='light'){
            setLightList(lightList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,communication:(event.target.value)});
                    return {...meter,communication:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentIOT.type==='fan'){
            setFanList(fanList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,communication:(event.target.value)});
                    return {...meter,communication:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
    };
    const handleIntervalDropdown = event => {
        if(currentIOT.type==='weather'){
            setWeatherList(weatherList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,interval:(event.target.value)});
                    return {...meter,interval:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentIOT.type==='soil'){
            setSoilList(soilList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,interval:(event.target.value)});
                    return {...meter,interval:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentIOT.type==='light'){
            setLightList(lightList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,interval:(event.target.value)});
                    return {...meter,interval:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentIOT.type==='fan'){
            setFanList(fanList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,interval:(event.target.value)});
                    return {...meter,interval:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
    };
    const handleLoadsDropdown = event => {
        if(currentIOT.type==='weather'){
            setWeatherList(weatherList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,loads:(event.target.value)});
                    return {...meter,loads:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentIOT.type==='soil'){
            setSoilList(soilList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,loads:(event.target.value)});
                    return {...meter,loads:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentIOT.type==='light'){
            setLightList(lightList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,loads:(event.target.value)});
                    return {...meter,loads:(event.target.value)}
                }
                else
                    return meter;
            }));
        }
        else if(currentIOT.type==='fan'){
            setFanList(fanList.map(meter => {
                if(meter.index===currentIOT.index){
                    setCurrentIOT({...meter,loads:(event.target.value)});
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

    const [weatherMThrData,setWeatherMThrData]=useState({
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
    const [weatherMT7Data,setWeatherMT7Data]=useState({
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
    const [weatherMT31Data,setWeatherMT31Data]=useState({
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
    const [soilMThrData,setSoilMThrData]=useState({
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
    const [soilMT7Data,setSoilMT7Data]=useState({
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
    const [soilMT31Data,setSoilMT31Data]=useState({
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
    const [lightMThrData,setLightMThrData]=useState({
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
    const [lightMT7Data,setLightMT7Data]=useState({
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
    const [lightMT31Data,setLightMT31Data]=useState({
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
    const [fanMThrData,setFanMThrData]=useState({
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
    const [fanMT7Data,setFanMT7Data]=useState({
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
    const [fanMT31Data,setFanMT31Data]=useState({
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
    {!homeColor?<div style={{width:'100%',height:'15%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',paddingBottom:'20px'}}>
        <div onClick={()=>{
            console.log("onclick")
            setWeatherColor(!weatherColor)
            setSoilColor(0)
            setLightColor(0)
            setFanColor(0)
            setShowUpdate(false)
            setShowView(false)
            setShowDelete(false)
            setShowConfig(false)

        }}id='Weather' className='IOTLabel' style={{fontSize:1,opacity:weatherColor?1:0.6}}>
            <h6 style={{fontSize:14, color:'white',fontWeight:'bold'}}>Weather Sensor</h6>
        </div>
        <div 
        onClick={()=>{
            console.log("onclick")
            setSoilColor(!soilColor)
            setWeatherColor(0)
            setLightColor(0)
            setFanColor(0)
            setShowUpdate(false)
            setShowView(false)
            setShowDelete(false)
            setShowConfig(false)
            
        }}id='Soil' className='IOTLabel' style={{fontSize:1,opacity:soilColor?1:0.6}}>
            <h6 style={{fontSize:14,color:'white',fontWeight:'bold'}}>Soil Sensor</h6>
        </div>
        <div 
        onClick={()=>{
            console.log("onclick")
            setLightColor(!lightColor)
            setSoilColor(0)
            setWeatherColor(0)
            setFanColor(0)
            setShowUpdate(false)
            setShowView(false)
            setShowDelete(false)
            setShowConfig(false)
            
        }}id='Light' className='IOTLabel' style={{fontSize:1,opacity:lightColor?1:0.6}}>
            <h6 style={{fontSize:14,color:'white',fontWeight:'bold'}}>Light</h6>
        </div>
        <div 
        onClick={()=>{
            console.log("onclick")
            setFanColor(!fanColor)
            setSoilColor(0)
            setWeatherColor(0)
            setLightColor(0)
            setShowUpdate(false)
            setShowView(false)
            setShowDelete(false)
            setShowConfig(false)
            
        }}id='Fan' className='IOTLabel' style={{fontSize:1,opacity:fanColor?1:0.6}}>
            <h6 style={{fontSize:14,color:'white',fontWeight:'bold'}}>Fan</h6>
        </div>
    </div>
    :null}

    {homeColor?
    <div style={{marginTop:15}}>
    <div style={{height:'30%',flexDirection:'row',display:'flex',marginBottom:20}}>
    <div style={{width:'30%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:20,marginRight:20,padding:15,flexShrink:0}}>
        <h4 style={{fontSize:30}}>Relative Humidity</h4>
        <ProgressBar bgcolor={'#483d8b'} completed={weatherHumidity} text={weatherHumidity+'%'}/>
    </div>
    <div style={{width:'30%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:20,marginRight:20,padding:15,flexShrink:0}}>
        <h4 style={{fontSize:30}}>Temperature</h4>
        <br></br>
        <div style={{fontSize:80}}>{temperature}°F</div>
    </div>
    <div style={{width:'30%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:20,marginRight:20,padding:15,flexShrink:0}}>
        <h4 style={{fontSize:30}}>Soil pH Value</h4>
        <br></br>
        <div style={{fontSize:80}}>{pHValue} pH</div>
    </div>
    </div>

    <div style={{height:'30%',flexDirection:'row',display:'flex',marginBottom:20}}>
    <div style={{width:'30%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:20,marginRight:20,padding:15,flexShrink:0}}>
        <h4 style={{fontSize:30}}>Soil Relative Humidity</h4>
        <ProgressBar bgcolor={'#cc3300'} completed={soilHumidity} text={soilHumidity+'%'}/>
    </div>
    <div style={{width:'30%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:20,marginRight:20,padding:15,flexShrink:0}}>
        <h4 style={{fontSize:30}}>Luminosity</h4>
        <br></br>
        <div style={{fontSize:80}}>{luminosity} watts</div>
    </div>
    <div style={{width:'30%',borderRadius:5, backgroundColor:"whitesmoke",opacity:0.9, backgroundSize:210, justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginLeft:20,marginRight:20,padding:15,flexShrink:0}}>
        <h4 style={{fontSize:30}}>Fan Speed</h4>
        <br></br>
        <ProgressBar bgcolor={'#336699'} completed={fanSpeed/100} text={fanSpeed+' RPM'}/>
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

    </div>:homeColor?<>IOT Home Page</>:null}


    {deviceMColor&&weatherColor?
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
        <IOTUpdate showUpdate={showUpdate} updateFormData={updateFormData} updateIOT={updateIOT} type='weather'/>
        <button type='submit' style={{height:0,width:0,background:'transparent',border:0,font:0}}></button>
        </form>
        <MeterControls/>
    </>:deviceMColor&&weatherColor?<>Device Management Page</>:null}
    {deviceMColor&&soilColor?
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
        <IOTUpdate showUpdate={showUpdate} updateFormData={updateFormData} updateIOT={updateIOT} type='soil'/>
        <button type='submit' style={{height:0,width:0,background:'transparent',border:0,font:0}}></button>
        </form>
        <MeterControls/>
    </>:deviceMColor&&soilColor?<>Device Management Page</>:null}
    {deviceMColor&&lightColor?
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
        <IOTUpdate showUpdate={showUpdate} updateFormData={updateFormData} updateIOT={updateIOT} type='light'/>
        <button type='submit' style={{height:0,width:0,background:'transparent',border:0,font:0}}></button>
        </form>
        <MeterControls/>
    </>:deviceMColor&&lightColor?<>Device Management Page</>:null}
    {deviceMColor&&fanColor?
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
        <IOTUpdate showUpdate={showUpdate} updateFormData={updateFormData} updateIOT={updateIOT} type='fan'/>
        <button type='submit' style={{height:0,width:0,background:'transparent',border:0,font:0}}></button>
        </form>
        <MeterControls/>
    </>:deviceMColor&&fanColor?<>Device Management Page</>:null}

    {mtColor&&weatherColor?
    <>
        <MTList/>

        <MTgraphView/>
    </>:mtColor&&weatherColor?<>Monitor & Tracking Page</>:null}
    {mtColor&&soilColor?
    <>
        <MTList/>

        <MTgraphView/>
    </>:mtColor&&soilColor?<>Monitor & Tracking Page</>:null}
    {mtColor&&lightColor?
    <>
        <MTList/>

        <MTgraphView/>
    </>:mtColor&&lightColor?<>Monitor & Tracking Page</>:null}
    {mtColor&&fanColor?
    <>
        <MTList/>

        <MTgraphView/>
    </>:mtColor&&fanColor?<>Monitor & Tracking Page</>:null}

    {ccColor&&weatherColor?
    <>
        <CCList/>

        <ConfigView/>
    </>:ccColor&&weatherColor?<>Control & Configuration Page</>:null}
    {ccColor&&soilColor?
    <>
        <CCList/>

        <ConfigView/>
    </>:ccColor&&soilColor?<>Control & Configuration Page</>:null}
    {ccColor&&lightColor?
    <>
        <CCList/>

        <ConfigView/>
    </>:ccColor&&lightColor?<>Control & Configuration Page</>:null}
    {ccColor&&fanColor?
    <>
        <CCList/>

        <ConfigView/>
    </>:ccColor&&fanColor?<>Control & Configuration Page</>:null}
    </>
    )
}