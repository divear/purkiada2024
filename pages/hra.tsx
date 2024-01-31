import React, { useEffect, useState } from 'react'
import data from "./data.json"
import { error } from 'console'
import { app, getFirestore, addDoc, collection } from "../components/firebase";


function Hra() {
    const [codeVal, setCodeVal] = useState("")
    const [level, setLevel] = useState(0)
    const [errors, setErrors] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [modal, setModal] = useState(false)
    const [errorsList, setErrorsList] = useState<any[]>([])

    useEffect(() => {
        console.log(data)
        setCodeVal(data[level].wrongCode)
        setErrorsList(data[level].errors)
        // console.log((data[level].errors[0][0] as any).includes(3))

        // set errors
        for (let i = 1; i < 9; i++) {
            data[level].errors.forEach(e => {
                if ((e[0] as any).includes(i)) {
                    errors[i] = 1
                } else {
                    errors[i] = 0
                }
            });
        }
    }, [])
    function reset() {
        setCodeVal(data[level].wrongCode)
        for (let i = 1; i < 9; i++) {
            data[level].errors.forEach(e => {
                if ((e[0] as any).includes(i)) {
                    errors[i] = 1
                } else {
                    errors[i] = 0
                }
            });
        }
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
        setErrorsList(data[temp].errors)
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
        setCodeVal(e.target.value)
        setErrors(Array(9).fill(0))

        if (e.target.value.replace(/\s/g, "") == data[level].rightCode.replace(/\s/g, "")) {
            setModal(true)
        } else {
            e.target.value.split("\n").map((n: string, i: number) => {
                if (n == data[level].rightCode.split("\n")[i]) {
                    console.log(n, data[level].rightCode.split("\n")[i])
                    console.log("line", i, "is correct")
                    errors[i + 1] = 0
                    setErrors(errors)
                    console.log(errors)
                } else {
                    console.log(n, data[level].rightCode.split("\n")[i])
                    console.log("line", i, "is incorrect")
                    errors[i + 1] = 1
                    setErrors(errors)
                    data[level].errors.map((n) => {
                    })
                    console.log(errors)
                }
                // console.log(n, i)

            })
        }
    }

    return (
        <div>
            <title>Purkiáda bug hunt</title>
            <h1>Level {level}</h1>
            <p>Protip: tyhlencty počítače mají qwertz🤮🤮</p>
            <p>Protip2: Neměň formátování</p>

            <div className={modal ? "winModal" : "no"}>
                <h1>Správně!</h1>
                <button autoFocus={true} onClick={next}>Další úroveň</button>
            </div>

            <div className="container">
                <div className="list">
                    <ol className="lineCount">
                        {/* 9 řádků */}
                        {errors.slice(1, 10).map((e, i) => {
                            return (
                                <li key={i} className={(e as any) ? "redLineCount" : ""}></li>
                            )
                        })}
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
                    {data[level] && errorsList.map((e: any, i: number) => {
                        return (
                            <li className='errorItem' key={i}>{e[1]} <span className='errorLineNum'>řádek: {e[0].toString()}</span></li>
                        )
                    })}
                </ul>
            </div>
            <a className='napoveda' href="https://znakynaklavesnici.cz/">Jak psát znaky na klávesnici (kdo potřebuje)</a>
        </ div >
    )
}

export default Hra
