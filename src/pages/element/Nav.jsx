import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC53VFBXJ8gsofRJddVmWG9R-v6y_Ev3dM",
  authDomain: "rongrame-98d60.firebaseapp.com",
  databaseURL: "https://rongrame-98d60-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rongrame-98d60",
  storageBucket: "rongrame-98d60.appspot.com",
  messagingSenderId: "276267032320",
  appId: "1:276267032320:web:ba2b347584148c1daa5de5",
  measurementId: "G-3MXTYDV40N"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

function Nav() {
    const [profile, setProfile] = useState({
        name: "please login",
        photo: "https://i0.wp.com/www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg?fit=415%2C415&ssl=1",
        email: "please login"
    })
    const [loggenin, setLoggedin] = useState(false);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("user"));
        const loggedin = window.localStorage.getItem("loggedin")

        if (loggedin == "true") {
            setProfile(user)
            setLoggedin(true)
        }
    }, []);

    return (
        <>
            <div className="navbar z-50 backdrop-blur fixed w-full border-b">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">โรงแรม</a>
                </div>
                {/* {(() => {
                    if (loggenin) {
                        return (
                            <div className="flex-none">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component " className='w-full' src={profile.photo} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </a>
                                        </li>
                                        <li><a>Settings</a></li>
                                        <li><a onClick={() => {
                                            signOut(auth);
                                            const user_detail = {
                                                name: "please login",
                                                photo: "https://i0.wp.com/www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg?fit=415%2C415&ssl=1",
                                                email: "please login"
                                            }

                                            window.localStorage.setItem("loggedin", "false")
                                            window.localStorage.setItem("user", JSON.stringify(user_detail));

                                            Swal.fire("ออกจากระบบสำเร็จ", "", "success").then((e) => {
                                                window.location = "/dashboard/home";
                                            });
                                        }}>Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <button onClick={() => {
                                document.getElementById('login_modal').showModal()
                            }}>เข้าสู่ระบบ</button>
                        )
                    }
                })} */}
                {loggenin && (
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component " className='w-full' src={profile.photo} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a onClick={() => {
                                    signOut(auth);
                                    const user_detail = {
                                        name: "please login",
                                        photo: "https://i0.wp.com/www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg?fit=415%2C415&ssl=1",
                                        email: "please login"
                                    }

                                    window.localStorage.setItem("loggedin", "false")
                                    window.localStorage.setItem("user", JSON.stringify(user_detail));

                                    Swal.fire("ออกจากระบบสำเร็จ", "", "success").then((e) => {
                                        window.location = "/dashboard/home";
                                    });
                                }}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                )}

                {!loggenin && (
                    <button onClick={() => {
                        document.getElementById('login_modal').showModal()
                    }}>เข้าสู่ระบบ</button>
                )}
            </div>

            <dialog id="login_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">เข้าสู่ระบบ</h3>
                    <button onClick={() => {
                        const google = new GoogleAuthProvider();
                        signInWithPopup(auth, google).then(r => {
                            const user_detail = {
                                name: r.user.displayName,
                                photo: r.user.photoURL,
                                email: r.user.email
                            }
                            window.localStorage.setItem("loggedin", "true")
                            window.localStorage.setItem("user", JSON.stringify(user_detail));
                            window.location.reload();
                        }).catch(error => {
                            console.log(error.code);
                            console.log(error.message);
                        })
                    }} className="btn w-full bg-white mt-3 hover:bg-white focus:border-blue-700 focus:bg-blue-100">
                        <img src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" alt="" className="w-5" />เข้าสู่ระบบด้วย google
                    </button>
                    <button onClick={() => {
                        const github = new GithubAuthProvider();
                        signInWithPopup(auth, github).then(r => {
                            const user_detail = {
                                name: r.user.displayName,
                                photo: r.user.photoURL,
                                email: r.user.email
                            }
                            window.localStorage.setItem("loggedin", "true")
                            window.localStorage.setItem("user", JSON.stringify(user_detail));
                            window.location.reload();
                        }).catch(error => {
                            console.log(error.code);
                            console.log(error.message);
                        })
                    }} className="btn w-full bg-white mt-3 hover:bg-white focus:border-blue-700 focus:bg-blue-100">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" className="w-5" />เข้าสู่ระบบด้วย github
                    </button>
                    {/* <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div> */}
                </div>
            </dialog>
        </>
    );
}

export default Nav;