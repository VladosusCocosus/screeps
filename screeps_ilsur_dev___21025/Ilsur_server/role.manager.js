let managerRole = {
    run: function () {
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        let builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builder: ' + builder.length);

        let upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgrader: ' + upgrader.length);

        if (harvesters.length / 2 > builder.length) {
            let newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn'].spawnCreep([WORK, CARRY, CARRY, MOVE, CARRY, WORK, CARRY], newName,
                {memory: {role: 'builder'}});
        }
        else if (upgrader.length < builder.length){
            let newName = 'Upgrader' + Game.time;
            console.log('Spawning new Upgrader: ' + newName);
            Game.spawns['Spawn'].spawnCreep([WORK, CARRY, CARRY, MOVE, CARRY, WORK, WORK], newName,
                {memory: {role: 'upgrader'}});
        }
        else{
            let newName = 'Harversters' + Game.time;
            console.log('Spawning new Harverster' + newName);
            Game.spawns['Spawn'].spawnCreep( [CARRY, CARRY, MOVE, WORK, CARRY, WORK, CARRY, MOVE], newName,
                {memory: {role: 'harvester'}});
        }
    }
};

module.exports = managerRole;
