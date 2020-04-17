var roleRepair = {


    /** @param {Creep} creep **/
    run: function(creep, id) {

        if(creep.memory.repair && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repair = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repair && creep.store.getFreeCapacity() == 0) {
            creep.memory.repair = true;
            creep.say('🚧 build');
        }

        if(!creep.memory.repair) {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[id]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[id], {visualizePathStyle: {stroke: '#ffaa00'}});
    
            }
        }
        else {
            let tower = Game.getObjectById('bc8b829f45d83cb');
            if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleRepair;