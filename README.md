## Setting up with aoi.js

This project has nodejs 16.6.0 already built-in and is pre-setup for your uses.

As well has all of Akarui Development Team packages related for aoi.js


## What's added

- Music has been already setup, add your own music commands.
- Panel has been setup, make sure read below regarding to set it up correctly.

## IMPORTANT

`SECRETS (ENV)`

- On the left side of the navigation, there should be a section for SECRETS aka Environment variables. 
- Add `TOKEN` and value = `YOUR DISCORD BOT TOKEN`
- Add `username` and value = `YOUR PANEL USERNAME`
- Add `password` and value = `YOUR PANEL PASSWORD`

## Begin your Coding journey
[Documentation](https://aoi.js.org/docs)

## Command Handler

By default it's disabled by comments.
Remove `/*` and `*/`

```js
 bot.cmd is object of Collections where the command data will be stored

 "./commands/" is the path of folder where all the commands code will be present
 ```

`commands` directory can be changed into any name you want.
- Make sure to update inside of loader 

`loader.load(bot.cmd,'./DIRECTORY NAME/') `