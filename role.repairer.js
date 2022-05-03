var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if(creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES,{
                filter: (s) => s.hits <= s.hitsMax
            });
            if(targets.length) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            //var sources = creep.room.find(FIND_SOURCES);
            if(creep.withdraw(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) <=50) {
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffaa00'}});  
            }
        }
    }

}; module.exports = roleRepairer;