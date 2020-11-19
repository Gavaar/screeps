// creep parts
declare const MOVE: string;
declare const WORK: string;
declare const CARRY: string;

// find constants
declare const FIND_EXIT_TOP: 1;
declare const FIND_EXIT_RIGHT: 3;
declare const FIND_EXIT_BOTTOM: 5;
declare const FIND_EXIT_LEFT: 7;
declare const FIND_EXIT: 10;
declare const FIND_CREEPS: 101;
declare const FIND_MY_CREEPS: 102;
declare const FIND_HOSTILE_CREEPS: 103;
declare const FIND_SOURCES_ACTIVE: 104;
declare const FIND_SOURCES: 105;
declare const FIND_DROPPED_RESOURCES: 106;
declare const FIND_STRUCTURES: 107;
declare const FIND_MY_STRUCTURES: 108;
declare const FIND_HOSTILE_STRUCTURES: 109;
declare const FIND_FLAGS: 110;
declare const FIND_CONSTRUCTION_SITES: 111;
declare const FIND_MY_SPAWNS: 112;
declare const FIND_HOSTILE_SPAWNS: 113;
declare const FIND_MY_CONSTRUCTION_SITES: 114;
declare const FIND_HOSTILE_CONSTRUCTION_SITES: 115;
declare const FIND_MINERALS: 116;
declare const FIND_NUKES: 117;
declare const FIND_TOMBSTONES: 118;
declare const FIND_POWER_CREEPS: 119;
declare const FIND_MY_POWER_CREEPS: 120;
declare const FIND_HOSTILE_POWER_CREEPS: 121;
declare const FIND_DEPOSITS: 122;
declare const FIND_RUINS: 123;

// look constants
declare const LOOK_CREEPS: 'creep';
declare const LOOK_ENERGY: 'energy';
declare const LOOK_RESOURCES: 'resource';
declare const LOOK_SOURCES: 'source';
declare const LOOK_MINERALS: 'mineral';
declare const LOOK_DEPOSITS: 'deposit';
declare const LOOK_STRUCTURES: 'structure';
declare const LOOK_FLAGS: 'flag';
declare const LOOK_CONSTRUCTION_SITES: 'constructionSite';
declare const LOOK_NUKES: 'nuke';
declare const LOOK_TERRAIN: 'terrain';
declare const LOOK_TOMBSTONES: 'tombstone';
declare const LOOK_POWER_CREEPS: 'powerCreep';
declare const LOOK_RUINS: 'ruin';

// return value constants
declare const OK: 0;
declare const ERR_NOT_OWNER: -1;
declare const ERR_NO_PATH: -2;
declare const ERR_NAME_EXISTS: -3;
declare const ERR_BUSY: -4;
declare const ERR_NOT_FOUND: -5;
declare const ERR_NOT_ENOUGH_ENERGY: -6;
declare const ERR_NOT_ENOUGH_RESOURCES: -6;
declare const ERR_INVALID_TARGET: -7;
declare const ERR_FULL: -8;
declare const ERR_NOT_IN_RANGE: -9;
declare const ERR_INVALID_ARGS: -10;
declare const ERR_TIRED: -11;
declare const ERR_NO_BODYPART: -12;
declare const ERR_NOT_ENOUGH_EXTENSIONS: -6;
declare const ERR_RCL_NOT_ENOUGH: -14;
declare const ERR_GCL_NOT_ENOUGH: -15;

// resources
declare const RESOURCE_ENERGY: string;

// structures
declare const STRUCTURE_SPAWN: 'spawn';
declare const STRUCTURE_EXTENSION: 'extension';
declare const STRUCTURE_ROAD: 'road';
declare const STRUCTURE_WALL: 'constructedWall';
declare const STRUCTURE_RAMPART: 'rampart';
declare const STRUCTURE_KEEPER_LAIR: 'keeperLair';
declare const STRUCTURE_PORTAL: 'portal';
declare const STRUCTURE_CONTROLLER: 'controller';
declare const STRUCTURE_LINK: 'link';
declare const STRUCTURE_STORAGE: 'storage';
declare const STRUCTURE_TOWER: 'tower';
declare const STRUCTURE_OBSERVER: 'observer';
declare const STRUCTURE_POWER_BANK: 'powerBank';
declare const STRUCTURE_POWER_SPAWN: 'powerSpawn';
declare const STRUCTURE_EXTRACTOR: 'extractor';
declare const STRUCTURE_LAB: 'lab';
declare const STRUCTURE_TERMINAL: 'terminal';
declare const STRUCTURE_CONTAINER: 'container';
declare const STRUCTURE_NUKER: 'nuker';
declare const STRUCTURE_FACTORY: 'factory';
declare const STRUCTURE_INVADER_CORE: 'invaderCore';