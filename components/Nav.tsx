import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import icon from "../public/icon.png"
import Image from 'next/image';

function Nav() {
    const router = useRouter();
    const currentPathname = router.pathname;
    console.log(currentPathname)

    const navClass = currentPathname === '/' ? 'navMain' : 'nav';

    return (
        <div className={navClass}>
            <Image width={150} src={icon} alt="U Labužníckého stolu" />
            <Link href="/#rezervace">rezervace</Link>
            <Link href="/#kontakt">kontakt</Link>
            <Link href="/o-restauraci">o restauraci</Link>
            <Link href="/menu">menu</Link>
        </div>
    )
}

export default Nav