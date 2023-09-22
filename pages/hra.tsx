import React, { useEffect, useState } from 'react'

function Hra() {
    const [codeVal, setCodeVal] = useState("")
    useEffect(() => {
        setCodeVal(`for (i = 1; i <= n; i++) {
    if (i % 15 == 0)
        printf("fizzbuzz");\n
    else if (i % 5 == 0)
        printf("buzz");\n
    else if (i % 3 == 0)
        printf("fizz");\n
    else
        printf("%d", i);\n
}
`)
    }, [])

    return (
        <div>
            <h1>Pomoz zpravit syntax errory po rekrutovi.</h1>
            <p>Protip: Compiler má vždy pravdu</p>
            <textarea onChange={e => setCodeVal(e.target.value)} spellCheck={false} value={codeVal} name="" id="" cols={50} rows={15}>

            </textarea>
        </div>
    )
}

export default Hra