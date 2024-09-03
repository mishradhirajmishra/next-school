"use client"
import React, { FC, useState } from 'react'
import TabBar from '@/app/components/shared/tabs/tabbar';
import Tabcontainer from '@/app/components/shared/tabs/tabcontainer';
import { Mentinance, MentinanceInit, Vehicle } from '@/app/components/shared/model/transporthelper';
import PlusIcon from '@/app/components/shared/Icons/plus';
import EditIcon from '@/app/components/shared/Icons/edit';

export interface VehicleDetailTableProps {
  vehicle: Vehicle,
  addMentinence: (option: Vehicle) => void
}

const VehicleDetailTable: FC<VehicleDetailTableProps> = ({ vehicle, addMentinence }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <TabBar tabs={["Detail", "Mentinance"]} onOptionClick={(val) => { setActiveTab(val) }} />
      <Tabcontainer className='flex justify-center items-center' show={activeTab == 0} >
        <table>
          <tbody>
            <tr>
              <td><label className="c-form-label">Detail</label>
                <span className="c-text-dark text-balance w-10">{vehicle.detail} </span>
              </td>
              <td><label className="c-form-label">{vehicle.vehicle_charge_rule} Charge</label> <span className=" c-text-dark  c-input">{vehicle.charge} </span>  </td>
              <td><label className="c-form-label"> Joining Date</label> <span className=" c-text-dark  c-input">{vehicle.join_date} </span>  </td>
              {vehicle.left_date != "" && <td><label className="c-form-label"> Left Date</label> <span className=" c-text-dark  c-input">{vehicle.left_date} </span>  </td>}
            </tr>
          </tbody>
        </table>
      </Tabcontainer>
      <Tabcontainer className='flex justify-center items-center' show={activeTab == 1} >
        <table>
          <thead>
            <tr>
              <td>SN</td>
              <td>Name</td>
              <td>Amount</td>
              <td>Date</td>
              <td>Comment</td>
              <td> <button type="button" className="btn-outline-light rounded-full" onClick={() => { addMentinence({ ...vehicle, mentinance: [MentinanceInit] }) }}> <PlusIcon />  Add </button></td>
            </tr>
          </thead>
          <tbody>
            {vehicle && vehicle.mentinance && vehicle.mentinance.map((ment: Mentinance, i: number) =>
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{ment.name}</td>
                <td>{ment.amount}</td>
                <td>{ment.date}</td>
                <td>{ment.comment}</td>
                <td> 
                <button type='button' className='btn-outline-light p-1 mr-3 '  
                onClick={() => { addMentinence({ ...vehicle, mentinance: [ment] }) }}
                ><EditIcon /></button>

                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Tabcontainer>
    </>

  )
}

export default VehicleDetailTable;