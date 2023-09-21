import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

function Nav() {
    const router = useRouter();
    const currentPathname = router.pathname;
    console.log(currentPathname)

    const navClass = currentPathname === '/' ? 'navMain' : 'nav';

    return (
        <div className={navClass}>
        </div>
    )
}

export default Nav