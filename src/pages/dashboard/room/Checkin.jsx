import { set } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import Nav from '../../element/Nav';
import Rooms from '../../function/room';
import Swal from 'sweetalert2'

const rm = new Rooms();

function Checkin() {
    const [id, setID] = useState("");

    useEffect(() => {
        const url = new URL(window.location.href).searchParams;

        setID(url.get("id"));

        document.getElementById("check_in").focus();
    }, []);

    const check_in = () => {
        Swal.fire({
            title: "กำลังหาห้อง",
            timer: 2000,
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false
        })
        
        rm.check_in(id).then(r => {
            if (r) {
                Swal.fire("เช็กอินแล้ว", "", "success").then(r => {
                    window.location = "/dashboard/room"
                })
            } else {
                Swal.fire("มีบางอย่างผิดพลาด", "โปรดลองอีกครั้ง", "error").then(r => {
                    window.location = "/dashboard/room"
                })
            }
        })
    }

    return (
        <>
            <Nav />
            <div className="h-screen flex flex-col justify-center items-center">
                <h1 className="text-4xl">
                    กดยืนยันเพื่อเช็กอิน
                </h1>
                <button onClick={check_in} id='check_in' className='btn btn-error mt-3'>
                    เช็กอิน
                </button>
            </div>
        </>
    );
}

export default Checkin;