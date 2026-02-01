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

export const Star = $root.Star = (() => {

    /**
     * Properties of a Star.
     * @exports IStar
     * @interface IStar
     * @property {number|null} [id] Star id
     * @property {IVector3|null} [position] Star position
     * @property {IVector3|null} [rotation] Star rotation
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
     * Star id.
     * @member {number} id
     * @memberof Star
     * @instance
     */
    Star.prototype.id = 0;

    /**
     * Star position.
     * @member {IVector3|null|undefined} position
     * @memberof Star
     * @instance
     */
    Star.prototype.position = null;

    /**
     * Star rotation.
     * @member {IVector3|null|undefined} rotation
     * @memberof Star
     * @instance
     */
    Star.prototype.rotation = null;

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
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 5 =*/13).float(message.id);
        if (message.position != null && Object.hasOwnProperty.call(message, "position"))
            $root.Vector3.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.rotation != null && Object.hasOwnProperty.call(message, "rotation"))
            $root.Vector3.encode(message.rotation, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.active != null && Object.hasOwnProperty.call(message, "active"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.active);
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
                    message.id = reader.float();
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
            case 4: {
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
        if (message.id != null && message.hasOwnProperty("id"))
            if (typeof message.id !== "number")
                return "id: number expected";
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
        if (object.id != null)
            message.id = Number(object.id);
        if (object.position != null) {
            if (typeof object.position !== "object")
                throw TypeError(".Star.position: object expected");
            message.position = $root.Vector3.fromObject(object.position);
        }
        if (object.rotation != null) {
            if (typeof object.rotation !== "object")
                throw TypeError(".Star.rotation: object expected");
            message.rotation = $root.Vector3.fromObject(object.rotation);
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
            object.id = 0;
            object.position = null;
            object.rotation = null;
            object.active = false;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = options.json && !isFinite(message.id) ? String(message.id) : message.id;
        if (message.position != null && message.hasOwnProperty("position"))
            object.position = $root.Vector3.toObject(message.position, options);
        if (message.rotation != null && message.hasOwnProperty("rotation"))
            object.rotation = $root.Vector3.toObject(message.rotation, options);
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

export const Tick = $root.Tick = (() => {

    /**
     * Properties of a Tick.
     * @exports ITick
     * @interface ITick
     * @property {IStars|null} [stars] Tick stars
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
     * Tick stars.
     * @member {IStars|null|undefined} stars
     * @memberof Tick
     * @instance
     */
    Tick.prototype.stars = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Tick payload.
     * @member {"stars"|undefined} payload
     * @memberof Tick
     * @instance
     */
    Object.defineProperty(Tick.prototype, "payload", {
        get: $util.oneOfGetter($oneOfFields = ["stars"]),
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
        if (message.stars != null && Object.hasOwnProperty.call(message, "stars"))
            $root.Stars.encode(message.stars, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
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
                    message.stars = $root.Stars.decode(reader, reader.uint32());
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
        if (message.stars != null && message.hasOwnProperty("stars")) {
            properties.payload = 1;
            {
                let error = $root.Stars.verify(message.stars);
                if (error)
                    return "stars." + error;
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
        if (object.stars != null) {
            if (typeof object.stars !== "object")
                throw TypeError(".Tick.stars: object expected");
            message.stars = $root.Stars.fromObject(object.stars);
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
        if (message.stars != null && message.hasOwnProperty("stars")) {
            object.stars = $root.Stars.toObject(message.stars, options);
            if (options.oneofs)
                object.payload = "stars";
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
