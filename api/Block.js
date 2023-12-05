const { isFloat } = require("../Utils.js")
const config = require("../config.json");
const { validCategories } = require('./Type.js')



class Block {
  /**
   * @private
   */
  static __Data = {
    "format_version": config["block"]["version"],
    "minecraft:block": {
      "description": {
        "identifier": "",
        "menu_category": {}
      },
      "components": {}
    }
  };
  /**
   * @private
   */
  static __components = this.__Data["minecraft:block"]["components"];
  /**
   * @BlockData
   */

  static Category;
  static Group;
  static IsHiddenInCommands;
  static DisplayName;
  static DestroyTime;
  static ExplosionResistance;
  static Friction;
  static CatchChanceModifier;
  static DestroyChanceModifier;
  static Texture;
  static RenderMethod;
  static FaceDimming;
  static AmbientOcclusion;
  static LightEmmision;
  static LightDampening;
  static Geometry;
  static BoneVisibility;
  static PlacementFilter;
  static Transformation;
  static Loot;
  static MapColor;
  static CollisionBox;
  static SelectionBox;

  /**
   * @BlockEventTriggers
   */
  static OnStepOn;
  static OnStepOff;
  static OnInteract;
  static OnFallOn;
  static OnPlayerPlacing;
  static OnPlaced;
  static OnPlayerDestroyed;
  static QueuedTicking;
  static RandomTicking;
  /**
   * @BlockStatesAndPermutationss
   */
  static States;
  static Permutations;
  /**
   * @CreatesBlockObject
   */
  static init() {
    this.__Data["minecraft:block"]["description"]["identifier"] = `${config["prefix"]}:${this.name.toLowerCase()}`
    /**
     * @handleCategory
     */
    if (this.Category) {
      if (typeof this.Category !== "string")  return new Error(`[${this.name}] [component: Category]: expected type {string} instead found {${this.Category}}`);
        if (!validCategories.has(this.Category)) return new Error(`[${this.name}] [component: Category]: expected type {Categorys} instead found {${this.Category}}`);
          this.__Data["minecraft:block"]["description"]["menu_category"]["category"] = this.Category;
      }
    /**
     * @handleGroup
     */
    if (this.Group) {
      if (typeof this.Group=="string") {
        this.__Data["minecraft:block"]["description"]["menu_category"]["group"] = this.Group;
      }
      else return new Error(`[${this.name}] [component: Group]: expected type {Groups|string} but instead found {${typeof this.Group}}`);
    }
    /**
     * @handleIsHiddenInCommands
     */
    if (this.IsHiddenInCommands) {
      if (typeof this.IsHiddenInCommands !== "boolean") return new Error(`[${this.name}] [component: IsHiddenInCommands]: expected type {boolean} instead found {${typeof this.IsHiddenInCommands}}`)
        this.__Data["minecraft:block"]["description"]["menu_category"]["is_hidden_in_commands"] = this.IsHiddenInCommands;
      }
    /**
     * @handleDisplayName
     */
    if (this.DisplayName) {
      if (typeof this.DisplayName == "string") {
        this.__components["minecraft:display_name"] = this.DisplayName;
      }
      else return new Error(`[${this.name}] [component: DisplayName]: expected type {string} instead found {${this.DisplayName}}`);
    }
    /**
     * @handleDestroytime
     */
    if (this.DestroyTime) {
      if (typeof this.DestroyTime == "boolean") {
        this.__components["minecraft:destructible_by_mining"] = this.DestroyTime;
      }
      else if (typeof this.DestroyTime == "number") {
        this.__components["minecraft:destructible_by_mining"] = {
          "seconds_to_destroy": this.DestroyTime,
        }
      } else return new Error(`[${this.name}] [component: DestroyTime]: expected type {boolean|integer} instead found {${typeof this.DestroyTime}}`)
    }
    /**
     * @handleExplosionResistance
     */
    if (this.ExplosionResistance) {
      switch (typeof this.ExplosionResistance){
        case "boolean":
          this.__components["minecraft:destructible_by_explosion"] = this.ExplosionResistance;
          break;

          case "number":
            this.__components["minecraft:destructible_by_explosion"] = {
              "explosion_resistance": this.ExplosionResistance,
            };
            break;

            default:
              return new Error(`[${this.name}] [component: ExplosionResistance]: expected type {boolean|integer} instead found {${typeof this.ExplosionResistance}}`)
      }
    }
    /**
     * @handleFriction
     */
    if (this.Friction) {
      if (typeof this.Friction !== "number") return new Error(`[${this.name}] [component: friction]: expected {number} instead found {${typeof this.Friction}}`)
        if (!isFloat(this.Friction)) return new Error(`[${this.name}] [component: friction]: expected {float} instead found {integer} `)
          this.__components["minecraft:friction"] = this.Friction;
      }
    /**
     * @handleFlammable
     */
    if (this.CatchChanceModifier || this.DestroyChanceModifier) {
      let __Flammable = this.__Data["minecraft:block"]["components"]["minecraft:flammable"] = {}
      if (this.CatchChanceModifier) {
        if (typeof this.CatchChanceModifier !== "number") return new Error(`[${this.name}] [component: CatchChanceModifier]: expected {number} instead found {${typeof this.CatchChanceModifier}}`)
          __Flammable["catch_chance_modifier"] = this.CatchChanceModifier;
      }
      if (this.DestroyChanceModifier) {
        if (typeof this.DestroyChanceModifier !== "number") return new Error(`[${this.name}] [component: DestroyChanceModifier]: expected {number} instead found {${typeof this.CatchChanceModifier}}`)
          __Flammable["destory_chance_modifier"] = thid.DestroyChanceModifier;
      }
    }
    /**
     * @handleMaterialInstance
     */
    if (this.Texture || this.RenderMethod || this.FaceDimming || this.AmbientOcclusion) {
      let __MaterialInstances = {}
      if (this.Texture) {
        if (typeof this.Texture !== "string") return new Error(`[${this.name}] [component: Texture]: expected {string} instead found {${typeof this.Texture}}`)
          __MaterialInstances["texture"] = this.Texture;
      }
      if (this.RenderMethod) {
        if (typeof this.RenderMethod !== "string") return new Error(`[${this.name}] [component: RenderMethod]: expected {string} instead found {${typeof this.RenderMethod}}`)
          if (this.RenderMethod !== ("opaque" || "blend" || "alpha_test" || "double_sided")) return new Error(`[${this.name}] [component: RenderMethod]: expected type {RenderMethod} but found {${this.RenderMethod}}`) 
            __MaterialInstances["render_method"] = this.RenderMethod;
      }
      if (this.FaceDimming) {
        if (typeof this.FaceDimming !== "boolean") return new Error(`[${this.name}] [component: FaceDimming]: expected {boolean} instead found {${typeof this.FaceDimming}}`)
          __MaterialInstances["face_dimming"] = this.FaceDimming;
      }
      if (this.AmbientOcclusion) {
        if (typeof this.AmbientOcclusion !== "boolean") return new Error(`[${this.name}] [component: AmbientOcclusion]: expected {boolean} instead found {${typeof this.AmbientOcclusion}}`)
          __MaterialInstances["ambient_occlusion"] = this.AmbientOcclusion;
     
    }
    this.__components["minecraft:material_instances"] = __MaterialInstances;
  }
    /**
     * @handleBlockLightEmmision
     */
    if (this.LightEmmision) {
      if (typeof this.LightEmmision !== "number") return new Error(`[${this.name}] [component: LightEmmision]: expected {number} instead found {${typeof this.LightEmmision}}`)
        this.__components["minecraft:block_light_emmision"] = this.LightEmmision;
      }
    /**
     * @handleBlockLightDampening
     */
    if (this.LightDampening) {
      if (typeof this.LightDampening !== "number") return new Error(`[${this.name}] [component: LightDampening]: expected {number} instead found {${typeof this.LightDampening}}`)
        this.__components["minecraft:block_light_dampening"] = this.LightDampening;
    }
    /**
     * @handleGeometry
     */
    if (this.Geometry || this.BoneVisibility) {
      if (this.Geometry) {
        if (typeof this.Geometry !== "string") return new Error(`[${this.name}] [component: Geometry]: expected {string} instead found {${typeof this.Geometry}}`)
          this.__components["minecraft:geometry"] = {
            "identifier": this.Geometry
          }
        }
      if (this.BoneVisibility) {
        if (!this.Geometry) return new Error(`[${this.name}] [component: BoneVisibility]: using BoneVisibility needs a geometry component.`)
        if (typeof this.BoneVisibility !== "object") return new Error(`[${this.name}] [component: BoneVisibility]: expected {object} instead found {${typeof this.BoneVisibility}}`)
          for (const [bone, value] of this.BoneVisibility) {
            if (typeof bone == "string" && typeof value == ("string" || "boolean")) {
              this.__components["minecraft:geometry"]["bone_visibility"] = { bone: value }
            }
            if (typeof bone != "string") return new Error(`[${this.name}] [component: bone_visibility] [child: ${bone}]: expected {string} instead found {${typeof bone}}`)
            if (typeof value != ("string" || "boolean")) return new Error(`[${this.name}] [component: bone_visibility] [child: ${value}]: expected {string} or boolean instead found {${typeof value}}`)
          }
      }
    }
    // TODO: From here
    /**
     * @handlePlacementFilter
     */
    if (this.PlacementFilter) {
      if (typeof this.PlacementFilter !== "object")  return new Error(`[${this.name}] [component: PlacementFilter]: expected type {object} instead found {${typeof this.PlacementFilter}}`)
        let __PlacementFilter = { "conditions": [] }
        for (const [condition] of Object.entries(this.PlacementFilter)) {
          let __condition = {}
          if (condition["AllowedFaces"]) {
            __condition["allowed_faces"] = []
            condition["AllowedFaces"].forEach(face => {
              if (typeof face !== "string")  return new Error(`[${this.name}] [component: PlacementFilter] [child: AllowedFaces]: expected {string} instead found {${typeof face}}`)
                if (!(["up", "down", "north", "south", "east", "west"].includes(face))) return new Error(`[${this.name}] [component: PlacementFilter] [child: AllowedFaces]: expected type {Faces} instead found {${face}}`)
                  __condition["allowed_faces"].push(face)
            });
          }
          if (condition["BlockFilter"]) {
            __condition["block_filter"] = []
            condition["BlockFilter"].forEach(block => {
              switch (typeof block){
                case 'string':
                  __condition["block_filter"].push(block)
                  break;
                  case 'object':
                    for (let [key, value] of Object.entries(block)) {
                      if (key != "tags") return new Error(``)
                      if (typeof value !== "string") return new Error(`[${this.name}] [component: PlacementFilter] [child: BlockFilter]: expected type {string} instead found {${typeof value}})`)
                        __condition["block_filter"].push({ "tags": value })
                    }
                    break;

                    default:
                      return new Error(`[${this.name}] [component: PlacementFilter] [child: BlockFilter]: expected type {Blocks|string} instead found ${typeof block}`)

              }
            })
          }
          __PlacementFilter["conditions"].push(__condition)
        }
        this.__components["minecraft:placement_filter"] = __PlacementFilter;
    }
    /**
     * @handleTransformation
     */
    if (this.Transformation) {
      if (typeof this.Transformation !== "object") return new Error(`[${this.name}] [component: Transformation]: expected type {object} instead found {${typeof this.Transformation}}`)
        let __Transformation = {}
        if (this.Transformation["Translation"]) {
          this.Transformation["Translation"].forEach(value => {
            if (typeof value !== "number") return new Error(`[${this.name}] [component: Transformation] [child: Translation]: expected type {number} instead found {${typeof value}}`)
              __Transformation["translation"].push(value)
        })
      }
        if (this.Transformation["Rotation"]) {
          this.Transformation["Rotation"].forEach(value => {
            if (typeof value !== "number") return new Error(`[${this.name}] [component: Transformation] [child: Rotation]: expected type {number} instead found {${typeof value}}`)
              __Transformation["rotation"].push(value)
          })
        }
        if (this.Transformation["Scale"]) {
          this.Transformation["Scale"].forEach(value => {
            if (typeof value !== "number") return new Error(`[${this.name}] [component: Transformation] [child: Scale]: expected type {number} instead found {${typeof value}}`) 
              __Transformation["scale"].push(value)
          })
        }
        this.__components["minecraft:transformation"] = __Transformation;
      }
    /**
     * @handleLoot
     */
    if (this.Loot) {
      if (typeof this.Loot !== "string") return new Error(`[${this.name}] [component: Loot]: expected type {string} instead found {${typeof this.Loot}}`)
        this.__components["minecraft:loot"] = this.Loot;
    }
    /**
     * @handleMapColor
     */
    if (this.MapColor) {
      switch (typeof this.MapColor){
        case "string":
          this.__components["minecraft:map_color"] = this.MapColor;
          break;
           case "object":
            if (!(this.MapColor["R"] && this.MapColor["B"] && this.MapColor["G"])) return new Error(`[${this.name}] [component: MapColor]: expected MapColor={R: number, B: number, G: number} instead found {${this.MapColor}}`)
            this.__components["minecraft:map_color"] = [this.MapColor["R"], this.MapColor["B"], this.MapColor["G"]]
            break;
            default:
              return new Error(`[${this.name}] [component: MapColor]: expected type {string|object} instead found {${typeof this.MapColor}}`)
      }
    }
    /**
     * @handleCollisionBox
     */
    if (this.CollisionBox) {
      if (typeof this.CollisionBox !== "object") return new Error(`[${this.name}] [component: CollisionBox]: expected type {object} instead found {${typeof this.CollisionBox}}`)
        let __CollisionBox = {}
        if (this.CollisionBox["Origin"]) {
          this.CollisionBox["Origin"].forEach(o => {
            if (typeof o !== "number") return new Error(`[${this.name}] [component: CollisionBox] [child: Origin]: expected type {number} instead found {${typeof o}}`)
              __CollisionBox["origin"].push(o)
          })
        }
        if (this.CollisionBox["Size"]) {
          this.CollisionBox["Size"].forEach(s => {
            if (typeof s !== "number")  return new Error(`[${this.name}] [component: CollisionBox] [child: Size]: expected type {number} instead found {${typeof s}}`)
              __CollisionBox["size"].push(s)
          })
        }
        this.__components["minecraft:collision_box"] = __CollisionBox;
      }
    /**
     * @handleSelectionBox
     */
    if (this.SelectionBox) {
      if (typeof this.SelectionBox !== "object") return new Error(`[${this.name}] [component: SelectionBox]: expected type {object} instead found {${typeof this.SelectionBox}}`)
        let __SelectionBox = {}
        if (this.SelectionBox["Origin"]) {
          this.SelectionBox["Origin"].forEach(o => {
            if (typeof o !== "number") return new Error(`[${this.name}] [component: SelectionBox] [child: Origin]: expected type {number} instead found {${typeof s}}`)
              __SelectionBox["origin"].push(o)
          })
        if (this.SelectionBox["Size"]) {
          this.SelectionBox["Size"].forEach(s => {
            if (typeof s == "number") return new Error(`[${this.name}] [component: SelectionBox] [child: Size]: expected type {number} instead found {${typeof s}}`) 
              __SelectionBox["size"].push(s)
          })
        }
        this.__components["minecraft:selection_box"] = __SelectionBox;
      }
    /**
     * @handleOnStepOn
     */
    if(this.OnStepOn) {this.__components["minecraft:on_step_on"] = BlockEventTriggerHandler(this.OnStepOn, this.__Data, "OnStepOn")}
    /**
     * @handleOnStepOff
     */
    if(this.OnStepOff) {this.__components["minecraft:on_step_off"] = BlockEventTriggerHandler(this.OnStepOff, this.__Data, "OnStepOff")}
    /**
     * @handleOnFallOn
     */
    if(this.OnFallOn) {this.__components["minecraft:on_fall_on"] = BlockEventTriggerHandler(this.OnFallOn, this.__Data, "OnFallOn")}
    /**
     * @handleOnPlayerPlacing
     */
    if(this.OnPlayerPlacing) {this.__components["minecraft:on_player_placing"] = BlockEventTriggerHandler(this.OnPlayerPlacing, this.__Data, "OnPlayerPlacing")}
    /**
     * @handleOnPlayerDestroyeded
     */
    if (this.OnPlayerDestroyed) {
      if (typeof this.OnPlayerDestroyed !== "object") return new Error(`[${this.name}] [component: OnPlayerDestroyed]: expected {object} instead found {${typeof this.OnPlayerDestroyed}}`)
      if (!this.__Data["minecraft:block"]["events"]) this.__Data["minecraft:block"]["events"] = {}
      let __OnPlayerDestroyed = {}
      if (this.OnPlayerDestroyed["Condition"]) {
        if (typeof this.OnPlayerDestroyed["Condition"] !== "string") return new Error(`[${this.name}] [component: OnPlayerDestroyed] [child: Condition]: expected type {string} instead found {${typeof this.OnPlayerDestroyed["Condition"]}}`)
        __OnPlayerDestroyed["condition"] = this.OnPlayerDestroyed["Condition"];
      }

      if (this.OnPlayerDestroyed["Event"]) {
        if (typeof this.OnPlayerDestroyed["Event"] !== "string") return new Error(`[${this.name}] [component: OnPlayerDestroyed] [child: Event]: expected type {string} instead found {${typeof this.OnPlayerDestroyed["Event"]}}`)
        __OnPlayerDestroyed["event"] = this.OnPlayerDestroyed["Target"];
      }

      if (this.OnPlayerDestroyed["Target"]) {
        if (typeof this.OnPlayerDestroyed["Target"] !== "string") return new Error(`[${this.name}] [component: OnPlayerDestroyed] [child: Target]: expected type {string} instead found {${typeof this.OnPlayerDestroyed["Target"]}}`)
        if (this.OnPlayerDestroyed["Target"] !== ("self" || "other")) return new Error(`[${this.name}] [component: OnPlayerDestroyed] [child: Target]: expected type {Targets} instead found {${this.OnPlayerDestroyed["Target"]}}`)
        __OnPlayerDestroyed["target"] = this.OnPlayerDestroyed["Target"];
      }
      this.__components["minecraft:on_player_destroyed"] = __OnPlayerDestroyed;
    }
    if(this.OnPlayerDestroyed) {this.__components["minecraft:on_player_destroyed"] = BlockEventTriggerHandler(this.OnPlayerDestroyed, this.__Data, "OnPlayerDestroyed");}
    /**
     * @handleOnPlaced
     */
    if(this.OnPlaced) {this.__components["minecraft:on_placed"] = BlockEventTriggerHandler(this.OnPlaced, this.__Data, "OnPlaced");}
    /**
     * @handleOnInteract
     */
    if(this.OnInteract) {this.__components["minecraft:on_interact"] = BlockEventTriggerHandler(this.OnInteract, this.__Data, "OnInteract");}
    // TODO: add BlockEventTriggerHandler
    /**
     * @handleQueuedTicking
     */
    if (this.QueuedTicking) {
      if (typeof this.QueuedTicking !== "object") return new Error(`[${this.name}] [component: QueuedTicking]: expected {object} instead found {${typeof this.QueuedTicking}}`);
      if (!this.__Data["minecraft:block"]["events"]) this.__Data["minecraft:block"]["events"] = {}
      let __QueuedTicking = { "on_tick": {} }
      if (this.QueuedTicking["Looping"]) {
        if (typeof this.QueuedTicking["Looping"] !== "boolean") return new Error(`[${this.name}] [component: QueuedTicking] [child: Looping]: expected type {boolean} instead found {${typeof this.QueuedTicking["Looping"]}}`)
        __QueuedTicking["looping"] = this.QueuedTicking["Looping"];
      }

      if (this.QueuedTicking["IntervalRange"]) {
        if (typeof this.QueuedTicking["IntervalRange"] === ("string" || "object" || "boolean" || "number" || "Function")) return new Error(`[${this.name}] [component: QueuedTicking] [child: IntervalRange]: expected type {number[]} instead found {${typeof this.QueuedTicking["Condition"]}}`)
        this.QueuedTicking["IntervalRange"].forEach(r => {
          if (typeof r !== "number") return new Error(`[${this.name}] [component: QueuedTicking] [child: IntervalRange]: expected type {number} instead found {${typeof this.QueuedTicking["IntervalRange"]}}`)
          __QueuedTicking["condition"] = this.QueuedTicking["IntervalRange"];

        })
      }

      if (this.QueuedTicking["Condition"]) {
        if (typeof this.QueuedTicking["Condition"] !== "string") return new Error(`[${this.name}] [component: QueuedTicking] [child: Condition]: expected type {string} instead found {${typeof this.QueuedTicking["Condition"]}}`)
        __QueuedTicking["on_tick"]["condition"] = this.QueuedTicking["Condition"];
      }


      if (this.QueuedTicking["Event"]) {
        if (typeof this.QueuedTicking["Event"] == "string") {
          __QueuedTicking["on_tick"]["event"] = this.QueuedTicking["Target"];
        }
        else return new Error(`[${this.name}] [component: QueuedTicking] [child: Event]: expected type {string} instead found {${typeof this.QueuedTicking["Event"]}}`)
      }
      if (this.QueuedTicking["Target"]) {
        if (typeof this.QueuedTicking["Target"] == "string") {
          if (this.QueuedTicking["Target"] == ("self" || "other")) {
            __QueuedTicking["on_tick"]["target"] = this.QueuedTicking["Target"];
          }
          else return new Error(`[${this.name}] [component: QueuedTicking] [child: Target]: expected type {Targets} instead found {${this.QueuedTicking["Target"]}}`)
        }
        else return new Error(`[${this.name}] [component: QueuedTicking] [child: Target]: expected type {string} instead found {${typeof this.QueuedTicking["Target"]}}`)
      }
      this.__components["minecraft:queued_ticking"] = __QueuedTicking;
    }
    /**
     * @handleRandomTicking
     */
    if (this.RandomTicking) {
      if (typeof this.RandomTicking !== "object") return new Error(`[${this.name}] [component: RandomTicking]: expected {object} instead found {${typeof this.RandomTicking}}`)
      if (!this.__Data["minecraft:block"]["events"]) this.__Data["minecraft:block"]["events"] = {}
      let __RandomTicking = { "on_tick": {} }
      if (this.RandomTicking["Condition"]) {
        if (typeof this.RandomTicking["Condition"] == "string") {
          __RandomTicking["on_tick"]["condition"] = this.RandomTicking["Condition"];
        }
        else return new Error(`[${this.name}] [component: RandomTicking] [child: Condition]: expected type {string} instead found {${typeof this.RandomTicking["Condition"]}}`)
      }
      if (this.RandomTicking["Event"]) {
        if (typeof this.RandomTicking["Event"] == "string") {
          __RandomTicking["on_tick"]["event"] = this.RandomTicking["Target"];
        }
        else return new Error(`[${this.name}] [component: RandomTicking] [child: Event]: expected type {string} instead found {${typeof this.RandomTicking["Event"]}}`)
      }
      if (this.RandomTicking["Target"]) {
        if (typeof this.RandomTicking["Target"] == "string") {
          if (this.RandomTicking["Target"] == ("self" || "other")) {
            __RandomTicking["on_tick"]["target"] = this.RandomTicking["Target"];
          }
          else return new Error(`[${this.name}] [component: RandomTicking] [child: Target]: expected type {Targets} instead found {${this.RandomTicking["Target"]}}`)
        }
        else return new Error(`[${this.name}] [component: RandomTicking] [child: Target]: expected type {string} instead found {${typeof this.RandomTicking["Target"]}}`)
      }
      this.__components["minecraft:random_ticking"] = __RandomTicking;
    }
    /**
     * @handleStates
     */
    if (this.States) {
      if (typeof this.States !== "object") return new Error(`[${this.name}] [property: States]: expected type {object} instead found ${typeof this.States}`);
      let __States = {}
      for (let [state, values] of Object.entries(this.States)) {
        if (typeof state == "string") {
          let stateName = `${config["prefix"]}:${state}`
          __States[stateName] = [];
          values.forEach(v => {
            if (typeof values == ("boolean" || "number")) {
              __States[stateName].push(v)
            }
            else return new Error(`[${this.name}] [property: States] [name: ${stateName}]: expected type {string[]|number[]|boolean[]} instead found ${typeof v}`)
          })
        }
        else return new Error(`[${this.name}] [property: States] [name: ${state}]: expected type {string} instead found ${typeof state}`)
      }
      this.__Data["minecraft:block"]["description"]["states"] = __States;


    }
    /**
     * @handlePermutations
     */
    if (this.Permutations) {
      if (typeof this.Permutations === ("string" || "boolean" || "number" || "Function" || "object")) return new Error(`[${this.name}] [property: Permutations]: expected type {object[]} instead found {${typeof this.Permutations}}`);
      let __Permutations = []
      this.Permutations.forEach((p, i) => {
        let perm = {}
        let permc = perm["components"] = {}

        if (p["Condition"]) {
          if (typeof p["Condition"] == "string") {
            perm["condition"] = p["Condition"];
          }
          else return new Error(`[${this.name}] [property: Permutations] [index: ${i}] [prop: Condition]: expected type {string} instead found {${typeof p["Condition"]}}`)
        }
        for (let [key, val] of Object.entries(p)) {
          permc[key.toLowerCase()] = val
        }
        __Permutations.push(perm)
      })
      this.__Data["minecraft:block"]["permutations"] = __Permutations;
    }

    return JSON.stringify(this.__Data);
  }
}
}

exports.Block = Block;