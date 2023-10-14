import React, { useEffect, useState } from 'react'
import data from "./data.json"

function Hra() {
    const [codeVal, setCodeVal] = useState("")
    const [level, setLevel] = useState(0)
    const [errors, setErrors] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        // console.log(data)
        setCodeVal(data[level].wrongCode)
        console.log((data[level].errors[0][0] as any).includes(3))

        // set errors
        for (let i = 1; i < 11; i++) {
            console.log(level)

            data[level].errors.forEach(e => {
                if ((e[0] as any).includes(i)) {
                    errors[i] = 1
                } else {
                    errors[i] = 0
                }
            });
            console.log(errors)
        }
    }, [])
    function reset() {
        setCodeVal(data[level].wrongCode)
    }
    function next() {
        setModal(false)
        if (!data[level + 1]) {
            window.location.href = "/win"
            return
        }
        for (let i = 1; i < 11; i++) {
            data[level + 1].errors.forEach(e => {
                if (!(e[0] as any).includes(i)) {
                    errors[i] = 0
                    setErrors(errors)
                }
            });
        }
        setCodeVal(data[level + 1].wrongCode)
        console.log(level)
        const temp = level + 1
        setLevel(temp)
        console.log(level + 1)
        console.log(data[level].wrongCode)

        // set errors
        for (let i = 1; i < 11; i++) {
            console.log(level)

            data[level + 1].errors.forEach(e => {
                if ((e[0] as any).includes(i)) {
                    errors[i] = 1
                    setErrors(errors)
                }
            });
            console.log(errors)

        }
    }
    function change(e: any) {
        if (e.target.value == data[level].rightCode) {
            setModal(true)
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

            <div className={modal ? "winModal" : "no"}>
                <h1>Správně!</h1>
                <button autoFocus={true} onClick={next}>Další úroveň</button>
            </div>

            <div className="container">
                <div className="list">
                    <ol className="lineCount">
                        {/* 9 řádků */}
                        <li className={(errors[1] as any) ? "redLineCount" : ""}></li>
                        <li className={(errors[2] as any) ? "redLineCount" : ""}></li>
                        <li className={(errors[3] as any) ? "redLineCount" : ""}></li>
                        <li className={(errors[4] as any) ? "redLineCount" : ""}></li>
                        <li className={(errors[5] as any) ? "redLineCount" : ""}></li>
                        <li className={(errors[6] as any) ? "redLineCount" : ""}></li>
                        <li className={(errors[7] as any) ? "redLineCount" : ""}></li>
                        <li className={(errors[8] as any) ? "redLineCount" : ""}></li>
                        <li className={(errors[9] as any) ? "redLineCount" : ""}></li>
                    </ol>
                </div >
                <div className="textarea">
                    <textarea onChange={e => change(e)} spellCheck={false} value={codeVal} name="" id="" cols={45} rows={9}></textarea>
                </div>
                <button onClick={reset} className="reset">
                    Reset
                </button>
            </div >

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
            <a className='napoveda' href="https://znakynaklavesnici.cz/">Jak psát znaky na klávesnici (kdo potřebuje)</a>
        </ div >
    )
}

export default Hra