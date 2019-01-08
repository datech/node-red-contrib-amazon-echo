# node-red-contrib-amazon-echo

Alexa controlled Node-Red nodes supporting latest Amazon Echo devices

**NO Alexa Skills required.**

**NO cloud dependencies.**

## Installation
Install from your Node-RED Manage Pallete

or

Install using npm

    $ npm install node-red-contrib-amazon-echo

## How to use
  * Add **Amazon Echo Hub** node your flow
  * Add multiple **Amazon Echo Device** nodes linked to **Amazon Echo Hub node**
  Note: Use unique names for device nodes. Alexa will use the node name to manage your smart device
  * Ask "Alexa, discover devices" or start the discover procedure from the Alexa app

![Usage screenshot](https://raw.githubusercontent.com/datech/node-red-contrib-amazon-echo/master/docs/images/how-to-use.png "Screenshot")

## Features
  * Switch on/off
  * Dimming
  * Set of the light color

## Supported devices
  * Amazon Echo Gen 2
  * Amazon Echo Dot Gen 2 & Gen 3

## Example Alexa commands
  *  Alexa, set Kitchen light to 40%
  *  Alexa, switch off Ceiling fan
  *  Alexa, lower Bedroom light by 15%

## Bugs and feature requests
Please create an issue in [GitHub](https://github.com/datech/node-red-contrib-amazon-echo/issues)
