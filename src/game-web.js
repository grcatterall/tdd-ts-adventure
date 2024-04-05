"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
const class_1 = require("./class");
const worldData = __importStar(require("./data/world-data.json"));
const initRoom = new class_1.Room(-1, 'missingno', 'missingno');
const player = new class_1.Player('', 10, 3, initRoom);
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');
const terminal = document.getElementById('terminal');
const modal = document.getElementById('modal');
const nameInput = document.getElementById('nameInput');
const modalForm = document.getElementById('modal-name-form');
if (terminalInput && terminalOutput) {
    terminalOutput.innerHTML = 'Welcome!\n';
    function printHelp() {
        print("Controls:");
        print("  Type 'h' for help");
        print("  Type 'q' to quit");
        print("  Type 'l' to look around");
        print("  Type 'i' to check your inventory");
        print("  Type 'take <item>' to take an item");
        print("  Type 'equip <item>' to equip an item");
        print("  Type 'drop <item>' to drop an item");
        print("  Type 'eat <item>' to eat a food item");
        print("  Type 'attack' to attack enemy in room");
        print("  Type 'n', 's', 'e', 'w' to move");
        print("");
    }
    window.addEventListener('resize', () => {
        terminal.style.height = `${window.innerHeight * 0.8}px`;
    });
    function startGame() {
        clear();
        print("Welcome!\n");
        terminalInput.disabled = true;
        modal.style.display = 'block';
        nameInput.focus();
        modalForm.addEventListener('submit', () => {
            const playerName = nameInput.value.trim();
            if (playerName) {
                print(`Hello, ${playerName}!<br>`);
                modal.style.display = 'none';
                terminalInput.disabled = false;
                terminalInput.focus();
                // Create the world and player
                const world = new class_1.World();
                world.loadWorld(worldData);
                player.name = playerName;
                player.currentRoom = world.rooms[1];
                // Show commands
                printHelp();
                terminalInput.value = '';
                terminalInput.placeholder = 'Hit RETURN to start your adventure';
            }
        });
        const close = document.querySelector('.close');
        if (close) {
            close.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
    }
    const postAction = () => {
        if (player.inCombat) {
            const enemy = player.getTarget();
            if (enemy && enemy instanceof class_1.Enemy) {
                if (!enemy.isDead) {
                    enemy.attack();
                    print(`${enemy.name} dealt ${enemy.damage} to you`);
                    print(`You have ${player.health} remaining`);
                    print("");
                }
                else {
                    const items = enemy.listItems();
                    enemy.dropItems();
                    player.currentRoom.printRoom(print, clear);
                    player.setTarget(null);
                    player.inCombat = false;
                    console.log(items);
                    print(`You defeated ${enemy.name}, they have dropped their spoils: ${items}`);
                }
            }
        }
    };
    const print = (message) => {
        (0, Utils_1.print)(message + '<br/>', terminalOutput);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };
    const clear = () => {
        (0, Utils_1.clear)(terminalOutput);
    };
    function processCommand(cmd) {
        cmd = cmd.toLowerCase().trim();
        if (cmd === 'h') {
            printHelp();
            return;
        }
        else if (cmd === 'q') {
            // rl.close();
            return;
        }
        else if (cmd === 'l') {
            if (player.currentRoom) {
                player.currentRoom.printRoom(print, clear);
            }
        }
        else if (cmd === 'i') {
            player.printInventory(print);
        }
        else if (['n', 's', 'e', 'w'].indexOf(cmd) >= 0) {
            let direction = cmd;
            if (player.move(direction, print)) {
                if (player.inCombat) {
                    let target = player.getTarget();
                    if (target) {
                        target.inCombat = false;
                    }
                }
                player.inCombat = false;
                player.setTarget(null);
                player.currentRoom.printRoom(print, clear);
            }
            postAction();
        }
        else if (cmd.startsWith("take ")) {
            let itemName = cmd.substring(cmd.indexOf(' ') + 1);
            player.takeItem(itemName);
            print(`Picked up ${itemName}`);
            player.printInventory();
            postAction();
        }
        else if (cmd.startsWith("drop ")) {
            let itemName = cmd.substring(cmd.indexOf(' ') + 1);
            player.dropItem(itemName);
            postAction();
        }
        else if (cmd.startsWith("eat ")) {
            let itemName = cmd.substring(cmd.indexOf(' ') + 1);
            if (player.eatItem(itemName)) {
                print(`You ate your ${itemName} and restored your health to ${player.health}`);
            }
            else {
                print(`Could not eat ${itemName}`);
            }
            player.printInventory();
            postAction();
        }
        else if (cmd.startsWith("attack")) {
            if (player.currentRoom.enemy) {
                let target = player.currentRoom.enemy;
                if (target.isDead) {
                    player.currentRoom.printRoom(print, clear);
                    print(`${target.name} is dead, there's no point attacking it`);
                    print("");
                }
                else {
                    player.inCombat = true;
                    const targetSet = player.setTarget(target);
                    if (!targetSet) {
                        player.currentRoom.printRoom(print, clear);
                        player.inCombat = false;
                        print(`Cannot target ${target.name}`);
                        print("");
                    }
                    else {
                        target.inCombat = true;
                        target.setTarget(player);
                        player.attack();
                        print('Successful hit');
                        print(`${target.name}'s health is now ${target.health}`);
                    }
                }
                postAction();
            }
            else {
                print('There are no emenies to attack in this room');
            }
        }
        else if (cmd.startsWith("equip ")) {
            let itemName = cmd.substring(cmd.indexOf(' ') + 1);
            // player.equipItem(itemName);
            // if (player.equippedItem) {
            //     print(`You equipped a ${itemName}`);
            //     print(`Your damage is now ${player.damage}`);
            // }
        }
        else if (cmd === '') {
            player.currentRoom.printRoom(print, clear);
        }
        else {
            print("Invalid command. Type 'h' for help.");
            player.currentRoom.printRoom(print, clear);
        }
        terminalInput.value = '';
    }
    terminalInput.addEventListener('keypress', function (e) {
        terminalInput.placeholder = '>';
        if (e.key === 'Enter') {
            console.log(terminalInput.value);
            processCommand(terminalInput.value);
        }
        terminalInput.focus();
    });
    startGame();
    terminalInput.focus();
}
//# sourceMappingURL=game-web.js.map