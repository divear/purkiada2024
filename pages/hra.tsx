import React, { useEffect, useState } from 'react'
import data from "./data.json"

function Hra() {
    const [codeVal, setCodeVal] = useState("")
    const [level, setLevel] = useState(0)

    useEffect(() => {
        console.log(data)
        if (!data[level]) {
            window.location.href = "/win"
            return
        }
        setCodeVal(data[level].wrongCode)
    }, [])
    function change(e: any) {
        setCodeVal(e.target.value)
        if (e.target.value == data[level].rightCode) {
            alert("SPRÁVNĚ!!!!")
        }
    }

    return (
        < div >
            <title>Purkiáda bug hunt</title>
            <h1>Level {level}</h1>
            <p>Protip: Compiler má vždy pravdu</p>
            <p>Protip2: Neměň formátování</p>

            <div className="container">
                <div className="list">
                    <ol>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ol>
                </div>
                <div className="textarea">
                    <textarea onChange={e => change(e)} spellCheck={false} value={codeVal} name="" id="" cols={40} rows={9}></textarea>
                </div>
            </div>

            <div className="errorLog">
                <h2>Errory:</h2>
                <ul>
                    {data[level] && data[level].errors.map((e, i) => {
                        return (
                            <li key={i}>{e[1]} line: {e[0]}</li>
                        )
                    })}
                </ul>
            </div>
        </ div>
    )
}

export default Hra