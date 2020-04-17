var roleHarvester = {


    /** @param {Creep} creep **/
    run: function(creep, id) {
        let builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let roleBuilder = require('role.builder');
        if(creep.memory.harverst && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harverst = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.harverst && creep.store.getFreeCapacity() == 0) {
            creep.memory.harverst = true;
            creep.say('🚧 build');
        }

        if(!creep.memory.harverst) {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[id]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[id], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0 && id == 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }

            }else if(builder[0].memory.word || !builder[0].memory.word == ''){
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length && targets.length != 0) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.memory.work = true;
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }

            }else if(targets.length > 0 && id == 1){
                targets.reverse()
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }



            // }else{
            //     if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }
        }
    }
};

module.exports = roleHarvester;