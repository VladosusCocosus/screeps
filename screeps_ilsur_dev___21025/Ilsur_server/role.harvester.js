var roleHarvester = {


    /** @param {Creep} creep **/
    run: function(creep, id) {

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
                targets.reverse()
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    };

module.exports = roleHarvester;