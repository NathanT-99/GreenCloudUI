import React from "react";

import './pages/MeterPage.css'

const MeterUpdate = ({showUpdate,updateFormData,updateMeter,type}) => (
    <>
    {showUpdate&&type==='electric'?
    <>
    <table style={{display:'table',tableLayout:'fixed',width:'100%',borderCollapse:'collapse',backgroundColor:'whitesmoke',borderRadius:'3vh'}}>
    <tbody>
        <tr>
            <td className='viewCellStyle2'>Device Name:</td>
            <td className='viewCellStyle1'><input type='text' name='name' style={{width:'100%'}} value={updateFormData.name||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Model:</td>
            <td className='viewCellStyle1'><input type='text' name='model' style={{width:'100%'}} value={updateFormData.model||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Installation Date:</td>
            <td className='viewCellStyle1'><input type='text' name='iDate' style={{width:'100%'}} value={updateFormData.iDate||''} onChange={updateMeter}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Device ID:</td>
            <td className='viewCellStyle1'><input type='text' name='id' style={{width:'100%'}} value={updateFormData.id||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Amperage Capacity:</td>
            <td className='viewCellStyle1'><input type='text' name='capacity' style={{width:'100%'}} value={updateFormData.capacity||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Dimensions:</td>
            <td className='viewCellStyle1'><input type='text' name='dimensions' style={{width:'100%'}} value={updateFormData.dimensions||''} onChange={updateMeter}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Location:</td>
            <td className='viewCellStyle1'><input type='text' name='location' style={{width:'100%'}} value={updateFormData.location||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Installation Method:</td>
            <td className='viewCellStyle1'><input type='text' name='method' style={{width:'100%'}} value={updateFormData.method||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Deployment Date:</td>
            <td className='viewCellStyle1'><input type='text' name='dDate' style={{width:'100%'}} value={updateFormData.dDate||''} onChange={updateMeter}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Manufacturer:</td>
            <td className='viewCellStyle1'><input type='text' name='manufacturer' style={{width:'100%'}} value={updateFormData.manufacturer||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Measurement Accuracy:</td>
            <td className='viewCellStyle1'><input type='text' name='accuracy' style={{width:'100%'}} value={updateFormData.accuracy||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Power:</td>
            <td className='viewCellStyle1'><input type='text' name='power' style={{width:'100%'}} value={updateFormData.power||''} onChange={updateMeter}/></td>
        </tr>
    </tbody>
    </table>
    </>
    :null}
    {showUpdate&&type==='water'?
    <>
    <table style={{display:'table',tableLayout:'fixed',width:'100%',borderCollapse:'collapse',backgroundColor:'whitesmoke',borderRadius:'3vh'}}>
    <tbody>
        <tr>
            <td className='viewCellStyle2'>Device Name:</td>
            <td className='viewCellStyle1'><input type='text' name='name' style={{width:'100%'}} value={updateFormData.name||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Model:</td>
            <td className='viewCellStyle1'><input type='text' name='model' style={{width:'100%'}} value={updateFormData.model||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Installation Date:</td>
            <td className='viewCellStyle1'><input type='text' name='iDate' style={{width:'100%'}} value={updateFormData.iDate||''} onChange={updateMeter}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Device ID:</td>
            <td className='viewCellStyle1'><input type='text' name='id' style={{width:'100%'}} value={updateFormData.id||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Power:</td>
            <td className='viewCellStyle1'><input type='text' name='power' style={{width:'100%'}} value={updateFormData.power||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Dimensions:</td>
            <td className='viewCellStyle1'><input type='text' name='dimensions' style={{width:'100%'}} value={updateFormData.dimensions||''} onChange={updateMeter}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Location:</td>
            <td className='viewCellStyle1'><input type='text' name='location' style={{width:'100%'}} value={updateFormData.location||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Batteries Included:</td>
            <td className='viewCellStyle1'><input type='text' name='batteries' style={{width:'100%'}} value={updateFormData.batteries||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Deployment Date:</td>
            <td className='viewCellStyle1'><input type='text' name='dDate' style={{width:'100%'}} value={updateFormData.dDate||''} onChange={updateMeter}/></td>
        </tr>
        <tr>
            <td className='viewCellStyle2'>Manufacturer:</td>
            <td className='viewCellStyle1'><input type='text' name='manufacturer' style={{width:'100%'}} value={updateFormData.manufacturer||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Battery Cell Type:</td>
            <td className='viewCellStyle1'><input type='text' name='batteryType' style={{width:'100%'}} value={updateFormData.batteryType||''} onChange={updateMeter}/></td>
            <td className='viewCellStyle2'>Item Weight:</td>
            <td className='viewCellStyle1'><input type='text' name='weight' style={{width:'100%'}} value={updateFormData.weight||''} onChange={updateMeter}/></td>
        </tr>
    </tbody>
    </table>
    </>
    :null}
    </>
);

export default MeterUpdate;