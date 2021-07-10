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
      this.previous_date=null;
      this.curr = new Date();
      this.yesterday = new Date()
      this.yesterday.setDate(this.curr.getDate()-1);
      this.twodaysago = new Date();
      this.twodaysago.setDate(this.yesterday.getDate()-1);
      this.threedaysago = new Date();
      this.threedaysago.setDate(this.yesterday.getDate()-2);
      this.fourdaysago = new Date();
      this.fourdaysago.setDate(this.yesterday.getDate()-3);
      this.fivedaysago = new Date();
      this.fivedaysago = new Date();
      this.fivedaysago.setDate(this.yesterday.getDate()-4);
      this.sixdaysago = new Date();
      this.sixdaysago.setDate(this.yesterday.getDate()-5);
      this.previous_name=null;
      this.count1=0;
      this.count2=1;
  }
  getDateChats(date){
      const newdate = new Date(date);
      const monthname=newdate.toLocaleString('default', { month: 'long' });
      if(this.curr.toDateString () == date.toDateString())
      {
        return `Today`;
      }
      else if( date.toDateString() == this.yesterday.toDateString())
      {
        return 'Yesterday';
      }
      else if(this.twodaysago.toDateString() == date.toDateString() || 
               this.threedaysago.toDateString() == date.toDateString() ||
               this.fourdaysago.toDateString() == date.toDateString() ||
               this.fivedaysago.toDateString() == date.toDateString() ||
               this.sixdaysago.toDateString() == date.toDateString())
      {
        return `${date.toLocaleString('locale',{weekday:'long'})}`;
      }
      return `${monthname} ${date.getDate()}, ${date.getFullYear()}`;
  }
  differenceInWords(date){
      let str = '';
      if(date.getMinutes() <10)
        {
            str+=`${date.getHours()}:0${date.getMinutes()}`;
        }else{
            str+= `${date.getHours()}:${date.getMinutes()}`;
        }
      return str;
 }
  render(data) {
     const when = this.differenceInWords(data.createdAt.toDate());
     const date = this.getDateChats(data.createdAt.toDate());
   
    if(!this.previous_date)
    {
       let html = `<tr><td><div class="spacemore"><span>${date}</span></div></td></tr>`
       this.previous_date = date
       this.chatsec.innerHTML += html;
       this.count1=0;
       this.count2=1;
       this.previous_name=null;
    }
    else if(!(this.previous_date=== date)){
      let html = `<tr class="space"><td><div class="dateheading"><span>${date}</span></div></td></tr>`
       this.previous_date = date
       this.chatsec.innerHTML += html;
       this.count1=0;
       this.count2=1;
       this.previous_name=null;
    }
   if (data.username === chat.username.toLowerCase()) {  
      if (this.count1 == 0)
      {
          this.count1=1;
          this.count2=1;
          const html = `  
          <tr>
              <td>
                  <div class="right1">
                    <div class="rBody">${data.message}
                    <span class="rFoot">${when}</span>
                    </div>
                    </div>
                </td>
              </tr>`;
          this.chatsec.innerHTML += html;
      }
      else{
          const html = `  
          <tr>
              <td>
                  <div class="right">
                    <div class="rBody">${data.message}
                    <span class="rFoot">${when}</span>
                    </div>
                    </div>
                </td>
              </tr>`;
          this.chatsec.innerHTML += html;
      }
    } else {
      if(!this.previous_name)
      {
          this.previous_name = data.username;
      }
      if (this.count2 == 1 || this.previous_name!== data.username)
      {
        this.previous_name=data.username;
        this.count2=0;
        this.count1=0;
         const html = ` <tr>
            <td>
              <div class="left1">
                <div class="lHead">${data.username}</div>
                <div class="lBody">${data.message}
                <span class="lFoot">${when}</span></div>
                </div>
              
            </td>
          </tr>`;
      this.chatsec.innerHTML += html;
      }
      else{
          this.previous_name = data.username;
          const html = ` <tr>
                <td>
                  <div class="left">
                    <div class="lBody">${data.message}
                    <span class="lFoot">${when}</span></div>
                    </div>
                  
                </td>
              </tr>`;
          this.chatsec.innerHTML += html;
      }
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
      if (e.target.tagName === "LI") {
        const li = e.target;
        changeli(li);
        const room = li.textContent;
        chatui.previous_date=null;
        if (!chat) {
          chat = new Chatroom(room, localStorage.username);
        } else {
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
   chat.updateName(localStorage.username);
  } else if (oldname === "anonymous" && !chat) {
    chat = new Chatroom(null, localStorage.username);
  } else {
    chat.updateName(localStorage.username);
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
    updateshowname(oldname);
  } else {
    errormessage.textContent = "username already exists";
  }
};
up.addEventListener("click", function (e) {
  const name = getname.value.trim().toLowerCase();
  const pattern = /^[a-z]{5,15}[0-9]{0,5}$/;
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
        checkuname(true, name,username);
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