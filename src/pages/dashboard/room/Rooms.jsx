import React, { useState, useEffect } from 'react';
import Rooms from '../../function/room';
import Nav from '../../element/Nav';
import Footer from '../../element/Footer';
import Swal from "sweetalert2";

const rm = new Rooms();


function Roms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        Swal.fire({
            title: "กำลังโหลด",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false
        });

        rm.get_rooms().then(r => {
            if (r !== false) {
                Swal.fire("โหลดข้อมูลสำเร็จ", "", "success");
                setRooms(r);
            }
        })
    }, []);

    return (
        <>
            <Nav />
            <br /><br /><br /><br />
            <div className="mx-10">
                <div className="stats shadow">

                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUklEQVR4nO2aTWjUQBTHfyvqVitY67p+9KTYrRfpYY+KIHjwoiDai4eCHopg/QBRD0XwE7x6lEJFL0IVtAp6KKJIpSp+ICii2Fq/QKtSrahtrUYCLzCOSbNJpskuu38IbDLJzPvP/OfNzHsLFZQPGoAjwADQDxwEllIimAO0AD3AH8Byue4Bu4AsRYYqoAm4BIwpBn8FOpT7Dnnm3I8CF4GNQDpJAnngBPBRMW4c6AaagWp5zylzSK8DOjXSX4AzwBogFZfuba2/0OTyBNgPzHf5RiWiotZDhq+B49JWLLp/IyPS6PO9FxEVy3w6KBvW+LQigdGIEiiESBjJRqpkJsERlEjkzryhDWsvsB3IEA1hiajIiC29mo3XcYFTeAioxxxMEFFRLzZ61mu6wcTqtUI2uAg4ALwEbgWo9xrQBxwOqQDLBJEpMtn0hc3te7/n+tZlXhxE6qT3X2lbjc4IRE4Bw8r9CHBOPNY000RWAF3iip33ngP7lMUqLBHErW8GrmptDAJ7TRIZVnrrLLDaxYdHIaJiIbAHeCTlv0wSccomWlNMEQlqU+EFERutEKEyIpS3tGqAHaVMZCVwGvihlN8vFSI1clp0fLwlp8YeeT6jVIj8VH6/A44BS0IakwiRMSkbl7DPemCqjxFFSWSL7KvsLXtQFBUREyc5+3euVIhkPM7W6nUH2FmMRKqATbLNV6MdQ0A7sEqudnmmE9swQcjUioNImPiTV4hnyCPEY00WETsieFRSBWqv3gZaA4aOvGTYL+f4nGkiWdH0XY8GGww6hj6PeZUNSyTJqHleJDvoI1lfIm55jC6Z0DbBuJAWR3BBm0963uUfpFyG0wmZziV51ALbPDJh/xF5qA2lnU1aKzGspJESOZ/XpP7ATeLOy/q8eCu5iyRyfrNlV/1Ysee3zJemQvZ7CyTBMuASiIsjPZYHTgLflfbfSyZrcZgK1dCoGjh7JkRNzh/bkTSLXPRQaotJR1MnEvugnU+cUQqLBunpz5pnskdkOZOI6aLPbs2DOD03y0Ad1cSMnPTmJ5febCxwVEcMjKox2EHorS7bmJsSnLZPlFfE4zhlT4HdEgcoSuRlRL65LLK2w7gc5x8DTK0BrRJxsTeYbeLWKygL/AXF6lPO1NMBwQAAAABJRU5ErkJggg==" />
                        </div>
                        <div className="stat-title">จำนวนห้องทั้งหมด</div>
                        <div className="stat-value text-primary">{rooms.length - 1}</div>
                        <div className="stat-desc"> ห้อง</div>
                    </div>

                </div>
                <h1 className="text-3xl font-bold mt-5">
                    ห้องของทั้งหมด
                </h1>
                <div className="overflow-x-auto" style={{
                    height: "60vh"
                }}>
                    <table className="table table-pin-rows table-pin-cols">
                        <thead>
                            <tr>
                                <th></th>
                                <td>ชื่อ</td>
                                <td>ขนาด</td>
                                <td>ราคา</td>
                                <td>สถานะ</td>
                                <td>วันที่จอง</td>
                                <td>เช็กอินแล้ว</td>
                                <td>ข้อมูลลูกค้า</td>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((val, index) => (
                                <tr key={index}>
                                    <th>{index}</th>
                                    <td>{val.name}</td>
                                    <td>{val.size}</td>
                                    <td>{val.price}</td>
                                    <td>
                                        {val.status == 0 && (
                                            <div className="font-bold flex">
                                                <div className="p-2 bg-success tooltip tooltip-right text-white rounded cursor-pointer" data-tip="กดเพื่อจอง" onClick={() => {
                                                    window.location.href = "/dashboard/room/reserve/?id=" + val.id
                                                }}>
                                                    ห้องว่าง
                                                </div>
                                            </div>
                                        )}
                                        {val.status == 1 && (
                                            <div className="font-bold flex">
                                                <div className="p-2 bg-error text-white rounded">
                                                    ห้องไม่ว่าง
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {val.reserve_at == "null" && (
                                            <label>ยังไม่ได้จองห้อง</label>
                                        )}
                                        {val.reserve_at !== "null" && (
                                            new Date(val.reserve_at).toLocaleString()
                                        )}
                                    </td>
                                    <td>
                                        {val.reserve_at == "null" && (
                                            <label>ยังไม่ได้จองห้อง</label>
                                        )}
                                        {val.reserve_at !== "null" && (
                                            <div className='tooltip tooltip-right cursor-pointer' data-tip="กดเพื่อเช็กอินหรือเช็กเอ้าท์" onClick={() => {
                                                if (val.checked_in) {
                                                    window.location = "/dashboard/room/checkout?id=" + val.id
                                                } else {
                                                    window.location = "/dashboard/room/checkin?id=" + val.id
                                                }
                                            }}>
                                                {val.checked_in == true && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="50" viewBox="0 0 48 48">
                                                        <path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"></path><path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"></path>
                                                    </svg>
                                                )}

                                                {val.checked_in == false && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="50" viewBox="0 0 48 48">
                                                        <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                                                    </svg>
                                                )}
                                            </div>
                                        )}

                                    </td>
                                    <td>
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn m-1">ข้อมูลผู้ใช้</div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><a>ชื่อ: {val.customer.name}</a></li>
                                                <li><a>หมายเลขโทรศัพท์: {val.customer.phone}</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br /><br /><br /><br /><br />
            <Footer />
        </>
    );
}

export default Roms;