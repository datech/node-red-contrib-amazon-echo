# node-red-contrib-amazon-echo

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

## More device types

**node-red-contrib-amazon-echo** supports only basic device types like lights, switches, and dimmable bulbs. If you need a broader range of smart home devices, including thermostats, TVs, speakers, locks, blinds, garage doors, fans, and scenes, you might try **[DuloNode](https://www.dulonode.com)**.

**DuloNode** extends functionality beyond what node-red-contrib-amazon-echo offers by supporting more device categories and additional features like temperature control, TV channel changes, adjusting speaker volume, locking doors, raising blinds, and more advanced automation. It provides a comprehensive smart home integration experience for users looking for extended capabilities.