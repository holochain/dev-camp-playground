# Holochain Events Goer 4000

A simple event app designed to get new users up, running and developing on Holochain

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites

You must have the Holochain 0.0.4-alpha command line tools installed.
The instructions for that are found in the [quick start guide](https://developer.holochain.org/start.html#development-section). 

### Developing Source Code

On day 1, when running the code, we only had to run one command, in one terminal, to get our Holochain app running.

That's because the production ready Holochain "Conductor" ran the services for both the UI files, and the DNA Instances.

In order to do development on the source code, we need to run two separate services in two separate terminals instead.

One for the UI development, and one for the DNA Instance. In today's playground, we give an example of running a UI development server, and making the UI files talk to the Holochain Conductor service, running on a separate port.


### Holochain DNA

Building the DNA also requires that the Holochain developer CLI, `hc`, is installed. Once you have `hc` installed, you can run the helper script.

You can check whether you've got the tools installed correctly by running the following, which should result in seeing `hc 0.0.4-alpha`:

`hc --version`

Change directories into the `dna-src` folder, run:
```
cd dna-src
```

Start a zero config development Conductor, with the `hc` tools.
```
hc run --package
```

The package flag means that it should first compile the source files into a single `bundle.json` DNA file.

What `hc run` is doing generally, is packaging then serving API access to your DNA over a Websockets interface. The port for that is, by default, 8888. In the UI javascript code, you will find a corresponding reference to http://localhost:8888, which is this port.

For details about the `hc run` command, check out the development Conductor article in the [Guidebook](https://developer.holochain.org/guide/latest/development_conductor.html).

Note that by default, `hc run` does not persist data writes to the file storage, only in memory, so data will be lost when you kill the server.

Leave the terminal open for as long as you are doing development. Also note that `hc run` does not yet have live-reload 
for file changes. In the future it will. What it is doing is serving API functions that access your DNA Instance over
WebSockets for the UI to connect to. The API is defined as described here in articles [7.3 - 7.4.2 in the Guidebook](https://developer.holochain.org/guide/latest/json_rpc_interfaces.html). It's recommended that you read these. You can skip over the HTTP section if you wish, because we will be focusing on Websocket based APIs.

In the other section of todays content, you will be learning about how to get started doing development of the DNA source code, and it's encouraged that you do that, before coming back and digging into modifying the Events Goer 4000 DNA.

### UI With React

Run the UI in development mode. When you make changes to the files, it will live-reload in the browser showing your changes.

```
cd react-ui-src
npm install
npm run start
```

This should automatically open up [http://localhost:3000](http://localhost:3000) in your browser, which is where your UI is now being served. Similar to when it was being served via the production `holochain` Conductor, but this time it has live-reload, and isn't serving static (pre-compiled) files, but dynamic ones.

When you have the UI running on localhost:3000 and it's showing the Register screen, yay! You have everything you need to get started doing "full-stack" Holochain development. That is: a running DNA Instance, and a running UI connecting to it.

Under the `react-ui-src` folder, open up the `index.js` file. 

Note the two constant variables declared near the top, `instanceID`, and `holochainWebsocketUri`.
These are configured differently when we're writing code in development mode, than when we want to ship it. The code comments clarify how to tweak these variables. Do a search in the file for where those variables are used.

As a starting point for playing with the code, open up `/react-ui-src/src/components/RegisterScreen/index.js`.
In that file, change the name `Events Goer 4000` on line 17 to some other name you come up with. Don't forget, extra points for cool names. Once you change it, save it. Now check out the browser [http://localhost:3000](http://localhost:3000) again. You'll see the name has updated.

If you want to extend the functionality of the app, here's where to start:

Open up `/react-ui-src/src/index.js` and look at, for example, lines 145-152:
```javascript
    getUserProfile: userId => {
        this.makeHolochainCall(`${instanceID}/event/get_member_profile`, { agent_address: userId }, (result) => {
          console.log('retrieved profile', result)
          this.setState({
            users: { ...this.state.users, [userId]: result.Ok }
          })
        })
    },
```
This is defining a function which when called, will make the call to the right function internally to Holochain, via the websocket connection. If you're wondering what the string `${instanceID}/event/get_member_profile` is, read about it [here](https://developer.holochain.org/guide/latest/conductor_json_rpc_api.html#calling-zome-functions) in the Guidebook. With the result from Holochain, it modifies the local state, which will in turn update the UI because "React" :).

All of this relies on the [@holochain/hc-web-client](https://www.npmjs.com/package/@holochain/hc-web-client) library, so if you're curious about that, and want to use it in another way on a different project, it's totally re-usable. Check that out.

If you're excited about using React, but not familiar with it, then just go and check out 
the [React tutorial](https://reactjs.org/tutorial/tutorial.html), then come back and play with the Events Goer code.


## Built With

* [Holochain](https://developer.holochain.org/)
* [React](https://reactjs.org/)


## Authors

A huge acknowledgement to Pusher for providing an open source React slack clone UI (https://github.com/pusher/react-slack-clone)

* **Willem Olding** - *Initial work* - [willemolding](https://github.com/willemolding)
* **Connor Turland** - [Connoropolous](https://github.com/Connoropolous)

## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details

