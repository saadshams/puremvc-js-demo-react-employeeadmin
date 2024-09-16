//
//  usePureMVC2.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {useEffect, useImperativeHandle, useRef} from "react";

export function usePureMVC2(object, MOUNTED, UNMOUNTED) {

    const ref = useRef({});

    useImperativeHandle(ref, () => object);

    useEffect(() => {
        dispatchEvent(new CustomEvent(MOUNTED, {detail: ref.current}));
        return () => {
            dispatchEvent(new CustomEvent(UNMOUNTED));
        }
    }, [ref, MOUNTED, UNMOUNTED]);

    return ref;
}
