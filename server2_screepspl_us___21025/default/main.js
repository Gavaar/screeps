/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/_common/name_creator.service.ts":
/*!*********************************************!*\
  !*** ./src/_common/name_creator.service.ts ***!
  \*********************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export nameService [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nameService = void 0;
var nameHash = ['Fran', 'Juan', 'Pedro', 'Angel', 'Roman', 'Marquito'];
function getName() {
    return nameHash[Math.floor(Math.random() * nameHash.length)];
}
var NameCreatorService = /** @class */ (function () {
    function NameCreatorService() {
        this.id = Memory.id || 0;
    }
    NameCreatorService.prototype.createName = function () {
        Memory.id = this.id + 1;
        return getName() + "_" + this.id;
    };
    return NameCreatorService;
}());
var nameService = new NameCreatorService();
exports.nameService = nameService;


/***/ }),

/***/ "./src/creeps/_creep.abstract.ts":
/*!***************************************!*\
  !*** ./src/creeps/_creep.abstract.ts ***!
  \***************************************/
/*! flagged exports */
/*! export AbstractCreep [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractCreep = void 0;
var AbstractCreep = /** @class */ (function () {
    function AbstractCreep(creep, opts) {
        this.name = opts.name;
        this.creep = creep;
    }
    Object.defineProperty(AbstractCreep.prototype, "memory", {
        get: function () {
            return this.creep.memory;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractCreep.prototype, "room", {
        get: function () {
            return this.creep.room;
        },
        enumerable: false,
        configurable: true
    });
    return AbstractCreep;
}());
exports.AbstractCreep = AbstractCreep;


/***/ }),

/***/ "./src/creeps/creep.interface.ts":
/*!***************************************!*\
  !*** ./src/creeps/creep.interface.ts ***!
  \***************************************/
/*! flagged exports */
/*! export CreepType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreepType = void 0;
var CreepType;
(function (CreepType) {
    CreepType["Miner"] = "miner";
    CreepType["Collector"] = "collector";
    CreepType["Builder"] = "builder";
    CreepType["Upgrader"] = "upgrader";
})(CreepType || (CreepType = {}));
exports.CreepType = CreepType;


/***/ }),

/***/ "./src/creeps/creep.service.ts":
/*!*************************************!*\
  !*** ./src/creeps/creep.service.ts ***!
  \*************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export creepService [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.creepService = void 0;
var creep_miner_1 = __webpack_require__(/*! ./creep_miner */ "./src/creeps/creep_miner.ts");
var creep_interface_1 = __webpack_require__(/*! ./creep.interface */ "./src/creeps/creep.interface.ts");
var creep_collector_1 = __webpack_require__(/*! ./creep_collector */ "./src/creeps/creep_collector.ts");
var creep_builder_1 = __webpack_require__(/*! ./creep_builder */ "./src/creeps/creep_builder.ts");
var creep_upgrader_1 = __webpack_require__(/*! ./creep_upgrader */ "./src/creeps/creep_upgrader.ts");
var typeClassMap = (_a = {},
    _a[creep_interface_1.CreepType.Miner] = creep_miner_1.CMiner,
    _a[creep_interface_1.CreepType.Collector] = creep_collector_1.CCollector,
    _a[creep_interface_1.CreepType.Builder] = creep_builder_1.CBuilder,
    _a[creep_interface_1.CreepType.Upgrader] = creep_upgrader_1.CUpgrader,
    _a);
var CreepService = /** @class */ (function () {
    function CreepService() {
    }
    CreepService.prototype.getMyCreepsInRoom = function (room) {
        return room.find(FIND_MY_CREEPS).reduce(function (creepMap, creep) {
            var creepOpts = { name: creep.name };
            var type = creep.memory.type;
            var creepClass = typeClassMap[type];
            creepMap[creep.name] = new creepClass(creep, creepOpts);
            return creepMap;
        }, {});
    };
    return CreepService;
}());
var creepService = new CreepService();
exports.creepService = creepService;


/***/ }),

/***/ "./src/creeps/creep_builder.ts":
/*!*************************************!*\
  !*** ./src/creeps/creep_builder.ts ***!
  \*************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CBuilder = void 0;
var room_service_1 = __webpack_require__(/*! @rooms/room.service */ "./src/rooms/room.service.ts");
var creep_interface_1 = __webpack_require__(/*! ./creep.interface */ "./src/creeps/creep.interface.ts");
var _creep_abstract_1 = __webpack_require__(/*! ./_creep.abstract */ "./src/creeps/_creep.abstract.ts");
var CBuilder = /** @class */ (function (_super) {
    __extends(CBuilder, _super);
    function CBuilder(creep, opts) {
        var _this = _super.call(this, creep, opts) || this;
        _this.type = creep_interface_1.CreepType.Builder;
        if (!_this.memory.state)
            _this.memory.state = 'collecting';
        return _this;
    }
    CBuilder.prototype.run = function () {
        if (this.memory.state === 'collecting')
            this.collect();
        else
            this.build();
        this.beforeDestroy();
    };
    CBuilder.prototype.getEnergyTarget = function () {
        if (!this.memory.target) {
            var storages = room_service_1.roomService.getRoomStorages(this.creep.room);
            this.memory.target = storages[storages.length - 1].id; // fullest
        }
        return Game.getObjectById(this.memory.target);
    };
    CBuilder.prototype.getBuildTarget = function () {
        if (!this.memory.target) {
            var sites = room_service_1.roomService.getConstructionSites(this.creep.room);
            this.memory.target = this.creep.pos.findClosestByPath(sites).id;
        }
        var site = Game.getObjectById(this.memory.target);
        if (!site) {
            this.memory.target = '';
        }
        return site;
    };
    CBuilder.prototype.collect = function () {
        var target = this.getEnergyTarget();
        var transfer = this.creep.withdraw(target, RESOURCE_ENERGY);
        if (transfer === ERR_NOT_IN_RANGE)
            this.creep.moveTo(target.pos, { visualizePathStyle: {} });
        if (transfer === ERR_NOT_ENOUGH_RESOURCES)
            this.creep.memory.target = '';
        if (transfer === ERR_FULL)
            this.toggleState();
    };
    CBuilder.prototype.build = function () {
        var target = this.getBuildTarget();
        var build = this.creep.build(target);
        if (build === ERR_NOT_IN_RANGE)
            this.creep.moveTo(target.pos, { visualizePathStyle: {} });
        if (build === ERR_NOT_ENOUGH_RESOURCES)
            this.toggleState();
    };
    CBuilder.prototype.toggleState = function () {
        this.memory.target = '';
        this.memory.state = this.memory.state === 'building' ? 'collecting' : 'building';
    };
    CBuilder.prototype.beforeDestroy = function () {
        if (this.creep.ticksToLive === 1) {
            this.creep.room.memory.currentCreeps[this.type] -= 1;
            delete Memory.creeps[this.name];
        }
    };
    return CBuilder;
}(_creep_abstract_1.AbstractCreep));
exports.CBuilder = CBuilder;


/***/ }),

/***/ "./src/creeps/creep_collector.ts":
/*!***************************************!*\
  !*** ./src/creeps/creep_collector.ts ***!
  \***************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CCollector = void 0;
var room_service_1 = __webpack_require__(/*! @rooms/room.service */ "./src/rooms/room.service.ts");
var creep_interface_1 = __webpack_require__(/*! ./creep.interface */ "./src/creeps/creep.interface.ts");
var _creep_abstract_1 = __webpack_require__(/*! ./_creep.abstract */ "./src/creeps/_creep.abstract.ts");
var CCollector = /** @class */ (function (_super) {
    __extends(CCollector, _super);
    function CCollector(creep, opts) {
        var _this = _super.call(this, creep, opts) || this;
        _this.type = creep_interface_1.CreepType.Collector;
        if (!_this.memory.state)
            _this.memory.state = 'collecting';
        return _this;
    }
    Object.defineProperty(CCollector.prototype, "energyStore", {
        get: function () {
            return this.creep.store;
        },
        enumerable: false,
        configurable: true
    });
    CCollector.prototype.run = function () {
        if (this.memory.state === 'collecting')
            this.collect();
        else
            this.transfer();
        this.beforeDestroy();
    };
    CCollector.prototype.getStructureTarget = function () {
        if (!this.memory.target) {
            var emptiestStorage = room_service_1.roomService.getRoomStorages(this.creep.room)[0];
            this.memory.target = emptiestStorage.id;
        }
        return Game.getObjectById(this.memory.target);
    };
    CCollector.prototype.getEnergyTarget = function () {
        if (!this.memory.target) {
            var dropped = room_service_1.roomService.getDroppedResources(this.creep.room)[0];
            if (dropped) {
                this.memory.target = dropped.id;
            }
            else {
                var container = room_service_1.roomService.getContainers(this.creep.room)[0];
                if (container)
                    this.memory.target = container.id;
            }
        }
        var energy = Game.getObjectById(this.memory.target);
        if (!energy)
            this.memory.target = '';
        return energy;
    };
    CCollector.prototype.collect = function () {
        var target = this.getEnergyTarget();
        var transfer = this.attemptToWithdrawEnergy(target);
        if (transfer === ERR_NOT_IN_RANGE)
            this.creep.moveTo(target.pos, { visualizePathStyle: {} });
        if (transfer === ERR_FULL)
            this.toggleState();
    };
    CCollector.prototype.attemptToWithdrawEnergy = function (target) {
        if (!target)
            return 0;
        if (target.type === STRUCTURE_CONTAINER) {
            return this.creep.withdraw(target, RESOURCE_ENERGY);
        }
        return this.creep.pickup(target);
    };
    CCollector.prototype.transfer = function () {
        var target = this.getStructureTarget();
        var transfer = this.creep.transfer(target, RESOURCE_ENERGY);
        if (transfer === ERR_NOT_IN_RANGE)
            this.creep.moveTo(target.pos, { visualizePathStyle: {} });
        if (transfer === ERR_FULL)
            this.creep.memory.target = '';
        if (!this.creep.store.getUsedCapacity())
            this.toggleState();
    };
    CCollector.prototype.toggleState = function () {
        this.memory.target = '';
        this.memory.state = (this.memory.state === 'transferring' ? 'collecting' : 'transferring');
    };
    CCollector.prototype.beforeDestroy = function () {
        if (this.creep.ticksToLive === 1) {
            this.creep.room.memory.currentCreeps[this.type] -= 1;
            delete Memory.creeps[this.name];
        }
    };
    return CCollector;
}(_creep_abstract_1.AbstractCreep));
exports.CCollector = CCollector;


/***/ }),

/***/ "./src/creeps/creep_miner.ts":
/*!***********************************!*\
  !*** ./src/creeps/creep_miner.ts ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CMiner = void 0;
var energy_source_service_1 = __webpack_require__(/*! @rooms/energy_sources/energy_source.service */ "./src/rooms/energy_sources/energy_source.service.ts");
var creep_interface_1 = __webpack_require__(/*! ./creep.interface */ "./src/creeps/creep.interface.ts");
var _creep_abstract_1 = __webpack_require__(/*! ./_creep.abstract */ "./src/creeps/_creep.abstract.ts");
var CMiner = /** @class */ (function (_super) {
    __extends(CMiner, _super);
    function CMiner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = creep_interface_1.CreepType.Miner;
        return _this;
    }
    CMiner.prototype.run = function () {
        var src = this.getMiningSrc();
        var harvesting = this.creep.harvest(src);
        if (harvesting === ERR_NOT_IN_RANGE)
            this.creep.moveTo(src.pos, { visualizePathStyle: {} });
        this.beforeDestroy();
    };
    CMiner.prototype.getMiningSrc = function () {
        if (!this.memory.miningSite) {
            this.memory.miningSite = energy_source_service_1.energySourceService.getNextEnergySourceInRoom(this.creep.room);
        }
        return Game.getObjectById(this.memory.miningSite);
    };
    CMiner.prototype.beforeDestroy = function () {
        if (this.creep.ticksToLive === 1) {
            this.creep.room.memory.currentCreeps[this.type] -= 1;
            this.creep.room.memory.sources[this.creep.memory.miningSite].memory.miners -= 1;
            delete Memory.creeps[this.name];
        }
    };
    return CMiner;
}(_creep_abstract_1.AbstractCreep));
exports.CMiner = CMiner;


/***/ }),

/***/ "./src/creeps/creep_upgrader.ts":
/*!**************************************!*\
  !*** ./src/creeps/creep_upgrader.ts ***!
  \**************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CUpgrader = void 0;
var creep_interface_1 = __webpack_require__(/*! ./creep.interface */ "./src/creeps/creep.interface.ts");
var _creep_abstract_1 = __webpack_require__(/*! ./_creep.abstract */ "./src/creeps/_creep.abstract.ts");
var room_service_1 = __webpack_require__(/*! @rooms/room.service */ "./src/rooms/room.service.ts");
var CUpgrader = /** @class */ (function (_super) {
    __extends(CUpgrader, _super);
    function CUpgrader(creep, opts) {
        var _this = _super.call(this, creep, opts) || this;
        _this.type = creep_interface_1.CreepType.Upgrader;
        if (!_this.memory.state)
            _this.memory.state = 'collecting';
        return _this;
    }
    CUpgrader.prototype.run = function () {
        if (this.memory.state === 'collecting')
            this.collect();
        else
            this.upgrade();
        this.beforeDestroy();
    };
    CUpgrader.prototype.collect = function () {
        var target = this.getEnergyTarget();
        var transfer = this.creep.withdraw(target, RESOURCE_ENERGY);
        if (transfer === ERR_NOT_IN_RANGE)
            this.creep.moveTo(target.pos, { visualizePathStyle: {} });
        if (transfer === ERR_FULL)
            this.toggleState();
    };
    CUpgrader.prototype.upgrade = function () {
        var target = this.getController();
        var upgrade = this.creep.upgradeController(target);
        if (upgrade === ERR_NOT_IN_RANGE)
            this.creep.moveTo(target.pos, { visualizePathStyle: {} });
        if (upgrade === ERR_NOT_ENOUGH_RESOURCES)
            this.toggleState();
    };
    CUpgrader.prototype.getEnergyTarget = function () {
        if (!this.memory.target) {
            var storages = room_service_1.roomService.getRoomStorages(this.creep.room);
            this.memory.target = storages[storages.length - 1].id; // fullest
        }
        return Game.getObjectById(this.memory.target);
    };
    CUpgrader.prototype.getController = function () {
        if (!this.memory.target) {
            this.memory.target = this.room.controller.id;
        }
        return Game.getObjectById(this.memory.target);
    };
    CUpgrader.prototype.toggleState = function () {
        this.memory.target = '';
        this.memory.state = (this.memory.state === 'upgrading' ? 'collecting' : 'upgrading');
    };
    CUpgrader.prototype.beforeDestroy = function () {
        if (this.creep.ticksToLive === 1) {
            this.creep.room.memory.currentCreeps[this.type] -= 1;
            delete Memory.creeps[this.name];
        }
    };
    return CUpgrader;
}(_creep_abstract_1.AbstractCreep));
exports.CUpgrader = CUpgrader;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/* Screeps V1.0.0 */
var room_1 = __webpack_require__(/*! ./rooms/room */ "./src/rooms/room.ts");
var room_service_1 = __webpack_require__(/*! ./rooms/room.service */ "./src/rooms/room.service.ts");
var rooms = room_service_1.roomService.getRooms();
for (var roomName in rooms) {
    var room = new room_1.Room(rooms[roomName]);
    room.run();
}


/***/ }),

/***/ "./src/rooms/_room.abstract.ts":
/*!*************************************!*\
  !*** ./src/rooms/_room.abstract.ts ***!
  \*************************************/
/*! flagged exports */
/*! export AbstractRoom [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractRoom = void 0;
var creep_service_1 = __webpack_require__(/*! @creeps/creep.service */ "./src/creeps/creep.service.ts");
var spawn_service_1 = __webpack_require__(/*! @spawns/spawn.service */ "./src/spawns/spawn.service.ts");
var AbstractRoom = /** @class */ (function () {
    function AbstractRoom(room) {
        this._room = room;
        this.spawns = spawn_service_1.spawnService.getSpawnsInRoom(room);
        this.creeps = creep_service_1.creepService.getMyCreepsInRoom(room);
        if (!Memory.rooms[room.name])
            Memory.rooms[room.name] = {};
    }
    Object.defineProperty(AbstractRoom.prototype, "name", {
        get: function () {
            return this._room.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractRoom.prototype, "energyAvailable", {
        get: function () {
            return this._room.energyAvailable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractRoom.prototype, "energyCapacityAvailable", {
        get: function () {
            return this._room.energyCapacityAvailable;
        },
        enumerable: false,
        configurable: true
    });
    return AbstractRoom;
}());
exports.AbstractRoom = AbstractRoom;


/***/ }),

/***/ "./src/rooms/energy_sources/energy_source.service.ts":
/*!***********************************************************!*\
  !*** ./src/rooms/energy_sources/energy_source.service.ts ***!
  \***********************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export energySourceService [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.energySourceService = void 0;
var structure_service_1 = __webpack_require__(/*! @rooms/structures/structure.service */ "./src/rooms/structures/structure.service.ts");
var spawn_service_1 = __webpack_require__(/*! @spawns/spawn.service */ "./src/spawns/spawn.service.ts");
var EnergySourceService = /** @class */ (function () {
    function EnergySourceService() {
    }
    EnergySourceService.prototype.getRoomEnergySources = function (room) {
        var sources = room.memory.sources;
        if (sources)
            return sources;
        sources = room.memory.sources = this.findEnergySourcesInRoom(room);
        return sources;
    };
    EnergySourceService.prototype.getNextEnergySourceInRoom = function (room) {
        var sources = this.getRoomEnergySources(room);
        var sourceId = Object.keys(sources)
            .sort(function (sa, sb) {
            return sources[sa].memory.miners - sources[sb].memory.miners;
        })
            .find(function (srcId) {
            return sources[srcId].memory.minerCapacity > sources[srcId].memory.miners;
        });
        if (sourceId)
            room.memory.sources[sourceId].memory.miners += 1;
        return sourceId || '';
    };
    EnergySourceService.prototype.getPathFromStoresToSources = function (room) {
        var srcPos = Object.values(this.getRoomEnergySources(room)).map(function (s) { return ({ pos: s.pos, range: 1 }); });
        var spawns = spawn_service_1.spawnService.getSpawnsInRoom(room);
        var paths = [];
        Object.values(spawns).forEach(function (s) {
            srcPos.forEach(function (pos) {
                paths.push.apply(paths, PathFinder.search(s.pos, [pos], { swampCost: 1 }).path);
            });
        });
        return paths;
    };
    EnergySourceService.prototype.findEnergySourcesInRoom = function (room) {
        var _this = this;
        return room.find(FIND_SOURCES).reduce(function (srcMap, src) {
            src.memory = _this.setSourceMemoryConfig(src);
            srcMap[src.id] = src;
            return srcMap;
        }, {});
    };
    EnergySourceService.prototype.setSourceMemoryConfig = function (src) {
        var _a = src.pos, x = _a.x, y = _a.y;
        var minerCapacity = 0;
        src.room.lookAtArea(y - 1, x - 1, y + 1, x + 1, true).forEach(function (pos) {
            if (pos.type === 'terrain' && (pos.terrain === 'swamp' || pos.terrain === 'plain')) {
                structure_service_1.structureService.setStorageSite(src.room, src.room.getPositionAt(pos.x, pos.y));
                minerCapacity += 1;
            }
        });
        return { minerCapacity: minerCapacity, miners: 0 };
    };
    return EnergySourceService;
}());
var energySourceService = new EnergySourceService();
exports.energySourceService = energySourceService;


/***/ }),

/***/ "./src/rooms/room.service.ts":
/*!***********************************!*\
  !*** ./src/rooms/room.service.ts ***!
  \***********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export roomService [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.roomService = void 0;
var energy_source_service_1 = __webpack_require__(/*! ./energy_sources/energy_source.service */ "./src/rooms/energy_sources/energy_source.service.ts");
var structure_service_1 = __webpack_require__(/*! ./structures/structure.service */ "./src/rooms/structures/structure.service.ts");
var spawn_service_1 = __webpack_require__(/*! @spawns/spawn.service */ "./src/spawns/spawn.service.ts");
var RoomService = /** @class */ (function () {
    function RoomService() {
    }
    RoomService.prototype.getRooms = function () {
        if (!Memory.rooms)
            Memory.rooms = {};
        return Game.rooms;
    };
    RoomService.prototype.getCreepCapacity = function (room) {
        if (room.memory.creepCapacity)
            return room.memory.creepCapacity;
        room.memory.currentCreeps = { miner: 0, collector: 0, builder: 0, upgrader: 0 };
        var miner = this.calculateMinersNeeded(room);
        var collector = miner;
        var builder = miner;
        var upgrader = room.controller.level;
        room.memory.creepCapacity = { miner: miner, collector: collector, builder: builder, upgrader: upgrader };
        return room.memory.creepCapacity;
    };
    RoomService.prototype.getRoomStorages = function (room) {
        return room.find(FIND_MY_STRUCTURES)
            .filter(function (s) { return s.store; })
            .sort(function (sa, sb) { return sb.store.getFreeCapacity() - sa.store.getFreeCapacity(); });
    };
    RoomService.prototype.getDroppedResources = function (room) {
        return room.find(FIND_DROPPED_RESOURCES)
            .sort(function (sa, sb) { return sb.amount - sa.amount; });
    };
    RoomService.prototype.getContainers = function (room) {
        return room.find(FIND_MY_STRUCTURES).filter(function (s) { return s.type === STRUCTURE_CONTAINER; })
            .sort(function (sa, sb) { return sb.store.getUsedCapacity() - sa.store.getUsedCapacity(); });
    };
    RoomService.prototype.getConstructionSites = function (room) {
        var sites = room.find(FIND_CONSTRUCTION_SITES);
        if (!sites.length) {
            var paths = energy_source_service_1.energySourceService.getPathFromStoresToSources(room);
            if (!paths.length)
                paths = this.getPathFromStoresToController(room);
            structure_service_1.structureService.setRoadSites(room, paths);
        }
        return sites;
    };
    RoomService.prototype.setConstructionSite = function (room, pos, type) {
        return room.createConstructionSite(pos, type);
    };
    RoomService.prototype.calculateMinersNeeded = function (room) {
        var enSrcs = energy_source_service_1.energySourceService.getRoomEnergySources(room);
        // maximum energy per tick extractable to not oversaturate the source
        var workCapacityPerTick = Object.values(enSrcs).reduce(function (t, e) { return t += e.energyCapacity; }, 0) / (300);
        // room capacity - required at least 1 move
        var unitWorkCapacity = Math.floor((room.energyCapacityAvailable - 50) / 100);
        var maxWorkingMiners = workCapacityPerTick / unitWorkCapacity;
        var actualWorkingSpaces = Object.values(enSrcs).reduce(function (t, e) { return t += e.memory.minerCapacity; }, 0);
        return maxWorkingMiners > actualWorkingSpaces ? actualWorkingSpaces : maxWorkingMiners;
    };
    RoomService.prototype.getPathFromStoresToController = function (room) {
        var ctrlPos = { pos: room.controller.pos, range: 1 };
        var spawns = spawn_service_1.spawnService.getSpawnsInRoom(room);
        var paths = [];
        Object.values(spawns).forEach(function (s) {
            paths.push.apply(paths, PathFinder.search(s.pos, [ctrlPos], { swampCost: 1 }).path);
        });
        return paths;
    };
    return RoomService;
}());
var roomService = new RoomService();
exports.roomService = roomService;


/***/ }),

/***/ "./src/rooms/room.ts":
/*!***************************!*\
  !*** ./src/rooms/room.ts ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Room = void 0;
var _room_abstract_1 = __webpack_require__(/*! ./_room.abstract */ "./src/rooms/_room.abstract.ts");
var Room = /** @class */ (function (_super) {
    __extends(Room, _super);
    function Room() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Room.prototype.run = function () {
        for (var spawnName in this.spawns) {
            this.runSpawn(spawnName);
        }
        for (var creepName in this.creeps) {
            this.runCreep(creepName);
        }
    };
    Room.prototype.runSpawn = function (name) {
        this.spawns[name].run();
    };
    Room.prototype.runCreep = function (name) {
        this.creeps[name].run();
    };
    return Room;
}(_room_abstract_1.AbstractRoom));
exports.Room = Room;


/***/ }),

/***/ "./src/rooms/structures/structure.service.ts":
/*!***************************************************!*\
  !*** ./src/rooms/structures/structure.service.ts ***!
  \***************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export structureService [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.structureService = void 0;
var room_service_1 = __webpack_require__(/*! @rooms/room.service */ "./src/rooms/room.service.ts");
var StructureService = /** @class */ (function () {
    function StructureService() {
    }
    StructureService.prototype.setRoadSites = function (room, paths, limit) {
        if (limit === void 0) { limit = 10; }
        var noRoads = paths.filter(function (pos) {
            var structures = pos.lookFor(LOOK_STRUCTURES);
            return structures.find(function (s) { return s.type === STRUCTURE_ROAD; }) == null;
        });
        noRoads.length = limit;
        noRoads.map(function (p) { return room_service_1.roomService.setConstructionSite(room, p, STRUCTURE_ROAD); });
    };
    StructureService.prototype.setStorageSite = function (room, pos) {
        room.createConstructionSite(pos, STRUCTURE_CONTAINER);
    };
    return StructureService;
}());
var structureService = new StructureService();
exports.structureService = structureService;


/***/ }),

/***/ "./src/spawns/_spawn.abstract.ts":
/*!***************************************!*\
  !*** ./src/spawns/_spawn.abstract.ts ***!
  \***************************************/
/*! flagged exports */
/*! export AbstractSpawn [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractSpawn = void 0;
var AbstractSpawn = /** @class */ (function () {
    function AbstractSpawn(spawn) {
        this.spawn = spawn;
    }
    Object.defineProperty(AbstractSpawn.prototype, "name", {
        get: function () {
            return this.spawn.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractSpawn.prototype, "room", {
        get: function () {
            return this.spawn.room;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractSpawn.prototype, "id", {
        get: function () {
            return this.spawn.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractSpawn.prototype, "pos", {
        get: function () {
            return this.spawn.pos;
        },
        enumerable: false,
        configurable: true
    });
    return AbstractSpawn;
}());
exports.AbstractSpawn = AbstractSpawn;


/***/ }),

/***/ "./src/spawns/spawn.service.ts":
/*!*************************************!*\
  !*** ./src/spawns/spawn.service.ts ***!
  \*************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export spawnService [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.spawnService = void 0;
var creep_interface_1 = __webpack_require__(/*! @creeps/creep.interface */ "./src/creeps/creep.interface.ts");
var room_service_1 = __webpack_require__(/*! @rooms/room.service */ "./src/rooms/room.service.ts");
var spawn_1 = __webpack_require__(/*! ./spawn */ "./src/spawns/spawn.ts");
var SpawnService = /** @class */ (function () {
    function SpawnService() {
    }
    SpawnService.prototype.getSpawnsInRoom = function (room) {
        return room.find(FIND_MY_SPAWNS).reduce(function (result, spawn) {
            result[spawn.name] = new spawn_1.Spawn(spawn);
            return result;
        }, {});
    };
    SpawnService.prototype.nextRequiredCreep = function (room) {
        var _a = room_service_1.roomService.getCreepCapacity(room), miner = _a.miner, collector = _a.collector, builder = _a.builder, upgrader = _a.upgrader;
        var currentCreeps = room.memory.currentCreeps;
        if (currentCreeps.miner > currentCreeps.collector && currentCreeps.collector < collector) {
            return creep_interface_1.CreepType.Collector;
        }
        else if (currentCreeps.miner < miner) {
            return creep_interface_1.CreepType.Miner;
        }
        else if (currentCreeps.builder < builder) {
            return creep_interface_1.CreepType.Builder;
        }
        else if (currentCreeps.upgrader < upgrader) {
            return creep_interface_1.CreepType.Upgrader;
        }
    };
    return SpawnService;
}());
var spawnService = new SpawnService();
exports.spawnService = spawnService;


/***/ }),

/***/ "./src/spawns/spawn.ts":
/*!*****************************!*\
  !*** ./src/spawns/spawn.ts ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Spawn = void 0;
var name_creator_service_1 = __webpack_require__(/*! @common/name_creator.service */ "./src/_common/name_creator.service.ts");
var creep_interface_1 = __webpack_require__(/*! @creeps/creep.interface */ "./src/creeps/creep.interface.ts");
var spawn_service_1 = __webpack_require__(/*! ./spawn.service */ "./src/spawns/spawn.service.ts");
var _spawn_abstract_1 = __webpack_require__(/*! ./_spawn.abstract */ "./src/spawns/_spawn.abstract.ts");
var CREEP_PARTS_BY_TYPE = (_a = {},
    _a[creep_interface_1.CreepType.Miner] = [WORK, WORK, MOVE],
    _a[creep_interface_1.CreepType.Collector] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    _a[creep_interface_1.CreepType.Builder] = [WORK, MOVE, MOVE, CARRY, CARRY],
    _a[creep_interface_1.CreepType.Upgrader] = [MOVE, MOVE, CARRY, CARRY, WORK],
    _a);
var Spawn = /** @class */ (function (_super) {
    __extends(Spawn, _super);
    function Spawn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Spawn.prototype.run = function () {
        if (this.room.energyAvailable >= 300) {
            var type = spawn_service_1.spawnService.nextRequiredCreep(this.room);
            if (type)
                this.spawnCreep(type);
        }
    };
    Spawn.prototype.spawnCreep = function (type) {
        var _name = type + "_" + name_creator_service_1.nameService.createName();
        this.spawn.spawnCreep(CREEP_PARTS_BY_TYPE[type], _name);
        this.room.memory.currentCreeps[type] += 1;
        Memory.creeps[_name] = { type: type };
    };
    return Spawn;
}(_spawn_abstract_1.AbstractSpawn));
exports.Spawn = Spawn;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/main.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY3JlZXBzLy4vc3JjL19jb21tb24vbmFtZV9jcmVhdG9yLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy8uL3NyYy9jcmVlcHMvX2NyZWVwLmFic3RyYWN0LnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvY3JlZXBzL2NyZWVwLmludGVyZmFjZS50cyIsIndlYnBhY2s6Ly9zY3JlZXBzLy4vc3JjL2NyZWVwcy9jcmVlcC5zZXJ2aWNlLnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvY3JlZXBzL2NyZWVwX2J1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy8uL3NyYy9jcmVlcHMvY3JlZXBfY29sbGVjdG9yLnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvY3JlZXBzL2NyZWVwX21pbmVyLnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvY3JlZXBzL2NyZWVwX3VwZ3JhZGVyLnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9zY3JlZXBzLy4vc3JjL3Jvb21zL19yb29tLmFic3RyYWN0LnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvcm9vbXMvZW5lcmd5X3NvdXJjZXMvZW5lcmd5X3NvdXJjZS5zZXJ2aWNlLnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvcm9vbXMvcm9vbS5zZXJ2aWNlLnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvcm9vbXMvcm9vbS50cyIsIndlYnBhY2s6Ly9zY3JlZXBzLy4vc3JjL3Jvb21zL3N0cnVjdHVyZXMvc3RydWN0dXJlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy8uL3NyYy9zcGF3bnMvX3NwYXduLmFic3RyYWN0LnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvc3Bhd25zL3NwYXduLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy8uL3NyYy9zcGF3bnMvc3Bhd24udHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zY3JlZXBzL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxtQkFBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQk47QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRCxxQkFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QlI7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCO0FBQy9CLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZKO0FBQ2I7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsb0JBQW9CO0FBQ3BCLG9CQUFvQixtQkFBTyxDQUFDLGtEQUFlO0FBQzNDLHdCQUF3QixtQkFBTyxDQUFDLDBEQUFtQjtBQUNuRCx3QkFBd0IsbUJBQU8sQ0FBQywwREFBbUI7QUFDbkQsc0JBQXNCLG1CQUFPLENBQUMsc0RBQWlCO0FBQy9DLHVCQUF1QixtQkFBTyxDQUFDLHdEQUFrQjtBQUNqRCwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUk7QUFD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QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esb0JBQW9COzs7Ozs7Ozs7Ozs7OztBQ2xDUDtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUN2Riw2QkFBNkIsOEVBQThFO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGFBQWE7QUFDYiw2QkFBNkIsbUJBQU8sQ0FBQywyRUFBOEI7QUFDbkUsd0JBQXdCLG1CQUFPLENBQUMsZ0VBQXlCO0FBQ3pELHNCQUFzQixtQkFBTyxDQUFDLHNEQUFpQjtBQUMvQyx3QkFBd0IsbUJBQU8sQ0FBQywwREFBbUI7QUFDbkQsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0EsQ0FBQztBQUNELGFBQWE7Ozs7Ozs7VUMvQ2I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5uYW1lU2VydmljZSA9IHZvaWQgMDtcclxudmFyIG5hbWVIYXNoID0gWydGcmFuJywgJ0p1YW4nLCAnUGVkcm8nLCAnQW5nZWwnLCAnUm9tYW4nLCAnTWFycXVpdG8nXTtcclxuZnVuY3Rpb24gZ2V0TmFtZSgpIHtcclxuICAgIHJldHVybiBuYW1lSGFzaFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBuYW1lSGFzaC5sZW5ndGgpXTtcclxufVxyXG52YXIgTmFtZUNyZWF0b3JTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTmFtZUNyZWF0b3JTZXJ2aWNlKCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBNZW1vcnkuaWQgfHwgMDtcclxuICAgIH1cclxuICAgIE5hbWVDcmVhdG9yU2VydmljZS5wcm90b3R5cGUuY3JlYXRlTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBNZW1vcnkuaWQgPSB0aGlzLmlkICsgMTtcclxuICAgICAgICByZXR1cm4gZ2V0TmFtZSgpICsgXCJfXCIgKyB0aGlzLmlkO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBOYW1lQ3JlYXRvclNlcnZpY2U7XHJcbn0oKSk7XHJcbnZhciBuYW1lU2VydmljZSA9IG5ldyBOYW1lQ3JlYXRvclNlcnZpY2UoKTtcclxuZXhwb3J0cy5uYW1lU2VydmljZSA9IG5hbWVTZXJ2aWNlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkFic3RyYWN0Q3JlZXAgPSB2b2lkIDA7XHJcbnZhciBBYnN0cmFjdENyZWVwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQWJzdHJhY3RDcmVlcChjcmVlcCwgb3B0cykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG9wdHMubmFtZTtcclxuICAgICAgICB0aGlzLmNyZWVwID0gY3JlZXA7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQWJzdHJhY3RDcmVlcC5wcm90b3R5cGUsIFwibWVtb3J5XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlZXAubWVtb3J5O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYnN0cmFjdENyZWVwLnByb3RvdHlwZSwgXCJyb29tXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlZXAucm9vbTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gQWJzdHJhY3RDcmVlcDtcclxufSgpKTtcclxuZXhwb3J0cy5BYnN0cmFjdENyZWVwID0gQWJzdHJhY3RDcmVlcDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5DcmVlcFR5cGUgPSB2b2lkIDA7XHJcbnZhciBDcmVlcFR5cGU7XHJcbihmdW5jdGlvbiAoQ3JlZXBUeXBlKSB7XHJcbiAgICBDcmVlcFR5cGVbXCJNaW5lclwiXSA9IFwibWluZXJcIjtcclxuICAgIENyZWVwVHlwZVtcIkNvbGxlY3RvclwiXSA9IFwiY29sbGVjdG9yXCI7XHJcbiAgICBDcmVlcFR5cGVbXCJCdWlsZGVyXCJdID0gXCJidWlsZGVyXCI7XHJcbiAgICBDcmVlcFR5cGVbXCJVcGdyYWRlclwiXSA9IFwidXBncmFkZXJcIjtcclxufSkoQ3JlZXBUeXBlIHx8IChDcmVlcFR5cGUgPSB7fSkpO1xyXG5leHBvcnRzLkNyZWVwVHlwZSA9IENyZWVwVHlwZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfYTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmNyZWVwU2VydmljZSA9IHZvaWQgMDtcclxudmFyIGNyZWVwX21pbmVyXzEgPSByZXF1aXJlKFwiLi9jcmVlcF9taW5lclwiKTtcclxudmFyIGNyZWVwX2ludGVyZmFjZV8xID0gcmVxdWlyZShcIi4vY3JlZXAuaW50ZXJmYWNlXCIpO1xyXG52YXIgY3JlZXBfY29sbGVjdG9yXzEgPSByZXF1aXJlKFwiLi9jcmVlcF9jb2xsZWN0b3JcIik7XHJcbnZhciBjcmVlcF9idWlsZGVyXzEgPSByZXF1aXJlKFwiLi9jcmVlcF9idWlsZGVyXCIpO1xyXG52YXIgY3JlZXBfdXBncmFkZXJfMSA9IHJlcXVpcmUoXCIuL2NyZWVwX3VwZ3JhZGVyXCIpO1xyXG52YXIgdHlwZUNsYXNzTWFwID0gKF9hID0ge30sXHJcbiAgICBfYVtjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuTWluZXJdID0gY3JlZXBfbWluZXJfMS5DTWluZXIsXHJcbiAgICBfYVtjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuQ29sbGVjdG9yXSA9IGNyZWVwX2NvbGxlY3Rvcl8xLkNDb2xsZWN0b3IsXHJcbiAgICBfYVtjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuQnVpbGRlcl0gPSBjcmVlcF9idWlsZGVyXzEuQ0J1aWxkZXIsXHJcbiAgICBfYVtjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuVXBncmFkZXJdID0gY3JlZXBfdXBncmFkZXJfMS5DVXBncmFkZXIsXHJcbiAgICBfYSk7XHJcbnZhciBDcmVlcFNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDcmVlcFNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBDcmVlcFNlcnZpY2UucHJvdG90eXBlLmdldE15Q3JlZXBzSW5Sb29tID0gZnVuY3Rpb24gKHJvb20pIHtcclxuICAgICAgICByZXR1cm4gcm9vbS5maW5kKEZJTkRfTVlfQ1JFRVBTKS5yZWR1Y2UoZnVuY3Rpb24gKGNyZWVwTWFwLCBjcmVlcCkge1xyXG4gICAgICAgICAgICB2YXIgY3JlZXBPcHRzID0geyBuYW1lOiBjcmVlcC5uYW1lIH07XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gY3JlZXAubWVtb3J5LnR5cGU7XHJcbiAgICAgICAgICAgIHZhciBjcmVlcENsYXNzID0gdHlwZUNsYXNzTWFwW3R5cGVdO1xyXG4gICAgICAgICAgICBjcmVlcE1hcFtjcmVlcC5uYW1lXSA9IG5ldyBjcmVlcENsYXNzKGNyZWVwLCBjcmVlcE9wdHMpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlZXBNYXA7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDcmVlcFNlcnZpY2U7XHJcbn0oKSk7XHJcbnZhciBjcmVlcFNlcnZpY2UgPSBuZXcgQ3JlZXBTZXJ2aWNlKCk7XHJcbmV4cG9ydHMuY3JlZXBTZXJ2aWNlID0gY3JlZXBTZXJ2aWNlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNCdWlsZGVyID0gdm9pZCAwO1xyXG52YXIgcm9vbV9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiQHJvb21zL3Jvb20uc2VydmljZVwiKTtcclxudmFyIGNyZWVwX2ludGVyZmFjZV8xID0gcmVxdWlyZShcIi4vY3JlZXAuaW50ZXJmYWNlXCIpO1xyXG52YXIgX2NyZWVwX2Fic3RyYWN0XzEgPSByZXF1aXJlKFwiLi9fY3JlZXAuYWJzdHJhY3RcIik7XHJcbnZhciBDQnVpbGRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhDQnVpbGRlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENCdWlsZGVyKGNyZWVwLCBvcHRzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY3JlZXAsIG9wdHMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMudHlwZSA9IGNyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5CdWlsZGVyO1xyXG4gICAgICAgIGlmICghX3RoaXMubWVtb3J5LnN0YXRlKVxyXG4gICAgICAgICAgICBfdGhpcy5tZW1vcnkuc3RhdGUgPSAnY29sbGVjdGluZyc7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgQ0J1aWxkZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5tZW1vcnkuc3RhdGUgPT09ICdjb2xsZWN0aW5nJylcclxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0KCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkKCk7XHJcbiAgICAgICAgdGhpcy5iZWZvcmVEZXN0cm95KCk7XHJcbiAgICB9O1xyXG4gICAgQ0J1aWxkZXIucHJvdG90eXBlLmdldEVuZXJneVRhcmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMubWVtb3J5LnRhcmdldCkge1xyXG4gICAgICAgICAgICB2YXIgc3RvcmFnZXMgPSByb29tX3NlcnZpY2VfMS5yb29tU2VydmljZS5nZXRSb29tU3RvcmFnZXModGhpcy5jcmVlcC5yb29tKTtcclxuICAgICAgICAgICAgdGhpcy5tZW1vcnkudGFyZ2V0ID0gc3RvcmFnZXNbc3RvcmFnZXMubGVuZ3RoIC0gMV0uaWQ7IC8vIGZ1bGxlc3RcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEdhbWUuZ2V0T2JqZWN0QnlJZCh0aGlzLm1lbW9yeS50YXJnZXQpO1xyXG4gICAgfTtcclxuICAgIENCdWlsZGVyLnByb3RvdHlwZS5nZXRCdWlsZFRhcmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMubWVtb3J5LnRhcmdldCkge1xyXG4gICAgICAgICAgICB2YXIgc2l0ZXMgPSByb29tX3NlcnZpY2VfMS5yb29tU2VydmljZS5nZXRDb25zdHJ1Y3Rpb25TaXRlcyh0aGlzLmNyZWVwLnJvb20pO1xyXG4gICAgICAgICAgICB0aGlzLm1lbW9yeS50YXJnZXQgPSB0aGlzLmNyZWVwLnBvcy5maW5kQ2xvc2VzdEJ5UGF0aChzaXRlcykuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzaXRlID0gR2FtZS5nZXRPYmplY3RCeUlkKHRoaXMubWVtb3J5LnRhcmdldCk7XHJcbiAgICAgICAgaWYgKCFzaXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVtb3J5LnRhcmdldCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2l0ZTtcclxuICAgIH07XHJcbiAgICBDQnVpbGRlci5wcm90b3R5cGUuY29sbGVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXRFbmVyZ3lUYXJnZXQoKTtcclxuICAgICAgICB2YXIgdHJhbnNmZXIgPSB0aGlzLmNyZWVwLndpdGhkcmF3KHRhcmdldCwgUkVTT1VSQ0VfRU5FUkdZKTtcclxuICAgICAgICBpZiAodHJhbnNmZXIgPT09IEVSUl9OT1RfSU5fUkFOR0UpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlZXAubW92ZVRvKHRhcmdldC5wb3MsIHsgdmlzdWFsaXplUGF0aFN0eWxlOiB7fSB9KTtcclxuICAgICAgICBpZiAodHJhbnNmZXIgPT09IEVSUl9OT1RfRU5PVUdIX1JFU09VUkNFUylcclxuICAgICAgICAgICAgdGhpcy5jcmVlcC5tZW1vcnkudGFyZ2V0ID0gJyc7XHJcbiAgICAgICAgaWYgKHRyYW5zZmVyID09PSBFUlJfRlVMTClcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIENCdWlsZGVyLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXRCdWlsZFRhcmdldCgpO1xyXG4gICAgICAgIHZhciBidWlsZCA9IHRoaXMuY3JlZXAuYnVpbGQodGFyZ2V0KTtcclxuICAgICAgICBpZiAoYnVpbGQgPT09IEVSUl9OT1RfSU5fUkFOR0UpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlZXAubW92ZVRvKHRhcmdldC5wb3MsIHsgdmlzdWFsaXplUGF0aFN0eWxlOiB7fSB9KTtcclxuICAgICAgICBpZiAoYnVpbGQgPT09IEVSUl9OT1RfRU5PVUdIX1JFU09VUkNFUylcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIENCdWlsZGVyLnByb3RvdHlwZS50b2dnbGVTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm1lbW9yeS50YXJnZXQgPSAnJztcclxuICAgICAgICB0aGlzLm1lbW9yeS5zdGF0ZSA9IHRoaXMubWVtb3J5LnN0YXRlID09PSAnYnVpbGRpbmcnID8gJ2NvbGxlY3RpbmcnIDogJ2J1aWxkaW5nJztcclxuICAgIH07XHJcbiAgICBDQnVpbGRlci5wcm90b3R5cGUuYmVmb3JlRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5jcmVlcC50aWNrc1RvTGl2ZSA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWVwLnJvb20ubWVtb3J5LmN1cnJlbnRDcmVlcHNbdGhpcy50eXBlXSAtPSAxO1xyXG4gICAgICAgICAgICBkZWxldGUgTWVtb3J5LmNyZWVwc1t0aGlzLm5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gQ0J1aWxkZXI7XHJcbn0oX2NyZWVwX2Fic3RyYWN0XzEuQWJzdHJhY3RDcmVlcCkpO1xyXG5leHBvcnRzLkNCdWlsZGVyID0gQ0J1aWxkZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ0NvbGxlY3RvciA9IHZvaWQgMDtcclxudmFyIHJvb21fc2VydmljZV8xID0gcmVxdWlyZShcIkByb29tcy9yb29tLnNlcnZpY2VcIik7XHJcbnZhciBjcmVlcF9pbnRlcmZhY2VfMSA9IHJlcXVpcmUoXCIuL2NyZWVwLmludGVyZmFjZVwiKTtcclxudmFyIF9jcmVlcF9hYnN0cmFjdF8xID0gcmVxdWlyZShcIi4vX2NyZWVwLmFic3RyYWN0XCIpO1xyXG52YXIgQ0NvbGxlY3RvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhDQ29sbGVjdG9yLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQ0NvbGxlY3RvcihjcmVlcCwgb3B0cykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNyZWVwLCBvcHRzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnR5cGUgPSBjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuQ29sbGVjdG9yO1xyXG4gICAgICAgIGlmICghX3RoaXMubWVtb3J5LnN0YXRlKVxyXG4gICAgICAgICAgICBfdGhpcy5tZW1vcnkuc3RhdGUgPSAnY29sbGVjdGluZyc7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENDb2xsZWN0b3IucHJvdG90eXBlLCBcImVuZXJneVN0b3JlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlZXAuc3RvcmU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgQ0NvbGxlY3Rvci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1lbW9yeS5zdGF0ZSA9PT0gJ2NvbGxlY3RpbmcnKVxyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmZXIoKTtcclxuICAgICAgICB0aGlzLmJlZm9yZURlc3Ryb3koKTtcclxuICAgIH07XHJcbiAgICBDQ29sbGVjdG9yLnByb3RvdHlwZS5nZXRTdHJ1Y3R1cmVUYXJnZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lbW9yeS50YXJnZXQpIHtcclxuICAgICAgICAgICAgdmFyIGVtcHRpZXN0U3RvcmFnZSA9IHJvb21fc2VydmljZV8xLnJvb21TZXJ2aWNlLmdldFJvb21TdG9yYWdlcyh0aGlzLmNyZWVwLnJvb20pWzBdO1xyXG4gICAgICAgICAgICB0aGlzLm1lbW9yeS50YXJnZXQgPSBlbXB0aWVzdFN0b3JhZ2UuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lLmdldE9iamVjdEJ5SWQodGhpcy5tZW1vcnkudGFyZ2V0KTtcclxuICAgIH07XHJcbiAgICBDQ29sbGVjdG9yLnByb3RvdHlwZS5nZXRFbmVyZ3lUYXJnZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lbW9yeS50YXJnZXQpIHtcclxuICAgICAgICAgICAgdmFyIGRyb3BwZWQgPSByb29tX3NlcnZpY2VfMS5yb29tU2VydmljZS5nZXREcm9wcGVkUmVzb3VyY2VzKHRoaXMuY3JlZXAucm9vbSlbMF07XHJcbiAgICAgICAgICAgIGlmIChkcm9wcGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbW9yeS50YXJnZXQgPSBkcm9wcGVkLmlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHJvb21fc2VydmljZV8xLnJvb21TZXJ2aWNlLmdldENvbnRhaW5lcnModGhpcy5jcmVlcC5yb29tKVswXTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW1vcnkudGFyZ2V0ID0gY29udGFpbmVyLmlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBlbmVyZ3kgPSBHYW1lLmdldE9iamVjdEJ5SWQodGhpcy5tZW1vcnkudGFyZ2V0KTtcclxuICAgICAgICBpZiAoIWVuZXJneSlcclxuICAgICAgICAgICAgdGhpcy5tZW1vcnkudGFyZ2V0ID0gJyc7XHJcbiAgICAgICAgcmV0dXJuIGVuZXJneTtcclxuICAgIH07XHJcbiAgICBDQ29sbGVjdG9yLnByb3RvdHlwZS5jb2xsZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLmdldEVuZXJneVRhcmdldCgpO1xyXG4gICAgICAgIHZhciB0cmFuc2ZlciA9IHRoaXMuYXR0ZW1wdFRvV2l0aGRyYXdFbmVyZ3kodGFyZ2V0KTtcclxuICAgICAgICBpZiAodHJhbnNmZXIgPT09IEVSUl9OT1RfSU5fUkFOR0UpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlZXAubW92ZVRvKHRhcmdldC5wb3MsIHsgdmlzdWFsaXplUGF0aFN0eWxlOiB7fSB9KTtcclxuICAgICAgICBpZiAodHJhbnNmZXIgPT09IEVSUl9GVUxMKVxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgQ0NvbGxlY3Rvci5wcm90b3R5cGUuYXR0ZW1wdFRvV2l0aGRyYXdFbmVyZ3kgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIGlmICh0YXJnZXQudHlwZSA9PT0gU1RSVUNUVVJFX0NPTlRBSU5FUikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVlcC53aXRoZHJhdyh0YXJnZXQsIFJFU09VUkNFX0VORVJHWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWVwLnBpY2t1cCh0YXJnZXQpO1xyXG4gICAgfTtcclxuICAgIENDb2xsZWN0b3IucHJvdG90eXBlLnRyYW5zZmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLmdldFN0cnVjdHVyZVRhcmdldCgpO1xyXG4gICAgICAgIHZhciB0cmFuc2ZlciA9IHRoaXMuY3JlZXAudHJhbnNmZXIodGFyZ2V0LCBSRVNPVVJDRV9FTkVSR1kpO1xyXG4gICAgICAgIGlmICh0cmFuc2ZlciA9PT0gRVJSX05PVF9JTl9SQU5HRSlcclxuICAgICAgICAgICAgdGhpcy5jcmVlcC5tb3ZlVG8odGFyZ2V0LnBvcywgeyB2aXN1YWxpemVQYXRoU3R5bGU6IHt9IH0pO1xyXG4gICAgICAgIGlmICh0cmFuc2ZlciA9PT0gRVJSX0ZVTEwpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlZXAubWVtb3J5LnRhcmdldCA9ICcnO1xyXG4gICAgICAgIGlmICghdGhpcy5jcmVlcC5zdG9yZS5nZXRVc2VkQ2FwYWNpdHkoKSlcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIENDb2xsZWN0b3IucHJvdG90eXBlLnRvZ2dsZVN0YXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubWVtb3J5LnRhcmdldCA9ICcnO1xyXG4gICAgICAgIHRoaXMubWVtb3J5LnN0YXRlID0gKHRoaXMubWVtb3J5LnN0YXRlID09PSAndHJhbnNmZXJyaW5nJyA/ICdjb2xsZWN0aW5nJyA6ICd0cmFuc2ZlcnJpbmcnKTtcclxuICAgIH07XHJcbiAgICBDQ29sbGVjdG9yLnByb3RvdHlwZS5iZWZvcmVEZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNyZWVwLnRpY2tzVG9MaXZlID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlZXAucm9vbS5tZW1vcnkuY3VycmVudENyZWVwc1t0aGlzLnR5cGVdIC09IDE7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBNZW1vcnkuY3JlZXBzW3RoaXMubmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBDQ29sbGVjdG9yO1xyXG59KF9jcmVlcF9hYnN0cmFjdF8xLkFic3RyYWN0Q3JlZXApKTtcclxuZXhwb3J0cy5DQ29sbGVjdG9yID0gQ0NvbGxlY3RvcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5DTWluZXIgPSB2b2lkIDA7XHJcbnZhciBlbmVyZ3lfc291cmNlX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCJAcm9vbXMvZW5lcmd5X3NvdXJjZXMvZW5lcmd5X3NvdXJjZS5zZXJ2aWNlXCIpO1xyXG52YXIgY3JlZXBfaW50ZXJmYWNlXzEgPSByZXF1aXJlKFwiLi9jcmVlcC5pbnRlcmZhY2VcIik7XHJcbnZhciBfY3JlZXBfYWJzdHJhY3RfMSA9IHJlcXVpcmUoXCIuL19jcmVlcC5hYnN0cmFjdFwiKTtcclxudmFyIENNaW5lciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhDTWluZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDTWluZXIoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMudHlwZSA9IGNyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5NaW5lcjtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBDTWluZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc3JjID0gdGhpcy5nZXRNaW5pbmdTcmMoKTtcclxuICAgICAgICB2YXIgaGFydmVzdGluZyA9IHRoaXMuY3JlZXAuaGFydmVzdChzcmMpO1xyXG4gICAgICAgIGlmIChoYXJ2ZXN0aW5nID09PSBFUlJfTk9UX0lOX1JBTkdFKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWVwLm1vdmVUbyhzcmMucG9zLCB7IHZpc3VhbGl6ZVBhdGhTdHlsZToge30gfSk7XHJcbiAgICAgICAgdGhpcy5iZWZvcmVEZXN0cm95KCk7XHJcbiAgICB9O1xyXG4gICAgQ01pbmVyLnByb3RvdHlwZS5nZXRNaW5pbmdTcmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lbW9yeS5taW5pbmdTaXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVtb3J5Lm1pbmluZ1NpdGUgPSBlbmVyZ3lfc291cmNlX3NlcnZpY2VfMS5lbmVyZ3lTb3VyY2VTZXJ2aWNlLmdldE5leHRFbmVyZ3lTb3VyY2VJblJvb20odGhpcy5jcmVlcC5yb29tKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEdhbWUuZ2V0T2JqZWN0QnlJZCh0aGlzLm1lbW9yeS5taW5pbmdTaXRlKTtcclxuICAgIH07XHJcbiAgICBDTWluZXIucHJvdG90eXBlLmJlZm9yZURlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3JlZXAudGlja3NUb0xpdmUgPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVlcC5yb29tLm1lbW9yeS5jdXJyZW50Q3JlZXBzW3RoaXMudHlwZV0gLT0gMTtcclxuICAgICAgICAgICAgdGhpcy5jcmVlcC5yb29tLm1lbW9yeS5zb3VyY2VzW3RoaXMuY3JlZXAubWVtb3J5Lm1pbmluZ1NpdGVdLm1lbW9yeS5taW5lcnMgLT0gMTtcclxuICAgICAgICAgICAgZGVsZXRlIE1lbW9yeS5jcmVlcHNbdGhpcy5uYW1lXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENNaW5lcjtcclxufShfY3JlZXBfYWJzdHJhY3RfMS5BYnN0cmFjdENyZWVwKSk7XHJcbmV4cG9ydHMuQ01pbmVyID0gQ01pbmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNVcGdyYWRlciA9IHZvaWQgMDtcclxudmFyIGNyZWVwX2ludGVyZmFjZV8xID0gcmVxdWlyZShcIi4vY3JlZXAuaW50ZXJmYWNlXCIpO1xyXG52YXIgX2NyZWVwX2Fic3RyYWN0XzEgPSByZXF1aXJlKFwiLi9fY3JlZXAuYWJzdHJhY3RcIik7XHJcbnZhciByb29tX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCJAcm9vbXMvcm9vbS5zZXJ2aWNlXCIpO1xyXG52YXIgQ1VwZ3JhZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKENVcGdyYWRlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENVcGdyYWRlcihjcmVlcCwgb3B0cykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNyZWVwLCBvcHRzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnR5cGUgPSBjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuVXBncmFkZXI7XHJcbiAgICAgICAgaWYgKCFfdGhpcy5tZW1vcnkuc3RhdGUpXHJcbiAgICAgICAgICAgIF90aGlzLm1lbW9yeS5zdGF0ZSA9ICdjb2xsZWN0aW5nJztcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBDVXBncmFkZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5tZW1vcnkuc3RhdGUgPT09ICdjb2xsZWN0aW5nJylcclxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0KCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGUoKTtcclxuICAgICAgICB0aGlzLmJlZm9yZURlc3Ryb3koKTtcclxuICAgIH07XHJcbiAgICBDVXBncmFkZXIucHJvdG90eXBlLmNvbGxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0RW5lcmd5VGFyZ2V0KCk7XHJcbiAgICAgICAgdmFyIHRyYW5zZmVyID0gdGhpcy5jcmVlcC53aXRoZHJhdyh0YXJnZXQsIFJFU09VUkNFX0VORVJHWSk7XHJcbiAgICAgICAgaWYgKHRyYW5zZmVyID09PSBFUlJfTk9UX0lOX1JBTkdFKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWVwLm1vdmVUbyh0YXJnZXQucG9zLCB7IHZpc3VhbGl6ZVBhdGhTdHlsZToge30gfSk7XHJcbiAgICAgICAgaWYgKHRyYW5zZmVyID09PSBFUlJfRlVMTClcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIENVcGdyYWRlci5wcm90b3R5cGUudXBncmFkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXRDb250cm9sbGVyKCk7XHJcbiAgICAgICAgdmFyIHVwZ3JhZGUgPSB0aGlzLmNyZWVwLnVwZ3JhZGVDb250cm9sbGVyKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKHVwZ3JhZGUgPT09IEVSUl9OT1RfSU5fUkFOR0UpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlZXAubW92ZVRvKHRhcmdldC5wb3MsIHsgdmlzdWFsaXplUGF0aFN0eWxlOiB7fSB9KTtcclxuICAgICAgICBpZiAodXBncmFkZSA9PT0gRVJSX05PVF9FTk9VR0hfUkVTT1VSQ0VTKVxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgQ1VwZ3JhZGVyLnByb3RvdHlwZS5nZXRFbmVyZ3lUYXJnZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lbW9yeS50YXJnZXQpIHtcclxuICAgICAgICAgICAgdmFyIHN0b3JhZ2VzID0gcm9vbV9zZXJ2aWNlXzEucm9vbVNlcnZpY2UuZ2V0Um9vbVN0b3JhZ2VzKHRoaXMuY3JlZXAucm9vbSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVtb3J5LnRhcmdldCA9IHN0b3JhZ2VzW3N0b3JhZ2VzLmxlbmd0aCAtIDFdLmlkOyAvLyBmdWxsZXN0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lLmdldE9iamVjdEJ5SWQodGhpcy5tZW1vcnkudGFyZ2V0KTtcclxuICAgIH07XHJcbiAgICBDVXBncmFkZXIucHJvdG90eXBlLmdldENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lbW9yeS50YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW1vcnkudGFyZ2V0ID0gdGhpcy5yb29tLmNvbnRyb2xsZXIuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lLmdldE9iamVjdEJ5SWQodGhpcy5tZW1vcnkudGFyZ2V0KTtcclxuICAgIH07XHJcbiAgICBDVXBncmFkZXIucHJvdG90eXBlLnRvZ2dsZVN0YXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubWVtb3J5LnRhcmdldCA9ICcnO1xyXG4gICAgICAgIHRoaXMubWVtb3J5LnN0YXRlID0gKHRoaXMubWVtb3J5LnN0YXRlID09PSAndXBncmFkaW5nJyA/ICdjb2xsZWN0aW5nJyA6ICd1cGdyYWRpbmcnKTtcclxuICAgIH07XHJcbiAgICBDVXBncmFkZXIucHJvdG90eXBlLmJlZm9yZURlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3JlZXAudGlja3NUb0xpdmUgPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVlcC5yb29tLm1lbW9yeS5jdXJyZW50Q3JlZXBzW3RoaXMudHlwZV0gLT0gMTtcclxuICAgICAgICAgICAgZGVsZXRlIE1lbW9yeS5jcmVlcHNbdGhpcy5uYW1lXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENVcGdyYWRlcjtcclxufShfY3JlZXBfYWJzdHJhY3RfMS5BYnN0cmFjdENyZWVwKSk7XHJcbmV4cG9ydHMuQ1VwZ3JhZGVyID0gQ1VwZ3JhZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vKiBTY3JlZXBzIFYxLjAuMCAqL1xyXG52YXIgcm9vbV8xID0gcmVxdWlyZShcIi4vcm9vbXMvcm9vbVwiKTtcclxudmFyIHJvb21fc2VydmljZV8xID0gcmVxdWlyZShcIi4vcm9vbXMvcm9vbS5zZXJ2aWNlXCIpO1xyXG52YXIgcm9vbXMgPSByb29tX3NlcnZpY2VfMS5yb29tU2VydmljZS5nZXRSb29tcygpO1xyXG5mb3IgKHZhciByb29tTmFtZSBpbiByb29tcykge1xyXG4gICAgdmFyIHJvb20gPSBuZXcgcm9vbV8xLlJvb20ocm9vbXNbcm9vbU5hbWVdKTtcclxuICAgIHJvb20ucnVuKCk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5BYnN0cmFjdFJvb20gPSB2b2lkIDA7XHJcbnZhciBjcmVlcF9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiQGNyZWVwcy9jcmVlcC5zZXJ2aWNlXCIpO1xyXG52YXIgc3Bhd25fc2VydmljZV8xID0gcmVxdWlyZShcIkBzcGF3bnMvc3Bhd24uc2VydmljZVwiKTtcclxudmFyIEFic3RyYWN0Um9vbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFic3RyYWN0Um9vbShyb29tKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vbSA9IHJvb207XHJcbiAgICAgICAgdGhpcy5zcGF3bnMgPSBzcGF3bl9zZXJ2aWNlXzEuc3Bhd25TZXJ2aWNlLmdldFNwYXduc0luUm9vbShyb29tKTtcclxuICAgICAgICB0aGlzLmNyZWVwcyA9IGNyZWVwX3NlcnZpY2VfMS5jcmVlcFNlcnZpY2UuZ2V0TXlDcmVlcHNJblJvb20ocm9vbSk7XHJcbiAgICAgICAgaWYgKCFNZW1vcnkucm9vbXNbcm9vbS5uYW1lXSlcclxuICAgICAgICAgICAgTWVtb3J5LnJvb21zW3Jvb20ubmFtZV0gPSB7fTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYnN0cmFjdFJvb20ucHJvdG90eXBlLCBcIm5hbWVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm9vbS5uYW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYnN0cmFjdFJvb20ucHJvdG90eXBlLCBcImVuZXJneUF2YWlsYWJsZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb29tLmVuZXJneUF2YWlsYWJsZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQWJzdHJhY3RSb29tLnByb3RvdHlwZSwgXCJlbmVyZ3lDYXBhY2l0eUF2YWlsYWJsZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb29tLmVuZXJneUNhcGFjaXR5QXZhaWxhYmxlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBBYnN0cmFjdFJvb207XHJcbn0oKSk7XHJcbmV4cG9ydHMuQWJzdHJhY3RSb29tID0gQWJzdHJhY3RSb29tO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmVuZXJneVNvdXJjZVNlcnZpY2UgPSB2b2lkIDA7XHJcbnZhciBzdHJ1Y3R1cmVfc2VydmljZV8xID0gcmVxdWlyZShcIkByb29tcy9zdHJ1Y3R1cmVzL3N0cnVjdHVyZS5zZXJ2aWNlXCIpO1xyXG52YXIgc3Bhd25fc2VydmljZV8xID0gcmVxdWlyZShcIkBzcGF3bnMvc3Bhd24uc2VydmljZVwiKTtcclxudmFyIEVuZXJneVNvdXJjZVNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBFbmVyZ3lTb3VyY2VTZXJ2aWNlKCkge1xyXG4gICAgfVxyXG4gICAgRW5lcmd5U291cmNlU2VydmljZS5wcm90b3R5cGUuZ2V0Um9vbUVuZXJneVNvdXJjZXMgPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHZhciBzb3VyY2VzID0gcm9vbS5tZW1vcnkuc291cmNlcztcclxuICAgICAgICBpZiAoc291cmNlcylcclxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXM7XHJcbiAgICAgICAgc291cmNlcyA9IHJvb20ubWVtb3J5LnNvdXJjZXMgPSB0aGlzLmZpbmRFbmVyZ3lTb3VyY2VzSW5Sb29tKHJvb20pO1xyXG4gICAgICAgIHJldHVybiBzb3VyY2VzO1xyXG4gICAgfTtcclxuICAgIEVuZXJneVNvdXJjZVNlcnZpY2UucHJvdG90eXBlLmdldE5leHRFbmVyZ3lTb3VyY2VJblJvb20gPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHZhciBzb3VyY2VzID0gdGhpcy5nZXRSb29tRW5lcmd5U291cmNlcyhyb29tKTtcclxuICAgICAgICB2YXIgc291cmNlSWQgPSBPYmplY3Qua2V5cyhzb3VyY2VzKVxyXG4gICAgICAgICAgICAuc29ydChmdW5jdGlvbiAoc2EsIHNiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VzW3NhXS5tZW1vcnkubWluZXJzIC0gc291cmNlc1tzYl0ubWVtb3J5Lm1pbmVycztcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZmluZChmdW5jdGlvbiAoc3JjSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXNbc3JjSWRdLm1lbW9yeS5taW5lckNhcGFjaXR5ID4gc291cmNlc1tzcmNJZF0ubWVtb3J5Lm1pbmVycztcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoc291cmNlSWQpXHJcbiAgICAgICAgICAgIHJvb20ubWVtb3J5LnNvdXJjZXNbc291cmNlSWRdLm1lbW9yeS5taW5lcnMgKz0gMTtcclxuICAgICAgICByZXR1cm4gc291cmNlSWQgfHwgJyc7XHJcbiAgICB9O1xyXG4gICAgRW5lcmd5U291cmNlU2VydmljZS5wcm90b3R5cGUuZ2V0UGF0aEZyb21TdG9yZXNUb1NvdXJjZXMgPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHZhciBzcmNQb3MgPSBPYmplY3QudmFsdWVzKHRoaXMuZ2V0Um9vbUVuZXJneVNvdXJjZXMocm9vbSkpLm1hcChmdW5jdGlvbiAocykgeyByZXR1cm4gKHsgcG9zOiBzLnBvcywgcmFuZ2U6IDEgfSk7IH0pO1xyXG4gICAgICAgIHZhciBzcGF3bnMgPSBzcGF3bl9zZXJ2aWNlXzEuc3Bhd25TZXJ2aWNlLmdldFNwYXduc0luUm9vbShyb29tKTtcclxuICAgICAgICB2YXIgcGF0aHMgPSBbXTtcclxuICAgICAgICBPYmplY3QudmFsdWVzKHNwYXducykuZm9yRWFjaChmdW5jdGlvbiAocykge1xyXG4gICAgICAgICAgICBzcmNQb3MuZm9yRWFjaChmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRocy5wdXNoLmFwcGx5KHBhdGhzLCBQYXRoRmluZGVyLnNlYXJjaChzLnBvcywgW3Bvc10sIHsgc3dhbXBDb3N0OiAxIH0pLnBhdGgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcGF0aHM7XHJcbiAgICB9O1xyXG4gICAgRW5lcmd5U291cmNlU2VydmljZS5wcm90b3R5cGUuZmluZEVuZXJneVNvdXJjZXNJblJvb20gPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIHJvb20uZmluZChGSU5EX1NPVVJDRVMpLnJlZHVjZShmdW5jdGlvbiAoc3JjTWFwLCBzcmMpIHtcclxuICAgICAgICAgICAgc3JjLm1lbW9yeSA9IF90aGlzLnNldFNvdXJjZU1lbW9yeUNvbmZpZyhzcmMpO1xyXG4gICAgICAgICAgICBzcmNNYXBbc3JjLmlkXSA9IHNyYztcclxuICAgICAgICAgICAgcmV0dXJuIHNyY01hcDtcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9O1xyXG4gICAgRW5lcmd5U291cmNlU2VydmljZS5wcm90b3R5cGUuc2V0U291cmNlTWVtb3J5Q29uZmlnID0gZnVuY3Rpb24gKHNyYykge1xyXG4gICAgICAgIHZhciBfYSA9IHNyYy5wb3MsIHggPSBfYS54LCB5ID0gX2EueTtcclxuICAgICAgICB2YXIgbWluZXJDYXBhY2l0eSA9IDA7XHJcbiAgICAgICAgc3JjLnJvb20ubG9va0F0QXJlYSh5IC0gMSwgeCAtIDEsIHkgKyAxLCB4ICsgMSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgICAgICAgIGlmIChwb3MudHlwZSA9PT0gJ3RlcnJhaW4nICYmIChwb3MudGVycmFpbiA9PT0gJ3N3YW1wJyB8fCBwb3MudGVycmFpbiA9PT0gJ3BsYWluJykpIHtcclxuICAgICAgICAgICAgICAgIHN0cnVjdHVyZV9zZXJ2aWNlXzEuc3RydWN0dXJlU2VydmljZS5zZXRTdG9yYWdlU2l0ZShzcmMucm9vbSwgc3JjLnJvb20uZ2V0UG9zaXRpb25BdChwb3MueCwgcG9zLnkpKTtcclxuICAgICAgICAgICAgICAgIG1pbmVyQ2FwYWNpdHkgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB7IG1pbmVyQ2FwYWNpdHk6IG1pbmVyQ2FwYWNpdHksIG1pbmVyczogMCB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBFbmVyZ3lTb3VyY2VTZXJ2aWNlO1xyXG59KCkpO1xyXG52YXIgZW5lcmd5U291cmNlU2VydmljZSA9IG5ldyBFbmVyZ3lTb3VyY2VTZXJ2aWNlKCk7XHJcbmV4cG9ydHMuZW5lcmd5U291cmNlU2VydmljZSA9IGVuZXJneVNvdXJjZVNlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMucm9vbVNlcnZpY2UgPSB2b2lkIDA7XHJcbnZhciBlbmVyZ3lfc291cmNlX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2VuZXJneV9zb3VyY2VzL2VuZXJneV9zb3VyY2Uuc2VydmljZVwiKTtcclxudmFyIHN0cnVjdHVyZV9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9zdHJ1Y3R1cmVzL3N0cnVjdHVyZS5zZXJ2aWNlXCIpO1xyXG52YXIgc3Bhd25fc2VydmljZV8xID0gcmVxdWlyZShcIkBzcGF3bnMvc3Bhd24uc2VydmljZVwiKTtcclxudmFyIFJvb21TZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUm9vbVNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBSb29tU2VydmljZS5wcm90b3R5cGUuZ2V0Um9vbXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCFNZW1vcnkucm9vbXMpXHJcbiAgICAgICAgICAgIE1lbW9yeS5yb29tcyA9IHt9O1xyXG4gICAgICAgIHJldHVybiBHYW1lLnJvb21zO1xyXG4gICAgfTtcclxuICAgIFJvb21TZXJ2aWNlLnByb3RvdHlwZS5nZXRDcmVlcENhcGFjaXR5ID0gZnVuY3Rpb24gKHJvb20pIHtcclxuICAgICAgICBpZiAocm9vbS5tZW1vcnkuY3JlZXBDYXBhY2l0eSlcclxuICAgICAgICAgICAgcmV0dXJuIHJvb20ubWVtb3J5LmNyZWVwQ2FwYWNpdHk7XHJcbiAgICAgICAgcm9vbS5tZW1vcnkuY3VycmVudENyZWVwcyA9IHsgbWluZXI6IDAsIGNvbGxlY3RvcjogMCwgYnVpbGRlcjogMCwgdXBncmFkZXI6IDAgfTtcclxuICAgICAgICB2YXIgbWluZXIgPSB0aGlzLmNhbGN1bGF0ZU1pbmVyc05lZWRlZChyb29tKTtcclxuICAgICAgICB2YXIgY29sbGVjdG9yID0gbWluZXI7XHJcbiAgICAgICAgdmFyIGJ1aWxkZXIgPSBtaW5lcjtcclxuICAgICAgICB2YXIgdXBncmFkZXIgPSByb29tLmNvbnRyb2xsZXIubGV2ZWw7XHJcbiAgICAgICAgcm9vbS5tZW1vcnkuY3JlZXBDYXBhY2l0eSA9IHsgbWluZXI6IG1pbmVyLCBjb2xsZWN0b3I6IGNvbGxlY3RvciwgYnVpbGRlcjogYnVpbGRlciwgdXBncmFkZXI6IHVwZ3JhZGVyIH07XHJcbiAgICAgICAgcmV0dXJuIHJvb20ubWVtb3J5LmNyZWVwQ2FwYWNpdHk7XHJcbiAgICB9O1xyXG4gICAgUm9vbVNlcnZpY2UucHJvdG90eXBlLmdldFJvb21TdG9yYWdlcyA9IGZ1bmN0aW9uIChyb29tKSB7XHJcbiAgICAgICAgcmV0dXJuIHJvb20uZmluZChGSU5EX01ZX1NUUlVDVFVSRVMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMuc3RvcmU7IH0pXHJcbiAgICAgICAgICAgIC5zb3J0KGZ1bmN0aW9uIChzYSwgc2IpIHsgcmV0dXJuIHNiLnN0b3JlLmdldEZyZWVDYXBhY2l0eSgpIC0gc2Euc3RvcmUuZ2V0RnJlZUNhcGFjaXR5KCk7IH0pO1xyXG4gICAgfTtcclxuICAgIFJvb21TZXJ2aWNlLnByb3RvdHlwZS5nZXREcm9wcGVkUmVzb3VyY2VzID0gZnVuY3Rpb24gKHJvb20pIHtcclxuICAgICAgICByZXR1cm4gcm9vbS5maW5kKEZJTkRfRFJPUFBFRF9SRVNPVVJDRVMpXHJcbiAgICAgICAgICAgIC5zb3J0KGZ1bmN0aW9uIChzYSwgc2IpIHsgcmV0dXJuIHNiLmFtb3VudCAtIHNhLmFtb3VudDsgfSk7XHJcbiAgICB9O1xyXG4gICAgUm9vbVNlcnZpY2UucHJvdG90eXBlLmdldENvbnRhaW5lcnMgPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHJldHVybiByb29tLmZpbmQoRklORF9NWV9TVFJVQ1RVUkVTKS5maWx0ZXIoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudHlwZSA9PT0gU1RSVUNUVVJFX0NPTlRBSU5FUjsgfSlcclxuICAgICAgICAgICAgLnNvcnQoZnVuY3Rpb24gKHNhLCBzYikgeyByZXR1cm4gc2Iuc3RvcmUuZ2V0VXNlZENhcGFjaXR5KCkgLSBzYS5zdG9yZS5nZXRVc2VkQ2FwYWNpdHkoKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgUm9vbVNlcnZpY2UucHJvdG90eXBlLmdldENvbnN0cnVjdGlvblNpdGVzID0gZnVuY3Rpb24gKHJvb20pIHtcclxuICAgICAgICB2YXIgc2l0ZXMgPSByb29tLmZpbmQoRklORF9DT05TVFJVQ1RJT05fU0lURVMpO1xyXG4gICAgICAgIGlmICghc2l0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXRocyA9IGVuZXJneV9zb3VyY2Vfc2VydmljZV8xLmVuZXJneVNvdXJjZVNlcnZpY2UuZ2V0UGF0aEZyb21TdG9yZXNUb1NvdXJjZXMocm9vbSk7XHJcbiAgICAgICAgICAgIGlmICghcGF0aHMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgcGF0aHMgPSB0aGlzLmdldFBhdGhGcm9tU3RvcmVzVG9Db250cm9sbGVyKHJvb20pO1xyXG4gICAgICAgICAgICBzdHJ1Y3R1cmVfc2VydmljZV8xLnN0cnVjdHVyZVNlcnZpY2Uuc2V0Um9hZFNpdGVzKHJvb20sIHBhdGhzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNpdGVzO1xyXG4gICAgfTtcclxuICAgIFJvb21TZXJ2aWNlLnByb3RvdHlwZS5zZXRDb25zdHJ1Y3Rpb25TaXRlID0gZnVuY3Rpb24gKHJvb20sIHBvcywgdHlwZSkge1xyXG4gICAgICAgIHJldHVybiByb29tLmNyZWF0ZUNvbnN0cnVjdGlvblNpdGUocG9zLCB0eXBlKTtcclxuICAgIH07XHJcbiAgICBSb29tU2VydmljZS5wcm90b3R5cGUuY2FsY3VsYXRlTWluZXJzTmVlZGVkID0gZnVuY3Rpb24gKHJvb20pIHtcclxuICAgICAgICB2YXIgZW5TcmNzID0gZW5lcmd5X3NvdXJjZV9zZXJ2aWNlXzEuZW5lcmd5U291cmNlU2VydmljZS5nZXRSb29tRW5lcmd5U291cmNlcyhyb29tKTtcclxuICAgICAgICAvLyBtYXhpbXVtIGVuZXJneSBwZXIgdGljayBleHRyYWN0YWJsZSB0byBub3Qgb3ZlcnNhdHVyYXRlIHRoZSBzb3VyY2VcclxuICAgICAgICB2YXIgd29ya0NhcGFjaXR5UGVyVGljayA9IE9iamVjdC52YWx1ZXMoZW5TcmNzKS5yZWR1Y2UoZnVuY3Rpb24gKHQsIGUpIHsgcmV0dXJuIHQgKz0gZS5lbmVyZ3lDYXBhY2l0eTsgfSwgMCkgLyAoMzAwKTtcclxuICAgICAgICAvLyByb29tIGNhcGFjaXR5IC0gcmVxdWlyZWQgYXQgbGVhc3QgMSBtb3ZlXHJcbiAgICAgICAgdmFyIHVuaXRXb3JrQ2FwYWNpdHkgPSBNYXRoLmZsb29yKChyb29tLmVuZXJneUNhcGFjaXR5QXZhaWxhYmxlIC0gNTApIC8gMTAwKTtcclxuICAgICAgICB2YXIgbWF4V29ya2luZ01pbmVycyA9IHdvcmtDYXBhY2l0eVBlclRpY2sgLyB1bml0V29ya0NhcGFjaXR5O1xyXG4gICAgICAgIHZhciBhY3R1YWxXb3JraW5nU3BhY2VzID0gT2JqZWN0LnZhbHVlcyhlblNyY3MpLnJlZHVjZShmdW5jdGlvbiAodCwgZSkgeyByZXR1cm4gdCArPSBlLm1lbW9yeS5taW5lckNhcGFjaXR5OyB9LCAwKTtcclxuICAgICAgICByZXR1cm4gbWF4V29ya2luZ01pbmVycyA+IGFjdHVhbFdvcmtpbmdTcGFjZXMgPyBhY3R1YWxXb3JraW5nU3BhY2VzIDogbWF4V29ya2luZ01pbmVycztcclxuICAgIH07XHJcbiAgICBSb29tU2VydmljZS5wcm90b3R5cGUuZ2V0UGF0aEZyb21TdG9yZXNUb0NvbnRyb2xsZXIgPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHZhciBjdHJsUG9zID0geyBwb3M6IHJvb20uY29udHJvbGxlci5wb3MsIHJhbmdlOiAxIH07XHJcbiAgICAgICAgdmFyIHNwYXducyA9IHNwYXduX3NlcnZpY2VfMS5zcGF3blNlcnZpY2UuZ2V0U3Bhd25zSW5Sb29tKHJvb20pO1xyXG4gICAgICAgIHZhciBwYXRocyA9IFtdO1xyXG4gICAgICAgIE9iamVjdC52YWx1ZXMoc3Bhd25zKS5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgIHBhdGhzLnB1c2guYXBwbHkocGF0aHMsIFBhdGhGaW5kZXIuc2VhcmNoKHMucG9zLCBbY3RybFBvc10sIHsgc3dhbXBDb3N0OiAxIH0pLnBhdGgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwYXRocztcclxuICAgIH07XHJcbiAgICByZXR1cm4gUm9vbVNlcnZpY2U7XHJcbn0oKSk7XHJcbnZhciByb29tU2VydmljZSA9IG5ldyBSb29tU2VydmljZSgpO1xyXG5leHBvcnRzLnJvb21TZXJ2aWNlID0gcm9vbVNlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUm9vbSA9IHZvaWQgMDtcclxudmFyIF9yb29tX2Fic3RyYWN0XzEgPSByZXF1aXJlKFwiLi9fcm9vbS5hYnN0cmFjdFwiKTtcclxudmFyIFJvb20gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUm9vbSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFJvb20oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgUm9vbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIHNwYXduTmFtZSBpbiB0aGlzLnNwYXducykge1xyXG4gICAgICAgICAgICB0aGlzLnJ1blNwYXduKHNwYXduTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGNyZWVwTmFtZSBpbiB0aGlzLmNyZWVwcykge1xyXG4gICAgICAgICAgICB0aGlzLnJ1bkNyZWVwKGNyZWVwTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFJvb20ucHJvdG90eXBlLnJ1blNwYXduID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLnNwYXduc1tuYW1lXS5ydW4oKTtcclxuICAgIH07XHJcbiAgICBSb29tLnByb3RvdHlwZS5ydW5DcmVlcCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5jcmVlcHNbbmFtZV0ucnVuKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJvb207XHJcbn0oX3Jvb21fYWJzdHJhY3RfMS5BYnN0cmFjdFJvb20pKTtcclxuZXhwb3J0cy5Sb29tID0gUm9vbTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zdHJ1Y3R1cmVTZXJ2aWNlID0gdm9pZCAwO1xyXG52YXIgcm9vbV9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiQHJvb21zL3Jvb20uc2VydmljZVwiKTtcclxudmFyIFN0cnVjdHVyZVNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTdHJ1Y3R1cmVTZXJ2aWNlKCkge1xyXG4gICAgfVxyXG4gICAgU3RydWN0dXJlU2VydmljZS5wcm90b3R5cGUuc2V0Um9hZFNpdGVzID0gZnVuY3Rpb24gKHJvb20sIHBhdGhzLCBsaW1pdCkge1xyXG4gICAgICAgIGlmIChsaW1pdCA9PT0gdm9pZCAwKSB7IGxpbWl0ID0gMTA7IH1cclxuICAgICAgICB2YXIgbm9Sb2FkcyA9IHBhdGhzLmZpbHRlcihmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJ1Y3R1cmVzID0gcG9zLmxvb2tGb3IoTE9PS19TVFJVQ1RVUkVTKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cnVjdHVyZXMuZmluZChmdW5jdGlvbiAocykgeyByZXR1cm4gcy50eXBlID09PSBTVFJVQ1RVUkVfUk9BRDsgfSkgPT0gbnVsbDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBub1JvYWRzLmxlbmd0aCA9IGxpbWl0O1xyXG4gICAgICAgIG5vUm9hZHMubWFwKGZ1bmN0aW9uIChwKSB7IHJldHVybiByb29tX3NlcnZpY2VfMS5yb29tU2VydmljZS5zZXRDb25zdHJ1Y3Rpb25TaXRlKHJvb20sIHAsIFNUUlVDVFVSRV9ST0FEKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgU3RydWN0dXJlU2VydmljZS5wcm90b3R5cGUuc2V0U3RvcmFnZVNpdGUgPSBmdW5jdGlvbiAocm9vbSwgcG9zKSB7XHJcbiAgICAgICAgcm9vbS5jcmVhdGVDb25zdHJ1Y3Rpb25TaXRlKHBvcywgU1RSVUNUVVJFX0NPTlRBSU5FUik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFN0cnVjdHVyZVNlcnZpY2U7XHJcbn0oKSk7XHJcbnZhciBzdHJ1Y3R1cmVTZXJ2aWNlID0gbmV3IFN0cnVjdHVyZVNlcnZpY2UoKTtcclxuZXhwb3J0cy5zdHJ1Y3R1cmVTZXJ2aWNlID0gc3RydWN0dXJlU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5BYnN0cmFjdFNwYXduID0gdm9pZCAwO1xyXG52YXIgQWJzdHJhY3RTcGF3biA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFic3RyYWN0U3Bhd24oc3Bhd24pIHtcclxuICAgICAgICB0aGlzLnNwYXduID0gc3Bhd247XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQWJzdHJhY3RTcGF3bi5wcm90b3R5cGUsIFwibmFtZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNwYXduLm5hbWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFic3RyYWN0U3Bhd24ucHJvdG90eXBlLCBcInJvb21cIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcGF3bi5yb29tO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYnN0cmFjdFNwYXduLnByb3RvdHlwZSwgXCJpZFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNwYXduLmlkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYnN0cmFjdFNwYXduLnByb3RvdHlwZSwgXCJwb3NcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcGF3bi5wb3M7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIEFic3RyYWN0U3Bhd247XHJcbn0oKSk7XHJcbmV4cG9ydHMuQWJzdHJhY3RTcGF3biA9IEFic3RyYWN0U3Bhd247XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuc3Bhd25TZXJ2aWNlID0gdm9pZCAwO1xyXG52YXIgY3JlZXBfaW50ZXJmYWNlXzEgPSByZXF1aXJlKFwiQGNyZWVwcy9jcmVlcC5pbnRlcmZhY2VcIik7XHJcbnZhciByb29tX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCJAcm9vbXMvcm9vbS5zZXJ2aWNlXCIpO1xyXG52YXIgc3Bhd25fMSA9IHJlcXVpcmUoXCIuL3NwYXduXCIpO1xyXG52YXIgU3Bhd25TZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3Bhd25TZXJ2aWNlKCkge1xyXG4gICAgfVxyXG4gICAgU3Bhd25TZXJ2aWNlLnByb3RvdHlwZS5nZXRTcGF3bnNJblJvb20gPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHJldHVybiByb29tLmZpbmQoRklORF9NWV9TUEFXTlMpLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBzcGF3bikge1xyXG4gICAgICAgICAgICByZXN1bHRbc3Bhd24ubmFtZV0gPSBuZXcgc3Bhd25fMS5TcGF3bihzcGF3bik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfTtcclxuICAgIFNwYXduU2VydmljZS5wcm90b3R5cGUubmV4dFJlcXVpcmVkQ3JlZXAgPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHZhciBfYSA9IHJvb21fc2VydmljZV8xLnJvb21TZXJ2aWNlLmdldENyZWVwQ2FwYWNpdHkocm9vbSksIG1pbmVyID0gX2EubWluZXIsIGNvbGxlY3RvciA9IF9hLmNvbGxlY3RvciwgYnVpbGRlciA9IF9hLmJ1aWxkZXIsIHVwZ3JhZGVyID0gX2EudXBncmFkZXI7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRDcmVlcHMgPSByb29tLm1lbW9yeS5jdXJyZW50Q3JlZXBzO1xyXG4gICAgICAgIGlmIChjdXJyZW50Q3JlZXBzLm1pbmVyID4gY3VycmVudENyZWVwcy5jb2xsZWN0b3IgJiYgY3VycmVudENyZWVwcy5jb2xsZWN0b3IgPCBjb2xsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5Db2xsZWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRDcmVlcHMubWluZXIgPCBtaW5lcikge1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlZXBfaW50ZXJmYWNlXzEuQ3JlZXBUeXBlLk1pbmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50Q3JlZXBzLmJ1aWxkZXIgPCBidWlsZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuQnVpbGRlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudENyZWVwcy51cGdyYWRlciA8IHVwZ3JhZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuVXBncmFkZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBTcGF3blNlcnZpY2U7XHJcbn0oKSk7XHJcbnZhciBzcGF3blNlcnZpY2UgPSBuZXcgU3Bhd25TZXJ2aWNlKCk7XHJcbmV4cG9ydHMuc3Bhd25TZXJ2aWNlID0gc3Bhd25TZXJ2aWNlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxudmFyIF9hO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuU3Bhd24gPSB2b2lkIDA7XHJcbnZhciBuYW1lX2NyZWF0b3Jfc2VydmljZV8xID0gcmVxdWlyZShcIkBjb21tb24vbmFtZV9jcmVhdG9yLnNlcnZpY2VcIik7XHJcbnZhciBjcmVlcF9pbnRlcmZhY2VfMSA9IHJlcXVpcmUoXCJAY3JlZXBzL2NyZWVwLmludGVyZmFjZVwiKTtcclxudmFyIHNwYXduX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL3NwYXduLnNlcnZpY2VcIik7XHJcbnZhciBfc3Bhd25fYWJzdHJhY3RfMSA9IHJlcXVpcmUoXCIuL19zcGF3bi5hYnN0cmFjdFwiKTtcclxudmFyIENSRUVQX1BBUlRTX0JZX1RZUEUgPSAoX2EgPSB7fSxcclxuICAgIF9hW2NyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5NaW5lcl0gPSBbV09SSywgV09SSywgTU9WRV0sXHJcbiAgICBfYVtjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuQ29sbGVjdG9yXSA9IFtDQVJSWSwgQ0FSUlksIENBUlJZLCBNT1ZFLCBNT1ZFLCBNT1ZFXSxcclxuICAgIF9hW2NyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5CdWlsZGVyXSA9IFtXT1JLLCBNT1ZFLCBNT1ZFLCBDQVJSWSwgQ0FSUlldLFxyXG4gICAgX2FbY3JlZXBfaW50ZXJmYWNlXzEuQ3JlZXBUeXBlLlVwZ3JhZGVyXSA9IFtNT1ZFLCBNT1ZFLCBDQVJSWSwgQ0FSUlksIFdPUktdLFxyXG4gICAgX2EpO1xyXG52YXIgU3Bhd24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoU3Bhd24sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTcGF3bigpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBTcGF3bi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJvb20uZW5lcmd5QXZhaWxhYmxlID49IDMwMCkge1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHNwYXduX3NlcnZpY2VfMS5zcGF3blNlcnZpY2UubmV4dFJlcXVpcmVkQ3JlZXAodGhpcy5yb29tKTtcclxuICAgICAgICAgICAgaWYgKHR5cGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwYXduQ3JlZXAodHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFNwYXduLnByb3RvdHlwZS5zcGF3bkNyZWVwID0gZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICB2YXIgX25hbWUgPSB0eXBlICsgXCJfXCIgKyBuYW1lX2NyZWF0b3Jfc2VydmljZV8xLm5hbWVTZXJ2aWNlLmNyZWF0ZU5hbWUoKTtcclxuICAgICAgICB0aGlzLnNwYXduLnNwYXduQ3JlZXAoQ1JFRVBfUEFSVFNfQllfVFlQRVt0eXBlXSwgX25hbWUpO1xyXG4gICAgICAgIHRoaXMucm9vbS5tZW1vcnkuY3VycmVudENyZWVwc1t0eXBlXSArPSAxO1xyXG4gICAgICAgIE1lbW9yeS5jcmVlcHNbX25hbWVdID0geyB0eXBlOiB0eXBlIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFNwYXduO1xyXG59KF9zcGF3bl9hYnN0cmFjdF8xLkFic3RyYWN0U3Bhd24pKTtcclxuZXhwb3J0cy5TcGF3biA9IFNwYXduO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=