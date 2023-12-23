import React, { useState, useEffect } from 'react';
import Nav from '../../element/Nav';
import Swal from 'sweetalert2';
import Rooms from '../../function/room';

const rm = new Rooms();

function NewRooms() {
    useEffect(() => {
        document.getElementById("name").focus();
    }, []);

    return (
        <>
            <Nav />
            <div className="h-screen flex justify-center items-center">
                <div className="card border w-96">
                    <div className="card-body">
                        <h3 className="text-xl font-bold text-center">
                            รายละเอียดห้อง
                        </h3>
                        <form onSubmit={(e) => {
                            Swal.fire({
                                title: "กำลังหาห้องทำรายการ",
                                timer: 2000,
                                showConfirmButton: false,
                                allowEscapeKey: false,
                                allowOutsideClick: false
                            })

                            e.preventDefault();
                            const name = e.target.name.value;
                            const size = e.target.size.value;
                            const price = e.target.price.value;

                            rm.new_rooms(name, size, price).then(r => {
                                console.log(r);
                                if (r) {
                                    Swal.fire("สร้างห้องพักสำเร็จ", "", "success").then(r => {
                                        window.location = "/dashboard/room/new"
                                    })
                                } else {
                                    Swal.fire("มีบางอย่างผิดพลาด", "", "error");
                                }
                            })
                        }}>
                            <div className="form-control">
                                <label className="label">ชื่อห้องหรือหมายเลขห้อง</label>
                                <input required type="text" name="name" id="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">ไซส์ของห้อง</label>
                                <select required id='size' name='size' className="select select-bordered w-full max-w-xs">
                                    <option disabled selected>โปรดเลือกขนาดของห้อง</option>
                                    <option value="s">s สำหรับ 1 คน</option>
                                    <option value="m">m สำหรับ 2 คน</option>
                                    <option value="l">l สำหรับ 4 คน</option>
                                    <option value="xl">xl สำหรับ 5 คนขึ้นไป</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">ราคาของห้อง</label>
                                <input required type="text" name="price" id="price" className="input input-bordered" />
                            </div>
                            <button className="w-full btn btn-success mt-3">
                                สร้างห้อง
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewRooms;