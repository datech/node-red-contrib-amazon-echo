# node-red-contrib-amazon-echo

Alexa controlled Node-Red nodes supporting latest Amazon Echo devices

**NO Alexa Skills required.**

**NO cloud dependencies.**

## Installation
Install from your Node-RED Manage Palette

or

Install using npm

    $ npm install node-red-contrib-amazon-echo

## How to use
  * Add **Amazon Echo Hub** node your flow
  * Add multiple **Amazon Echo Device** nodes linked to **Amazon Echo Hub node**
  Note: Use unique names for device nodes. Alexa will use the node name to manage your smart device
  * Ask **"Alexa, discover devices"** or start the discover procedure from the Alexa mobile app

![Usage screenshot](https://raw.githubusercontent.com/datech/node-red-contrib-amazon-echo/master/docs/images/how-to-use.png "Screenshot")

## Features
  * Turning on/off
  * Dimming
  * Setting the light color

## Supported devices
  * Amazon Echo 2nd generation
  * Amazon Echo Plus 2nd generation
  * Amazon Echo Dot 1st, 2nd and 3rd generations

## Example Alexa commands
  *  Alexa, turn on/off {device}
  *  Alexa, switch on/off {device}
  *  Alexa, set {device} to 50%
  *  Alexa, turn my {device} light green
  *  Alexa, set the {device} light to orange
  *  Alexa, make the {device} warmer
  *  Alexa, brighten {device} to 60 percent
  *  Alexa, dim the {device} lights

## Requirements
Amazon Echo Hub node is starting a service listening on port 80 which requires Node-Red process to be started with root user.

**No additional settings are needed if Node-Red is started as Home Assistant add-on**

## Troubleshooting
Detailed troubleshooting instructions can be found on the [Wiki](https://github.com/datech/node-red-contrib-amazon-echo/wiki)

## Bugs and feature requests
Please create an issue in [GitHub](https://github.com/datech/node-red-contrib-amazon-echo/issues)
