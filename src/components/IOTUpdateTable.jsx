import React from "react";

import './pages/IOTPage.css'

const IOTUpdate = ({showUpdate,updateFormData,updateIOT,type}) => (
    <>
    {showUpdate&&(type==='weather'||type==='soil')?
    <>
    <table style={{display:'table',tableLayout:'fixed',width:'100%',borderCollapse:'collapse',backgroundColor:'whitesmoke',borderRadius:'3vh'}}>
    <tbody>
        <tr>
            <td className='viewCellStyle2'>Device Name:</td>
            <td className='viewCellStyle1'><input type='text' name='name' style={{width:'100%'}} value={updateFormData.name||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Temperature Range:</td>
            <td className='viewCellStyle1'><input type='text' name='tempRange' style={{width:'100%'}} value={updateFormData.tempRange||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Installation Date:</td>
            <td className='viewCellStyle1'><input type='text' name='iDate' style={{width:'100%'}} value={updateFormData.iDate||''} onChange={updateIOT}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Device ID:</td>
            <td className='viewCellStyle1'><input type='text' name='id' style={{width:'100%'}} value={updateFormData.id||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Temperature Accuracy:</td>
            <td className='viewCellStyle1'><input type='text' name='tempAccuracy' style={{width:'100%'}} value={updateFormData.tempAccuracy||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Dimensions:</td>
            <td className='viewCellStyle1'><input type='text' name='dimensions' style={{width:'100%'}} value={updateFormData.dimensions||''} onChange={updateIOT}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Location:</td>
            <td className='viewCellStyle1'><input type='text' name='location' style={{width:'100%'}} value={updateFormData.location||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Humidity Range:</td>
            <td className='viewCellStyle1'><input type='text' name='humidityRange' style={{width:'100%'}} value={updateFormData.humidityRange||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Deployment Date:</td>
            <td className='viewCellStyle1'><input type='text' name='dDate' style={{width:'100%'}} value={updateFormData.dDate||''} onChange={updateIOT}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Manufacturer:</td>
            <td className='viewCellStyle1'><input type='text' name='manufacturer' style={{width:'100%'}} value={updateFormData.manufacturer||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Humidity Accuracy:</td>
            <td className='viewCellStyle1'><input type='text' name='humidityAccuracy' style={{width:'100%'}} value={updateFormData.humidityAccuracy||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Power:</td>
            <td className='viewCellStyle1'><input type='text' name='power' style={{width:'100%'}} value={updateFormData.power||''} onChange={updateIOT}/></td>
        </tr>
    </tbody>
    </table>
    </>
    :null}
    {showUpdate&&type==='light'?
    <>
    <table style={{display:'table',tableLayout:'fixed',width:'100%',borderCollapse:'collapse',backgroundColor:'whitesmoke',borderRadius:'3vh'}}>
    <tbody>
        <tr>
            <td className='viewCellStyle2'>Device Name:</td>
            <td className='viewCellStyle1'><input type='text' name='name' style={{width:'100%'}} value={updateFormData.name||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Model:</td>
            <td className='viewCellStyle1'><input type='text' name='model' style={{width:'100%'}} value={updateFormData.model||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Installation Date:</td>
            <td className='viewCellStyle1'><input type='text' name='iDate' style={{width:'100%'}} value={updateFormData.iDate||''} onChange={updateIOT}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Device ID:</td>
            <td className='viewCellStyle1'><input type='text' name='id' style={{width:'100%'}} value={updateFormData.id||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Illumination:</td>
            <td className='viewCellStyle1'><input type='text' name='illumination' style={{width:'100%'}} value={updateFormData.illumination||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Dimensions:</td>
            <td className='viewCellStyle1'><input type='text' name='dimensions' style={{width:'100%'}} value={updateFormData.dimensions||''} onChange={updateIOT}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Location:</td>
            <td className='viewCellStyle1'><input type='text' name='location' style={{width:'100%'}} value={updateFormData.location||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Illumination Time:</td>
            <td className='viewCellStyle1'><input type='text' name='illumTime' style={{width:'100%'}} value={updateFormData.illumTime||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Deployment Date:</td>
            <td className='viewCellStyle1'><input type='text' name='dDate' style={{width:'100%'}} value={updateFormData.dDate||''} onChange={updateIOT}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Manufacturer:</td>
            <td className='viewCellStyle1'><input type='text' name='manufacturer' style={{width:'100%'}} value={updateFormData.manufacturer||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Wattage:</td>
            <td className='viewCellStyle1'><input type='text' name='wattage' style={{width:'100%'}} value={updateFormData.wattage||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Power:</td>
            <td className='viewCellStyle1'><input type='text' name='power' style={{width:'100%'}} value={updateFormData.power||''} onChange={updateIOT}/></td>
        </tr>
    </tbody>
    </table>
    </>
    :null}
    {showUpdate&&type==='fan'?
    <>
    <table style={{display:'table',tableLayout:'fixed',width:'100%',borderCollapse:'collapse',backgroundColor:'whitesmoke',borderRadius:'3vh'}}>
    <tbody>
        <tr>
            <td className='viewCellStyle2'>Device Name:</td>
            <td className='viewCellStyle1'><input type='text' name='name' style={{width:'100%'}} value={updateFormData.name||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Model:</td>
            <td className='viewCellStyle1'><input type='text' name='model' style={{width:'100%'}} value={updateFormData.model||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Installation Date:</td>
            <td className='viewCellStyle1'><input type='text' name='iDate' style={{width:'100%'}} value={updateFormData.iDate||''} onChange={updateIOT}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Device ID:</td>
            <td className='viewCellStyle1'><input type='text' name='id' style={{width:'100%'}} value={updateFormData.id||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Number of Speeds:</td>
            <td className='viewCellStyle1'><input type='text' name='numOfSpeeds' style={{width:'100%'}} value={updateFormData.numOfSpeeds||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Dimensions:</td>
            <td className='viewCellStyle1'><input type='text' name='dimensions' style={{width:'100%'}} value={updateFormData.dimensions||''} onChange={updateIOT}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Location:</td>
            <td className='viewCellStyle1'><input type='text' name='location' style={{width:'100%'}} value={updateFormData.location||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Fan Design:</td>
            <td className='viewCellStyle1'><input type='text' name='fanDesign' style={{width:'100%'}} value={updateFormData.fanDesign||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Deployment Date:</td>
            <td className='viewCellStyle1'><input type='text' name='dDate' style={{width:'100%'}} value={updateFormData.dDate||''} onChange={updateIOT}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Manufacturer:</td>
            <td className='viewCellStyle1'><input type='text' name='manufacturer' style={{width:'100%'}} value={updateFormData.manufacturer||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Weight:</td>
            <td className='viewCellStyle1'><input type='text' name='weight' style={{width:'100%'}} value={updateFormData.weight||''} onChange={updateIOT}/></td>
            <td className='viewCellStyle2'>Power:</td>
            <td className='viewCellStyle1'><input type='text' name='power' style={{width:'100%'}} value={updateFormData.power||''} onChange={updateIOT}/></td>
        </tr>
    </tbody>
    </table>
    </>
    :null}
    </>
);

export default IOTUpdate;