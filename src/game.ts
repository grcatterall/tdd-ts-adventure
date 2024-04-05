import * as readline from 'readline';
import * as process from 'process';

import { Player, World, Room, Enemy } from './class';
import * as worldData from './data/world-data.json';

const initRoom = new Room(-1, 'missingno', 'missingno');
const player = new Player('', 10, 20, initRoom);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function printHelp() {
    console.log("Controls:")
    console.log("  Type 'h' for help");
    console.log("  Type 'q' to quit");
    console.log("  Type 'l' to look around");
    console.log("  Type 'i' to check your inventory");
    console.log("  Type 'take <item>' to take an item");
    console.log("  Type 'equip <item>' to equip an item");
    console.log("  Type 'drop <item>' to drop an item");
    console.log("  Type 'eat <item>' to eat a food item");
    console.log("  Type 'attack' to attack enemy in room");
    console.log("  Type 'n', 's', 'e', 'w' to move");
    console.log("");
}

function startGame() {
    console.clear();
    console.log("Welcome!\n");

    rl.question('Please enter your name: ', (name) => {
        console.clear();
        console.log(`Hello, ${name}!\n`);

        // Create the world and player
        const world = new World();
        world.loadWorld(worldData);
        player.name = name;
        player.currentRoom = world.rooms[1];

        // Show commands
        printHelp();

        rl.question('\nHit RETURN to start your adventure\n', () => {

            console.clear();
            if (player.currentRoom) {
                player.currentRoom.printRoom();
            }

            processCommand();
        });
    });
}

const postAction = () => {
    if (player.inCombat) {
        const enemy = player.getTarget();
        if (enemy && enemy instanceof Enemy) {
            if (!enemy.isDead) {
                enemy.attack();
                console.log(`${enemy.name} dealt ${enemy.damage} to you`);
                console.log(`You have ${player.health} remaining`);
                console.log("");
            } else {
                enemy.dropItems();
                player.currentRoom.printRoom();
                player.setTarget(null);
                player.inCombat = false;
            }
        }
    }
};


function processCommand() {

    rl.question('> ', (cmd) => {
        cmd = cmd.toLowerCase();

        if (cmd === 'h') {
            printHelp();
            return;

        } else if (cmd === 'q') {
            rl.close();
            return;

        } else if (cmd === 'l') {
            if (player.currentRoom) {
                player.currentRoom.printRoom();
            }

        } else if (cmd === 'i') {
            player.printInventory();

        } else if (['n', 's', 'e', 'w'].indexOf(cmd) >= 0) {
            let direction = cmd;
            if (player.move(direction)) {
                if (player.inCombat) {
                    let target = player.getTarget();
                    if (target) {
                        target.inCombat = false;
                    }
                }
                player.inCombat = false;
                player.setTarget(null);
            } 

            postAction();

        } else if (cmd.startsWith("take ")) {
            let itemName = cmd.substring(cmd.indexOf(' ') + 1);

            player.takeItem(itemName);
            console.log(`Picked up ${itemName}`);

            player.printInventory();
            postAction();

        } else if (cmd.startsWith("drop ")) {
            let itemName = cmd.substring(cmd.indexOf(' ') + 1);

            player.dropItem(itemName);
            postAction();

        } else if (cmd.startsWith("eat ")) {
            let itemName = cmd.substring(cmd.indexOf(' ') + 1);

            if (player.eatItem(itemName)) {
                console.log(`You ate your ${itemName} and restored your health to ${player.health}`);
            } else {
                console.log(`Could not eat ${itemName}`);
            }

            player.printInventory();
            postAction();

        } else if (cmd.startsWith("attack")) {
            if (player.currentRoom.enemy) {
                let target = player.currentRoom.enemy;

                if (target.isDead) {
                    player.currentRoom.printRoom();
                    console.log(`${target.name} is dead, there's no point attacking it`);
                    console.log("");
                } else {
                    player.inCombat = true;
                    const targetSet = player.setTarget(target);

                    if (!targetSet) {
                        player.currentRoom.printRoom();
                        player.inCombat = false;
                        console.log(`Cannot target ${target.name}`);
                        console.log("");
                    } else {
                        target.inCombat = true;
                        target.setTarget(player);
            
                        player.attack();

                        console.log('Successful hit');
                        console.log(`${target.name}'s health is now ${target.health}`)
                    }
                }
                postAction();
            } else {
                console.log('There are no emenies to attack in this room');
            }

        } else if (cmd.startsWith("equip ")) {
            let itemName = cmd.substring(cmd.indexOf(' ') + 1);

            // player.equipItem(itemName);

            // if (player.equippedItem) {
            //     console.log(`You equipped a ${itemName}`);
            //     console.log(`Your damage is now ${player.damage}`);
            // }
        }
        else {
            console.log("Invalid command. Type 'h' for help.");
        }

        processCommand();
    });
}

startGame();