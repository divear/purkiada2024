import React from 'react'

function Win() {
    return (
        <div className='intro'>
            <img className='winImg' src='http://cdn.onlinewebfonts.com/svg/img_452064.png' alt='winimg'></img>
            <h1 className='winText' >Vyhrál jsi</h1>
            <p>Máš maximální počet bodů z této úlohy, hodně štěstí s ostatními.</p>
            <h5>Tvůrci:</h5>
            <div className="credits">

                <table >
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
                    </tbody>
                </table >
            </div>
        </div>
    )
}

export default Win