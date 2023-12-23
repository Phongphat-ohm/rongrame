import { set } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import Nav from '../../element/Nav';
import Rooms from '../../function/room';
import Swal from 'sweetalert2'

const rm = new Rooms();

function Checkout() {
    const [id, setID] = useState("");

    useEffect(() => {
        const url = new URL(window.location.href).searchParams;

        setID(url.get("id"));

        document.getElementById("check_out").focus();
    }, []);

    const check_out = () => {
        Swal.fire({
            title: "กำลังหาห้อง",
            timer: 2000,
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false
        })
        rm.check_out(id).then(r => {
            if (r) {
                Swal.fire("เช็กเอ้าท์แล้ว", "", "success").then(r => {
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
                    กดยืนยันเพื่อเช็กเอ้า
                </h1>
                <button onClick={check_out} id='check_out' className='btn btn-error mt-3'>
                    เช็กเอ้า
                </button>
            </div>
        </>
    );
}

export default Checkout;