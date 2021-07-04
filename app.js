let chat = null;
const removeduplicatebox = document.getElementById("adduplicatebox");
const addnewchat = document.getElementById("addnewchat");
const placnew = document.querySelector("#placenew");
const addnewrooms = document.querySelector("#addnewrooms");
const addnewroombutton = document.querySelector("#addnewroom");
const sendbutton = document.querySelector("#sendbut");
class ChatUI {
  constructor(chatsec) {
    this.chatsec = chatsec;
  }
  render(data) {
    const when = dateFns.distanceInWordsToNow(data.createdAt.toDate(), {
      addSuffix: true,
    });
    if (data.username === chat.username.toLowerCase()) {
      const html = `  
      <tr>
            <td>
              <div class="right">
                <div class="rBody">${data.message}</div>
                 <div class="rFoot">${when}</div>
              </div>
            </td>
          </tr>`;
      this.chatsec.innerHTML += html;
    } else {
      const html = ` <tr>
            <td>
              <div class="left">
                <div class="lHead">${data.username}</div>
                <div class="lBody">${data.message}</div>
                 <div class="lFoot">${when}</div>
               </div>
              
            </td>
          </tr>`;
      this.chatsec.innerHTML += html;
    }
    placenew.focus();
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }
}

const chatui = new ChatUI(chatsec);
const chatsgiver = () => {
  chat.getchats((data) => chatui.render(data));
};
blockelements.addEventListener("click", function (e) {
  console.log("clicked");
  if (e.target.tagName === "LI") {
    const li = e.target;
    changeli(li);
    const room = li.textContent;
    if (!chat) {
      chat = new Chatroom(room, localStorage.username);
    } else {
      console.log(chat.username);
      chat.updateRoom(room);
    }
    removeduplicatebox.setAttribute("id", "removeduplicatebox");
    addnewchat.setAttribute("id", "addoriginal");
    chat.clearchats();
    chatsgiver();
    placenew.focus();
  }
});
placenew.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    if (placenew.value.trim().length != 0) {
      const message = placenew.value.trim();
      chat.addChat(message);
      placenew.value = "";
    }
  }
});
sendbutton.addEventListener("click", function (e) {
  if (placenew.value.trim().length != 0) {
    chat.addChat(placenew.value.trim());
    placenew.value = "";
  }
});
const updateshowname = (oldname) => {
  showname.textContent = localStorage.username;
  if (!chat && oldname != "anonymous") {
    chat = new Chatroom(null, oldname);
    console.log(
      "from if statement updateshowname",
      localStorage.username,
      oldname
    );
    chat.updateName(localStorage.username);
  } else if (oldname === "anonymous" && !chat) {
    chat = new Chatroom(null, localStorage.username);
    console.log("from else if oldname == anonymous");
  } else {
    // chat.updateRoom(chat.room);
    chat.updateName(localStorage.username); //.then(() => {
    //   chat.clearchats();
    //   chatsgiver();
    //   console.log("from else ", chat.username);
    // });
  }
};

const checkuname = (unique, name, oldname) => {
  if (unique) {
    users.update({
      usernames: firebase.firestore.FieldValue.arrayUnion(name),
    });
    getname.value = "";
    localStorage.setItem("username", name);
    updatenamebox.classList.remove("pop-container-show");
    errormessage.textContent = "";
    getname.value = "";
    console.log(localStorage.username, oldname, "from check uname");
    updateshowname(oldname);
  } else {
    errormessage.textContent = "username already exists";
  }
};
up.addEventListener("click", function (e) {
  const name = getname.value.trim().toLowerCase();
  const pattern = /^[a-z]{5,15}[0-9]{0,5}$/;
  console.log(pattern.test(name));
  if (
    name.length >= 5 &&
    name.length <= 20 &&
    !name.includes("anonymous") &&
    pattern.test(name)
  ) {
    users.get().then((fields) => {
      if (fields.data().usernames.length !== 0) {
        const unique = fields.data().usernames.find((uname) => uname === name);
        checkuname(!unique, name, username);
      } else {
        checkuname(true, name);
      }
    });
  } else if (
    name.includes("anonymous") &&
    name.length >= 5 &&
    name.length <= 20
  ) {
    errormessage.textContent = "Must Enter a valid name";
  } else if (
    pattern.test(name) === false &&
    name.length >= 5 &&
    name.length <= 20
  ) {
    errormessage.textContent = "Enter a valid username";
  } else {
    errormessage.textContent = "username should consist (5-20) characters";
  }
});
addnewrooms.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    if (addnewrooms.value.trim().length !== 0) {
      let addroom = addnewrooms.value.trim().toLowerCase();
      let bool = existingroom.find((el) => addroom === el);
      if (bool) {
        addnewrooms.value = "";
        addnewrooms.setAttribute("placeholder", "This room already exists");
        setTimeout(
          () => addnewrooms.setAttribute("placeholder", "type to add a room"),
          5000
        );
        console.log("Entered here");
      } else {
        addnewrooms.value = "";
        rooms.update({
          room: firebase.firestore.FieldValue.arrayUnion(addroom),
        });
      }
    }
  }
});
addnewroombutton.addEventListener("click", function (e) {
  if (addnewrooms.value.trim().length !== 0) {
    let addroom = addnewrooms.value.trim().toLowerCase();
    let bool = existingroom.find((el) => addroom === el);
    if (bool) {
      addnewrooms.value = "";
      addnewrooms.setAttribute("placeholder", "This room already exists");
      setTimeout(
        () => addnewrooms.setAttribute("placeholder", "type to add a room"),
        5000
      );
      console.log("Entered here");
    } else {
      addnewrooms.value = "";
      rooms.update({
        room: firebase.firestore.FieldValue.arrayUnion(addroom),
      });
    }
  }
});
