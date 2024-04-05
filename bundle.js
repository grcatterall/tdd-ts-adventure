/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/src/Utils.js":
/*!***************************!*\
  !*** ./dist/src/Utils.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.clear = exports.print = void 0;\nconst print = (text, dom = null) => {\n    console.log(text);\n    if (dom) {\n        dom.innerHTML += text;\n    }\n};\nexports.print = print;\nconst clear = (dom = null) => {\n    console.clear();\n    if (dom) {\n        dom.innerHTML = '';\n    }\n};\nexports.clear = clear;\n//# sourceMappingURL=Utils.js.map\n\n//# sourceURL=webpack://adventure/./dist/src/Utils.js?");

/***/ }),

/***/ "./dist/src/class/characters/character.js":
/*!************************************************!*\
  !*** ./dist/src/class/characters/character.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Character = void 0;\nconst Utils_1 = __webpack_require__(/*! ../../Utils */ \"./dist/src/Utils.js\");\nclass Character {\n    constructor(name, health, damage) {\n        this.isDead = false;\n        this.inCombat = false;\n        this.target = null;\n        this.health = health;\n        this.damage = damage;\n        this.name = name;\n    }\n    takeDamage(damageAmount) {\n        this.health -= damageAmount;\n        if (this.health <= 0) {\n            this.die();\n        }\n    }\n    attack(print = Utils_1.print) {\n        if (this.target) {\n            this.target.takeDamage(this.damage);\n        }\n        else {\n            print('You have no one to attack');\n            this.inCombat = false;\n        }\n    }\n    setTarget(target) {\n        if (!target) {\n            this.target = target;\n            this.inCombat = false;\n            return true;\n        }\n        if (this.inCombat) {\n            this.target = target;\n            return true;\n        }\n        return false;\n    }\n    getTarget() {\n        return this.target;\n    }\n    die() {\n        this.inCombat = false;\n        this.target = null;\n        this.isDead = true;\n    }\n}\nexports.Character = Character;\n//# sourceMappingURL=character.js.map\n\n//# sourceURL=webpack://adventure/./dist/src/class/characters/character.js?");

/***/ }),

/***/ "./dist/src/class/characters/enemy.js":
/*!********************************************!*\
  !*** ./dist/src/class/characters/enemy.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Enemy = void 0;\nconst character_1 = __webpack_require__(/*! ./character */ \"./dist/src/class/characters/character.js\");\nclass Enemy extends character_1.Character {\n    constructor(name, health, damage, heldItems, room) {\n        super(name, health, damage);\n        this.heldItems = heldItems;\n        this.room = room;\n    }\n    dropItems() {\n        this.room.addItems(this.heldItems);\n        this.heldItems = [];\n    }\n    listItems() {\n        const itemNames = this.heldItems.map((item) => {\n            return item.name;\n        });\n        return itemNames.join(', ');\n    }\n}\nexports.Enemy = Enemy;\n//# sourceMappingURL=enemy.js.map\n\n//# sourceURL=webpack://adventure/./dist/src/class/characters/enemy.js?");

/***/ }),

/***/ "./dist/src/class/characters/index.js":
/*!********************************************!*\
  !*** ./dist/src/class/characters/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Enemy = exports.Player = exports.Character = void 0;\nvar character_1 = __webpack_require__(/*! ./character */ \"./dist/src/class/characters/character.js\");\nObject.defineProperty(exports, \"Character\", ({ enumerable: true, get: function () { return character_1.Character; } }));\nvar player_1 = __webpack_require__(/*! ./player */ \"./dist/src/class/characters/player.js\");\nObject.defineProperty(exports, \"Player\", ({ enumerable: true, get: function () { return player_1.Player; } }));\nvar enemy_1 = __webpack_require__(/*! ./enemy */ \"./dist/src/class/characters/enemy.js\");\nObject.defineProperty(exports, \"Enemy\", ({ enumerable: true, get: function () { return enemy_1.Enemy; } }));\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://adventure/./dist/src/class/characters/index.js?");

/***/ }),

/***/ "./dist/src/class/characters/player.js":
/*!*********************************************!*\
  !*** ./dist/src/class/characters/player.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Player = void 0;\nconst index_1 = __webpack_require__(/*! ../index */ \"./dist/src/class/index.js\");\nconst index_2 = __webpack_require__(/*! ./index */ \"./dist/src/class/characters/index.js\");\nconst Utils_1 = __webpack_require__(/*! ../../Utils */ \"./dist/src/Utils.js\");\nclass Player extends index_2.Character {\n    constructor(name, health, damage, startingRoom) {\n        super(name, health, damage);\n        this.name = name;\n        this.currentRoom = startingRoom;\n        this.items = [];\n    }\n    move(direction, print = Utils_1.print) {\n        if (!this.currentRoom) {\n            return false;\n        }\n        const nextRoom = this.currentRoom.getRoomInDirection(direction);\n        if (nextRoom) {\n            this.currentRoom = nextRoom;\n            nextRoom.printRoom();\n            return true;\n        }\n        else {\n            print(\"You cannot move in that direction\");\n            return false;\n        }\n    }\n    printInventory(print = Utils_1.print) {\n        if (this.items.length === 0) {\n            print(`${this.name} is not carrying anything.`);\n        }\n        else {\n            print(`${this.name} is carrying:`);\n            for (let i = 0; i < this.items.length; i++) {\n                print(`  ${this.items[i].name}`);\n            }\n        }\n    }\n    takeItem(itemName) {\n        var _a;\n        const items = (_a = this.currentRoom) === null || _a === void 0 ? void 0 : _a.items;\n        if (items) {\n            items.map((item, index) => {\n                var _a;\n                if (item.name === itemName) {\n                    this.items.push(item);\n                    (_a = this.currentRoom) === null || _a === void 0 ? void 0 : _a.items.splice(index, 1);\n                }\n            });\n        }\n    }\n    dropItem(itemName) {\n        const items = this.items;\n        if (items) {\n            items.map((item, index) => {\n                var _a;\n                if (item.name === itemName) {\n                    this.items.splice(index, 1);\n                    (_a = this.currentRoom) === null || _a === void 0 ? void 0 : _a.items.push(item);\n                }\n            });\n        }\n    }\n    eatItem(itemName) {\n        const items = this.items;\n        let eaten = false;\n        if (items) {\n            items.map((item, index) => {\n                if (item.name === itemName && item instanceof index_1.Food) {\n                    this.health += item.health;\n                    this.items.splice(index, 1);\n                    eaten = true;\n                }\n            });\n        }\n        return eaten;\n    }\n    getItemByName(name) {\n        return this.items.find((item) => item.name === name);\n    }\n}\nexports.Player = Player;\n//# sourceMappingURL=player.js.map\n\n//# sourceURL=webpack://adventure/./dist/src/class/characters/player.js?");

/***/ }),

/***/ "./dist/src/class/food.js":
/*!********************************!*\
  !*** ./dist/src/class/food.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Food = void 0;\nconst index_1 = __webpack_require__(/*! ./index */ \"./dist/src/class/index.js\");\nclass Food extends index_1.Item {\n    constructor(name, description, health) {\n        super(name, description, true);\n        this.health = health;\n    }\n}\nexports.Food = Food;\n;\n//# sourceMappingURL=food.js.map\n\n//# sourceURL=webpack://adventure/./dist/src/class/food.js?");

/***/ }),

/***/ "./dist/src/class/index.js":
/*!*********************************!*\
  !*** ./dist/src/class/index.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.World = exports.Food = exports.Room = exports.Item = void 0;\nvar item_1 = __webpack_require__(/*! ./item */ \"./dist/src/class/item.js\");\nObject.defineProperty(exports, \"Item\", ({ enumerable: true, get: function () { return item_1.Item; } }));\nvar room_1 = __webpack_require__(/*! ./room */ \"./dist/src/class/room.js\");\nObject.defineProperty(exports, \"Room\", ({ enumerable: true, get: function () { return room_1.Room; } }));\nvar food_1 = __webpack_require__(/*! ./food */ \"./dist/src/class/food.js\");\nObject.defineProperty(exports, \"Food\", ({ enumerable: true, get: function () { return food_1.Food; } }));\nvar world_1 = __webpack_require__(/*! ./world */ \"./dist/src/class/world.js\");\nObject.defineProperty(exports, \"World\", ({ enumerable: true, get: function () { return world_1.World; } }));\n__exportStar(__webpack_require__(/*! ./characters */ \"./dist/src/class/characters/index.js\"), exports);\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://adventure/./dist/src/class/index.js?");

/***/ }),

/***/ "./dist/src/class/item.js":
/*!********************************!*\
  !*** ./dist/src/class/item.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Item = void 0;\nclass Item {\n    constructor(name, description, isFood) {\n        this.isFood = false;\n        this.name = name;\n        this.description = description;\n        this.isFood = isFood;\n    }\n}\nexports.Item = Item;\n//# sourceMappingURL=item.js.map\n\n//# sourceURL=webpack://adventure/./dist/src/class/item.js?");

/***/ }),

/***/ "./dist/src/class/room.js":
/*!********************************!*\
  !*** ./dist/src/class/room.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Room = void 0;\nconst Utils_1 = __webpack_require__(/*! ../Utils */ \"./dist/src/Utils.js\");\nclass Room {\n    constructor(id, name, description) {\n        this.id = id;\n        this.name = name;\n        this.description = description;\n        this.exits = {};\n        this.items = [];\n    }\n    printRoom(print = Utils_1.print, clear = Utils_1.clear) {\n        clear();\n        print(\"\");\n        print(this.name);\n        print(\"\");\n        print(this.description);\n        print(\"\");\n        if (this.items.length > 0) {\n            print(`Items: ${this.items.map(item => item.name).join(\", \")}`);\n        }\n        print(this.getExitsString());\n        print(\"\");\n        if (this.enemy) {\n            print(`Enemy - ${this.enemy.name} - ${this.enemy.isDead ? 'dead' : 'alive'}`);\n        }\n        print(\"\");\n    }\n    getExits() {\n        return Object.keys(this.exits); // Returns an array of string keys from exits object\n    }\n    getExitsString() {\n        return `Exits: ${this.getExits().join(\", \")}`;\n    }\n    connectRooms(direction, connectingRoom) {\n        // Check if the direction and connecting room are valid\n        if (['n', 's', 'e', 'w'].indexOf(direction) < 0 || !connectingRoom) {\n            throw new Error(\"Error: Invalid room connection\");\n        }\n        this.exits[direction] = connectingRoom;\n    }\n    getRoomInDirection(direction) {\n        return this.exits[direction]; // Might be undefined if direction doesn't exist\n    }\n    getItemByName(name) {\n        return this.items.find((item) => item.name === name);\n    }\n    addItems(items) {\n        items.map((item) => {\n            this.items.push(item);\n        });\n    }\n    addEnemy(enemy) {\n        this.enemy = enemy;\n    }\n}\nexports.Room = Room;\n//# sourceMappingURL=room.js.map\n\n//# sourceURL=webpack://adventure/./dist/src/class/room.js?");

/***/ }),

/***/ "./dist/src/class/world.js":
/*!*********************************!*\
  !*** ./dist/src/class/world.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.World = void 0;\nconst index_1 = __webpack_require__(/*! ./index */ \"./dist/src/class/index.js\");\nclass World {\n    constructor() {\n        this.rooms = [];\n    }\n    loadWorld(worldData) {\n        const roomList = worldData.rooms;\n        const itemList = worldData.items;\n        const enemyList = worldData.enemies;\n        // Instantiate new room objects\n        // Get name, id and description from room data\n        roomList.map((room) => {\n            const roomData = room;\n            const newRoom = new index_1.Room(roomData.id, roomData.name, roomData.description);\n            this.rooms[roomData.id] = newRoom;\n        });\n        // Connect rooms by ID\n        // Note that all rooms must be created before they can be connected\n        roomList.map((room) => {\n            const roomID = room.id;\n            const roomConnections = room.exits;\n            for (const direction in roomConnections) {\n                const connectedRoomID = roomConnections[direction];\n                if (connectedRoomID) {\n                    const roomToConnect = this.rooms[connectedRoomID];\n                    this.rooms[roomID].connectRooms(direction, roomToConnect);\n                }\n            }\n        });\n        itemList.map((item) => {\n            if (item.room) {\n                this.rooms[item.room].addItems(this.itemMapper([item]));\n            }\n        });\n        if (enemyList) {\n            enemyList.map((enemy) => {\n                const enemyCharacter = new index_1.Enemy(enemy.name, enemy.health, enemy.damage, this.itemMapper(enemy.items), this.rooms[enemy.roomId]);\n                this.rooms[enemy.roomId].addEnemy(enemyCharacter);\n            });\n        }\n    }\n    itemMapper(items) {\n        const mappedItems = items.map((item) => {\n            let newItem;\n            if (item.isFood) {\n                newItem = new index_1.Food(item.name, item.description, item.health || 0);\n            }\n            else {\n                newItem = new index_1.Item(item.name, item.description);\n            }\n            return newItem;\n        });\n        return mappedItems;\n    }\n}\nexports.World = World;\n//# sourceMappingURL=world.js.map\n\n//# sourceURL=webpack://adventure/./dist/src/class/world.js?");

/***/ }),

/***/ "./dist/src/game-web.js":
/*!******************************!*\
  !*** ./dist/src/game-web.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Utils_1 = __webpack_require__(/*! ./Utils */ \"./dist/src/Utils.js\");\nconst class_1 = __webpack_require__(/*! ./class */ \"./dist/src/class/index.js\");\nconst worldData = __importStar(__webpack_require__(/*! ./data/world-data.json */ \"./dist/src/data/world-data.json\"));\nconst initRoom = new class_1.Room(-1, 'missingno', 'missingno');\nconst player = new class_1.Player('', 10, 3, initRoom);\nconst terminalOutput = document.getElementById('terminalOutput');\nconst terminalInput = document.getElementById('terminalInput');\nconst terminal = document.getElementById('terminal');\nconst modal = document.getElementById('modal');\nconst nameInput = document.getElementById('nameInput');\nconst modalForm = document.getElementById('modal-name-form');\nif (terminalInput && terminalOutput) {\n    terminalOutput.innerHTML = 'Welcome!\\n';\n    function printHelp() {\n        print(\"Controls:\");\n        print(\"  Type 'h' for help\");\n        print(\"  Type 'q' to quit\");\n        print(\"  Type 'l' to look around\");\n        print(\"  Type 'i' to check your inventory\");\n        print(\"  Type 'take <item>' to take an item\");\n        print(\"  Type 'equip <item>' to equip an item\");\n        print(\"  Type 'drop <item>' to drop an item\");\n        print(\"  Type 'eat <item>' to eat a food item\");\n        print(\"  Type 'attack' to attack enemy in room\");\n        print(\"  Type 'n', 's', 'e', 'w' to move\");\n        print(\"\");\n    }\n    window.addEventListener('resize', () => {\n        terminal.style.height = `${window.innerHeight * 0.8}px`;\n    });\n    function startGame() {\n        clear();\n        print(\"Welcome!\\n\");\n        terminalInput.disabled = true;\n        modal.style.display = 'block';\n        nameInput.focus();\n        modalForm.addEventListener('submit', (event) => {\n            event.preventDefault();\n            const playerName = nameInput.value.trim();\n            if (playerName) {\n                print(`Hello, ${playerName}!<br>`);\n                modal.style.display = 'none';\n                terminalInput.disabled = false;\n                terminalInput.focus();\n                // Create the world and player\n                const world = new class_1.World();\n                world.loadWorld(worldData);\n                player.name = playerName;\n                player.currentRoom = world.rooms[1];\n                // Show commands\n                printHelp();\n                terminalInput.value = '';\n                terminalInput.placeholder = 'Hit RETURN to start your adventure';\n            }\n        });\n        const close = document.querySelector('.close');\n        if (close) {\n            close.addEventListener('click', () => {\n                modal.style.display = 'none';\n            });\n        }\n    }\n    const postAction = () => {\n        if (player.inCombat) {\n            const enemy = player.getTarget();\n            if (enemy && enemy instanceof class_1.Enemy) {\n                if (!enemy.isDead) {\n                    enemy.attack();\n                    print(`${enemy.name} dealt ${enemy.damage} to you`);\n                    print(`You have ${player.health} remaining`);\n                    print(\"\");\n                }\n                else {\n                    const items = enemy.listItems();\n                    enemy.dropItems();\n                    player.currentRoom.printRoom(print, clear);\n                    player.setTarget(null);\n                    player.inCombat = false;\n                    console.log(items);\n                    print(`You defeated ${enemy.name}, they have dropped their spoils: ${items}`);\n                }\n            }\n        }\n    };\n    const print = (message) => {\n        (0, Utils_1.print)(message + '<br/>', terminalOutput);\n        terminalOutput.scrollTop = terminalOutput.scrollHeight;\n    };\n    const clear = () => {\n        (0, Utils_1.clear)(terminalOutput);\n    };\n    function processCommand(cmd) {\n        cmd = cmd.toLowerCase().trim();\n        if (cmd === 'h') {\n            printHelp();\n            return;\n        }\n        else if (cmd === 'q') {\n            // rl.close();\n            return;\n        }\n        else if (cmd === 'l') {\n            if (player.currentRoom) {\n                player.currentRoom.printRoom(print, clear);\n            }\n        }\n        else if (cmd === 'i') {\n            player.printInventory(print);\n        }\n        else if (['n', 's', 'e', 'w'].indexOf(cmd) >= 0) {\n            let direction = cmd;\n            if (player.move(direction, print)) {\n                if (player.inCombat) {\n                    let target = player.getTarget();\n                    if (target) {\n                        target.inCombat = false;\n                    }\n                }\n                player.inCombat = false;\n                player.setTarget(null);\n                player.currentRoom.printRoom(print, clear);\n            }\n            postAction();\n        }\n        else if (cmd.startsWith(\"take \")) {\n            let itemName = cmd.substring(cmd.indexOf(' ') + 1);\n            player.takeItem(itemName);\n            print(`Picked up ${itemName}`);\n            player.printInventory();\n            postAction();\n        }\n        else if (cmd.startsWith(\"drop \")) {\n            let itemName = cmd.substring(cmd.indexOf(' ') + 1);\n            player.dropItem(itemName);\n            postAction();\n        }\n        else if (cmd.startsWith(\"eat \")) {\n            let itemName = cmd.substring(cmd.indexOf(' ') + 1);\n            if (player.eatItem(itemName)) {\n                print(`You ate your ${itemName} and restored your health to ${player.health}`);\n            }\n            else {\n                print(`Could not eat ${itemName}`);\n            }\n            player.printInventory();\n            postAction();\n        }\n        else if (cmd.startsWith(\"attack\")) {\n            if (player.currentRoom.enemy) {\n                let target = player.currentRoom.enemy;\n                if (target.isDead) {\n                    player.currentRoom.printRoom(print, clear);\n                    print(`${target.name} is dead, there's no point attacking it`);\n                    print(\"\");\n                }\n                else {\n                    player.inCombat = true;\n                    const targetSet = player.setTarget(target);\n                    if (!targetSet) {\n                        player.currentRoom.printRoom(print, clear);\n                        player.inCombat = false;\n                        print(`Cannot target ${target.name}`);\n                        print(\"\");\n                    }\n                    else {\n                        target.inCombat = true;\n                        target.setTarget(player);\n                        player.attack();\n                        print('Successful hit');\n                        print(`${target.name}'s health is now ${target.health}`);\n                    }\n                }\n                postAction();\n            }\n            else {\n                print('There are no emenies to attack in this room');\n            }\n        }\n        else if (cmd.startsWith(\"equip \")) {\n            let itemName = cmd.substring(cmd.indexOf(' ') + 1);\n            // player.equipItem(itemName);\n            // if (player.equippedItem) {\n            //     print(`You equipped a ${itemName}`);\n            //     print(`Your damage is now ${player.damage}`);\n            // }\n        }\n        else if (cmd === '') {\n            player.currentRoom.printRoom(print, clear);\n        }\n        else {\n            print(\"Invalid command. Type 'h' for help.\");\n            player.currentRoom.printRoom(print, clear);\n        }\n        terminalInput.value = '';\n    }\n    terminalInput.addEventListener('keypress', function (e) {\n        terminalInput.placeholder = '>';\n        if (e.key === 'Enter') {\n            console.log(terminalInput.value);\n            processCommand(terminalInput.value);\n        }\n        terminalInput.focus();\n    });\n    startGame();\n    terminalInput.focus();\n}\n//# sourceMappingURL=game-web.js.map\n\n//# sourceURL=webpack://adventure/./dist/src/game-web.js?");

/***/ }),

/***/ "./dist/src/data/world-data.json":
/*!***************************************!*\
  !*** ./dist/src/data/world-data.json ***!
  \***************************************/
/***/ ((module) => {

eval("module.exports = /*#__PURE__*/JSON.parse('{\"rooms\":[{\"id\":1,\"name\":\"Crossroad\",\"description\":\"You are standing at a crossroad. To the north, east, south and west you see empty space, waiting to be filled.\",\"exits\":{\"n\":2,\"e\":3,\"w\":4,\"s\":5}},{\"id\":2,\"name\":\"Northern point\",\"description\":\"You are standing at the north point of a crossroad. To the south, you see an empty intersection.\",\"exits\":{\"s\":1}},{\"id\":3,\"name\":\"Eastern point\",\"description\":\"You are standing at the east point of a crossroad. To the west, you see an empty intersection.\",\"exits\":{\"w\":1}},{\"id\":4,\"name\":\"Western point\",\"description\":\"You are standing at the west point of a crossroad. To the east, you see an empty intersection.\",\"exits\":{\"e\":1}},{\"id\":5,\"name\":\"Southern point\",\"description\":\"You are standing at the south point of a crossroad. To the north, you see an empty intersection.\",\"exits\":{\"n\":1}}],\"items\":[{\"name\":\"rock\",\"description\":\"Just a simple rock\",\"room\":1},{\"name\":\"sandwich\",\"description\":\"A tasty looking sandwich\",\"room\":2,\"isFood\":true,\"health\":5}],\"enemies\":[{\"name\":\"Wizard\",\"health\":10,\"damage\":1,\"roomId\":1,\"items\":[{\"name\":\"bread loaf\",\"description\":\"Fresh from the bakery\",\"isFood\":true,\"health\":4}]}]}');\n\n//# sourceURL=webpack://adventure/./dist/src/data/world-data.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/src/game-web.js");
/******/ 	
/******/ })()
;