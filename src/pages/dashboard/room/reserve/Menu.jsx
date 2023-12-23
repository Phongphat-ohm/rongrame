import React, { useState, useEffect } from 'react';
import Nav from '../../../element/Nav';
import Swal from "sweetalert2"
import Rooms from '../../../function/room';

const rm = new Rooms();

function ReserveRoom() {
    return (
        <>
            <Nav />
            <div className="h-screen flex justify-center items-center">
                <div className="card border w-96">
                    <div className="card-body">
                        <h3 className="text-xl font-bold text-center">
                            จองห้อง
                        </h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            Swal.fire({
                                title: "กำลังหาห้อง",
                                timer: 2000,
                                showConfirmButton: false,
                                allowEscapeKey: false,
                                allowOutsideClick: false
                            })

                            const size = e.target.size.value;

                            rm.get_rooms().then((r) => {
                                const value = r.filter((val) => val.size == size && val.status == 0)[0];

                                Swal.fire({
                                    title: "กำลังหาห้อง",
                                    timer: 2000,
                                    showConfirmButton: false,
                                    allowEscapeKey: false,
                                    allowOutsideClick: false
                                })


                                if (!value) {
                                    Swal.fire("ไม่พบห้อง", "อาจเกิดจากห้องเต็ม", "error")
                                } else {
                                    Swal.fire({
                                        title: "ค้นหาห้องสำเร็จ",
                                        icon: "success",
                                        showCancelButton: true
                                    }).then(r => {
                                        if (r.isConfirmed) {
                                            window.location = "/dashboard/room/reserve?id=" + value.id
                                        }
                                    })
                                }
                            })
                        }}>
                            <div className="form-control">
                                <label className="label">ขนาดของห้อง</label>
                                <select id='size' name='size' className="select select-bordered w-full max-w-xs">
                                    <option disabled selected>โปรดเลือกขนาดของห้อง</option>
                                    <option value="s">s สำหรับ 1 คน</option>
                                    <option value="m">m สำหรับ 2 คน</option>
                                    <option value="l">l สำหรับ 4 คน</option>
                                    <option value="xl">xl สำหรับ 5 คนขึ้นไป</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success mt-3">
                                ยืนยัน
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReserveRoom;