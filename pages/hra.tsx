import React, { useEffect, useState } from 'react'
import data from "./data.json"
import { app, getFirestore, addDoc, collection } from "../components/firebase";

var serverDomain: string;
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

function Hra() {
    const [codeVal, setCodeVal] = useState("")
    const [level, setLevel] = useState(0)
    const [errors, setErrors] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [modal, setModal] = useState(false)
    const [errorsList, setErrorsList] = useState<any[]>([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isQwerty, setIsQwerty] = useState(false)

    const size = useWindowSize();
    useEffect(() => {
        console.log(data)
        setCodeVal(data[level].wrongCode)
        setErrorsList(data[level].errors)
        setUsername(localStorage.getItem("username") || "notfound")
        setPassword(localStorage.getItem("password") || "notfound")
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
        if (window.location.hostname != "localhost") {
            serverDomain = "https://quotepy.pythonanywhere.com";
        } else {
            serverDomain = "http://127.0.0.1:5000";
        }
        if (!window) return;
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
    async function next() {
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

        const response = await fetch(`${serverDomain}/login?username=${username}&password=${password}&points=${level + 1}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify([username, password, 0]),
        });
        console.log(response)
        console.log(`${serverDomain}/login?username=${username}&password=${password}&points=${level + 1}`)
    }

    function change(e: any) {
        if (e.target.value.split("\n").length > 9) {
            console.log("too many lines: " + e.target.value.split("\n").length)
            return
        } else if (modal) {
            return
        }
        setCodeVal(e.target.value)
        setErrors(Array(9).fill(0))
        if (e.target.value.includes("ů")) {
            setIsQwerty(true)
        }

        if (e.target.value.replace(/\s/g, "") == data[level].rightCode.replace(/\s/g, "")) {
            setModal(true)
        } else {
            e.target.value.split("\n").map((n: string, i: number) => {
                if (n == data[level].rightCode.split("\n")[i] || !data[level].rightCode.split("\n")[i]) {
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
            <h1 className='levelNum'>Level {level}</h1>
            <p className={isQwerty ? "" : "no"}>Protip: tyhlencty počítače mají qwertz🤮</p>

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
                    <textarea onChange={e => change(e)} spellCheck={false} value={codeVal} name="" id="" cols={size && size.width > 780 ? 45 : 40} rows={9}></textarea>
                </div>
                <button onClick={reset} className="reset">
                    Vrátit změny
                </button>
            </div >

            <div className="errorLog">
                <h2 className='errorsHeader'>Errory:</h2>
                <ul>
                    {data[level] && errorsList.map((e: any, i: number) => {
                        return (
                            <li className='errorItem' key={i}>{e[1]} <span className='errorLineNum'>řádek: {e[0].toString()}</span></li>
                        )
                    })}
                </ul>
            </div>
            <p>V případě problemů a pokud nás nemůžeš najít nám napiš na ig: </p>
            <ul>
                <li>@lukas.ode</li>
                <li>@jiriukropec</li>
            </ul>
            <a target='_blank' className='napoveda' href="https://znakynaklavesnici.cz/">Jak psát znaky na klávesnici (kdo potřebuje)</a>
        </ div >
    )
}

export default Hra
