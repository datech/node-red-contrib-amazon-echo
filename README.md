# node-red-contrib-amazon-echo

## ❗️Important

As of 2025, **node-red-contrib-amazon-echo** remains a solid module for integrating Node-RED with Alexa — especially for those who prefer a local solution with no cloud dependencies. However, its support is mostly limited to basic devices like lights and switches, which has become a major limitation for more complex smart home setups.

That’s exactly what motivated me to create the next-generation [Node-RED Alexa](https://www.dulonode.com) integration — **DuloNode**. Built around the Alexa Smart Home Skill, **DuloNode** supports a much broader range of devices, including thermostats, blinds, locks, TVs, speakers, garage doors, fans, scenes, and more. It also unlocks advanced features like temperature control, volume adjustment, TV channel switching, and seamless automation flows — all from within Node-RED.

**Get started with more interesting and complex smart home flows using the Node-RED Alexa integration guide here:**  
[https://www.dulonode.com/docs/getting-started/](https://www.dulonode.com/docs/getting-started/)


## Node-RED Contrib Amazon Echo module 

Alexa controlled Node-Red nodes supporting the latest Amazon Echo devices

**NO Alexa Skills required.**

**NO cloud dependencies.**

## Installation

Install from your Node-RED Manage Palette

or

Install using npm

```sh
$ npm install node-red-contrib-amazon-echo
```

## How to use

- Add **Amazon Echo Hub** node to your flow.
- Add multiple **Amazon Echo Device** nodes linked to the **Amazon Echo Hub node**.
- **Note:** Use unique names for device nodes. Alexa will use the node name to manage your smart device.
- Ask **"Alexa, discover devices"** or start the discovery procedure from the Alexa mobile app.

![Usage screenshot](https://raw.githubusercontent.com/datech/node-red-contrib-amazon-echo/master/docs/images/how-to-use.png "Alexa controlled Node-Red nodes")

## Features

- Turning on/off
- Dimming
- Setting the light color

## Supported devices

- All Echo devices

## Example Alexa commands

- "Alexa, turn on/off {device}"
- "Alexa, switch on/off {device}"
- "Alexa, set {device} to 50%"
- "Alexa, turn my {device} light green"
- "Alexa, set the {device} light to orange"
- "Alexa, make the {device} warmer"
- "Alexa, brighten {device} to 60 percent"
- "Alexa, dim the {device} lights"

## Requirements

The Amazon Echo Hub node starts a service listening on port 80, which requires the Node-RED process to be started with root privileges or requires firewall rules to redirect the traffic.

## Troubleshooting

Detailed troubleshooting instructions can be found on the [Wiki](https://github.com/datech/node-red-contrib-amazon-echo/wiki).

## Bugs and feature requests

Please create an issue on [GitHub](https://github.com/datech/node-red-contrib-amazon-echo/issues).