const editupdate = document.getElementById("edit");
const updatenamebox = document.getElementById("pop-container");
const can = document.getElementById("can");
const aelements = document.getElementById("blockelements");
const search = document.getElementById("searchname");
const getname = document.getElementById("updatetext");
const getupdate = document.getElementById("up");
const duplicatebox = document.getElementById("addduplicatebox");
const errormessage = document.querySelector("#errormessage");
const rooms = db.collection("rooms").doc("eSfHbG3WDNbdjpY3zxAZ");
const showname = document.getElementById("usernamedevice");
const blockelements = document.querySelector("#blockelements");
var messageBody = document.querySelector("#chatsection");
messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
let room = null;
let existingroom = [];
// adding rooms
async function existingrooms() {
  await rooms.onSnapshot((snapshot) => {
    snapshot.data().room.forEach((r) => {
      if (existingroom.length === 0) {
        existingroom.push(r);
        let html = `<li>${r}</li>`;
        blockelements.innerHTML = html;
      } else {
        let chatrooms = existingroom.find((room) => room === r);
        if (!chatrooms) {
          existingroom.push(r);
          let html = `<li>${r}</li>`;
          blockelements.innerHTML += html;
        }
      }
    });
  });
}
// async function CheckLocalAndUsersDB(){
//   users.onSnapshot((snapshot) => {
//     snapshot.docChanges().forEach( change => {
//       if(change.type == "removed")
//       {
//        console.log(change.doc.usernames);
//       }
//     });
//   });
// }
async function checkLocalAndUsersDb(initalName){
  await users.get().then((fields) => {
      if (fields.data().usernames.length !== 0) {
        const unique = fields.data().usernames.find((uname) => uname === initalName);
        if(!unique)
        {
          users.update({
             usernames: firebase.firestore.FieldValue.arrayUnion(initalName),
           });
        }
      }
      else{
         users.update({
         usernames: firebase.firestore.FieldValue.arrayUnion(initalName),
          });
         } 
    });
}
window.onload = function () {
  username = localStorage.username ? localStorage.username : "anonymous";
  showname.textContent = username;
  existingrooms();
  if(username !== "anonymous")
  {
    checkLocalAndUsersDb(username);
  }else if (username == "anonymous") {
    updatenamebox.setAttribute("class", "pop-container-show");
  }
};
//pop up focus
getname.addEventListener("focus", function (e) {
  errormessage.textContent = "";
});
//pop up display
editupdate.addEventListener("click", function (e) {
  updatenamebox.setAttribute("class", "pop-container-show");
});
//cancel button
can.addEventListener("click", function (e) {
  if (!localStorage.username || localStorage.username.includes("anonymous")) {
    errormessage.textcontent = "Please Enter the username";
  } else {
    updatenamebox.classList.remove("pop-container-show");
    errormessage.textContent = "";
    getname.value = "";
  }
});
//Search
const filterroom = (term) => {
  console.log(aelements.children);
  Array.from(aelements.children)
    .filter((room) => !room.textContent.toLowerCase().includes(term))
    .forEach((room) => room.classList.add("filtered"));
  Array.from(aelements.children)
    .filter((room) => room.textContent.toLowerCase().includes(term))
    .forEach((room) => {
      room.classList.remove("filtered");
    });
};
//Search listener
search.addEventListener("keyup", function (e) {
  const term = search.value.trim().toLowerCase();
  filterroom(term);
});

const changeli = (li) => {
  li.setAttribute("class", "activated");
  Array.from(blockelements.children).forEach((el) => {
    if (el != li) {
      el.classList.remove("activated");
    }
  });
};
