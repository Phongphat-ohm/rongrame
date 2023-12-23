import { initializeApp } from 'firebase/app';
import { getDatabase, get, ref, set, refFromURL, update } from 'firebase/database';
import $ from 'jquery';

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
const db = getDatabase(app);

class Rooms {
  async new_rooms(name, size, price) {
    const refer_all = ref(db, "/rooms");

    try {
        const r = await get(refer_all);
        const new_id = Number(r.val().length) + 1;
        const refer = ref(db, "/rooms/" + (new_id - 1));

        const create_room = await set(refer, {
            id: r.val().length + 1,
            "checked_in": false,
            "customer": {
                "name": "null",
                "phone": "null"
            },
            "price": price,
            "reserve_at": "null",
            "size": size,
            "status": 0,
            "name": name
        });

        return true
    } catch (error) {
        console.log(error);
        return false;
    }
}


  async get_rooms() {
    const refer = ref(db, "/rooms");

    try {
      const get_rooms = await get(refer);
      return get_rooms.val();
    } catch (error) {
      return false
    }
  }

  async get_room(id) {
    const refer = ref(db, "/rooms/" + id);

    try {
      const get_rooms = await get(refer);
      return get_rooms.val();
    } catch (error) {
      return false
    }
  }

  async check_out(id) {
    const refer = ref(db, "/rooms/" + id);

    try {
      await update(refer, {
        "status": 0,
        "reserve_at": "null",
        "checked_in": false,
        customer: {
          name: "null",
          phone: "null"
        }
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async check_in(id) {
    const refer = ref(db, "/rooms/" + id);

    try {
      await update(refer, {
        "checked_in": true
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async reserve(id, name_cus, phone_cus) {
    try {
      return new Promise((resolve, reject) => {
        var settings = {
          "url": "https://rongrame-98d60-default-rtdb.asia-southeast1.firebasedatabase.app/rooms/" + id + ".json",
          "method": "PATCH",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/json"
          },
          "data": JSON.stringify({
            "status": 1,
            "reserve_at": Date.now(),
            "checked_in": false,
            "customer": {
              "name": name_cus,
              "phone": phone_cus
            }
          }),
        };

        $.ajax(settings)
          .done(function (response) {
            resolve(true);
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            reject(false);
          });
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async plus_amount(amount) {

  }
}

export default Rooms;
