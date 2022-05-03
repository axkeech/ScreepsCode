var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            //var sources = creep.room.find(FIND_SOURCES);
            if(creep.withdraw(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) <=50) {
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffaa00'}});  
            }
        }
    }
}; module.exports = roleUpgrader;