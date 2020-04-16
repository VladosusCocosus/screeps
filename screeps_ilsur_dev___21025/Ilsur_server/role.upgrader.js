var roleUpgrader = {

//     /** @param {Creep} creep **/
//     run: function(creep, id) {
//
//         if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
//             creep.memory.building = false;
//             creep.say('🔄 harvest');
//         }
//         if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
//             creep.memory.building = true;
//             creep.say('🚧 build');
//         }
//             if(creep.store.getFreeCapacity() > 0) {
//                 var sources = creep.room.find(FIND_SOURCES);
//                 if (creep.harvest(sources[id] == ERR_NOT_IN_RANGE)) {
//                     creep.moveTo(sources[id]);
//                 }
//             }
//         }
//         else {
//             if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(creep.room.controller);
//             }
//         }
//     }
// };

    /** @param {Creep} creep **/
    run: function(creep, id) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 Upgrade');
        }

        if(creep.memory.building) {
            creep.moveTo(creep.room.controller);
            creep.upgradeController(creep.room.controller)

        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[id]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[id], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleUpgrader;