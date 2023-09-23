import React, { useEffect, useState } from 'react'

function Hra() {
    const [codeVal, setCodeVal] = useState("")
    useEffect(() => {
        setCodeVal(`#include <stdio.h>

int main() {
    int num = 5;
    printf("Číslo: %d", num);

    for (int i = 1; i <= 5; i++) {
        printf("Iterace %d", i);
    }

    int result = 1;
    for (int i = 1; i <= 5; i++) {
        result *= i;
    }
    printf("Faktoriál z čísla 5 je %d", result);

    return 0;
}
`)
    }, [])

    return (
        <div>
            <title>Purkiáda bug hunt</title>
            <h1>Pomoz zpravit syntax errory po rekrutovi.</h1>
            <p>Protip: Compiler má vždy pravdu</p>
            <div className="errorLog">
                <h2>Errory:</h2>
                <ul>
                    <li>Každý příkaz musí končit středníkem</li>
                </ul>
            </div>
            <textarea onChange={e => setCodeVal(e.target.value)} spellCheck={false} value={codeVal} name="" id="" cols={50} rows={20} />
        </div>
    )
}

export default Hra