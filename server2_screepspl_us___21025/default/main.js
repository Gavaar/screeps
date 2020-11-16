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
var nameHash = ['fran', 'juan', 'nestor', 'angel', 'roman', 'marquito', 'melchor', 'bata', 'ines', 'josu', 'portu', 'christian'];
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

/***/ "./src/creeps/creep.interface.ts":
/*!***************************************!*\
  !*** ./src/creeps/creep.interface.ts ***!
  \***************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__ */
/***/ (function(__unused_webpack_module, exports) {


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
exports.CleanOnDeath = exports.CreepType = void 0;
var CreepType;
(function (CreepType) {
    CreepType["Miner"] = "miner";
    CreepType["Collector"] = "collector";
    CreepType["Builder"] = "builder";
    CreepType["Upgrader"] = "upgrader";
})(CreepType || (CreepType = {}));
exports.CreepType = CreepType;
/* Decorator to clean Data on Death */
function CleanOnDeath(onDeathFn) {
    if (onDeathFn === void 0) { onDeathFn = function (creep) { return null; }; }
    return function (ctor) {
        var newCreep = /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                _this.run = function () {
                    _super.prototype.run.call(_this);
                    if (_this.creep.ticksToLive === 1) {
                        // tslint:disable-next-line: no-console
                        console.log(_this.name + " passed away");
                        _this.creep.room.memory.currentCreeps[_this.type] -= 1;
                        delete Memory.creeps[_this.name];
                        onDeathFn(_this.creep);
                    }
                };
                return _this;
            }
            return class_1;
        }(ctor));
        return newCreep;
    };
}
exports.CleanOnDeath = CleanOnDeath;


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
var creep_miner_1 = __webpack_require__(/*! ./models/creep_miner */ "./src/creeps/models/creep_miner.ts");
var creep_interface_1 = __webpack_require__(/*! ./creep.interface */ "./src/creeps/creep.interface.ts");
var creep_collector_1 = __webpack_require__(/*! ./models/creep_collector */ "./src/creeps/models/creep_collector.ts");
var creep_builder_1 = __webpack_require__(/*! ./models/creep_builder */ "./src/creeps/models/creep_builder.ts");
var creep_upgrader_1 = __webpack_require__(/*! ./models/creep_upgrader */ "./src/creeps/models/creep_upgrader.ts");
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

/***/ "./src/creeps/models/_creep.abstract.ts":
/*!**********************************************!*\
  !*** ./src/creeps/models/_creep.abstract.ts ***!
  \**********************************************/
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

/***/ "./src/creeps/models/creep_builder.ts":
/*!********************************************!*\
  !*** ./src/creeps/models/creep_builder.ts ***!
  \********************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CBuilder = void 0;
var room_service_1 = __webpack_require__(/*! @rooms/room.service */ "./src/rooms/room.service.ts");
var creep_interface_1 = __webpack_require__(/*! ../creep.interface */ "./src/creeps/creep.interface.ts");
var _creep_abstract_1 = __webpack_require__(/*! ./_creep.abstract */ "./src/creeps/models/_creep.abstract.ts");
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
    CBuilder = __decorate([
        creep_interface_1.CleanOnDeath()
    ], CBuilder);
    return CBuilder;
}(_creep_abstract_1.AbstractCreep));
exports.CBuilder = CBuilder;


/***/ }),

/***/ "./src/creeps/models/creep_collector.ts":
/*!**********************************************!*\
  !*** ./src/creeps/models/creep_collector.ts ***!
  \**********************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CCollector = void 0;
var room_service_1 = __webpack_require__(/*! @rooms/room.service */ "./src/rooms/room.service.ts");
var creep_interface_1 = __webpack_require__(/*! ../creep.interface */ "./src/creeps/creep.interface.ts");
var _creep_abstract_1 = __webpack_require__(/*! ./_creep.abstract */ "./src/creeps/models/_creep.abstract.ts");
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
    CCollector = __decorate([
        creep_interface_1.CleanOnDeath()
    ], CCollector);
    return CCollector;
}(_creep_abstract_1.AbstractCreep));
exports.CCollector = CCollector;


/***/ }),

/***/ "./src/creeps/models/creep_miner.ts":
/*!******************************************!*\
  !*** ./src/creeps/models/creep_miner.ts ***!
  \******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/*! CommonJS bailout: this is used directly at 15:18-22 */
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CMiner = void 0;
var energy_source_service_1 = __webpack_require__(/*! @rooms/energy_sources/energy_source.service */ "./src/rooms/energy_sources/energy_source.service.ts");
var creep_interface_1 = __webpack_require__(/*! ../creep.interface */ "./src/creeps/creep.interface.ts");
var _creep_abstract_1 = __webpack_require__(/*! ./_creep.abstract */ "./src/creeps/models/_creep.abstract.ts");
var onDeath = function (creep) {
    creep.room.memory.sources[creep.memory.miningSite].memory.miners -= 1;
};
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
            delete Memory.creeps[this.name];
        }
    };
    CMiner = __decorate([
        creep_interface_1.CleanOnDeath(onDeath)
    ], CMiner);
    return CMiner;
}(_creep_abstract_1.AbstractCreep));
exports.CMiner = CMiner;


/***/ }),

/***/ "./src/creeps/models/creep_upgrader.ts":
/*!*********************************************!*\
  !*** ./src/creeps/models/creep_upgrader.ts ***!
  \*********************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CUpgrader = void 0;
var creep_interface_1 = __webpack_require__(/*! ../creep.interface */ "./src/creeps/creep.interface.ts");
var _creep_abstract_1 = __webpack_require__(/*! ./_creep.abstract */ "./src/creeps/models/_creep.abstract.ts");
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
    CUpgrader = __decorate([
        creep_interface_1.CleanOnDeath()
    ], CUpgrader);
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
        var storagePos = [];
        src.room.lookAtArea(y - 1, x - 1, y + 1, x + 1, true).forEach(function (pos) {
            if (pos.type === 'terrain' && (pos.terrain === 'swamp' || pos.terrain === 'plain')) {
                storagePos.push(src.room.getPositionAt(pos.x, pos.y));
                minerCapacity += 1;
            }
        });
        var optimalMinerCapacity = this.getOptimalWorkPerCreep(src, minerCapacity);
        storagePos.length = Math.ceil(optimalMinerCapacity);
        storagePos.forEach(function (pos) { return structure_service_1.structureService.setStorageSite(src.room, pos); });
        return { minerCapacity: minerCapacity, optimalMinerCapacity: optimalMinerCapacity, miners: 0 };
    };
    EnergySourceService.prototype.getOptimalWorkPerCreep = function (src, capacity) {
        var restoreCooldown = 300;
        var harvestPerWork = 2;
        var energyPerTick = src.energyCapacity / restoreCooldown; // 10
        var worksPerTick = energyPerTick / harvestPerWork; // 5
        var minerWorkCapacity = Math.floor((src.room.energyCapacityAvailable - 50) / 100);
        var bestMinerAmount = worksPerTick / minerWorkCapacity; // 2
        return capacity < bestMinerAmount ? capacity : bestMinerAmount;
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
        return Object.values(enSrcs).reduce(function (t, s) { return t += s.memory.optimalMinerCapacity; }, 0);
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
            return (structures.find(function (s) { return s.structureType === STRUCTURE_ROAD; }) == null);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY3JlZXBzLy4vc3JjL19jb21tb24vbmFtZV9jcmVhdG9yLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy8uL3NyYy9jcmVlcHMvY3JlZXAuaW50ZXJmYWNlLnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvY3JlZXBzL2NyZWVwLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy8uL3NyYy9jcmVlcHMvbW9kZWxzL19jcmVlcC5hYnN0cmFjdC50cyIsIndlYnBhY2s6Ly9zY3JlZXBzLy4vc3JjL2NyZWVwcy9tb2RlbHMvY3JlZXBfYnVpbGRlci50cyIsIndlYnBhY2s6Ly9zY3JlZXBzLy4vc3JjL2NyZWVwcy9tb2RlbHMvY3JlZXBfY29sbGVjdG9yLnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvY3JlZXBzL21vZGVscy9jcmVlcF9taW5lci50cyIsIndlYnBhY2s6Ly9zY3JlZXBzLy4vc3JjL2NyZWVwcy9tb2RlbHMvY3JlZXBfdXBncmFkZXIudHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvcm9vbXMvX3Jvb20uYWJzdHJhY3QudHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy8uL3NyYy9yb29tcy9lbmVyZ3lfc291cmNlcy9lbmVyZ3lfc291cmNlLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy8uL3NyYy9yb29tcy9yb29tLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy8uL3NyYy9yb29tcy9yb29tLnRzIiwid2VicGFjazovL3NjcmVlcHMvLi9zcmMvcm9vbXMvc3RydWN0dXJlcy9zdHJ1Y3R1cmUuc2VydmljZS50cyIsIndlYnBhY2s6Ly9zY3JlZXBzLy4vc3JjL3NwYXducy9fc3Bhd24uYWJzdHJhY3QudHMiLCJ3ZWJwYWNrOi8vc2NyZWVwcy8uL3NyYy9zcGF3bnMvc3Bhd24uc2VydmljZS50cyIsIndlYnBhY2s6Ly9zY3JlZXBzLy4vc3JjL3NwYXducy9zcGF3bi50cyIsIndlYnBhY2s6Ly9zY3JlZXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NjcmVlcHMvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7OztBQ2xCTjtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUN2Riw2QkFBNkIsOEVBQThFO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxvQkFBb0IsR0FBRyxpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4QkFBOEI7QUFDL0IsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSwrQkFBK0IsK0JBQStCLGFBQWEsR0FBRztBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHVCQUF1QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRFA7QUFDYjtBQUNBLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEIsb0JBQW9CLG1CQUFPLENBQUMsZ0VBQXNCO0FBQ2xELHdCQUF3QixtQkFBTyxDQUFDLDBEQUFtQjtBQUNuRCx3QkFBd0IsbUJBQU8sQ0FBQyx3RUFBMEI7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O0FBQy9DLHdCQUF3QixtQkFBTyxDQUFDLDBEQUFtQjtBQUNuRCxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsYUFBYTs7Ozs7OztVQy9DYjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLm5hbWVTZXJ2aWNlID0gdm9pZCAwO1xyXG52YXIgbmFtZUhhc2ggPSBbJ2ZyYW4nLCAnanVhbicsICduZXN0b3InLCAnYW5nZWwnLCAncm9tYW4nLCAnbWFycXVpdG8nLCAnbWVsY2hvcicsICdiYXRhJywgJ2luZXMnLCAnam9zdScsICdwb3J0dScsICdjaHJpc3RpYW4nXTtcclxuZnVuY3Rpb24gZ2V0TmFtZSgpIHtcclxuICAgIHJldHVybiBuYW1lSGFzaFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBuYW1lSGFzaC5sZW5ndGgpXTtcclxufVxyXG52YXIgTmFtZUNyZWF0b3JTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTmFtZUNyZWF0b3JTZXJ2aWNlKCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBNZW1vcnkuaWQgfHwgMDtcclxuICAgIH1cclxuICAgIE5hbWVDcmVhdG9yU2VydmljZS5wcm90b3R5cGUuY3JlYXRlTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBNZW1vcnkuaWQgPSB0aGlzLmlkICsgMTtcclxuICAgICAgICByZXR1cm4gZ2V0TmFtZSgpICsgXCJfXCIgKyB0aGlzLmlkO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBOYW1lQ3JlYXRvclNlcnZpY2U7XHJcbn0oKSk7XHJcbnZhciBuYW1lU2VydmljZSA9IG5ldyBOYW1lQ3JlYXRvclNlcnZpY2UoKTtcclxuZXhwb3J0cy5uYW1lU2VydmljZSA9IG5hbWVTZXJ2aWNlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNsZWFuT25EZWF0aCA9IGV4cG9ydHMuQ3JlZXBUeXBlID0gdm9pZCAwO1xyXG52YXIgQ3JlZXBUeXBlO1xyXG4oZnVuY3Rpb24gKENyZWVwVHlwZSkge1xyXG4gICAgQ3JlZXBUeXBlW1wiTWluZXJcIl0gPSBcIm1pbmVyXCI7XHJcbiAgICBDcmVlcFR5cGVbXCJDb2xsZWN0b3JcIl0gPSBcImNvbGxlY3RvclwiO1xyXG4gICAgQ3JlZXBUeXBlW1wiQnVpbGRlclwiXSA9IFwiYnVpbGRlclwiO1xyXG4gICAgQ3JlZXBUeXBlW1wiVXBncmFkZXJcIl0gPSBcInVwZ3JhZGVyXCI7XHJcbn0pKENyZWVwVHlwZSB8fCAoQ3JlZXBUeXBlID0ge30pKTtcclxuZXhwb3J0cy5DcmVlcFR5cGUgPSBDcmVlcFR5cGU7XHJcbi8qIERlY29yYXRvciB0byBjbGVhbiBEYXRhIG9uIERlYXRoICovXHJcbmZ1bmN0aW9uIENsZWFuT25EZWF0aChvbkRlYXRoRm4pIHtcclxuICAgIGlmIChvbkRlYXRoRm4gPT09IHZvaWQgMCkgeyBvbkRlYXRoRm4gPSBmdW5jdGlvbiAoY3JlZXApIHsgcmV0dXJuIG51bGw7IH07IH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY3Rvcikge1xyXG4gICAgICAgIHZhciBuZXdDcmVlcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICAgICAgX19leHRlbmRzKGNsYXNzXzEsIF9zdXBlcik7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsYXNzXzEoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuYXBwbHkodGhpcywgYXJncykgfHwgdGhpcztcclxuICAgICAgICAgICAgICAgIF90aGlzLnJ1biA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnJ1bi5jYWxsKF90aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY3JlZXAudGlja3NUb0xpdmUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1jb25zb2xlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLm5hbWUgKyBcIiBwYXNzZWQgYXdheVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY3JlZXAucm9vbS5tZW1vcnkuY3VycmVudENyZWVwc1tfdGhpcy50eXBlXSAtPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgTWVtb3J5LmNyZWVwc1tfdGhpcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25EZWF0aEZuKF90aGlzLmNyZWVwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzc18xO1xyXG4gICAgICAgIH0oY3RvcikpO1xyXG4gICAgICAgIHJldHVybiBuZXdDcmVlcDtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5DbGVhbk9uRGVhdGggPSBDbGVhbk9uRGVhdGg7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX2E7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5jcmVlcFNlcnZpY2UgPSB2b2lkIDA7XHJcbnZhciBjcmVlcF9taW5lcl8xID0gcmVxdWlyZShcIi4vbW9kZWxzL2NyZWVwX21pbmVyXCIpO1xyXG52YXIgY3JlZXBfaW50ZXJmYWNlXzEgPSByZXF1aXJlKFwiLi9jcmVlcC5pbnRlcmZhY2VcIik7XHJcbnZhciBjcmVlcF9jb2xsZWN0b3JfMSA9IHJlcXVpcmUoXCIuL21vZGVscy9jcmVlcF9jb2xsZWN0b3JcIik7XHJcbnZhciBjcmVlcF9idWlsZGVyXzEgPSByZXF1aXJlKFwiLi9tb2RlbHMvY3JlZXBfYnVpbGRlclwiKTtcclxudmFyIGNyZWVwX3VwZ3JhZGVyXzEgPSByZXF1aXJlKFwiLi9tb2RlbHMvY3JlZXBfdXBncmFkZXJcIik7XHJcbnZhciB0eXBlQ2xhc3NNYXAgPSAoX2EgPSB7fSxcclxuICAgIF9hW2NyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5NaW5lcl0gPSBjcmVlcF9taW5lcl8xLkNNaW5lcixcclxuICAgIF9hW2NyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5Db2xsZWN0b3JdID0gY3JlZXBfY29sbGVjdG9yXzEuQ0NvbGxlY3RvcixcclxuICAgIF9hW2NyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5CdWlsZGVyXSA9IGNyZWVwX2J1aWxkZXJfMS5DQnVpbGRlcixcclxuICAgIF9hW2NyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5VcGdyYWRlcl0gPSBjcmVlcF91cGdyYWRlcl8xLkNVcGdyYWRlcixcclxuICAgIF9hKTtcclxudmFyIENyZWVwU2VydmljZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENyZWVwU2VydmljZSgpIHtcclxuICAgIH1cclxuICAgIENyZWVwU2VydmljZS5wcm90b3R5cGUuZ2V0TXlDcmVlcHNJblJvb20gPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHJldHVybiByb29tLmZpbmQoRklORF9NWV9DUkVFUFMpLnJlZHVjZShmdW5jdGlvbiAoY3JlZXBNYXAsIGNyZWVwKSB7XHJcbiAgICAgICAgICAgIHZhciBjcmVlcE9wdHMgPSB7IG5hbWU6IGNyZWVwLm5hbWUgfTtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBjcmVlcC5tZW1vcnkudHlwZTtcclxuICAgICAgICAgICAgdmFyIGNyZWVwQ2xhc3MgPSB0eXBlQ2xhc3NNYXBbdHlwZV07XHJcbiAgICAgICAgICAgIGNyZWVwTWFwW2NyZWVwLm5hbWVdID0gbmV3IGNyZWVwQ2xhc3MoY3JlZXAsIGNyZWVwT3B0cyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVlcE1hcDtcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENyZWVwU2VydmljZTtcclxufSgpKTtcclxudmFyIGNyZWVwU2VydmljZSA9IG5ldyBDcmVlcFNlcnZpY2UoKTtcclxuZXhwb3J0cy5jcmVlcFNlcnZpY2UgPSBjcmVlcFNlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQWJzdHJhY3RDcmVlcCA9IHZvaWQgMDtcclxudmFyIEFic3RyYWN0Q3JlZXAgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBYnN0cmFjdENyZWVwKGNyZWVwLCBvcHRzKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gb3B0cy5uYW1lO1xyXG4gICAgICAgIHRoaXMuY3JlZXAgPSBjcmVlcDtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYnN0cmFjdENyZWVwLnByb3RvdHlwZSwgXCJtZW1vcnlcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVlcC5tZW1vcnk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFic3RyYWN0Q3JlZXAucHJvdG90eXBlLCBcInJvb21cIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVlcC5yb29tO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBBYnN0cmFjdENyZWVwO1xyXG59KCkpO1xyXG5leHBvcnRzLkFic3RyYWN0Q3JlZXAgPSBBYnN0cmFjdENyZWVwO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNCdWlsZGVyID0gdm9pZCAwO1xyXG52YXIgcm9vbV9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiQHJvb21zL3Jvb20uc2VydmljZVwiKTtcclxudmFyIGNyZWVwX2ludGVyZmFjZV8xID0gcmVxdWlyZShcIi4uL2NyZWVwLmludGVyZmFjZVwiKTtcclxudmFyIF9jcmVlcF9hYnN0cmFjdF8xID0gcmVxdWlyZShcIi4vX2NyZWVwLmFic3RyYWN0XCIpO1xyXG52YXIgQ0J1aWxkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoQ0J1aWxkZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDQnVpbGRlcihjcmVlcCwgb3B0cykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNyZWVwLCBvcHRzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnR5cGUgPSBjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuQnVpbGRlcjtcclxuICAgICAgICBpZiAoIV90aGlzLm1lbW9yeS5zdGF0ZSlcclxuICAgICAgICAgICAgX3RoaXMubWVtb3J5LnN0YXRlID0gJ2NvbGxlY3RpbmcnO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIENCdWlsZGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWVtb3J5LnN0YXRlID09PSAnY29sbGVjdGluZycpXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5idWlsZCgpO1xyXG4gICAgfTtcclxuICAgIENCdWlsZGVyLnByb3RvdHlwZS5nZXRFbmVyZ3lUYXJnZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lbW9yeS50YXJnZXQpIHtcclxuICAgICAgICAgICAgdmFyIHN0b3JhZ2VzID0gcm9vbV9zZXJ2aWNlXzEucm9vbVNlcnZpY2UuZ2V0Um9vbVN0b3JhZ2VzKHRoaXMuY3JlZXAucm9vbSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVtb3J5LnRhcmdldCA9IHN0b3JhZ2VzW3N0b3JhZ2VzLmxlbmd0aCAtIDFdLmlkOyAvLyBmdWxsZXN0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lLmdldE9iamVjdEJ5SWQodGhpcy5tZW1vcnkudGFyZ2V0KTtcclxuICAgIH07XHJcbiAgICBDQnVpbGRlci5wcm90b3R5cGUuZ2V0QnVpbGRUYXJnZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lbW9yeS50YXJnZXQpIHtcclxuICAgICAgICAgICAgdmFyIHNpdGVzID0gcm9vbV9zZXJ2aWNlXzEucm9vbVNlcnZpY2UuZ2V0Q29uc3RydWN0aW9uU2l0ZXModGhpcy5jcmVlcC5yb29tKTtcclxuICAgICAgICAgICAgdGhpcy5tZW1vcnkudGFyZ2V0ID0gdGhpcy5jcmVlcC5wb3MuZmluZENsb3Nlc3RCeVBhdGgoc2l0ZXMpLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2l0ZSA9IEdhbWUuZ2V0T2JqZWN0QnlJZCh0aGlzLm1lbW9yeS50YXJnZXQpO1xyXG4gICAgICAgIGlmICghc2l0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbW9yeS50YXJnZXQgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNpdGU7XHJcbiAgICB9O1xyXG4gICAgQ0J1aWxkZXIucHJvdG90eXBlLmNvbGxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0RW5lcmd5VGFyZ2V0KCk7XHJcbiAgICAgICAgdmFyIHRyYW5zZmVyID0gdGhpcy5jcmVlcC53aXRoZHJhdyh0YXJnZXQsIFJFU09VUkNFX0VORVJHWSk7XHJcbiAgICAgICAgaWYgKHRyYW5zZmVyID09PSBFUlJfTk9UX0lOX1JBTkdFKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWVwLm1vdmVUbyh0YXJnZXQucG9zLCB7IHZpc3VhbGl6ZVBhdGhTdHlsZToge30gfSk7XHJcbiAgICAgICAgaWYgKHRyYW5zZmVyID09PSBFUlJfTk9UX0VOT1VHSF9SRVNPVVJDRVMpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlZXAubWVtb3J5LnRhcmdldCA9ICcnO1xyXG4gICAgICAgIGlmICh0cmFuc2ZlciA9PT0gRVJSX0ZVTEwpXHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoKTtcclxuICAgIH07XHJcbiAgICBDQnVpbGRlci5wcm90b3R5cGUuYnVpbGQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0QnVpbGRUYXJnZXQoKTtcclxuICAgICAgICB2YXIgYnVpbGQgPSB0aGlzLmNyZWVwLmJ1aWxkKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKGJ1aWxkID09PSBFUlJfTk9UX0lOX1JBTkdFKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWVwLm1vdmVUbyh0YXJnZXQucG9zLCB7IHZpc3VhbGl6ZVBhdGhTdHlsZToge30gfSk7XHJcbiAgICAgICAgaWYgKGJ1aWxkID09PSBFUlJfTk9UX0VOT1VHSF9SRVNPVVJDRVMpXHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoKTtcclxuICAgIH07XHJcbiAgICBDQnVpbGRlci5wcm90b3R5cGUudG9nZ2xlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5tZW1vcnkudGFyZ2V0ID0gJyc7XHJcbiAgICAgICAgdGhpcy5tZW1vcnkuc3RhdGUgPSB0aGlzLm1lbW9yeS5zdGF0ZSA9PT0gJ2J1aWxkaW5nJyA/ICdjb2xsZWN0aW5nJyA6ICdidWlsZGluZyc7XHJcbiAgICB9O1xyXG4gICAgQ0J1aWxkZXIgPSBfX2RlY29yYXRlKFtcclxuICAgICAgICBjcmVlcF9pbnRlcmZhY2VfMS5DbGVhbk9uRGVhdGgoKVxyXG4gICAgXSwgQ0J1aWxkZXIpO1xyXG4gICAgcmV0dXJuIENCdWlsZGVyO1xyXG59KF9jcmVlcF9hYnN0cmFjdF8xLkFic3RyYWN0Q3JlZXApKTtcclxuZXhwb3J0cy5DQnVpbGRlciA9IENCdWlsZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNDb2xsZWN0b3IgPSB2b2lkIDA7XHJcbnZhciByb29tX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCJAcm9vbXMvcm9vbS5zZXJ2aWNlXCIpO1xyXG52YXIgY3JlZXBfaW50ZXJmYWNlXzEgPSByZXF1aXJlKFwiLi4vY3JlZXAuaW50ZXJmYWNlXCIpO1xyXG52YXIgX2NyZWVwX2Fic3RyYWN0XzEgPSByZXF1aXJlKFwiLi9fY3JlZXAuYWJzdHJhY3RcIik7XHJcbnZhciBDQ29sbGVjdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKENDb2xsZWN0b3IsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDQ29sbGVjdG9yKGNyZWVwLCBvcHRzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY3JlZXAsIG9wdHMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMudHlwZSA9IGNyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5Db2xsZWN0b3I7XHJcbiAgICAgICAgaWYgKCFfdGhpcy5tZW1vcnkuc3RhdGUpXHJcbiAgICAgICAgICAgIF90aGlzLm1lbW9yeS5zdGF0ZSA9ICdjb2xsZWN0aW5nJztcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ0NvbGxlY3Rvci5wcm90b3R5cGUsIFwiZW5lcmd5U3RvcmVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVlcC5zdG9yZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBDQ29sbGVjdG9yLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWVtb3J5LnN0YXRlID09PSAnY29sbGVjdGluZycpXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy50cmFuc2ZlcigpO1xyXG4gICAgfTtcclxuICAgIENDb2xsZWN0b3IucHJvdG90eXBlLmdldFN0cnVjdHVyZVRhcmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMubWVtb3J5LnRhcmdldCkge1xyXG4gICAgICAgICAgICB2YXIgZW1wdGllc3RTdG9yYWdlID0gcm9vbV9zZXJ2aWNlXzEucm9vbVNlcnZpY2UuZ2V0Um9vbVN0b3JhZ2VzKHRoaXMuY3JlZXAucm9vbSlbMF07XHJcbiAgICAgICAgICAgIHRoaXMubWVtb3J5LnRhcmdldCA9IGVtcHRpZXN0U3RvcmFnZS5pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEdhbWUuZ2V0T2JqZWN0QnlJZCh0aGlzLm1lbW9yeS50YXJnZXQpO1xyXG4gICAgfTtcclxuICAgIENDb2xsZWN0b3IucHJvdG90eXBlLmdldEVuZXJneVRhcmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMubWVtb3J5LnRhcmdldCkge1xyXG4gICAgICAgICAgICB2YXIgZHJvcHBlZCA9IHJvb21fc2VydmljZV8xLnJvb21TZXJ2aWNlLmdldERyb3BwZWRSZXNvdXJjZXModGhpcy5jcmVlcC5yb29tKVswXTtcclxuICAgICAgICAgICAgaWYgKGRyb3BwZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVtb3J5LnRhcmdldCA9IGRyb3BwZWQuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gcm9vbV9zZXJ2aWNlXzEucm9vbVNlcnZpY2UuZ2V0Q29udGFpbmVycyh0aGlzLmNyZWVwLnJvb20pWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lcilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbW9yeS50YXJnZXQgPSBjb250YWluZXIuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVuZXJneSA9IEdhbWUuZ2V0T2JqZWN0QnlJZCh0aGlzLm1lbW9yeS50YXJnZXQpO1xyXG4gICAgICAgIGlmICghZW5lcmd5KVxyXG4gICAgICAgICAgICB0aGlzLm1lbW9yeS50YXJnZXQgPSAnJztcclxuICAgICAgICByZXR1cm4gZW5lcmd5O1xyXG4gICAgfTtcclxuICAgIENDb2xsZWN0b3IucHJvdG90eXBlLmNvbGxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0RW5lcmd5VGFyZ2V0KCk7XHJcbiAgICAgICAgdmFyIHRyYW5zZmVyID0gdGhpcy5hdHRlbXB0VG9XaXRoZHJhd0VuZXJneSh0YXJnZXQpO1xyXG4gICAgICAgIGlmICh0cmFuc2ZlciA9PT0gRVJSX05PVF9JTl9SQU5HRSlcclxuICAgICAgICAgICAgdGhpcy5jcmVlcC5tb3ZlVG8odGFyZ2V0LnBvcywgeyB2aXN1YWxpemVQYXRoU3R5bGU6IHt9IH0pO1xyXG4gICAgICAgIGlmICh0cmFuc2ZlciA9PT0gRVJSX0ZVTEwpXHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RhdGUoKTtcclxuICAgIH07XHJcbiAgICBDQ29sbGVjdG9yLnByb3RvdHlwZS5hdHRlbXB0VG9XaXRoZHJhd0VuZXJneSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIXRhcmdldClcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYgKHRhcmdldC50eXBlID09PSBTVFJVQ1RVUkVfQ09OVEFJTkVSKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWVwLndpdGhkcmF3KHRhcmdldCwgUkVTT1VSQ0VfRU5FUkdZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlZXAucGlja3VwKHRhcmdldCk7XHJcbiAgICB9O1xyXG4gICAgQ0NvbGxlY3Rvci5wcm90b3R5cGUudHJhbnNmZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0U3RydWN0dXJlVGFyZ2V0KCk7XHJcbiAgICAgICAgdmFyIHRyYW5zZmVyID0gdGhpcy5jcmVlcC50cmFuc2Zlcih0YXJnZXQsIFJFU09VUkNFX0VORVJHWSk7XHJcbiAgICAgICAgaWYgKHRyYW5zZmVyID09PSBFUlJfTk9UX0lOX1JBTkdFKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWVwLm1vdmVUbyh0YXJnZXQucG9zLCB7IHZpc3VhbGl6ZVBhdGhTdHlsZToge30gfSk7XHJcbiAgICAgICAgaWYgKHRyYW5zZmVyID09PSBFUlJfRlVMTClcclxuICAgICAgICAgICAgdGhpcy5jcmVlcC5tZW1vcnkudGFyZ2V0ID0gJyc7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNyZWVwLnN0b3JlLmdldFVzZWRDYXBhY2l0eSgpKVxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgQ0NvbGxlY3Rvci5wcm90b3R5cGUudG9nZ2xlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5tZW1vcnkudGFyZ2V0ID0gJyc7XHJcbiAgICAgICAgdGhpcy5tZW1vcnkuc3RhdGUgPSAodGhpcy5tZW1vcnkuc3RhdGUgPT09ICd0cmFuc2ZlcnJpbmcnID8gJ2NvbGxlY3RpbmcnIDogJ3RyYW5zZmVycmluZycpO1xyXG4gICAgfTtcclxuICAgIENDb2xsZWN0b3IgPSBfX2RlY29yYXRlKFtcclxuICAgICAgICBjcmVlcF9pbnRlcmZhY2VfMS5DbGVhbk9uRGVhdGgoKVxyXG4gICAgXSwgQ0NvbGxlY3Rvcik7XHJcbiAgICByZXR1cm4gQ0NvbGxlY3RvcjtcclxufShfY3JlZXBfYWJzdHJhY3RfMS5BYnN0cmFjdENyZWVwKSk7XHJcbmV4cG9ydHMuQ0NvbGxlY3RvciA9IENDb2xsZWN0b3I7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ01pbmVyID0gdm9pZCAwO1xyXG52YXIgZW5lcmd5X3NvdXJjZV9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiQHJvb21zL2VuZXJneV9zb3VyY2VzL2VuZXJneV9zb3VyY2Uuc2VydmljZVwiKTtcclxudmFyIGNyZWVwX2ludGVyZmFjZV8xID0gcmVxdWlyZShcIi4uL2NyZWVwLmludGVyZmFjZVwiKTtcclxudmFyIF9jcmVlcF9hYnN0cmFjdF8xID0gcmVxdWlyZShcIi4vX2NyZWVwLmFic3RyYWN0XCIpO1xyXG52YXIgb25EZWF0aCA9IGZ1bmN0aW9uIChjcmVlcCkge1xyXG4gICAgY3JlZXAucm9vbS5tZW1vcnkuc291cmNlc1tjcmVlcC5tZW1vcnkubWluaW5nU2l0ZV0ubWVtb3J5Lm1pbmVycyAtPSAxO1xyXG59O1xyXG52YXIgQ01pbmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKENNaW5lciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENNaW5lcigpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy50eXBlID0gY3JlZXBfaW50ZXJmYWNlXzEuQ3JlZXBUeXBlLk1pbmVyO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIENNaW5lci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzcmMgPSB0aGlzLmdldE1pbmluZ1NyYygpO1xyXG4gICAgICAgIHZhciBoYXJ2ZXN0aW5nID0gdGhpcy5jcmVlcC5oYXJ2ZXN0KHNyYyk7XHJcbiAgICAgICAgaWYgKGhhcnZlc3RpbmcgPT09IEVSUl9OT1RfSU5fUkFOR0UpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlZXAubW92ZVRvKHNyYy5wb3MsIHsgdmlzdWFsaXplUGF0aFN0eWxlOiB7fSB9KTtcclxuICAgICAgICB0aGlzLmJlZm9yZURlc3Ryb3koKTtcclxuICAgIH07XHJcbiAgICBDTWluZXIucHJvdG90eXBlLmdldE1pbmluZ1NyYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMubWVtb3J5Lm1pbmluZ1NpdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW1vcnkubWluaW5nU2l0ZSA9IGVuZXJneV9zb3VyY2Vfc2VydmljZV8xLmVuZXJneVNvdXJjZVNlcnZpY2UuZ2V0TmV4dEVuZXJneVNvdXJjZUluUm9vbSh0aGlzLmNyZWVwLnJvb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR2FtZS5nZXRPYmplY3RCeUlkKHRoaXMubWVtb3J5Lm1pbmluZ1NpdGUpO1xyXG4gICAgfTtcclxuICAgIENNaW5lci5wcm90b3R5cGUuYmVmb3JlRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5jcmVlcC50aWNrc1RvTGl2ZSA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWVwLnJvb20ubWVtb3J5LmN1cnJlbnRDcmVlcHNbdGhpcy50eXBlXSAtPSAxO1xyXG4gICAgICAgICAgICBkZWxldGUgTWVtb3J5LmNyZWVwc1t0aGlzLm5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBDTWluZXIgPSBfX2RlY29yYXRlKFtcclxuICAgICAgICBjcmVlcF9pbnRlcmZhY2VfMS5DbGVhbk9uRGVhdGgob25EZWF0aClcclxuICAgIF0sIENNaW5lcik7XHJcbiAgICByZXR1cm4gQ01pbmVyO1xyXG59KF9jcmVlcF9hYnN0cmFjdF8xLkFic3RyYWN0Q3JlZXApKTtcclxuZXhwb3J0cy5DTWluZXIgPSBDTWluZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ1VwZ3JhZGVyID0gdm9pZCAwO1xyXG52YXIgY3JlZXBfaW50ZXJmYWNlXzEgPSByZXF1aXJlKFwiLi4vY3JlZXAuaW50ZXJmYWNlXCIpO1xyXG52YXIgX2NyZWVwX2Fic3RyYWN0XzEgPSByZXF1aXJlKFwiLi9fY3JlZXAuYWJzdHJhY3RcIik7XHJcbnZhciByb29tX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCJAcm9vbXMvcm9vbS5zZXJ2aWNlXCIpO1xyXG52YXIgQ1VwZ3JhZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKENVcGdyYWRlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENVcGdyYWRlcihjcmVlcCwgb3B0cykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNyZWVwLCBvcHRzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnR5cGUgPSBjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuVXBncmFkZXI7XHJcbiAgICAgICAgaWYgKCFfdGhpcy5tZW1vcnkuc3RhdGUpXHJcbiAgICAgICAgICAgIF90aGlzLm1lbW9yeS5zdGF0ZSA9ICdjb2xsZWN0aW5nJztcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBDVXBncmFkZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5tZW1vcnkuc3RhdGUgPT09ICdjb2xsZWN0aW5nJylcclxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0KCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGUoKTtcclxuICAgIH07XHJcbiAgICBDVXBncmFkZXIucHJvdG90eXBlLmNvbGxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0RW5lcmd5VGFyZ2V0KCk7XHJcbiAgICAgICAgdmFyIHRyYW5zZmVyID0gdGhpcy5jcmVlcC53aXRoZHJhdyh0YXJnZXQsIFJFU09VUkNFX0VORVJHWSk7XHJcbiAgICAgICAgaWYgKHRyYW5zZmVyID09PSBFUlJfTk9UX0lOX1JBTkdFKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWVwLm1vdmVUbyh0YXJnZXQucG9zLCB7IHZpc3VhbGl6ZVBhdGhTdHlsZToge30gfSk7XHJcbiAgICAgICAgaWYgKHRyYW5zZmVyID09PSBFUlJfRlVMTClcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIENVcGdyYWRlci5wcm90b3R5cGUudXBncmFkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXRDb250cm9sbGVyKCk7XHJcbiAgICAgICAgdmFyIHVwZ3JhZGUgPSB0aGlzLmNyZWVwLnVwZ3JhZGVDb250cm9sbGVyKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKHVwZ3JhZGUgPT09IEVSUl9OT1RfSU5fUkFOR0UpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlZXAubW92ZVRvKHRhcmdldC5wb3MsIHsgdmlzdWFsaXplUGF0aFN0eWxlOiB7fSB9KTtcclxuICAgICAgICBpZiAodXBncmFkZSA9PT0gRVJSX05PVF9FTk9VR0hfUkVTT1VSQ0VTKVxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgQ1VwZ3JhZGVyLnByb3RvdHlwZS5nZXRFbmVyZ3lUYXJnZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lbW9yeS50YXJnZXQpIHtcclxuICAgICAgICAgICAgdmFyIHN0b3JhZ2VzID0gcm9vbV9zZXJ2aWNlXzEucm9vbVNlcnZpY2UuZ2V0Um9vbVN0b3JhZ2VzKHRoaXMuY3JlZXAucm9vbSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVtb3J5LnRhcmdldCA9IHN0b3JhZ2VzW3N0b3JhZ2VzLmxlbmd0aCAtIDFdLmlkOyAvLyBmdWxsZXN0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lLmdldE9iamVjdEJ5SWQodGhpcy5tZW1vcnkudGFyZ2V0KTtcclxuICAgIH07XHJcbiAgICBDVXBncmFkZXIucHJvdG90eXBlLmdldENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lbW9yeS50YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW1vcnkudGFyZ2V0ID0gdGhpcy5yb29tLmNvbnRyb2xsZXIuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lLmdldE9iamVjdEJ5SWQodGhpcy5tZW1vcnkudGFyZ2V0KTtcclxuICAgIH07XHJcbiAgICBDVXBncmFkZXIucHJvdG90eXBlLnRvZ2dsZVN0YXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubWVtb3J5LnRhcmdldCA9ICcnO1xyXG4gICAgICAgIHRoaXMubWVtb3J5LnN0YXRlID0gKHRoaXMubWVtb3J5LnN0YXRlID09PSAndXBncmFkaW5nJyA/ICdjb2xsZWN0aW5nJyA6ICd1cGdyYWRpbmcnKTtcclxuICAgIH07XHJcbiAgICBDVXBncmFkZXIgPSBfX2RlY29yYXRlKFtcclxuICAgICAgICBjcmVlcF9pbnRlcmZhY2VfMS5DbGVhbk9uRGVhdGgoKVxyXG4gICAgXSwgQ1VwZ3JhZGVyKTtcclxuICAgIHJldHVybiBDVXBncmFkZXI7XHJcbn0oX2NyZWVwX2Fic3RyYWN0XzEuQWJzdHJhY3RDcmVlcCkpO1xyXG5leHBvcnRzLkNVcGdyYWRlciA9IENVcGdyYWRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuLyogU2NyZWVwcyBWMS4wLjAgKi9cclxudmFyIHJvb21fMSA9IHJlcXVpcmUoXCIuL3Jvb21zL3Jvb21cIik7XHJcbnZhciByb29tX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL3Jvb21zL3Jvb20uc2VydmljZVwiKTtcclxudmFyIHJvb21zID0gcm9vbV9zZXJ2aWNlXzEucm9vbVNlcnZpY2UuZ2V0Um9vbXMoKTtcclxuZm9yICh2YXIgcm9vbU5hbWUgaW4gcm9vbXMpIHtcclxuICAgIHZhciByb29tID0gbmV3IHJvb21fMS5Sb29tKHJvb21zW3Jvb21OYW1lXSk7XHJcbiAgICByb29tLnJ1bigpO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQWJzdHJhY3RSb29tID0gdm9pZCAwO1xyXG52YXIgY3JlZXBfc2VydmljZV8xID0gcmVxdWlyZShcIkBjcmVlcHMvY3JlZXAuc2VydmljZVwiKTtcclxudmFyIHNwYXduX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCJAc3Bhd25zL3NwYXduLnNlcnZpY2VcIik7XHJcbnZhciBBYnN0cmFjdFJvb20gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBYnN0cmFjdFJvb20ocm9vbSkge1xyXG4gICAgICAgIHRoaXMuX3Jvb20gPSByb29tO1xyXG4gICAgICAgIHRoaXMuc3Bhd25zID0gc3Bhd25fc2VydmljZV8xLnNwYXduU2VydmljZS5nZXRTcGF3bnNJblJvb20ocm9vbSk7XHJcbiAgICAgICAgdGhpcy5jcmVlcHMgPSBjcmVlcF9zZXJ2aWNlXzEuY3JlZXBTZXJ2aWNlLmdldE15Q3JlZXBzSW5Sb29tKHJvb20pO1xyXG4gICAgICAgIGlmICghTWVtb3J5LnJvb21zW3Jvb20ubmFtZV0pXHJcbiAgICAgICAgICAgIE1lbW9yeS5yb29tc1tyb29tLm5hbWVdID0ge307XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQWJzdHJhY3RSb29tLnByb3RvdHlwZSwgXCJuYW1lXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb20ubmFtZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQWJzdHJhY3RSb29tLnByb3RvdHlwZSwgXCJlbmVyZ3lBdmFpbGFibGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm9vbS5lbmVyZ3lBdmFpbGFibGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFic3RyYWN0Um9vbS5wcm90b3R5cGUsIFwiZW5lcmd5Q2FwYWNpdHlBdmFpbGFibGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm9vbS5lbmVyZ3lDYXBhY2l0eUF2YWlsYWJsZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gQWJzdHJhY3RSb29tO1xyXG59KCkpO1xyXG5leHBvcnRzLkFic3RyYWN0Um9vbSA9IEFic3RyYWN0Um9vbTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5lbmVyZ3lTb3VyY2VTZXJ2aWNlID0gdm9pZCAwO1xyXG52YXIgc3RydWN0dXJlX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCJAcm9vbXMvc3RydWN0dXJlcy9zdHJ1Y3R1cmUuc2VydmljZVwiKTtcclxudmFyIHNwYXduX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCJAc3Bhd25zL3NwYXduLnNlcnZpY2VcIik7XHJcbnZhciBFbmVyZ3lTb3VyY2VTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRW5lcmd5U291cmNlU2VydmljZSgpIHtcclxuICAgIH1cclxuICAgIEVuZXJneVNvdXJjZVNlcnZpY2UucHJvdG90eXBlLmdldFJvb21FbmVyZ3lTb3VyY2VzID0gZnVuY3Rpb24gKHJvb20pIHtcclxuICAgICAgICB2YXIgc291cmNlcyA9IHJvb20ubWVtb3J5LnNvdXJjZXM7XHJcbiAgICAgICAgaWYgKHNvdXJjZXMpXHJcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VzO1xyXG4gICAgICAgIHNvdXJjZXMgPSByb29tLm1lbW9yeS5zb3VyY2VzID0gdGhpcy5maW5kRW5lcmd5U291cmNlc0luUm9vbShyb29tKTtcclxuICAgICAgICByZXR1cm4gc291cmNlcztcclxuICAgIH07XHJcbiAgICBFbmVyZ3lTb3VyY2VTZXJ2aWNlLnByb3RvdHlwZS5nZXROZXh0RW5lcmd5U291cmNlSW5Sb29tID0gZnVuY3Rpb24gKHJvb20pIHtcclxuICAgICAgICB2YXIgc291cmNlcyA9IHRoaXMuZ2V0Um9vbUVuZXJneVNvdXJjZXMocm9vbSk7XHJcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gT2JqZWN0LmtleXMoc291cmNlcylcclxuICAgICAgICAgICAgLnNvcnQoZnVuY3Rpb24gKHNhLCBzYikge1xyXG4gICAgICAgICAgICByZXR1cm4gc291cmNlc1tzYV0ubWVtb3J5Lm1pbmVycyAtIHNvdXJjZXNbc2JdLm1lbW9yeS5taW5lcnM7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZpbmQoZnVuY3Rpb24gKHNyY0lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VzW3NyY0lkXS5tZW1vcnkubWluZXJDYXBhY2l0eSA+IHNvdXJjZXNbc3JjSWRdLm1lbW9yeS5taW5lcnM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHNvdXJjZUlkKVxyXG4gICAgICAgICAgICByb29tLm1lbW9yeS5zb3VyY2VzW3NvdXJjZUlkXS5tZW1vcnkubWluZXJzICs9IDE7XHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZUlkIHx8ICcnO1xyXG4gICAgfTtcclxuICAgIEVuZXJneVNvdXJjZVNlcnZpY2UucHJvdG90eXBlLmdldFBhdGhGcm9tU3RvcmVzVG9Tb3VyY2VzID0gZnVuY3Rpb24gKHJvb20pIHtcclxuICAgICAgICB2YXIgc3JjUG9zID0gT2JqZWN0LnZhbHVlcyh0aGlzLmdldFJvb21FbmVyZ3lTb3VyY2VzKHJvb20pKS5tYXAoZnVuY3Rpb24gKHMpIHsgcmV0dXJuICh7IHBvczogcy5wb3MsIHJhbmdlOiAxIH0pOyB9KTtcclxuICAgICAgICB2YXIgc3Bhd25zID0gc3Bhd25fc2VydmljZV8xLnNwYXduU2VydmljZS5nZXRTcGF3bnNJblJvb20ocm9vbSk7XHJcbiAgICAgICAgdmFyIHBhdGhzID0gW107XHJcbiAgICAgICAgT2JqZWN0LnZhbHVlcyhzcGF3bnMpLmZvckVhY2goZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgc3JjUG9zLmZvckVhY2goZnVuY3Rpb24gKHBvcykge1xyXG4gICAgICAgICAgICAgICAgcGF0aHMucHVzaC5hcHBseShwYXRocywgUGF0aEZpbmRlci5zZWFyY2gocy5wb3MsIFtwb3NdLCB7IHN3YW1wQ29zdDogMSB9KS5wYXRoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGhzO1xyXG4gICAgfTtcclxuICAgIEVuZXJneVNvdXJjZVNlcnZpY2UucHJvdG90eXBlLmZpbmRFbmVyZ3lTb3VyY2VzSW5Sb29tID0gZnVuY3Rpb24gKHJvb20pIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiByb29tLmZpbmQoRklORF9TT1VSQ0VTKS5yZWR1Y2UoZnVuY3Rpb24gKHNyY01hcCwgc3JjKSB7XHJcbiAgICAgICAgICAgIHNyYy5tZW1vcnkgPSBfdGhpcy5zZXRTb3VyY2VNZW1vcnlDb25maWcoc3JjKTtcclxuICAgICAgICAgICAgc3JjTWFwW3NyYy5pZF0gPSBzcmM7XHJcbiAgICAgICAgICAgIHJldHVybiBzcmNNYXA7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfTtcclxuICAgIEVuZXJneVNvdXJjZVNlcnZpY2UucHJvdG90eXBlLnNldFNvdXJjZU1lbW9yeUNvbmZpZyA9IGZ1bmN0aW9uIChzcmMpIHtcclxuICAgICAgICB2YXIgX2EgPSBzcmMucG9zLCB4ID0gX2EueCwgeSA9IF9hLnk7XHJcbiAgICAgICAgdmFyIG1pbmVyQ2FwYWNpdHkgPSAwO1xyXG4gICAgICAgIHZhciBzdG9yYWdlUG9zID0gW107XHJcbiAgICAgICAgc3JjLnJvb20ubG9va0F0QXJlYSh5IC0gMSwgeCAtIDEsIHkgKyAxLCB4ICsgMSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgICAgICAgIGlmIChwb3MudHlwZSA9PT0gJ3RlcnJhaW4nICYmIChwb3MudGVycmFpbiA9PT0gJ3N3YW1wJyB8fCBwb3MudGVycmFpbiA9PT0gJ3BsYWluJykpIHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2VQb3MucHVzaChzcmMucm9vbS5nZXRQb3NpdGlvbkF0KHBvcy54LCBwb3MueSkpO1xyXG4gICAgICAgICAgICAgICAgbWluZXJDYXBhY2l0eSArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIG9wdGltYWxNaW5lckNhcGFjaXR5ID0gdGhpcy5nZXRPcHRpbWFsV29ya1BlckNyZWVwKHNyYywgbWluZXJDYXBhY2l0eSk7XHJcbiAgICAgICAgc3RvcmFnZVBvcy5sZW5ndGggPSBNYXRoLmNlaWwob3B0aW1hbE1pbmVyQ2FwYWNpdHkpO1xyXG4gICAgICAgIHN0b3JhZ2VQb3MuZm9yRWFjaChmdW5jdGlvbiAocG9zKSB7IHJldHVybiBzdHJ1Y3R1cmVfc2VydmljZV8xLnN0cnVjdHVyZVNlcnZpY2Uuc2V0U3RvcmFnZVNpdGUoc3JjLnJvb20sIHBvcyk7IH0pO1xyXG4gICAgICAgIHJldHVybiB7IG1pbmVyQ2FwYWNpdHk6IG1pbmVyQ2FwYWNpdHksIG9wdGltYWxNaW5lckNhcGFjaXR5OiBvcHRpbWFsTWluZXJDYXBhY2l0eSwgbWluZXJzOiAwIH07XHJcbiAgICB9O1xyXG4gICAgRW5lcmd5U291cmNlU2VydmljZS5wcm90b3R5cGUuZ2V0T3B0aW1hbFdvcmtQZXJDcmVlcCA9IGZ1bmN0aW9uIChzcmMsIGNhcGFjaXR5KSB7XHJcbiAgICAgICAgdmFyIHJlc3RvcmVDb29sZG93biA9IDMwMDtcclxuICAgICAgICB2YXIgaGFydmVzdFBlcldvcmsgPSAyO1xyXG4gICAgICAgIHZhciBlbmVyZ3lQZXJUaWNrID0gc3JjLmVuZXJneUNhcGFjaXR5IC8gcmVzdG9yZUNvb2xkb3duOyAvLyAxMFxyXG4gICAgICAgIHZhciB3b3Jrc1BlclRpY2sgPSBlbmVyZ3lQZXJUaWNrIC8gaGFydmVzdFBlcldvcms7IC8vIDVcclxuICAgICAgICB2YXIgbWluZXJXb3JrQ2FwYWNpdHkgPSBNYXRoLmZsb29yKChzcmMucm9vbS5lbmVyZ3lDYXBhY2l0eUF2YWlsYWJsZSAtIDUwKSAvIDEwMCk7XHJcbiAgICAgICAgdmFyIGJlc3RNaW5lckFtb3VudCA9IHdvcmtzUGVyVGljayAvIG1pbmVyV29ya0NhcGFjaXR5OyAvLyAyXHJcbiAgICAgICAgcmV0dXJuIGNhcGFjaXR5IDwgYmVzdE1pbmVyQW1vdW50ID8gY2FwYWNpdHkgOiBiZXN0TWluZXJBbW91bnQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEVuZXJneVNvdXJjZVNlcnZpY2U7XHJcbn0oKSk7XHJcbnZhciBlbmVyZ3lTb3VyY2VTZXJ2aWNlID0gbmV3IEVuZXJneVNvdXJjZVNlcnZpY2UoKTtcclxuZXhwb3J0cy5lbmVyZ3lTb3VyY2VTZXJ2aWNlID0gZW5lcmd5U291cmNlU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5yb29tU2VydmljZSA9IHZvaWQgMDtcclxudmFyIGVuZXJneV9zb3VyY2Vfc2VydmljZV8xID0gcmVxdWlyZShcIi4vZW5lcmd5X3NvdXJjZXMvZW5lcmd5X3NvdXJjZS5zZXJ2aWNlXCIpO1xyXG52YXIgc3RydWN0dXJlX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL3N0cnVjdHVyZXMvc3RydWN0dXJlLnNlcnZpY2VcIik7XHJcbnZhciBzcGF3bl9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiQHNwYXducy9zcGF3bi5zZXJ2aWNlXCIpO1xyXG52YXIgUm9vbVNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBSb29tU2VydmljZSgpIHtcclxuICAgIH1cclxuICAgIFJvb21TZXJ2aWNlLnByb3RvdHlwZS5nZXRSb29tcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIU1lbW9yeS5yb29tcylcclxuICAgICAgICAgICAgTWVtb3J5LnJvb21zID0ge307XHJcbiAgICAgICAgcmV0dXJuIEdhbWUucm9vbXM7XHJcbiAgICB9O1xyXG4gICAgUm9vbVNlcnZpY2UucHJvdG90eXBlLmdldENyZWVwQ2FwYWNpdHkgPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIGlmIChyb29tLm1lbW9yeS5jcmVlcENhcGFjaXR5KVxyXG4gICAgICAgICAgICByZXR1cm4gcm9vbS5tZW1vcnkuY3JlZXBDYXBhY2l0eTtcclxuICAgICAgICByb29tLm1lbW9yeS5jdXJyZW50Q3JlZXBzID0geyBtaW5lcjogMCwgY29sbGVjdG9yOiAwLCBidWlsZGVyOiAwLCB1cGdyYWRlcjogMCB9O1xyXG4gICAgICAgIHZhciBtaW5lciA9IHRoaXMuY2FsY3VsYXRlTWluZXJzTmVlZGVkKHJvb20pO1xyXG4gICAgICAgIHZhciBjb2xsZWN0b3IgPSBtaW5lcjtcclxuICAgICAgICB2YXIgYnVpbGRlciA9IG1pbmVyO1xyXG4gICAgICAgIHZhciB1cGdyYWRlciA9IHJvb20uY29udHJvbGxlci5sZXZlbDtcclxuICAgICAgICByb29tLm1lbW9yeS5jcmVlcENhcGFjaXR5ID0geyBtaW5lcjogbWluZXIsIGNvbGxlY3RvcjogY29sbGVjdG9yLCBidWlsZGVyOiBidWlsZGVyLCB1cGdyYWRlcjogdXBncmFkZXIgfTtcclxuICAgICAgICByZXR1cm4gcm9vbS5tZW1vcnkuY3JlZXBDYXBhY2l0eTtcclxuICAgIH07XHJcbiAgICBSb29tU2VydmljZS5wcm90b3R5cGUuZ2V0Um9vbVN0b3JhZ2VzID0gZnVuY3Rpb24gKHJvb20pIHtcclxuICAgICAgICByZXR1cm4gcm9vbS5maW5kKEZJTkRfTVlfU1RSVUNUVVJFUylcclxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gcy5zdG9yZTsgfSlcclxuICAgICAgICAgICAgLnNvcnQoZnVuY3Rpb24gKHNhLCBzYikgeyByZXR1cm4gc2Iuc3RvcmUuZ2V0RnJlZUNhcGFjaXR5KCkgLSBzYS5zdG9yZS5nZXRGcmVlQ2FwYWNpdHkoKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgUm9vbVNlcnZpY2UucHJvdG90eXBlLmdldERyb3BwZWRSZXNvdXJjZXMgPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHJldHVybiByb29tLmZpbmQoRklORF9EUk9QUEVEX1JFU09VUkNFUylcclxuICAgICAgICAgICAgLnNvcnQoZnVuY3Rpb24gKHNhLCBzYikgeyByZXR1cm4gc2IuYW1vdW50IC0gc2EuYW1vdW50OyB9KTtcclxuICAgIH07XHJcbiAgICBSb29tU2VydmljZS5wcm90b3R5cGUuZ2V0Q29udGFpbmVycyA9IGZ1bmN0aW9uIChyb29tKSB7XHJcbiAgICAgICAgcmV0dXJuIHJvb20uZmluZChGSU5EX01ZX1NUUlVDVFVSRVMpLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gcy50eXBlID09PSBTVFJVQ1RVUkVfQ09OVEFJTkVSOyB9KVxyXG4gICAgICAgICAgICAuc29ydChmdW5jdGlvbiAoc2EsIHNiKSB7IHJldHVybiBzYi5zdG9yZS5nZXRVc2VkQ2FwYWNpdHkoKSAtIHNhLnN0b3JlLmdldFVzZWRDYXBhY2l0eSgpOyB9KTtcclxuICAgIH07XHJcbiAgICBSb29tU2VydmljZS5wcm90b3R5cGUuZ2V0Q29uc3RydWN0aW9uU2l0ZXMgPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHZhciBzaXRlcyA9IHJvb20uZmluZChGSU5EX0NPTlNUUlVDVElPTl9TSVRFUyk7XHJcbiAgICAgICAgaWYgKCFzaXRlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIHBhdGhzID0gZW5lcmd5X3NvdXJjZV9zZXJ2aWNlXzEuZW5lcmd5U291cmNlU2VydmljZS5nZXRQYXRoRnJvbVN0b3Jlc1RvU291cmNlcyhyb29tKTtcclxuICAgICAgICAgICAgaWYgKCFwYXRocy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBwYXRocyA9IHRoaXMuZ2V0UGF0aEZyb21TdG9yZXNUb0NvbnRyb2xsZXIocm9vbSk7XHJcbiAgICAgICAgICAgIHN0cnVjdHVyZV9zZXJ2aWNlXzEuc3RydWN0dXJlU2VydmljZS5zZXRSb2FkU2l0ZXMocm9vbSwgcGF0aHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2l0ZXM7XHJcbiAgICB9O1xyXG4gICAgUm9vbVNlcnZpY2UucHJvdG90eXBlLnNldENvbnN0cnVjdGlvblNpdGUgPSBmdW5jdGlvbiAocm9vbSwgcG9zLCB0eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJvb20uY3JlYXRlQ29uc3RydWN0aW9uU2l0ZShwb3MsIHR5cGUpO1xyXG4gICAgfTtcclxuICAgIFJvb21TZXJ2aWNlLnByb3RvdHlwZS5jYWxjdWxhdGVNaW5lcnNOZWVkZWQgPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHZhciBlblNyY3MgPSBlbmVyZ3lfc291cmNlX3NlcnZpY2VfMS5lbmVyZ3lTb3VyY2VTZXJ2aWNlLmdldFJvb21FbmVyZ3lTb3VyY2VzKHJvb20pO1xyXG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKGVuU3JjcykucmVkdWNlKGZ1bmN0aW9uICh0LCBzKSB7IHJldHVybiB0ICs9IHMubWVtb3J5Lm9wdGltYWxNaW5lckNhcGFjaXR5OyB9LCAwKTtcclxuICAgIH07XHJcbiAgICBSb29tU2VydmljZS5wcm90b3R5cGUuZ2V0UGF0aEZyb21TdG9yZXNUb0NvbnRyb2xsZXIgPSBmdW5jdGlvbiAocm9vbSkge1xyXG4gICAgICAgIHZhciBjdHJsUG9zID0geyBwb3M6IHJvb20uY29udHJvbGxlci5wb3MsIHJhbmdlOiAxIH07XHJcbiAgICAgICAgdmFyIHNwYXducyA9IHNwYXduX3NlcnZpY2VfMS5zcGF3blNlcnZpY2UuZ2V0U3Bhd25zSW5Sb29tKHJvb20pO1xyXG4gICAgICAgIHZhciBwYXRocyA9IFtdO1xyXG4gICAgICAgIE9iamVjdC52YWx1ZXMoc3Bhd25zKS5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgIHBhdGhzLnB1c2guYXBwbHkocGF0aHMsIFBhdGhGaW5kZXIuc2VhcmNoKHMucG9zLCBbY3RybFBvc10sIHsgc3dhbXBDb3N0OiAxIH0pLnBhdGgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwYXRocztcclxuICAgIH07XHJcbiAgICByZXR1cm4gUm9vbVNlcnZpY2U7XHJcbn0oKSk7XHJcbnZhciByb29tU2VydmljZSA9IG5ldyBSb29tU2VydmljZSgpO1xyXG5leHBvcnRzLnJvb21TZXJ2aWNlID0gcm9vbVNlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUm9vbSA9IHZvaWQgMDtcclxudmFyIF9yb29tX2Fic3RyYWN0XzEgPSByZXF1aXJlKFwiLi9fcm9vbS5hYnN0cmFjdFwiKTtcclxudmFyIFJvb20gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUm9vbSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFJvb20oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgUm9vbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIHNwYXduTmFtZSBpbiB0aGlzLnNwYXducykge1xyXG4gICAgICAgICAgICB0aGlzLnJ1blNwYXduKHNwYXduTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGNyZWVwTmFtZSBpbiB0aGlzLmNyZWVwcykge1xyXG4gICAgICAgICAgICB0aGlzLnJ1bkNyZWVwKGNyZWVwTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFJvb20ucHJvdG90eXBlLnJ1blNwYXduID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLnNwYXduc1tuYW1lXS5ydW4oKTtcclxuICAgIH07XHJcbiAgICBSb29tLnByb3RvdHlwZS5ydW5DcmVlcCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5jcmVlcHNbbmFtZV0ucnVuKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJvb207XHJcbn0oX3Jvb21fYWJzdHJhY3RfMS5BYnN0cmFjdFJvb20pKTtcclxuZXhwb3J0cy5Sb29tID0gUm9vbTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zdHJ1Y3R1cmVTZXJ2aWNlID0gdm9pZCAwO1xyXG52YXIgcm9vbV9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiQHJvb21zL3Jvb20uc2VydmljZVwiKTtcclxudmFyIFN0cnVjdHVyZVNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTdHJ1Y3R1cmVTZXJ2aWNlKCkge1xyXG4gICAgfVxyXG4gICAgU3RydWN0dXJlU2VydmljZS5wcm90b3R5cGUuc2V0Um9hZFNpdGVzID0gZnVuY3Rpb24gKHJvb20sIHBhdGhzLCBsaW1pdCkge1xyXG4gICAgICAgIGlmIChsaW1pdCA9PT0gdm9pZCAwKSB7IGxpbWl0ID0gMTA7IH1cclxuICAgICAgICB2YXIgbm9Sb2FkcyA9IHBhdGhzLmZpbHRlcihmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJ1Y3R1cmVzID0gcG9zLmxvb2tGb3IoTE9PS19TVFJVQ1RVUkVTKTtcclxuICAgICAgICAgICAgcmV0dXJuIChzdHJ1Y3R1cmVzLmZpbmQoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMuc3RydWN0dXJlVHlwZSA9PT0gU1RSVUNUVVJFX1JPQUQ7IH0pID09IG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5vUm9hZHMubGVuZ3RoID0gbGltaXQ7XHJcbiAgICAgICAgbm9Sb2Fkcy5tYXAoZnVuY3Rpb24gKHApIHsgcmV0dXJuIHJvb21fc2VydmljZV8xLnJvb21TZXJ2aWNlLnNldENvbnN0cnVjdGlvblNpdGUocm9vbSwgcCwgU1RSVUNUVVJFX1JPQUQpOyB9KTtcclxuICAgIH07XHJcbiAgICBTdHJ1Y3R1cmVTZXJ2aWNlLnByb3RvdHlwZS5zZXRTdG9yYWdlU2l0ZSA9IGZ1bmN0aW9uIChyb29tLCBwb3MpIHtcclxuICAgICAgICByb29tLmNyZWF0ZUNvbnN0cnVjdGlvblNpdGUocG9zLCBTVFJVQ1RVUkVfQ09OVEFJTkVSKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU3RydWN0dXJlU2VydmljZTtcclxufSgpKTtcclxudmFyIHN0cnVjdHVyZVNlcnZpY2UgPSBuZXcgU3RydWN0dXJlU2VydmljZSgpO1xyXG5leHBvcnRzLnN0cnVjdHVyZVNlcnZpY2UgPSBzdHJ1Y3R1cmVTZXJ2aWNlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkFic3RyYWN0U3Bhd24gPSB2b2lkIDA7XHJcbnZhciBBYnN0cmFjdFNwYXduID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQWJzdHJhY3RTcGF3bihzcGF3bikge1xyXG4gICAgICAgIHRoaXMuc3Bhd24gPSBzcGF3bjtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYnN0cmFjdFNwYXduLnByb3RvdHlwZSwgXCJuYW1lXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3Bhd24ubmFtZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQWJzdHJhY3RTcGF3bi5wcm90b3R5cGUsIFwicm9vbVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNwYXduLnJvb207XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFic3RyYWN0U3Bhd24ucHJvdG90eXBlLCBcImlkXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3Bhd24uaWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFic3RyYWN0U3Bhd24ucHJvdG90eXBlLCBcInBvc1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNwYXduLnBvcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gQWJzdHJhY3RTcGF3bjtcclxufSgpKTtcclxuZXhwb3J0cy5BYnN0cmFjdFNwYXduID0gQWJzdHJhY3RTcGF3bjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zcGF3blNlcnZpY2UgPSB2b2lkIDA7XHJcbnZhciBjcmVlcF9pbnRlcmZhY2VfMSA9IHJlcXVpcmUoXCJAY3JlZXBzL2NyZWVwLmludGVyZmFjZVwiKTtcclxudmFyIHJvb21fc2VydmljZV8xID0gcmVxdWlyZShcIkByb29tcy9yb29tLnNlcnZpY2VcIik7XHJcbnZhciBzcGF3bl8xID0gcmVxdWlyZShcIi4vc3Bhd25cIik7XHJcbnZhciBTcGF3blNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTcGF3blNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBTcGF3blNlcnZpY2UucHJvdG90eXBlLmdldFNwYXduc0luUm9vbSA9IGZ1bmN0aW9uIChyb29tKSB7XHJcbiAgICAgICAgcmV0dXJuIHJvb20uZmluZChGSU5EX01ZX1NQQVdOUykucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIHNwYXduKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtzcGF3bi5uYW1lXSA9IG5ldyBzcGF3bl8xLlNwYXduKHNwYXduKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9O1xyXG4gICAgU3Bhd25TZXJ2aWNlLnByb3RvdHlwZS5uZXh0UmVxdWlyZWRDcmVlcCA9IGZ1bmN0aW9uIChyb29tKSB7XHJcbiAgICAgICAgdmFyIF9hID0gcm9vbV9zZXJ2aWNlXzEucm9vbVNlcnZpY2UuZ2V0Q3JlZXBDYXBhY2l0eShyb29tKSwgbWluZXIgPSBfYS5taW5lciwgY29sbGVjdG9yID0gX2EuY29sbGVjdG9yLCBidWlsZGVyID0gX2EuYnVpbGRlciwgdXBncmFkZXIgPSBfYS51cGdyYWRlcjtcclxuICAgICAgICB2YXIgY3VycmVudENyZWVwcyA9IHJvb20ubWVtb3J5LmN1cnJlbnRDcmVlcHM7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRDcmVlcHMubWluZXIgPiBjdXJyZW50Q3JlZXBzLmNvbGxlY3RvciAmJiBjdXJyZW50Q3JlZXBzLmNvbGxlY3RvciA8IGNvbGxlY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlZXBfaW50ZXJmYWNlXzEuQ3JlZXBUeXBlLkNvbGxlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudENyZWVwcy5taW5lciA8IG1pbmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuTWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRDcmVlcHMuYnVpbGRlciA8IGJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5CdWlsZGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50Q3JlZXBzLnVwZ3JhZGVyIDwgdXBncmFkZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5VcGdyYWRlcjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFNwYXduU2VydmljZTtcclxufSgpKTtcclxudmFyIHNwYXduU2VydmljZSA9IG5ldyBTcGF3blNlcnZpY2UoKTtcclxuZXhwb3J0cy5zcGF3blNlcnZpY2UgPSBzcGF3blNlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG52YXIgX2E7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5TcGF3biA9IHZvaWQgMDtcclxudmFyIG5hbWVfY3JlYXRvcl9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiQGNvbW1vbi9uYW1lX2NyZWF0b3Iuc2VydmljZVwiKTtcclxudmFyIGNyZWVwX2ludGVyZmFjZV8xID0gcmVxdWlyZShcIkBjcmVlcHMvY3JlZXAuaW50ZXJmYWNlXCIpO1xyXG52YXIgc3Bhd25fc2VydmljZV8xID0gcmVxdWlyZShcIi4vc3Bhd24uc2VydmljZVwiKTtcclxudmFyIF9zcGF3bl9hYnN0cmFjdF8xID0gcmVxdWlyZShcIi4vX3NwYXduLmFic3RyYWN0XCIpO1xyXG52YXIgQ1JFRVBfUEFSVFNfQllfVFlQRSA9IChfYSA9IHt9LFxyXG4gICAgX2FbY3JlZXBfaW50ZXJmYWNlXzEuQ3JlZXBUeXBlLk1pbmVyXSA9IFtXT1JLLCBXT1JLLCBNT1ZFXSxcclxuICAgIF9hW2NyZWVwX2ludGVyZmFjZV8xLkNyZWVwVHlwZS5Db2xsZWN0b3JdID0gW0NBUlJZLCBDQVJSWSwgQ0FSUlksIE1PVkUsIE1PVkUsIE1PVkVdLFxyXG4gICAgX2FbY3JlZXBfaW50ZXJmYWNlXzEuQ3JlZXBUeXBlLkJ1aWxkZXJdID0gW1dPUkssIE1PVkUsIE1PVkUsIENBUlJZLCBDQVJSWV0sXHJcbiAgICBfYVtjcmVlcF9pbnRlcmZhY2VfMS5DcmVlcFR5cGUuVXBncmFkZXJdID0gW01PVkUsIE1PVkUsIENBUlJZLCBDQVJSWSwgV09SS10sXHJcbiAgICBfYSk7XHJcbnZhciBTcGF3biA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhTcGF3biwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFNwYXduKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIFNwYXduLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm9vbS5lbmVyZ3lBdmFpbGFibGUgPj0gMzAwKSB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gc3Bhd25fc2VydmljZV8xLnNwYXduU2VydmljZS5uZXh0UmVxdWlyZWRDcmVlcCh0aGlzLnJvb20pO1xyXG4gICAgICAgICAgICBpZiAodHlwZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Bhd25DcmVlcCh0eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgU3Bhd24ucHJvdG90eXBlLnNwYXduQ3JlZXAgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgIHZhciBfbmFtZSA9IHR5cGUgKyBcIl9cIiArIG5hbWVfY3JlYXRvcl9zZXJ2aWNlXzEubmFtZVNlcnZpY2UuY3JlYXRlTmFtZSgpO1xyXG4gICAgICAgIHRoaXMuc3Bhd24uc3Bhd25DcmVlcChDUkVFUF9QQVJUU19CWV9UWVBFW3R5cGVdLCBfbmFtZSk7XHJcbiAgICAgICAgdGhpcy5yb29tLm1lbW9yeS5jdXJyZW50Q3JlZXBzW3R5cGVdICs9IDE7XHJcbiAgICAgICAgTWVtb3J5LmNyZWVwc1tfbmFtZV0gPSB7IHR5cGU6IHR5cGUgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU3Bhd247XHJcbn0oX3NwYXduX2Fic3RyYWN0XzEuQWJzdHJhY3RTcGF3bikpO1xyXG5leHBvcnRzLlNwYXduID0gU3Bhd247XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==