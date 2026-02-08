/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Vector3 = $root.Vector3 = (() => {

    /**
     * Properties of a Vector3.
     * @exports IVector3
     * @interface IVector3
     * @property {number|null} [x] Vector3 x
     * @property {number|null} [y] Vector3 y
     * @property {number|null} [z] Vector3 z
     */

    /**
     * Constructs a new Vector3.
     * @exports Vector3
     * @classdesc I think this is better than `repeated float`
     * @implements IVector3
     * @constructor
     * @param {IVector3=} [properties] Properties to set
     */
    function Vector3(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Vector3 x.
     * @member {number} x
     * @memberof Vector3
     * @instance
     */
    Vector3.prototype.x = 0;

    /**
     * Vector3 y.
     * @member {number} y
     * @memberof Vector3
     * @instance
     */
    Vector3.prototype.y = 0;

    /**
     * Vector3 z.
     * @member {number} z
     * @memberof Vector3
     * @instance
     */
    Vector3.prototype.z = 0;

    /**
     * Creates a new Vector3 instance using the specified properties.
     * @function create
     * @memberof Vector3
     * @static
     * @param {IVector3=} [properties] Properties to set
     * @returns {Vector3} Vector3 instance
     */
    Vector3.create = function create(properties) {
        return new Vector3(properties);
    };

    /**
     * Encodes the specified Vector3 message. Does not implicitly {@link Vector3.verify|verify} messages.
     * @function encode
     * @memberof Vector3
     * @static
     * @param {IVector3} message Vector3 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Vector3.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.x != null && Object.hasOwnProperty.call(message, "x"))
            writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
        if (message.y != null && Object.hasOwnProperty.call(message, "y"))
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
        if (message.z != null && Object.hasOwnProperty.call(message, "z"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
        return writer;
    };

    /**
     * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link Vector3.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Vector3
     * @static
     * @param {IVector3} message Vector3 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Vector3.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Vector3 message from the specified reader or buffer.
     * @function decode
     * @memberof Vector3
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Vector3} Vector3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Vector3.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vector3();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.x = reader.float();
                    break;
                }
            case 2: {
                    message.y = reader.float();
                    break;
                }
            case 3: {
                    message.z = reader.float();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Vector3 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Vector3
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Vector3} Vector3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Vector3.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Vector3 message.
     * @function verify
     * @memberof Vector3
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Vector3.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.x != null && message.hasOwnProperty("x"))
            if (typeof message.x !== "number")
                return "x: number expected";
        if (message.y != null && message.hasOwnProperty("y"))
            if (typeof message.y !== "number")
                return "y: number expected";
        if (message.z != null && message.hasOwnProperty("z"))
            if (typeof message.z !== "number")
                return "z: number expected";
        return null;
    };

    /**
     * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Vector3
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Vector3} Vector3
     */
    Vector3.fromObject = function fromObject(object) {
        if (object instanceof $root.Vector3)
            return object;
        let message = new $root.Vector3();
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        if (object.z != null)
            message.z = Number(object.z);
        return message;
    };

    /**
     * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Vector3
     * @static
     * @param {Vector3} message Vector3
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Vector3.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.x = 0;
            object.y = 0;
            object.z = 0;
        }
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
        if (message.z != null && message.hasOwnProperty("z"))
            object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
        return object;
    };

    /**
     * Converts this Vector3 to JSON.
     * @function toJSON
     * @memberof Vector3
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Vector3.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Vector3
     * @function getTypeUrl
     * @memberof Vector3
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Vector3.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Vector3";
    };

    return Vector3;
})();

export const GameObjectDefinition = $root.GameObjectDefinition = (() => {

    /**
     * Properties of a GameObjectDefinition.
     * @exports IGameObjectDefinition
     * @interface IGameObjectDefinition
     * @property {number|null} [id] GameObjectDefinition id
     * @property {IVector3|null} [position] GameObjectDefinition position
     * @property {IVector3|null} [rotation] GameObjectDefinition rotation
     */

    /**
     * Constructs a new GameObjectDefinition.
     * @exports GameObjectDefinition
     * @classdesc Represents a GameObjectDefinition.
     * @implements IGameObjectDefinition
     * @constructor
     * @param {IGameObjectDefinition=} [properties] Properties to set
     */
    function GameObjectDefinition(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GameObjectDefinition id.
     * @member {number} id
     * @memberof GameObjectDefinition
     * @instance
     */
    GameObjectDefinition.prototype.id = 0;

    /**
     * GameObjectDefinition position.
     * @member {IVector3|null|undefined} position
     * @memberof GameObjectDefinition
     * @instance
     */
    GameObjectDefinition.prototype.position = null;

    /**
     * GameObjectDefinition rotation.
     * @member {IVector3|null|undefined} rotation
     * @memberof GameObjectDefinition
     * @instance
     */
    GameObjectDefinition.prototype.rotation = null;

    /**
     * Creates a new GameObjectDefinition instance using the specified properties.
     * @function create
     * @memberof GameObjectDefinition
     * @static
     * @param {IGameObjectDefinition=} [properties] Properties to set
     * @returns {GameObjectDefinition} GameObjectDefinition instance
     */
    GameObjectDefinition.create = function create(properties) {
        return new GameObjectDefinition(properties);
    };

    /**
     * Encodes the specified GameObjectDefinition message. Does not implicitly {@link GameObjectDefinition.verify|verify} messages.
     * @function encode
     * @memberof GameObjectDefinition
     * @static
     * @param {IGameObjectDefinition} message GameObjectDefinition message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameObjectDefinition.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        if (message.position != null && Object.hasOwnProperty.call(message, "position"))
            $root.Vector3.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.rotation != null && Object.hasOwnProperty.call(message, "rotation"))
            $root.Vector3.encode(message.rotation, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified GameObjectDefinition message, length delimited. Does not implicitly {@link GameObjectDefinition.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GameObjectDefinition
     * @static
     * @param {IGameObjectDefinition} message GameObjectDefinition message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameObjectDefinition.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GameObjectDefinition message from the specified reader or buffer.
     * @function decode
     * @memberof GameObjectDefinition
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameObjectDefinition} GameObjectDefinition
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameObjectDefinition.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameObjectDefinition();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.id = reader.int32();
                    break;
                }
            case 2: {
                    message.position = $root.Vector3.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.rotation = $root.Vector3.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GameObjectDefinition message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GameObjectDefinition
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameObjectDefinition} GameObjectDefinition
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameObjectDefinition.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GameObjectDefinition message.
     * @function verify
     * @memberof GameObjectDefinition
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GameObjectDefinition.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.position != null && message.hasOwnProperty("position")) {
            let error = $root.Vector3.verify(message.position);
            if (error)
                return "position." + error;
        }
        if (message.rotation != null && message.hasOwnProperty("rotation")) {
            let error = $root.Vector3.verify(message.rotation);
            if (error)
                return "rotation." + error;
        }
        return null;
    };

    /**
     * Creates a GameObjectDefinition message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GameObjectDefinition
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GameObjectDefinition} GameObjectDefinition
     */
    GameObjectDefinition.fromObject = function fromObject(object) {
        if (object instanceof $root.GameObjectDefinition)
            return object;
        let message = new $root.GameObjectDefinition();
        if (object.id != null)
            message.id = object.id | 0;
        if (object.position != null) {
            if (typeof object.position !== "object")
                throw TypeError(".GameObjectDefinition.position: object expected");
            message.position = $root.Vector3.fromObject(object.position);
        }
        if (object.rotation != null) {
            if (typeof object.rotation !== "object")
                throw TypeError(".GameObjectDefinition.rotation: object expected");
            message.rotation = $root.Vector3.fromObject(object.rotation);
        }
        return message;
    };

    /**
     * Creates a plain object from a GameObjectDefinition message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GameObjectDefinition
     * @static
     * @param {GameObjectDefinition} message GameObjectDefinition
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameObjectDefinition.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = 0;
            object.position = null;
            object.rotation = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.position != null && message.hasOwnProperty("position"))
            object.position = $root.Vector3.toObject(message.position, options);
        if (message.rotation != null && message.hasOwnProperty("rotation"))
            object.rotation = $root.Vector3.toObject(message.rotation, options);
        return object;
    };

    /**
     * Converts this GameObjectDefinition to JSON.
     * @function toJSON
     * @memberof GameObjectDefinition
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GameObjectDefinition.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for GameObjectDefinition
     * @function getTypeUrl
     * @memberof GameObjectDefinition
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    GameObjectDefinition.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/GameObjectDefinition";
    };

    return GameObjectDefinition;
})();

export const Star = $root.Star = (() => {

    /**
     * Properties of a Star.
     * @exports IStar
     * @interface IStar
     * @property {IGameObjectDefinition|null} [state] Star state
     * @property {boolean|null} [active] Star active
     */

    /**
     * Constructs a new Star.
     * @exports Star
     * @classdesc star definition
     * @implements IStar
     * @constructor
     * @param {IStar=} [properties] Properties to set
     */
    function Star(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Star state.
     * @member {IGameObjectDefinition|null|undefined} state
     * @memberof Star
     * @instance
     */
    Star.prototype.state = null;

    /**
     * Star active.
     * @member {boolean} active
     * @memberof Star
     * @instance
     */
    Star.prototype.active = false;

    /**
     * Creates a new Star instance using the specified properties.
     * @function create
     * @memberof Star
     * @static
     * @param {IStar=} [properties] Properties to set
     * @returns {Star} Star instance
     */
    Star.create = function create(properties) {
        return new Star(properties);
    };

    /**
     * Encodes the specified Star message. Does not implicitly {@link Star.verify|verify} messages.
     * @function encode
     * @memberof Star
     * @static
     * @param {IStar} message Star message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Star.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.state != null && Object.hasOwnProperty.call(message, "state"))
            $root.GameObjectDefinition.encode(message.state, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.active != null && Object.hasOwnProperty.call(message, "active"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.active);
        return writer;
    };

    /**
     * Encodes the specified Star message, length delimited. Does not implicitly {@link Star.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Star
     * @static
     * @param {IStar} message Star message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Star.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Star message from the specified reader or buffer.
     * @function decode
     * @memberof Star
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Star} Star
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Star.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Star();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.state = $root.GameObjectDefinition.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.active = reader.bool();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Star message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Star
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Star} Star
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Star.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Star message.
     * @function verify
     * @memberof Star
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Star.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.state != null && message.hasOwnProperty("state")) {
            let error = $root.GameObjectDefinition.verify(message.state);
            if (error)
                return "state." + error;
        }
        if (message.active != null && message.hasOwnProperty("active"))
            if (typeof message.active !== "boolean")
                return "active: boolean expected";
        return null;
    };

    /**
     * Creates a Star message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Star
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Star} Star
     */
    Star.fromObject = function fromObject(object) {
        if (object instanceof $root.Star)
            return object;
        let message = new $root.Star();
        if (object.state != null) {
            if (typeof object.state !== "object")
                throw TypeError(".Star.state: object expected");
            message.state = $root.GameObjectDefinition.fromObject(object.state);
        }
        if (object.active != null)
            message.active = Boolean(object.active);
        return message;
    };

    /**
     * Creates a plain object from a Star message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Star
     * @static
     * @param {Star} message Star
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Star.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.state = null;
            object.active = false;
        }
        if (message.state != null && message.hasOwnProperty("state"))
            object.state = $root.GameObjectDefinition.toObject(message.state, options);
        if (message.active != null && message.hasOwnProperty("active"))
            object.active = message.active;
        return object;
    };

    /**
     * Converts this Star to JSON.
     * @function toJSON
     * @memberof Star
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Star.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Star
     * @function getTypeUrl
     * @memberof Star
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Star.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Star";
    };

    return Star;
})();

export const Player = $root.Player = (() => {

    /**
     * Properties of a Player.
     * @exports IPlayer
     * @interface IPlayer
     * @property {IGameObjectDefinition|null} [state] Player state
     */

    /**
     * Constructs a new Player.
     * @exports Player
     * @classdesc Represents a Player.
     * @implements IPlayer
     * @constructor
     * @param {IPlayer=} [properties] Properties to set
     */
    function Player(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Player state.
     * @member {IGameObjectDefinition|null|undefined} state
     * @memberof Player
     * @instance
     */
    Player.prototype.state = null;

    /**
     * Creates a new Player instance using the specified properties.
     * @function create
     * @memberof Player
     * @static
     * @param {IPlayer=} [properties] Properties to set
     * @returns {Player} Player instance
     */
    Player.create = function create(properties) {
        return new Player(properties);
    };

    /**
     * Encodes the specified Player message. Does not implicitly {@link Player.verify|verify} messages.
     * @function encode
     * @memberof Player
     * @static
     * @param {IPlayer} message Player message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Player.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.state != null && Object.hasOwnProperty.call(message, "state"))
            $root.GameObjectDefinition.encode(message.state, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Player message, length delimited. Does not implicitly {@link Player.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Player
     * @static
     * @param {IPlayer} message Player message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Player.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Player message from the specified reader or buffer.
     * @function decode
     * @memberof Player
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Player} Player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Player.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Player();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.state = $root.GameObjectDefinition.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Player message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Player
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Player} Player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Player.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Player message.
     * @function verify
     * @memberof Player
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Player.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.state != null && message.hasOwnProperty("state")) {
            let error = $root.GameObjectDefinition.verify(message.state);
            if (error)
                return "state." + error;
        }
        return null;
    };

    /**
     * Creates a Player message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Player
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Player} Player
     */
    Player.fromObject = function fromObject(object) {
        if (object instanceof $root.Player)
            return object;
        let message = new $root.Player();
        if (object.state != null) {
            if (typeof object.state !== "object")
                throw TypeError(".Player.state: object expected");
            message.state = $root.GameObjectDefinition.fromObject(object.state);
        }
        return message;
    };

    /**
     * Creates a plain object from a Player message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Player
     * @static
     * @param {Player} message Player
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Player.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.state = null;
        if (message.state != null && message.hasOwnProperty("state"))
            object.state = $root.GameObjectDefinition.toObject(message.state, options);
        return object;
    };

    /**
     * Converts this Player to JSON.
     * @function toJSON
     * @memberof Player
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Player.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Player
     * @function getTypeUrl
     * @memberof Player
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Player.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Player";
    };

    return Player;
})();

export const WhoAreYou = $root.WhoAreYou = (() => {

    /**
     * Properties of a WhoAreYou.
     * @exports IWhoAreYou
     * @interface IWhoAreYou
     * @property {number|null} [targetId] WhoAreYou targetId
     */

    /**
     * Constructs a new WhoAreYou.
     * @exports WhoAreYou
     * @classdesc Represents a WhoAreYou.
     * @implements IWhoAreYou
     * @constructor
     * @param {IWhoAreYou=} [properties] Properties to set
     */
    function WhoAreYou(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * WhoAreYou targetId.
     * @member {number} targetId
     * @memberof WhoAreYou
     * @instance
     */
    WhoAreYou.prototype.targetId = 0;

    /**
     * Creates a new WhoAreYou instance using the specified properties.
     * @function create
     * @memberof WhoAreYou
     * @static
     * @param {IWhoAreYou=} [properties] Properties to set
     * @returns {WhoAreYou} WhoAreYou instance
     */
    WhoAreYou.create = function create(properties) {
        return new WhoAreYou(properties);
    };

    /**
     * Encodes the specified WhoAreYou message. Does not implicitly {@link WhoAreYou.verify|verify} messages.
     * @function encode
     * @memberof WhoAreYou
     * @static
     * @param {IWhoAreYou} message WhoAreYou message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WhoAreYou.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.targetId != null && Object.hasOwnProperty.call(message, "targetId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.targetId);
        return writer;
    };

    /**
     * Encodes the specified WhoAreYou message, length delimited. Does not implicitly {@link WhoAreYou.verify|verify} messages.
     * @function encodeDelimited
     * @memberof WhoAreYou
     * @static
     * @param {IWhoAreYou} message WhoAreYou message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WhoAreYou.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a WhoAreYou message from the specified reader or buffer.
     * @function decode
     * @memberof WhoAreYou
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {WhoAreYou} WhoAreYou
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WhoAreYou.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.WhoAreYou();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.targetId = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a WhoAreYou message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof WhoAreYou
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {WhoAreYou} WhoAreYou
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WhoAreYou.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a WhoAreYou message.
     * @function verify
     * @memberof WhoAreYou
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    WhoAreYou.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.targetId != null && message.hasOwnProperty("targetId"))
            if (!$util.isInteger(message.targetId))
                return "targetId: integer expected";
        return null;
    };

    /**
     * Creates a WhoAreYou message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof WhoAreYou
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {WhoAreYou} WhoAreYou
     */
    WhoAreYou.fromObject = function fromObject(object) {
        if (object instanceof $root.WhoAreYou)
            return object;
        let message = new $root.WhoAreYou();
        if (object.targetId != null)
            message.targetId = object.targetId | 0;
        return message;
    };

    /**
     * Creates a plain object from a WhoAreYou message. Also converts values to other types if specified.
     * @function toObject
     * @memberof WhoAreYou
     * @static
     * @param {WhoAreYou} message WhoAreYou
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    WhoAreYou.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.targetId = 0;
        if (message.targetId != null && message.hasOwnProperty("targetId"))
            object.targetId = message.targetId;
        return object;
    };

    /**
     * Converts this WhoAreYou to JSON.
     * @function toJSON
     * @memberof WhoAreYou
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    WhoAreYou.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for WhoAreYou
     * @function getTypeUrl
     * @memberof WhoAreYou
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    WhoAreYou.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/WhoAreYou";
    };

    return WhoAreYou;
})();

export const Stars = $root.Stars = (() => {

    /**
     * Properties of a Stars.
     * @exports IStars
     * @interface IStars
     * @property {Array.<IStar>|null} [stars] Stars stars
     */

    /**
     * Constructs a new Stars.
     * @exports Stars
     * @classdesc Represents a Stars.
     * @implements IStars
     * @constructor
     * @param {IStars=} [properties] Properties to set
     */
    function Stars(properties) {
        this.stars = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Stars stars.
     * @member {Array.<IStar>} stars
     * @memberof Stars
     * @instance
     */
    Stars.prototype.stars = $util.emptyArray;

    /**
     * Creates a new Stars instance using the specified properties.
     * @function create
     * @memberof Stars
     * @static
     * @param {IStars=} [properties] Properties to set
     * @returns {Stars} Stars instance
     */
    Stars.create = function create(properties) {
        return new Stars(properties);
    };

    /**
     * Encodes the specified Stars message. Does not implicitly {@link Stars.verify|verify} messages.
     * @function encode
     * @memberof Stars
     * @static
     * @param {IStars} message Stars message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Stars.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.stars != null && message.stars.length)
            for (let i = 0; i < message.stars.length; ++i)
                $root.Star.encode(message.stars[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Stars message, length delimited. Does not implicitly {@link Stars.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Stars
     * @static
     * @param {IStars} message Stars message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Stars.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Stars message from the specified reader or buffer.
     * @function decode
     * @memberof Stars
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Stars} Stars
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Stars.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Stars();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.stars && message.stars.length))
                        message.stars = [];
                    message.stars.push($root.Star.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Stars message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Stars
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Stars} Stars
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Stars.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Stars message.
     * @function verify
     * @memberof Stars
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Stars.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.stars != null && message.hasOwnProperty("stars")) {
            if (!Array.isArray(message.stars))
                return "stars: array expected";
            for (let i = 0; i < message.stars.length; ++i) {
                let error = $root.Star.verify(message.stars[i]);
                if (error)
                    return "stars." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Stars message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Stars
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Stars} Stars
     */
    Stars.fromObject = function fromObject(object) {
        if (object instanceof $root.Stars)
            return object;
        let message = new $root.Stars();
        if (object.stars) {
            if (!Array.isArray(object.stars))
                throw TypeError(".Stars.stars: array expected");
            message.stars = [];
            for (let i = 0; i < object.stars.length; ++i) {
                if (typeof object.stars[i] !== "object")
                    throw TypeError(".Stars.stars: object expected");
                message.stars[i] = $root.Star.fromObject(object.stars[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Stars message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Stars
     * @static
     * @param {Stars} message Stars
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Stars.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.stars = [];
        if (message.stars && message.stars.length) {
            object.stars = [];
            for (let j = 0; j < message.stars.length; ++j)
                object.stars[j] = $root.Star.toObject(message.stars[j], options);
        }
        return object;
    };

    /**
     * Converts this Stars to JSON.
     * @function toJSON
     * @memberof Stars
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Stars.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Stars
     * @function getTypeUrl
     * @memberof Stars
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Stars.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Stars";
    };

    return Stars;
})();

export const GameTick = $root.GameTick = (() => {

    /**
     * Properties of a GameTick.
     * @exports IGameTick
     * @interface IGameTick
     * @property {Array.<IPlayer>|null} [players] GameTick players
     * @property {Array.<IStars>|null} [starsUpdate] GameTick starsUpdate
     */

    /**
     * Constructs a new GameTick.
     * @exports GameTick
     * @classdesc Represents a GameTick.
     * @implements IGameTick
     * @constructor
     * @param {IGameTick=} [properties] Properties to set
     */
    function GameTick(properties) {
        this.players = [];
        this.starsUpdate = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GameTick players.
     * @member {Array.<IPlayer>} players
     * @memberof GameTick
     * @instance
     */
    GameTick.prototype.players = $util.emptyArray;

    /**
     * GameTick starsUpdate.
     * @member {Array.<IStars>} starsUpdate
     * @memberof GameTick
     * @instance
     */
    GameTick.prototype.starsUpdate = $util.emptyArray;

    /**
     * Creates a new GameTick instance using the specified properties.
     * @function create
     * @memberof GameTick
     * @static
     * @param {IGameTick=} [properties] Properties to set
     * @returns {GameTick} GameTick instance
     */
    GameTick.create = function create(properties) {
        return new GameTick(properties);
    };

    /**
     * Encodes the specified GameTick message. Does not implicitly {@link GameTick.verify|verify} messages.
     * @function encode
     * @memberof GameTick
     * @static
     * @param {IGameTick} message GameTick message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameTick.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.players != null && message.players.length)
            for (let i = 0; i < message.players.length; ++i)
                $root.Player.encode(message.players[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.starsUpdate != null && message.starsUpdate.length)
            for (let i = 0; i < message.starsUpdate.length; ++i)
                $root.Stars.encode(message.starsUpdate[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified GameTick message, length delimited. Does not implicitly {@link GameTick.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GameTick
     * @static
     * @param {IGameTick} message GameTick message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameTick.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GameTick message from the specified reader or buffer.
     * @function decode
     * @memberof GameTick
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameTick} GameTick
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameTick.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameTick();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.players && message.players.length))
                        message.players = [];
                    message.players.push($root.Player.decode(reader, reader.uint32()));
                    break;
                }
            case 2: {
                    if (!(message.starsUpdate && message.starsUpdate.length))
                        message.starsUpdate = [];
                    message.starsUpdate.push($root.Stars.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GameTick message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GameTick
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameTick} GameTick
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameTick.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GameTick message.
     * @function verify
     * @memberof GameTick
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GameTick.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.players != null && message.hasOwnProperty("players")) {
            if (!Array.isArray(message.players))
                return "players: array expected";
            for (let i = 0; i < message.players.length; ++i) {
                let error = $root.Player.verify(message.players[i]);
                if (error)
                    return "players." + error;
            }
        }
        if (message.starsUpdate != null && message.hasOwnProperty("starsUpdate")) {
            if (!Array.isArray(message.starsUpdate))
                return "starsUpdate: array expected";
            for (let i = 0; i < message.starsUpdate.length; ++i) {
                let error = $root.Stars.verify(message.starsUpdate[i]);
                if (error)
                    return "starsUpdate." + error;
            }
        }
        return null;
    };

    /**
     * Creates a GameTick message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GameTick
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GameTick} GameTick
     */
    GameTick.fromObject = function fromObject(object) {
        if (object instanceof $root.GameTick)
            return object;
        let message = new $root.GameTick();
        if (object.players) {
            if (!Array.isArray(object.players))
                throw TypeError(".GameTick.players: array expected");
            message.players = [];
            for (let i = 0; i < object.players.length; ++i) {
                if (typeof object.players[i] !== "object")
                    throw TypeError(".GameTick.players: object expected");
                message.players[i] = $root.Player.fromObject(object.players[i]);
            }
        }
        if (object.starsUpdate) {
            if (!Array.isArray(object.starsUpdate))
                throw TypeError(".GameTick.starsUpdate: array expected");
            message.starsUpdate = [];
            for (let i = 0; i < object.starsUpdate.length; ++i) {
                if (typeof object.starsUpdate[i] !== "object")
                    throw TypeError(".GameTick.starsUpdate: object expected");
                message.starsUpdate[i] = $root.Stars.fromObject(object.starsUpdate[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a GameTick message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GameTick
     * @static
     * @param {GameTick} message GameTick
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameTick.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.players = [];
            object.starsUpdate = [];
        }
        if (message.players && message.players.length) {
            object.players = [];
            for (let j = 0; j < message.players.length; ++j)
                object.players[j] = $root.Player.toObject(message.players[j], options);
        }
        if (message.starsUpdate && message.starsUpdate.length) {
            object.starsUpdate = [];
            for (let j = 0; j < message.starsUpdate.length; ++j)
                object.starsUpdate[j] = $root.Stars.toObject(message.starsUpdate[j], options);
        }
        return object;
    };

    /**
     * Converts this GameTick to JSON.
     * @function toJSON
     * @memberof GameTick
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GameTick.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for GameTick
     * @function getTypeUrl
     * @memberof GameTick
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    GameTick.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/GameTick";
    };

    return GameTick;
})();

export const Input = $root.Input = (() => {

    /**
     * Properties of an Input.
     * @exports IInput
     * @interface IInput
     * @property {number|null} [targetId] Input targetId
     * @property {number|null} [input] Input input
     */

    /**
     * Constructs a new Input.
     * @exports Input
     * @classdesc Represents an Input.
     * @implements IInput
     * @constructor
     * @param {IInput=} [properties] Properties to set
     */
    function Input(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Input targetId.
     * @member {number} targetId
     * @memberof Input
     * @instance
     */
    Input.prototype.targetId = 0;

    /**
     * Input input.
     * @member {number} input
     * @memberof Input
     * @instance
     */
    Input.prototype.input = 0;

    /**
     * Creates a new Input instance using the specified properties.
     * @function create
     * @memberof Input
     * @static
     * @param {IInput=} [properties] Properties to set
     * @returns {Input} Input instance
     */
    Input.create = function create(properties) {
        return new Input(properties);
    };

    /**
     * Encodes the specified Input message. Does not implicitly {@link Input.verify|verify} messages.
     * @function encode
     * @memberof Input
     * @static
     * @param {IInput} message Input message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Input.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.targetId != null && Object.hasOwnProperty.call(message, "targetId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.targetId);
        if (message.input != null && Object.hasOwnProperty.call(message, "input"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.input);
        return writer;
    };

    /**
     * Encodes the specified Input message, length delimited. Does not implicitly {@link Input.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Input
     * @static
     * @param {IInput} message Input message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Input.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Input message from the specified reader or buffer.
     * @function decode
     * @memberof Input
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Input} Input
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Input.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Input();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.targetId = reader.int32();
                    break;
                }
            case 2: {
                    message.input = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Input message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Input
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Input} Input
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Input.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Input message.
     * @function verify
     * @memberof Input
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Input.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.targetId != null && message.hasOwnProperty("targetId"))
            if (!$util.isInteger(message.targetId))
                return "targetId: integer expected";
        if (message.input != null && message.hasOwnProperty("input"))
            if (!$util.isInteger(message.input))
                return "input: integer expected";
        return null;
    };

    /**
     * Creates an Input message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Input
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Input} Input
     */
    Input.fromObject = function fromObject(object) {
        if (object instanceof $root.Input)
            return object;
        let message = new $root.Input();
        if (object.targetId != null)
            message.targetId = object.targetId | 0;
        if (object.input != null)
            message.input = object.input | 0;
        return message;
    };

    /**
     * Creates a plain object from an Input message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Input
     * @static
     * @param {Input} message Input
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Input.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.targetId = 0;
            object.input = 0;
        }
        if (message.targetId != null && message.hasOwnProperty("targetId"))
            object.targetId = message.targetId;
        if (message.input != null && message.hasOwnProperty("input"))
            object.input = message.input;
        return object;
    };

    /**
     * Converts this Input to JSON.
     * @function toJSON
     * @memberof Input
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Input.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Input
     * @function getTypeUrl
     * @memberof Input
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Input.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Input";
    };

    return Input;
})();

export const Tick = $root.Tick = (() => {

    /**
     * Properties of a Tick.
     * @exports ITick
     * @interface ITick
     * @property {IStars|null} [starsInit] Tick starsInit
     * @property {IWhoAreYou|null} [youInit] Tick youInit
     * @property {IGameTick|null} [tick] Tick tick
     */

    /**
     * Constructs a new Tick.
     * @exports Tick
     * @classdesc The only message we actually send to clients
     * @implements ITick
     * @constructor
     * @param {ITick=} [properties] Properties to set
     */
    function Tick(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Tick starsInit.
     * @member {IStars|null|undefined} starsInit
     * @memberof Tick
     * @instance
     */
    Tick.prototype.starsInit = null;

    /**
     * Tick youInit.
     * @member {IWhoAreYou|null|undefined} youInit
     * @memberof Tick
     * @instance
     */
    Tick.prototype.youInit = null;

    /**
     * Tick tick.
     * @member {IGameTick|null|undefined} tick
     * @memberof Tick
     * @instance
     */
    Tick.prototype.tick = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Tick payload.
     * @member {"starsInit"|"youInit"|"tick"|undefined} payload
     * @memberof Tick
     * @instance
     */
    Object.defineProperty(Tick.prototype, "payload", {
        get: $util.oneOfGetter($oneOfFields = ["starsInit", "youInit", "tick"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Tick instance using the specified properties.
     * @function create
     * @memberof Tick
     * @static
     * @param {ITick=} [properties] Properties to set
     * @returns {Tick} Tick instance
     */
    Tick.create = function create(properties) {
        return new Tick(properties);
    };

    /**
     * Encodes the specified Tick message. Does not implicitly {@link Tick.verify|verify} messages.
     * @function encode
     * @memberof Tick
     * @static
     * @param {ITick} message Tick message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Tick.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.starsInit != null && Object.hasOwnProperty.call(message, "starsInit"))
            $root.Stars.encode(message.starsInit, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.youInit != null && Object.hasOwnProperty.call(message, "youInit"))
            $root.WhoAreYou.encode(message.youInit, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.tick != null && Object.hasOwnProperty.call(message, "tick"))
            $root.GameTick.encode(message.tick, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Tick message, length delimited. Does not implicitly {@link Tick.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Tick
     * @static
     * @param {ITick} message Tick message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Tick.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Tick message from the specified reader or buffer.
     * @function decode
     * @memberof Tick
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Tick} Tick
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Tick.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Tick();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.starsInit = $root.Stars.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.youInit = $root.WhoAreYou.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.tick = $root.GameTick.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Tick message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Tick
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Tick} Tick
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Tick.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Tick message.
     * @function verify
     * @memberof Tick
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Tick.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.starsInit != null && message.hasOwnProperty("starsInit")) {
            properties.payload = 1;
            {
                let error = $root.Stars.verify(message.starsInit);
                if (error)
                    return "starsInit." + error;
            }
        }
        if (message.youInit != null && message.hasOwnProperty("youInit")) {
            if (properties.payload === 1)
                return "payload: multiple values";
            properties.payload = 1;
            {
                let error = $root.WhoAreYou.verify(message.youInit);
                if (error)
                    return "youInit." + error;
            }
        }
        if (message.tick != null && message.hasOwnProperty("tick")) {
            if (properties.payload === 1)
                return "payload: multiple values";
            properties.payload = 1;
            {
                let error = $root.GameTick.verify(message.tick);
                if (error)
                    return "tick." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Tick message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Tick
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Tick} Tick
     */
    Tick.fromObject = function fromObject(object) {
        if (object instanceof $root.Tick)
            return object;
        let message = new $root.Tick();
        if (object.starsInit != null) {
            if (typeof object.starsInit !== "object")
                throw TypeError(".Tick.starsInit: object expected");
            message.starsInit = $root.Stars.fromObject(object.starsInit);
        }
        if (object.youInit != null) {
            if (typeof object.youInit !== "object")
                throw TypeError(".Tick.youInit: object expected");
            message.youInit = $root.WhoAreYou.fromObject(object.youInit);
        }
        if (object.tick != null) {
            if (typeof object.tick !== "object")
                throw TypeError(".Tick.tick: object expected");
            message.tick = $root.GameTick.fromObject(object.tick);
        }
        return message;
    };

    /**
     * Creates a plain object from a Tick message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Tick
     * @static
     * @param {Tick} message Tick
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Tick.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.starsInit != null && message.hasOwnProperty("starsInit")) {
            object.starsInit = $root.Stars.toObject(message.starsInit, options);
            if (options.oneofs)
                object.payload = "starsInit";
        }
        if (message.youInit != null && message.hasOwnProperty("youInit")) {
            object.youInit = $root.WhoAreYou.toObject(message.youInit, options);
            if (options.oneofs)
                object.payload = "youInit";
        }
        if (message.tick != null && message.hasOwnProperty("tick")) {
            object.tick = $root.GameTick.toObject(message.tick, options);
            if (options.oneofs)
                object.payload = "tick";
        }
        return object;
    };

    /**
     * Converts this Tick to JSON.
     * @function toJSON
     * @memberof Tick
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Tick.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Tick
     * @function getTypeUrl
     * @memberof Tick
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Tick.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Tick";
    };

    return Tick;
})();

export { $root as default };
