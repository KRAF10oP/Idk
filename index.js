const aoijs = require("aoi.js")

const bot = new aoijs.AoiClient({
token: "MTExMDI3NzEwMjU3OTc0ODg3NA.GYxc6d.RJ2eQFNDN1kKAykfz7v4wxGCqvxS_5SZ1H_EeU", //Discord Bot Token //Discord Bot Token//Discord Bot Token
prefix: "?",
intents: ["MessageContent", "Guilds", "GuildMessages", "GuildBans"],
events: ["onMessage", "onInteractionCreate", "onBanAdd", "onChannelCreate"],
database: {
        type: "aoi.db",
        db: require("aoi.db"),
        tables: ["main"],
        path: "./database/",
        extraOptions: {
            dbType: "KeyValue"
        }
    }
})

const { Util } = require("aoi.js");
const { parse, createAst } = require("aoi.parser");
const { parseExtraOptions } = require("aoi.parser/components");
Util.parsers.ErrorHandler = parse;
Util.parsers.OptionsParser = ( data ) => {
     return createAst( data ).children.map( parseExtraOptions );
};
//Economy




bot.command({
name: "ticketsetup",
code: `$setGuildVar[ticketsetup1;1]
$setGuildVar[ticketcategory1;$get[categoryid]]
$let[categoryid;$createChannel[$guildID;TICKETS;Category;true]]
$let[messageid;$channelSendMessage[$mentionedChannels[1];{newEmbed: {description:To create a ticket react with 📩} {color:00FfB5}{title:$message[2]} {footer:$username[$clientID] - Ticketing without clutter:$userAvatar[$clientID]}} {actionRow: {button:Create ticket:secondary:ticketcreate1:false:📩}};true]]

$onlyPerms[manageguild;{newEmbed: {color:FF0000} {description:You need MANAGE_GUILD permission(s) to use this command.}}]
$cooldown[3s;**⏱ | $userTag[$authorID]!** you have recently used this command, try the command again in **%time%**]
$onlyIf[$getGuildVar[ticketsetup1]!=1;<@$authorID>, Ticket 1 is already opened. Try \`?ticketsetup2\` for the 2nd config.]
`
})

bot.interactionCommand({
name: "ticketcreate1",
prototype: "button",
code: `
$modifyChannelPerms[$get[ticketid];$interactionData[author.id];+viewchannel;+sendmessages]
$modifyChannelPerms[$get[ticketid];$guildID;-viewchannel]
$interactionReply[Ticket created <#$get[ticketid]>;;;;everyone;true]
$setUserVar[ticketid1;$get[ticketid];$interactionData[author.id]]
$let[ticketid;$newTicket[ticket-$interactionData[author.id];<@$authorID> Welcome {newEmbed: {description:Support will be with you shortly.
To close this ticket react with 🔒} {color:00FfB5} {footer:$username[$clientID] - Ticketing without clutter}} {actionRow: {button:Close:secondary:ticketclose1:false:🔒}};$getGuildVar[ticketcategory1];true;error]]

$onlyIf[$channelExists[$channelID[ticket-$authorID]]<true;]    $onlyIf[$channelExists[$channelID[ticket-$authorID]]<true;> **Warning:** Ticket limit reached, You already have 1 tickets open of the 1 allowed for this panel {options: {ephemeral:true}} {extraOptions: {interaction:true}} ]    
`
})
bot.interactionCommand({
name: "ticketclose1",
prototype: "button",
code: `$description[1;Support team ticket controls]
$color[1;2F3136]
$addButton[1;Delete;danger;ticketdelete1;false;⛔️]
$interactionUpdate[;<@$authorID> Welcome {newEmbed: {description:Support will be with you shortly.
To close this ticket react with 🔒} {color:00FfB5} {footer:$username[$clientID] - Ticketing without clutter}}]
$editChannel[$channelID;closed-$interactionData[author.id]]
$modifyChannelPerms[$getUserVar[ticketid1;$interactionData[author.id]];$interactionData[author.id];-viewchannel]
$description[1;Ticket Closed By <@$authorID>]
$color[1;FF0000]
`
})
//Tagcheck
bot.command({
name: "tagcheck1",
code: `$setUserVar[authorButton;$authorID;$authorID]
$addButton[1;Cancel;4;tc1cancel;no;] $addButton[1;Confirm;3;tc1confirm;no;]
$description[1;<:tickYes:1093488664312561775> | Values Saved, Additionally Do You Want Me To Start Tagcheck?]
$color[1;00FFB5]
$setGuildVar[tctags1;$message[2]] 
$setGuildVar[tagcheck1;$mentionedChannels[1]]  
$onlyIf[$findGuildChannel[$mentionedChannels[1];false;$guildID]!=;<@$authorID>, The channel you mentioned does not exist! Try again.]
$onlyIf[$message[2]!=0;<@$authorID>, Minimum Tags amount is \`1\`]
$onlyIf[$message[2]!=5;<@$authorID>, Maximum Tags amount is \`5.\`]
$onlyIf[$message[2]!=;{newEmbed: {title:Tagcheck Config 1} {description:- [] = optional arguement
- <> = required arguement
- Do NOT type these when using commands!
> Set tagcheck 1 config values.\n\n**Usage**\n\`tagcheck1 <channel> <tags>\`} {color:00FFB5}}]
$onlyIf[$message[1]!=;{newEmbed: {title:Tagcheck Config 1} {description:- [] = optional arguement
- <> = required arguement
- Do NOT type these when using commands!
> Set tagcheck 1 config values.\n\n**Usage**\n\`tagcheck1 <channel> <tags>\`} {color:00FFB5}}]
$onlyPerms[manageguild;<@$authorID>, You need MANAGE_SERVER perms to execute this command.]
$cooldown[5s;<@$authorID, You’re on a cooldown. Kindly try again in 5s!]
$suppressErrors[{newEmbed: {title: Error ❌}{description: An Error Occured, Maybe there was a problem from your side. Recheck and try again! If the problem Persists Report it on the Support Server.}{color:00FFB5}}]`
})
bot.interactionCommand({
name: "tc1confirm",
prototype: "button",
code: `$channelSendMessage[$getGuildVar[tagcheck1];{newEmbed: {title:📣 Tagcheck is now open!}{description:Tags Needed: $getGuildVar[tctags1]} {color:00FFB5}}]
$interactionUpdate[;{newEmbed: {description:<:tickYes:1093488664312561775> | Tagcheck was successfully started in <#$getGuildVar[tagcheck1]>} {color:00FFB5}}]
$onlyIf[$authorID==$getUserVar[authorButton];<:tickNo:1093488643517194300> | You cant use this button.{options:
{ephemeral:true}}{extraOptions: {interaction:true}}]`
})
bot.interactionCommand({
name: "tc1cancel",
    prototype: "button",
    code: `$interactionUpdate[~~Cancelled~~]
$onlyIf[$authorID==$getUserVar[authorButton];<:tickNo:1093488643517194300> | You cant use this button.{options:
{ephemeral:true}}{extraOptions: {interaction:true}}]`
})
bot.command({
name: "help",
aliases: ["h", "commands"],
$if: "old",
code: `
$author[1;$userTag[$authorID];$userAvatar[$authorID]]
$description[1;\n• Total commands: 100 | Usable by you here: $get[tcommands]\n• Get [$username[$clientID]](https://discord.com/api/oauth2/authorize?client_id=$clientID&permissions=28033185479927&scope=bot%20applications.commands) | [Support Server](https://discord.gg/kwxH945v)\n\nChoose a category from the below menu to navigate through its commands.]
$footer[1;Made with 💖 by iAce#4087]
$thumbnail[1;$userAvatar[$clientID]]
$color[1;00FFB5]

$addSelectMenu[1;welcomer:Please choose a page.:1:1:false:<a:CN_welcome:1104061416157237278>;selfroles:Get all commands related to selfroles.:value:false:<:PanAngel:1104077952985079869>]

$if[$hasPerms[$guildID;$authorID;administrator]==true;;]
$endif
$let[tcommands;100]
`
})
bot.interactionCommand({
    name: "welcomer",
    prototype: "selectMenu",
    code: `$interactionUpdate[;{newEmbed: {author:$userTag[$authorID]:$userAvatar[$authorID]} {description:**__Welcomer__**\n• \`autorole, autorole bots add, autorole bots remove, autorole bots, autorole config, autorole humans add, autorole humans remove, autorole humans, autorole reset all, autorole reset bots, autorole reset humans, autorole reset, greet channel add, greet channel remove, greet channel, greet\`} {footer:Showing page 1/10:$userAvatar[$clientID]} {color:00FFB5}};{actionRow: {selectMenu:welcomer:Please choose a page.:1:1::}

{selectMenuOptions:Self Roles:selfroles:Get all commands related to selfroles::<:PanAngel:1104077952985079869>}



//Command Handler loader

const loader = new aoijs.LoadCommands(bot);
loader.load(bot.cmd,'./commands/') 

//Music Related

const {
  AoiVoice,
  PlayerEvents,
  PluginName,
  Cacher,
  Filter,
} = require(`@akarui/aoi.music`);

const voice = new AoiVoice(bot, {
    searchOptions: {
       // soundcloudClientId: "Sound Cloud Id",
        youtubegl: "US",
    },
    requestOptions: {
        offsetTimeout: 0,
        soundcloudLikeTrackLimit: 200,
    },
});
voice.addPlugin(PluginName.Cacher, new Cacher("memory" /* or "disk" */));
voice.addPlugin( PluginName.Filter, new Filter( {
    filterFromStart: false,
}));
bot.variables({
minecoins: "0",
diamonds: "0",
wolf: "0",
rawporkchop: "0",
diamondpickaxe: "0",
craftingtable: "0",
diamondsword: "0",
diamondaxe: "0",
furnace: "0",
coal: "0",
cookedporkchop: "0",
hearts: "0",
oakwood: "0",
authorButton: "",
payamount: "",
payuser: "",
emeralds: "0",
premiumuser: "No",
ticketsetup1: "0",
ticketsetup2: "0",
ticketchannel1: "",
ticketchannel2: "",
ticketpanel1: "",
ticketpanel2: "",
ticketmsgid: "",
ticketcategory1: "",
ticketid1: "",
whitelist: "0",
antinuke: "0",
openai: "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",
maxdeal: "$0",
securities: "$0",
servicesused: "0",
servicesprovided: "0",
staffnotes: "",
dwc: "No!"
  
})
bot.variables({
 smsetupchannel: "",
 smmodrole: "",
 smsetup: "0",
 alreadyreg: "0",
 tourneynumber: "0",
 tourneyconfirm: "",
 scrimsregcount: "0",
 tourneyregrole: "",
 regrole: "",
 reguser: "$authorID",
tourneyreguser: "$authorID",
 channelLimit: "0",
 msgcount: "0",
 scrimban: "0",
tourneyban: "0",
  greet_channel: "$mentionedChannels[1]",
  mentioned_channel: "$mentionedChannels[1]",
tourney_mentioned_channel: "$mentionedChannels[1]",
  mention: "0",
	embed_color: "#FAD9B9", 
	leader_role: "805451556081500220", 
	leaderrolecooldown: "0", 
	nicknamecooldown: "0", 
	embColor: "fad9b9",
  tagcheck: "none",
  tc: "0",
  slotlistchannel: "",            
  authorButton: "",
  team1: "",
  team2:"",
  team3: "",
  team4: "",
  team5: "",
  team6: "",
  team7: "",
  team8: "",
  team9: "",
  team10: "",
  team11: "",
  team12: "",
  team13: "",
  team14: "",
  team15: "",
  team16: "",
  team17: "",
  team18: "",
  team19: "",
  team20: "",
  team21: "",
  team22: "",
  team23: "",
  team24: "",
  team25: "",
  sureornot: "",
  idpchannel: "",
  customid: "",
  custompass: "",
  custommap: "",
  customtime: "",
  tourneyname: "0",
  
  idproletransfer: "none",
  idproletransferid: "",
  idprole: "",
  idpname: "",
  idplogs: "",
  idpchannelid: "",
  idproletransfer2: "none",
  idproletransferid2: "",
  idprole2: "",
  idpname2: "",
  idplogs2: "",
  idpchannelid2: "",
  tcchannelid: "",
  scrimbanned: "0",
  smsetup: "0",
  smsetupchannelid: "",
  selfrole1: "",
  selfrole2: "",
  selfrole3: "",
  selfrole4: "",
  selfrole5: "",
})
bot.guildJoinCommand({
channel: "1059740546383491125",
code: `$title[1;**JOINED $guild**]  $description[1;**GUILD ID - $guildID\nGUILD OWNER - $userTag[$ownerID]\nTOTAL MEMBERS - $membersCount\nSERVER CREATED - $creationDate[$guildID]\nTOTAL SERVERS - $serverCount\n[$createServerInvite[$guildID]]($createServerInvite[$guildID])**] $color[1;2F3136]` 
})

//Snipe
bot.variables({
    tcconfigid: "0",
tagcheck1: "0",
tcslots1: "notset",
tctags1: "notset",
tagcheck2: "0",
tcslots2: "notset",
tctags2: "notset",                tagcheck3: "noset",
tcslots3: "notset",
tctags3: "notset",
tagcheck4: "noset",
tcslots4: "notset",
tctags4: "notset",
tagcheck5: "noset",
tctags5: "notset",
smchannelid: "",
})
//Scrims
bot.variables({
  smslots1: "0",
  smreg1: "",
  over1: "0",
  smconfigid: "0",
  smidp1: "",
  smtags1: "",
  //
    smslots2: "0",
  smreg2: "",
  over2: "0",
  smidp2: "",
  smtags2: "",
  //
  smslots3: "0",
  smreg3: "",
  over3: "0",
  smidp3: "",
  smtags3: "",  
  //
  smslots4: "0",
  smreg4: "",
  over4: "0",
  smidp4: "",
  smtags4: "",  
  //
  smslots5: "0",
  smreg5: "",
  over5: "0",
  smidp5: "",
  smtags5: "",
  //
  smslots6: "0",
  smreg6: "",
  over6: "0",
  smidp6: "",
  smtags6: "",
  //
  smslots7: "0",
  smreg7: "",
  over7: "0",
  smidp7: "",
  smtags7: "",
  //
  smslots8: "0",
  smreg8: "",
  over8: "0",
  smidp8: "",
  smtags8: "",
  //
  smslots9: "0",
  smreg9: "",
  over9: "0",
  smidp9: "",
  smtags9: "",
  //
  smslots10: "0",
  smreg10: "",
  over10: "0",
  smidp10: "",
  smtags10: "",
})

// Panel Related

const {Panel} = require("@akarui/aoi.panel")

const panel = new Panel({
    username: process.env["username"],//CAN BE ARRAYS
    password: process.env["password"],//CAN BE ARRAYS
    secret: require('crypto').randomBytes(16).toString("hex"),// Random strings [for safety.]
    bot:bot,
    port: 3000,//Port on which the panel should be hosted
    mainFile: "index.js",//code's mainfile name
    commands: "./commands/",//commands folder
    interaction:"./commands/interaction/",//slash commands folder
    theme:"orange",//panel & dashboard theme
    codetheme:"gruvbox-dark"//code editor theme
    /* FOR MORE THEMES AND CODE EDITOR THEMES, READ ABOUTH THE PANEL CLASS, IN THE DOCS */
  })
panel.loadPanel()
panel.onError()// READ THE DOCS BEFORE USING THIS CALLBACK
