import Image from 'next/image'
import React, {useState} from 'react'
import trophy from "../components/imgs/trophy.jpg"
import trophy2 from "../components/imgs/trophy2.jpg"

function Win() {
  const [isHover, setIsHover] = useState(false);
    return (
        <div className='intro'>
            <Image onMouseOver={()=>setIsHover(true)} onMouseOut={()=>setIsHover(false)} className='winImg' src={isHover ? trophy2 : trophy} alt="trofie"  />

            <h1 className='winText' >Vyhrál jsi</h1>
            <p>Máš maximální počet bodů z této úlohy, hodně štěstí s ostatními.</p>
            <h5>Tvůrci:</h5>
            <div className="credits">

                <table>
                    <thead>
                        <tr>
                            <th>Pozice</th>
                            <th>Jméno</th>
                            <th>IG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Frontend </td>
                            <td>Lukáš Odehnal</td>
                            <td>@lukas.ode</td>
                        </tr>
                        <tr>
                            <td>Backend </td>
                            <td>Jiří Ukropec</td>
                            <td>@jiriukropec</td>
                        </tr>
                        <tr>
                            <td>Ilustrace</td>
                            <td>Linda Vašíčková</td>
                            <td>@linda.vasickova</td>
                        </tr>
                    </tbody>
                </table >
            </div>
        </div>
    )
}

export default Win
