import React from 'react'
import * as dayjs from 'dayjs'
import './Appliance.css'

export default function Appliance( {appliance} ) {
  return (
    <div className="appliance">
      <div>Name: { appliance.name }</div>
      <div>Type: { appliance.type }</div>
      <div>Created: { dayjs(appliance.createdAt).format('MMM DD YYYY') }</div>
    </div>
  )
}