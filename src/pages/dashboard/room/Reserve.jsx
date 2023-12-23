import React, { useState, useEffect } from 'react';
import Nav from '../../element/Nav';
import Rooms from '../../function/room';
import Swal from 'sweetalert2';

const rm = new Rooms();

function Reserve() {
    const [id, setID] = useState("");

    useEffect(() => {
        const url = new URL(window.location.href).searchParams;

        if (!url.get("id")) {
            window.location = "/dashboard/home"
        }

        setID(url.get("id"));
        document.getElementById("name").focus();
    }, []);

    const reserver = (name, phone) => {
        Swal.fire({
            title: "กำลังหาห้อง",
            timer: 2000,
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false
        })
        rm.reserve(id, name.value, phone.value).then(r => {
            console.log(r);
            if (r) {
                Swal.fire('จองห้องสำเร็จ', '', 'success').then(r => {
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
            <div className="h-screen flex items-center justify-center">
                <div className="card  border w-96">
                    <div className="card-body">
                        <h3 className="text-xl font-bold text-center">
                            ข้อมูลลูกค้า
                        </h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const name = e.target.name;
                            const phone = e.target.phone;

                            reserver(name, phone);
                        }}>
                            <div className="form-control">
                                <label className="label">ชื่อลูกค้า</label>
                                <input type="text" placeholder='ชื่อลูกค้า' name="name" id="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">หมายเลขโทรศัพท์</label>
                                <input type="text" placeholder='หมายเลขโทรศัพท์' name="phone" id="phone" className="input input-bordered" required />
                            </div>
                            <button className='btn btn-success mt-3'>
                                ยืนยัน
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reserve;