import React from 'react'
import numeral from 'numeral'
import './Table.css'

export default function Table({countries, theme}) {
    return (
        <div className='table'>
            {
                countries.map(({country, cases}, i)=>(
                    <tr style={{backgroundColor: i%2==0 ? theme.appBackground : theme.cardBackground}}>
                        <td style={{color: theme.secondaryText}}>{country}</td>
                        <td style={{color: theme.secondaryText}}>
                            <strong>
                                {numeral(cases).format("0,0")}
                            </strong>
                        </td>
                    </tr>
                ))
            }
        </div>
    )
}
