var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function() {
    
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }


    // TO DO:
    // Priority Queue for spawns
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }    
    
    
    
        var numHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var numBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        var numUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var numRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
        var minHarvester = 5;
        var minBuilder = 3;
        var minUpgrader = 3;
        var minRepairer = 2;
        

        //Spawn repairer automatically if enough energy and number of repairers is less than minimum
        if (Game.spawns['Spawn1'].store.getCapacity(RESOURCE_ENERGY) >= 250 && numRepairers < minRepairer) {
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], "Repairer" + Game.time.toString(),
                {memory: {role: 'repairer'}});
        }

        //Spawn builder automatically if enough energy and number of builders is less than minumum
        if (Game.spawns['Spawn1'].store.getCapacity(RESOURCE_ENERGY) >= 250 && numBuilders < minBuilder) {
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], "Builder" + Game.time.toString(),
                {memory: {role: 'builder'}});
        }

        //Spawn upgrader automatically if enough energy and number of upgraders is less than minimum
        if (Game.spawns['Spawn1'].store.getCapacity(RESOURCE_ENERGY) >= 250 && numUpgraders < minUpgrader) {
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], "Upgrader" + Game.time.toString(),
                {memory: {role: 'upgrader'}});
        }

        //Spawn harvester automatically if enough energy and number of harvesters is less than minumum
        if (Game.spawns['Spawn1'].store.getCapacity(RESOURCE_ENERGY) >= 250 && numHarvesters < minHarvester) {
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], "Harvester" + Game.time.toString(),
                {memory: {role: 'harvester'}});
        }
    }
}