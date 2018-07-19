# server


In Pubsub, There is a Client, and there is a Server.

* Client can only send or receive from Server
* but Server can receive from anyone, reply to that perticular mesasage, or emit to all Clients.

MQTTLens, works as a Client,
Our Client Node server(index.js) works as a Client.

Client on Client cant be posible.
Server => Node Red