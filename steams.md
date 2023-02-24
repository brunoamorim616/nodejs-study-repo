# Node JS Streams

## What is it?
A concept that lets the client read or write content on demand.
The most famous examples of this concept are Netflix and Spotify.


In prectice the idea is keeping the request open and fetch or send data during the process.


Every req or res is a stream.


When you must send or recieve data, this data, through the pipes should be send as bytes.
Primitive types are not allowed to be send directly through the pipes.
Using the `Buffer.from(data)` method that converts the primitive data to a bytes form


## Readable Streams
- Reads data from the request
- Does not need to send back data


## Transform Streams
- Transforms data
- Needs to recieve and return data
- The key point about transform streams is that it's used as a middle point between readable and writable streams.


## Writable Streams
- Recieve a buffer data
- Convert to a primitive to handle and process on JS
- Does not need to send back data

