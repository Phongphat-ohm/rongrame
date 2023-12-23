import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth'

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

function App() {
  useEffect(() => {
    const loggedin = window.localStorage.getItem("loggedin");

    if (loggedin !== "true") {
      document.getElementById('login_modal').showModal()
    }
  }, []);

  return (
    <>
      <div className="flex h-screen">
        <div className="w-3/12 border-r">
          <h1 className="text-3xl text-center font-bold m-5 bg-base-100">
            Rongrame
          </h1>
          <div className="p-3 px-10">
            <ul className="menu menu-md rounded-box w-full">
              <li>
                <a target='01' href='/dashboard/home'>หน้าหลัก</a>
              </li>
              <li>
                <a target='01' href='/dashboard/reserve'>จองห้อง</a>
              </li>
              <li>
                <a target='01' href='/dashboard/checkin'>เช็กอิน</a>
              </li>
              {/* <li>
                <details open>
                  <summary>ลูกค้า</summary>
                  <ul>
                    <li><a target='01' href='/dashboard/customer'>ดูลูกค้าทั้งหมด</a></li>
                    <li><a target='01' href='/dashboard/customer/new'>เพิ่มลูกค้า</a></li>
                  </ul>
                </details>
              </li> */}
              <li>
                <details open>
                  <summary>ห้องพัก</summary>
                  <ul>
                    <li><a target='01' href='/dashboard/room'>ดูห้องทั้งหมด</a></li>
                    <li><a target='01' href='/dashboard/room/new'>เพิ่มห้อง</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full">
          <iframe src="/dashboard/home" name="01" className='w-full h-screen' frameBorder="0"></iframe>
        </div>
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

export default App;