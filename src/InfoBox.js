import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import "./InfoBox.css";


function InfoBox({ title, cases, active, total, isRed, ...props }) {

 return (
  <div className="infoBox">
   <br></br>
   <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"
    }`}>
    <CardContent>
     <Typography color="textSecondary" className="infoBox__title">
      {title}
     </Typography>
     <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
     <Typography color="textSecondary" className="infoBox__total">
      {total} Total
     </Typography>
    </CardContent>
   </Card>
  </div>
 )
}

export default InfoBox
