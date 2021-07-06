const chatsec = document.getElementById("chatcook");
const users = db.collection("users").doc("7PtqR1sGNP3mEFMIc1qa");

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.chatsection = chatsec;
  }
  async addChat(message) {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      createdAt: firebase.firestore.Timestamp.fromDate(now),
    };
    const response = await this.chats.add(chat);
    return response;
  }
  async getchats(callback)
  {
    this.unsub = await this.chats
      .where("room", "==", this.room)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callback(change.doc.data());
          }
        });
      });
  }
  async updateName(username)
  {
    const obj = new Object();
    obj.username = username;
    await this.chats.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().username == this.username) {
          let id = doc.id;
          this.chats.doc(id).update(obj);
        }
      });
    });
    await users.update({
      usernames: firebase.firestore.FieldValue.arrayRemove(this.username),
    });
    this.username = username;
    console.log(this.username, "from UpdateName method in class");
  }
  async updateRoom(room) {
    this.room = room;
    if (this.unsub) {
      this.unsub();
    }
  }
  async clearchats() {
    this.chatsection.innerHTML = "";
  }
  async resetChats() {
    await this.chats.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.chats.doc(doc.id).delete();
      });
    });
  }
}
