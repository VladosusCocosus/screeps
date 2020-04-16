let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let managerRole = require('role.manager');

module.exports.loop = function () {
    let harvesters = [];

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    managerRole.run();

    if(Game.spawns['Spawn'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn'].spawning.name];
        Game.spawns['Spawn'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn'].pos.x + 1,
            Game.spawns['Spawn'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    // for(let name in Game.creeps){
    //     if(Game.creeps[name].memory.role === 'harvester'){
    //         harvesters.push(name)
    //     }
    // }

    // let count = Math.round(harvesters.length / 2);
    //
    // for(let i = 0; i < harvesters.length; i++){
    //      var creep = Game.creeps[harvesters[i]];
    //      if(i <= count) {
    //          roleBuilder.run(creep, 1);
    //      }else{
    //          roleBuilder.run(creep, 0)
    //     }
    // }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep, 0)
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, 1);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep, 1)
        }
    }
}