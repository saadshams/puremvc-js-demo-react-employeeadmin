//
//  usePureMVC1.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {useEffect, useMemo} from "react";

export function usePureMVC1(object, MOUNTED, UNMOUNTED) {

    const component = useMemo(() => object, [object]);

    useEffect(() => {
        dispatchEvent(new CustomEvent(MOUNTED, {detail: component}));
        return () => {
            dispatchEvent(new CustomEvent(UNMOUNTED));
        }
    }, [component, MOUNTED, UNMOUNTED]);

    return component;
}

