# Holochain Events Goer 4000

A simple event app designed to get new users up, running and developing on Holochain

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites

If you are on Mac or Ubuntu, you'll need zmq installed:
On MacOS:
```
brew install zmq
```
On Ubuntu:
```
apt-get install libzmq3-dev
```

You will also need to install the dependencies of n3h, the networking module.
```shell
cd n3h && npm install && npm run bootstrap && cd ..
```

### Running

#### mac
`$ ./run-mac-node1.sh`

#### ubuntu
`$ ./run-ubuntu-node1.sh`

#### windows
Download and Install [Git Bash](https://git-scm.com/downloads) if you don't already have it.
It provides a Bash terminal, helpful for launching the necessary scripts.
Open Git Bash
Change directories in the terminal to the `day1` folder.
- **msvc**
    - `$ sh ./run-windows-msvc-node1.sh`
- **gnu**
    - `$ sh ./run-windows-gnu-node1.sh`

### Configuring Node 2 Networking
When you run the first command, scroll up and take careful note of the line that begins with `READY! tcp://127.0.0.1:43859 [...]
You will need to copy the string that starts with "/ip4/192.168"... and place it into the value of
the bootstrap_nodes field in `conductor-config-node2.toml`.
The value will be different on every computer, so can't be re-used. It should look like:
`bootstrap_nodes = ["/ip4/192.168.0.23/tcp/60906/ipfs/QmRVrz1bKU8VCkHLUQJFAsaVUiXYjksGPj6noHvYs43qWf"]`

Open a new terminal, and change directories to day3. 
Run the equivalent command as step 1, but ending in `-node2.sh`. For example:
`./run-mac-node2.sh`

### Open it in the Browser

#### mac and ubuntu
Open [http://localhost:3000](http://localhost:3000) for node 1 and [http://localhost:3001](http://localhost:3001) for node 2 in your browser. 

### windows
Open [http://localhost:3000/index.html](http://localhost:3000/index.html) for node 1 and [http://localhost:3001/index.html](http://localhost:3001/index.html) for node 2 in your browser. (without index.html will not work)

You're running a Holochain app with networking.

Please note, there are still lots of quirky behaviours that occur during networking, and not to expect flawless results.
The networking stack is under very active development, and is still at this point very immature.



## Built With

* [Holochain](https://developer.holochain.org/)
* [React](https://reactjs.org/)

A huge acknowledgement to Pusher for providing an open source React event UI (https://github.com/pusher/react-slack-clone)

## Authors

* **Willem Olding** - *Initial work* - [willemolding](https://github.com/willemolding)
* **Connor Turland** - [Connoropolous](https://github.com/Connoropolous)

## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details

