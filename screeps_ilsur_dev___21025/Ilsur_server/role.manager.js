let managerRole = {
    run: function () {
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        let builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builder: ' + builder.length);

        let upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgrader: ' + upgrader.length);

        let repair = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
        console.log('Repair: ' + repair.length);

        // var target = Game.room.find(FIND_CONSTRUCTION_SITES);
        // console.log(target)

        // var targets = builder.room.find(FIND_CONSTRUCTION_SITES);
        // if(!targets.length && targets.length == 0) {
        //     builer.suicide()
        //

        console.log((harvesters.length + builder.length + upgrader.length + repair.length) < 20);

        if ((harvesters.length + builder.length + upgrader.length + repair.length) < 25) {
            if (harvesters.length > 6 && repair.length < 3) {
                let newName = 'Rapair' + Game.time;
                console.log('Spawning new repair');
                Game.spawns['Spawn'].spawnCreep([CARRY, CARRY, WORK, MOVE, CARRY, WORK, CARRY, CARRY], newName,
                    {memory: {role: 'repair'}});
            }
            if (harvesters.length / 2 > builder.length) {
                let newName = 'Builder' + Game.time;
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Spawn'].spawnCreep([CARRY, CARRY, WORK, WORK, MOVE, CARRY, WORK, CARRY], newName,
                    {memory: {role: 'builder'}});
            } else if (upgrader.length < builder.length) {
                let newName = 'Upgrader' + Game.time;
                console.log('Spawning new Upgrader: ' + newName);
                Game.spawns['Spawn'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, CARRY, WORK, WORK], newName,
                    {memory: {role: 'upgrader'}});
            } else {
                let newName = 'Harversters' + Game.time;
                console.log('Spawning new Harverster' + newName);
                Game.spawns['Spawn'].spawnCreep([MOVE, WORK, CARRY, CARRY, WORK, MOVE, CARRY, WORK, WORK, CARRY], newName,
                    {memory: {role: 'harvester'}});
            }
        }
    }
}
module.exports = managerRole;
