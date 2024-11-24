import { HubConnectionBuilder } from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
  .withUrl("http://run-away.runasp.net/chat")
  .build();

const startConnection = () => {
  connection
    .start()
    .then(() => {
      console.log("Connected successfully");
    })
    .catch(() => {
      console.log("Failed to establish connection");
    });
};

export { connection, startConnection};
