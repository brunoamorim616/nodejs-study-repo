# Node JS Streams

## What is it?
Node JS Streams is concept that lets a node server read or write content on demand.
The most famous examples of this concept are Netflix and Spotify (Movies and Music streams).


In practice the idea is keeping the request open and fetch or send data during the process.


In a node server every `req` or `res` is a stream.


Data must be send as as bytes through the pipes.
Primitive types are not allowed to be send directly through the pipes.
Use the `Buffer.from(data)` method from a node stream class that converts the primitive data to a byte form.


## Buffers
- A data representation in the computer's memory.
- It's a hexadecimal binary representation of the data.
- It was created because the Javascript can't work with binary data natively.


## Readable Streams
- Req on the server is a exaple of readable stream on the server, while res is a example on the client.
- Generally `GET` HTTP method.


## Transform Streams
- Transforms data
- Needs to recieve and return data
- The key point about transform streams is that it's used as a middle point between a readable and a writable streams.


## Writable Streams
- Res is a example of writable stream on the server, while Req is a example on the client.
- Generally `POST` HTTP method.


## Processing the client's data on the server
- While recieving data on demand from the client's request, a god aproach is to user a `asynchronous for` to handle the chunks.
- When the process is done, a response can be returned to the client.
