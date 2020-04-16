var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, id) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[id]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[id]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;