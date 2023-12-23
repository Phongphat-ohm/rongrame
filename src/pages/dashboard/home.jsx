import React, { useState, useEffect } from 'react';
import Nav from "../element/Nav";
import Rooms from '../function/room';
import Swal from 'sweetalert2';

const rm = new Rooms();

function DashHome() {
    const [room, setroom] = useState(0);

    useEffect(() => {
        Swal.fire({
            title: "กำลังโหลด",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false
        });

        rm.get_rooms().then(r => {
            setroom(r.length);

            Swal.close();
        })
    }, []);

    return (
        <>
            <Nav />
            <br /><br /><br /><br />
            <div className="mx-10">
                <div className="grid grid-cols-5">
                    <div className="stats border m-3">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUklEQVR4nO2aTWjUQBTHfyvqVitY67p+9KTYrRfpYY+KIHjwoiDai4eCHopg/QBRD0XwE7x6lEJFL0IVtAp6KKJIpSp+ICii2Fq/QKtSrahtrUYCLzCOSbNJpskuu38IbDLJzPvP/OfNzHsLFZQPGoAjwADQDxwEllIimAO0AD3AH8Byue4Bu4AsRYYqoAm4BIwpBn8FOpT7Dnnm3I8CF4GNQDpJAnngBPBRMW4c6AaagWp5zylzSK8DOjXSX4AzwBogFZfuba2/0OTyBNgPzHf5RiWiotZDhq+B49JWLLp/IyPS6PO9FxEVy3w6KBvW+LQigdGIEiiESBjJRqpkJsERlEjkzryhDWsvsB3IEA1hiajIiC29mo3XcYFTeAioxxxMEFFRLzZ61mu6wcTqtUI2uAg4ALwEbgWo9xrQBxwOqQDLBJEpMtn0hc3te7/n+tZlXhxE6qT3X2lbjc4IRE4Bw8r9CHBOPNY000RWAF3iip33ngP7lMUqLBHErW8GrmptDAJ7TRIZVnrrLLDaxYdHIaJiIbAHeCTlv0wSccomWlNMEQlqU+EFERutEKEyIpS3tGqAHaVMZCVwGvihlN8vFSI1clp0fLwlp8YeeT6jVIj8VH6/A44BS0IakwiRMSkbl7DPemCqjxFFSWSL7KvsLXtQFBUREyc5+3euVIhkPM7W6nUH2FmMRKqATbLNV6MdQ0A7sEqudnmmE9swQcjUioNImPiTV4hnyCPEY00WETsieFRSBWqv3gZaA4aOvGTYL+f4nGkiWdH0XY8GGww6hj6PeZUNSyTJqHleJDvoI1lfIm55jC6Z0DbBuJAWR3BBm0963uUfpFyG0wmZziV51ALbPDJh/xF5qA2lnU1aKzGspJESOZ/XpP7ATeLOy/q8eCu5iyRyfrNlV/1Ysee3zJemQvZ7CyTBMuASiIsjPZYHTgLflfbfSyZrcZgK1dCoGjh7JkRNzh/bkTSLXPRQaotJR1MnEvugnU+cUQqLBunpz5pnskdkOZOI6aLPbs2DOD03y0Ad1cSMnPTmJ5febCxwVEcMjKox2EHorS7bmJsSnLZPlFfE4zhlT4HdEgcoSuRlRL65LLK2w7gc5x8DTK0BrRJxsTeYbeLWKygL/AXF6lPO1NMBwQAAAABJRU5ErkJggg==" />
                            </div>
                            <div className="stat-title">จำนวนห้อง</div>
                            <div className="stat-value">{room - 1}</div>
                        </div>
                    </div>
                    {/* <div className="stats border m-3">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB3UlEQVR4nO2Yz0pCQRSHPw1rla1a9QJlK7f1BgWFbesBglbRpl6gVZogrXuDiggifIDaqxmBT2Ch2B8CwxsDx83h3qteLceYDw7IeO45v5l7zjgjOBwOx39jGTgFysC7mPmcA1JYzDRQAL4BL8DMd3kggYXiiyHCtd3ZNonCAOK7Zt6ENTWvy6YCbACzYpvAo/JpA0tYwKmP+KSP3xxQVb5ZLKCiRJnVDiKjfEtYQEuJMiUTRFL5trCAiZ9AedJLKKdEPUrDaszYk/I9wQJSPttoVVY7KZbxEW+20UUsIR/hh8yKLbRLQo4H/Yq/te0ogQjKS2kECW9Lz1gnXvdEVnaYN7GSNKw1Ne9wOBz2MAWkgT3gTO7Gz0Ad+BKry1hRfPbkmalxiTZH5m3gCmhGOEZ0rQlcSqywY/hI77/nwOcQooPsU2KbHCNnAbgAOr8g3FPWkVwm50jYARo9ktalnA7l6GxWcR6YEZuXsS3gSHxfesRsSO6hOAhJUAOOpRljEWKbZ9ISoxaSZz+q+NWAvwnv5doYZ3TEJeaDTz6jYSVK0BsV6APYjbja/RKTHB8q93WUYK8qyBp/x7rKbfplYPSr/Gu8YfN7ltnAjFuw5ybA+FfdG2MPOhwOB735AXEPv3mzNAbBAAAAAElFTkSuQmCC" />
                            </div>
                            <div className="stat-title">จำนวนลูกค้า</div>
                            <div className="stat-value">0</div>
                        </div>
                    </div> */}
                    <div className="stats border m-3">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEe0lEQVR4nO2Za4hVVRTHf1cnjbScrCx7aZkm+ShNLMo+9TCtiDJUojQHTQIflJkQal8K0ulTA9qDpocGamlFJZIl6BRBTGJqZalgMWmWmtZczVHnypL/hu3hPvY5c+6dhP6wmTv7rL3XOnuv94H/cQpdgCuBDGcIngSyQA74HriB/zimS9h9wAagFTgEjPRo+gL3AQ8DF1RSuM7AzcD9wCPAVOAV4ATwF3C96B4FjupFfgD+1G83tgMdKiGwCbs3wtyNXcDgCP0twNd6mV+Bj4F1oreX7FoJoVeK4TbgeWCO1OIuoCpg/WipjO3xCRXCc2J4RKfoowfwHnAA+BIY5D3LAHN1urb+mKdGZUcn73oPyKAy8hLbPUM0I9yv+cuAjyKq9CIVxrnSUyfAPxLSfr8MnAXM9Obc+Fl/DwLn0w64FPjdM8BPgbERmgeBLzRmAjWif4t2xFgJ8U4g/RuifyAy3x0YAtwKXEKZYT72F+CwGJdCg4S+Sp5mkgw2qkYbgcnl9OGvFTi9fNgs2jHAT/rdAnwG1AILgDXAcT27s1xCPyUGzwTQri8QlCxYfQA8JE/UC3hMnip1XCijyum08vndjsBwoE5exglqKrEJ+ArY7c1/A/Quh7A9gTeBf/Oc2t9ivBb41ot+OeAPCel02FRkvHTXDPFDzZtXuiZNgScrj7DNtwAzgCuk0/YijV5qmlV6Wi9PY4kWEqhWUTWnjNCM0zBbSdYdaQhbpUzOBYfpuvq2oLfCvruhcR6vNqOTgodL7PuQLmp06qY2T6exoVnzUglske08yoOhXso7P62srlE5RzkxUMbaKpeXCDcphWwCLo55OyNkpOa/71USFYIhirAtOv1YOFsuqTVS45VCP7m6qCvcCYwK3ONxrfkuboBxRaqF6Tj+u0lGNQ24SHOW/LfEdGOrxN9cYPApNyl4WAIfinfFaGKeZ9cSD331onskT0lMEPNFMZj0VKLzY4rZ2auSwwJa8NUMC9z8HOAJrVmoqiQ6kjqCnGJEUdhVNKvcD2lrZWQwuSLDkqkkyEiObCkVGRSzGrFQfjWwWuvG6X9/VJMcS7RvUfd3t4ispxGK11WZu35Iozc2eIlSErygfe8pRjRRROayQmDJzRR1jmzdMvlZN4oyC8C0Ih7ptAo6tBLJV+S+TbqYE1LOjRCR1WtxUC2/bk3GbqSHhZLHKvWC6COi5QkYLPaiaNTz3A5cnmBPl2+bQRdERpnW/gTJuJ3wVjGxIvZZpQOm55Z49Y+5X5WqpL0h7tdFojiJkq8mdZ43cZVOXYLUdpTWW8VUEgMUkrfo+0kSdFTrLGnHqKuqpGOSJwi1esvP26FZ2N3rzC6Iq0+ugf6bGohtiWwhqBYf1wd5P0mRa1c8z/tukpU1zwJuS8G1ddM+sySgaz0cFd82VfvW13gp0glyI6tmeoPyjxUa9TLoem9uteh2eAL6Y7fUMolrLIgOMooa5RsNapQ3l8jyoqNZ6xq0j+13XaW+dPnoIm/hMjv7bHGj/ro5e57UG535OAlM0nSTq3SFawAAAABJRU5ErkJggg==" />
                            </div>
                            <div className="stat-title">รายได้วันนี้</div>
                            <div className="stat-value">1000000</div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>

                <label className="mx-3">ลิ้งอื่นๆ </label><br />
                <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box m-3">
                    <li><a href='/dashboard/home'>หน้าหลัก</a></li>
                    <li><a href='/dashboard/reserve'>จองห้อง</a></li>
                    <li><a href='/dashboard/checkin'>เช็กอิน</a></li>
                </ul>
            </div>
        </>
    );
}

export default DashHome;