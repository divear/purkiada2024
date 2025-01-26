"use client";
import React, { useEffect, useState } from 'react'
import data from "./data.json"
// import { app, getFirestore, addDoc, collection } from "../components/firebase";
// import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import TextareaAutosize from 'react-textarea-autosize';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
// import { relative } from 'path';

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
        // if (window.location.hostname != "localhost") {
            serverDomain = "https://quotepy.pythonanywhere.com";
        // } else {
        //     serverDomain = "http://127.0.0.1:5000";
        // }
        if (!window) return;

        window.addEventListener('keydown', function(event) {
            // Check if the pressed key is the number 5
            if (event.key === '5') {
                next();
            }
        });


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
            const response = await fetch(`${serverDomain}/login?username=${username}&password=${password}&points=${level + 1}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                // body: JSON.stringify([username, password, 0]),
            });
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
        const temp = level + 1
        setLevel(temp)
        setErrorsList(data[temp].errors)

        // set errors
        for (let i = 1; i < 11; i++) {

            data[level + 1].errors.forEach(e => {
                if ((e[0] as any).includes(i)) {
                    errors[i] = 1
                    setErrors(errors)
                }
            });
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
            <h1 className='levelNum'>Level {level} - {data[level].name}</h1>
            <p className={isQwerty ? "" : "no"}>Protip: tyhlencty počítače mají qwertz🤮</p>

            <div className={modal ? "winModal" : "no"}>
                <h1>Správně!</h1>
                <button tabIndex={0} autoFocus={true} onClick={next}>Další úroveň</button>
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

                <button onClick={reset} className="reset">
                    ⟳
                </button>
            </div>

<div style={{ position: 'absolute', left: "50px", width: '100%', maxWidth: '800px', minHeight: '308px' }}>
    {/* Syntax Highlighter */}
    <SyntaxHighlighter
        language={data[level].name.toLowerCase()}
        style={atomOneDark}
        customStyle={{
            margin: 0,
            position: 'absolute',
            pointerEvents: 'none', // Prevent blocking interaction with the textarea
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'monospace',
            fontSize: '32px', // Match font size
            lineHeight: '1.2', // Match line height
            padding: '0px 5px', // Match padding
            boxSizing: 'border-box', // Ensure dimensions include padding
            border: 'none',
            outline: 'none'

        }}
    >
        {codeVal || ' '}
    </SyntaxHighlighter>

    {/* Transparent Textarea */}
    <TextareaAutosize
          spellCheck="false"
        value={codeVal}
        onChange={e => change(e)}
        placeholder="Write your code here..."
        style={{
            width: '100%',
            height: 100,
            background: 'transparent',
            color: 'transparent', // Ensure text doesn't interfere
            caretColor: '#fff', // Make caret (cursor) visible
            border: 'none', // Remove border to avoid misalignment
            fontFamily: 'monospace',
            fontSize: '32px', // Match font size
            lineHeight: '1.2', // Match line height
            padding: '0px 5px', // Match padding
            boxSizing: 'border-box', // Ensure dimensions include padding
            resize: 'none', // Prevent resizing
            position: 'relative',
            zIndex: 2, // Ensure it's above the SyntaxHighlighter for interaction
            outline: 'none'
        }}
    />
</div>

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
            <div className="igText">
                <p>V případě problemů nám můžeš napsat i na ig: </p>
                <ul>
                    <li>@lukas.ode</li>
                    <li>@jiriukropec</li>
                </ul>
            </div>
            <a target='_blank' className='napoveda' href="https://znakynaklavesnici.cz/">Jak psát znaky na klávesnici (kdo potřebuje)</a>
        </ div >
    )
}

export default Hra
