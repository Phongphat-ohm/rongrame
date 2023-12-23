import React, { useState, useEffect } from 'react';
import Nav from '../../../element/Nav';
import Rooms from '../../../function/room';
import Swal from 'sweetalert2'

const rm = new Rooms();

function Check_IN() {
    const [FindRoom, setFindRoom] = useState([]);

    useEffect(() => {
        document.getElementById("phone").focus()
        
    }, []);

    return (
        <>
            <Nav />
            <div className="h-screen flex justify-center items-center   ">
                <div className="card w-96 border">
                    <div className="card-body">
                        <h3 className="text-xl font-bold text-center">
                            เช็กอิน
                        </h3>
                        <form onSubmit={(e => {
                            e.preventDefault();
                            Swal.fire({
                                title: "กำลังหาห้อง",
                                timer: 2000,
                                showConfirmButton: false,
                                allowEscapeKey: false,
                                allowOutsideClick: false
                            })

                            const phone = e.target.phone.value;

                            rm.get_rooms().then(r => {
                                const value = r.filter((val) => val.customer.phone === phone && val.checked_in == false);

                                setFindRoom(value)

                                if (value.length === 0) {
                                    Swal.fire("ไม่พบ", "ไม่พบหมายเลขนี้ในระบบโปรดลองอีกครั้ง หรือ อาจจะเช็กอินไปแล้ว", "error");
                                } else {
                                    document.getElementById('check_in_modal').showModal();
                                }
                            })
                        })}>
                            <div className="form-control">
                                <label className="label">หมายเลขโทรศัพท์</label>
                                <input required type="text" name="phone" id="phone" placeholder='หมายเลขโทรศัพท์' className="input input-bordered" />
                            </div>
                            <button className="btn btn-success mt-3 w-full">
                                ค้นหาการจอง
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <dialog id="check_in_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">โปรดเลือกห้องที่ต้องการเช็กอิน</h3>

                    <div className="grid grid-cols-2 gap-3">
                        {FindRoom.map((val, index) => (
                            <div className="card border mt-2 cursor-pointer  hover:border-blue-500 hover:bg-blue-100 transition-all" onClick={() => {
                                window.location.href = "/dashboard/room/checkin?id=" + val.id
                            }} key={index}>
                                <div className="card-body p-5">
                                    <p>ชื่อลูกค้า: {val.customer.name}</p>
                                    <p>ขนาดห้อง: {val.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default Check_IN;