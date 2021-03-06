var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, id) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length && targets.length != 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.memory.work = true;
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.memory.work = false;
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[id]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[id], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;
