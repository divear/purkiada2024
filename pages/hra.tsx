import React, { useEffect, useState } from 'react'
import data from "./data.json"

function Hra() {
    const [codeVal, setCodeVal] = useState("")
    const [level, setLevel] = useState(0)

    useEffect(() => {
        console.log(data)
        setCodeVal(data[level].wrongCode)
    }, [])
    function change(e: any) {
        if (e.target.value == data[level].rightCode) {
            alert("SPRÁVNĚ!!!!")
            if (!data[level + 1]) {
                window.location.href = "/win"
                return
            }
            setCodeVal(data[level + 1].wrongCode)
            setLevel(level + 1)
            console.log(data[level].wrongCode)

        } else {
            setCodeVal(e.target.value)
        }
    }

    return (
        <div>
            <title>Purkiáda bug hunt</title>
            <h1>Level {level}</h1>
            <p>Protip: Compiler má vždy pravdu</p>
            <p>Protip2: Neměň formátování</p>

            <div className="container">
                <div className="list">
                    <ol>
                        {/* 9 řádků */}
                        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                    </ol>
                </div>
                <div className="textarea">
                    <textarea onChange={e => change(e)} spellCheck={false} value={codeVal} name="" id="" cols={45} rows={9}></textarea>
                </div>
            </div>

            <div className="errorLog">
                <h2>Errory:</h2>
                <ul>
                    {data[level] && data[level].errors.map((e, i) => {
                        return (
                            <li key={i}>{e[1]} line: {e[0].toString()}</li>
                        )
                    })}
                </ul>
            </div>
            <a className='napoveda' href="https://znakynaklavesnici.cz/">Jak psát znaky na klávesnici (pro losery)</a>
        </ div>
    )
}

export default Hra