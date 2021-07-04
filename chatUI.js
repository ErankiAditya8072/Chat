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
let username = null;
let room = null;
let existingroom = [];
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
window.onload = function () {
  username = localStorage.username ? localStorage.username : "anonymous";
  showname.textContent = username;
  existingrooms();
  if (username == "anonymous") {
    updatenamebox.setAttribute("class", "pop-container-show");
  }
};

getname.addEventListener("focus", function (e) {
  errormessage.textContent = "";
});
editupdate.addEventListener("click", function (e) {
  updatenamebox.setAttribute("class", "pop-container-show");
});

can.addEventListener("click", function (e) {
  if (!localStorage.username || localStorage.username === "anonymous") {
    errormessage.textcontent = "Please Enter the username";
  } else {
    updatenamebox.classList.remove("pop-container-show");
    errormessage.textContent = "";
    getname.value = "";
  }
});
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
search.addEventListener("keyup", function (e) {
  const term = search.value.trim().toLowerCase();
  console.log(term);
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
