(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Gridy = {})));
}(this, (function (exports) { 'use strict';

    (function (Shape) {
        Shape[Shape["Even"] = 0] = "Even";
        Shape[Shape["Odd"] = 1] = "Odd";
        Shape[Shape["Hexagonal"] = 2] = "Hexagonal";
        Shape[Shape["Triangular"] = 3] = "Triangular";
        Shape[Shape["Rhombus"] = 4] = "Rhombus";
    })(exports.Shape || (exports.Shape = {}));

    var SQRT_3 = Math.sqrt(3);
    var SQRT_3_2 = Math.sqrt(3) / 2;
    var SQRT_3_3 = Math.sqrt(3) / 3;
    var SQRT_3_6 = Math.sqrt(3) / 6;
    var SQRT_2 = Math.sqrt(2);
    var SQRT_2_2 = Math.sqrt(2) / 2;
    var SQRT_2_4 = Math.sqrt(2) / 4;
    var DEG_TO_RAD = Math.PI / 180;
    var ANG = 360;

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
    };

    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    var slicedToArray = function () {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function (arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();

    var Integer2 = function () {
        function Integer2() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            classCallCheck(this, Integer2);

            this.x = x;
            this.y = y;
        }

        createClass(Integer2, [{
            key: "distance",
            value: function distance(b) {
                return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y)) / 2);
            }
        }, {
            key: "toString",
            value: function toString() {
                return this.value.toString();
            }
        }, {
            key: "equals",
            value: function equals(p) {
                return this.x === p.x && this.y === p.y;
            }
        }, {
            key: "add",
            value: function add(p) {
                return new Integer2(this.x + p.x, this.y + p.y);
            }
        }, {
            key: "scale",
            value: function scale(d) {
                return new Integer2(this.x * d, this.y * d);
            }
        }, {
            key: "cubeLength",
            value: function cubeLength() {
                return Math.floor((Math.abs(this.x) + Math.abs(this.y)) / 2);
            }
        }, {
            key: "value",
            get: function get$$1() {
                return [this.x, this.y];
            }
        }]);
        return Integer2;
    }();

    var Float2 = function () {
        function Float2() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            classCallCheck(this, Float2);

            this.x = x;
            this.y = y;
        }

        createClass(Float2, [{
            key: 'equals',
            value: function equals(p) {
                return this.x === p.x && this.y === p.y;
            }
        }, {
            key: 'scale',
            value: function scale(k) {
                return new Float2(this.x * k, this.y * k);
            }
        }, {
            key: 'toString',
            value: function toString() {
                return this.value.toString();
            }
        }, {
            key: 'value',
            get: function get$$1() {
                return [this.x, this.y];
            }
        }], [{
            key: 'ROUND',
            value: function ROUND(h) {
                var rx = Math.round(h.x);
                var ry = Math.round(h.y);
                return new Integer2(rx, ry);
            }
        }, {
            key: 'LERP',
            value: function LERP(a, b, t) {
                return new Float2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
            }
        }, {
            key: 'LINE',
            value: function LINE(a, b) {
                var N = a.distance(b);
                var results = [];
                for (var i = 0; i < N + 1; i++) {
                    results.push(Float2.ROUND(Float2.LERP(a, b, 1 / Math.max(1, N) * i)));
                }
                return results;
            }
        }]);
        return Float2;
    }();

    var Rectangle = function () {
        function Rectangle() {
            var minX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var maxX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var minY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var maxY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            classCallCheck(this, Rectangle);

            this.minX = 0;
            this.maxX = 0;
            this.minY = 0;
            this.maxY = 0;
            this.minX = minX;
            this.maxX = maxX;
            this.minY = minY;
            this.maxY = maxY;
        }

        createClass(Rectangle, null, [{
            key: 'ADD',
            value: function ADD(a, b) {
                return new Rectangle(a.minX + b.minX, a.maxX + b.maxX, a.minY + b.minY, a.maxY + b.maxY);
            }
        }, {
            key: 'POINTS',
            value: function POINTS(a) {
                return [new Float2(a.minX, a.minY), new Float2(a.maxX, a.minY), new Float2(a.minX, a.maxY), new Float2(a.maxX, a.maxY)];
            }
        }]);
        return Rectangle;
    }();

    // From http://www.redblobgames.com/grids/hexagons/
    // Copyright 2012 Red Blob Games <redblobgames@gmail.com>
    // License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
    // Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx
    function boundsOfPoints(points) {
        var rectangle = new Rectangle(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var p = _step.value;

                if (p.x < rectangle.minX) {
                    rectangle.minX = p.x;
                }
                if (p.x > rectangle.maxX) {
                    rectangle.maxX = p.x;
                }
                if (p.y < rectangle.minY) {
                    rectangle.minY = p.y;
                }
                if (p.y > rectangle.maxY) {
                    rectangle.maxY = p.y;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return rectangle;
    }
    function bounds(grid) {
        if (grid.tileTypes === 2) {
            var sum = [];
            var centers = grid.tiles.reduce(function (r, tile) {
                r[grid.getTileType(tile)].push(grid.center(tile));
                return r;
            }, [[], []]);
            for (var i = 0; i < 2; i++) {
                var b1 = boundsOfPoints(grid.vertices(grid.orientation, undefined, i));
                var b2 = boundsOfPoints(centers[i]);
                sum = sum.concat(Rectangle.POINTS(Rectangle.ADD(b1, b2)));
            }
            return boundsOfPoints(sum);
        } else {
            var _centers = grid.tiles.map(function (tile) {
                return grid.center(tile);
            });
            var _b = boundsOfPoints(grid.vertices(grid.orientation));
            var _b2 = boundsOfPoints(_centers);
            return Rectangle.ADD(_b, _b2);
        }
    }

    var Axes4;
    (function (Axes4) {
        Axes4[Axes4["N"] = -1] = "N";
        Axes4[Axes4["S"] = 1] = "S";
        Axes4[Axes4["W"] = -2] = "W";
        Axes4[Axes4["E"] = 2] = "E";
    })(Axes4 || (Axes4 = {}));
    var Axes8;
    (function (Axes8) {
        Axes8[Axes8["N"] = 1] = "N";
        Axes8[Axes8["E"] = 2] = "E";
        Axes8[Axes8["NW"] = 3] = "NW";
        Axes8[Axes8["SW"] = 4] = "SW";
        Axes8[Axes8["S"] = -1] = "S";
        Axes8[Axes8["W"] = -2] = "W";
        Axes8[Axes8["SE"] = -3] = "SE";
        Axes8[Axes8["NE"] = -4] = "NE";
    })(Axes8 || (Axes8 = {}));
    var Axes6;
    (function (Axes6) {
        Axes6[Axes6["N"] = -1] = "N";
        Axes6[Axes6["S"] = 1] = "S";
        Axes6[Axes6["NW"] = -2] = "NW";
        Axes6[Axes6["SE"] = 2] = "SE";
        Axes6[Axes6["NE"] = -3] = "NE";
        Axes6[Axes6["SW"] = 3] = "SW";
    })(Axes6 || (Axes6 = {}));

    var Integer3 = function () {
        function Integer3() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            classCallCheck(this, Integer3);

            this.x = x;
            this.y = y;
            this.z = z;
        }

        createClass(Integer3, [{
            key: "distance",
            value: function distance(b) {
                return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y) + Math.abs(this.z - b.z)) / 2);
            }
        }, {
            key: "add",
            value: function add(b) {
                return new Integer3(this.x + b.x, this.y + b.y, this.z + b.z);
            }
        }, {
            key: "scale",
            value: function scale(k) {
                return new Integer3(this.x * k, this.y * k, this.z * k);
            }
        }, {
            key: "toString",
            value: function toString() {
                return this.value.toString();
            }
        }, {
            key: "equals",
            value: function equals(other) {
                return this.x === other.x && this.y === other.y && this.z === other.z;
            }
        }, {
            key: "round",
            value: function round() {
                return new Integer3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
            }
        }, {
            key: "cubeLength",
            value: function cubeLength() {
                return Math.floor((Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) / 2);
            }
        }, {
            key: "value",
            get: function get$$1() {
                return [this.x, this.y, this.z];
            }
        }]);
        return Integer3;
    }();

    // From http://www.redblobgames.com/grids/hexagons/
    // Copyright 2013 Red Blob Games <redblobgames@gmail.com>
    // License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
    // Original source: http://www.redblobgames.com/grids/hexagons/Cube.hx
    /**
     * ![](../../examples/output/hexagonal-tile.svg)
     */
    var HexagonalTile = function (_Integer) {
        inherits(HexagonalTile, _Integer);

        function HexagonalTile() {
            classCallCheck(this, HexagonalTile);

            var _this = possibleConstructorReturn(this, (HexagonalTile.__proto__ || Object.getPrototypeOf(HexagonalTile)).apply(this, arguments));

            _this.tiles = [];
            return _this;
        }

        createClass(HexagonalTile, [{
            key: 'shift',
            value: function shift() {
                return HexagonalTile.directions[4][1];
            }
        }, {
            key: 'directions',
            value: function directions() {
                return HexagonalTile.directions;
            }
        }, {
            key: 'add',
            value: function add(a) {
                var r = get(HexagonalTile.prototype.__proto__ || Object.getPrototypeOf(HexagonalTile.prototype), 'add', this).call(this, a);
                return new HexagonalTile(r.x, r.y, r.z);
            }
        }, {
            key: 'scale',
            value: function scale(a) {
                var r = get(HexagonalTile.prototype.__proto__ || Object.getPrototypeOf(HexagonalTile.prototype), 'scale', this).call(this, a);
                return new HexagonalTile(r.x, r.y, r.z);
            }
        }, {
            key: 'neighbors',
            value: function neighbors() {
                var results = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = HexagonalTile.directions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var a = _step.value;

                        results.push([a[0], this.add(a[1])]);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return results;
            }
        }, {
            key: 'right',
            value: function right() {
                var x = this.x;
                this.x = -this.z;
                this.z = -this.y;
                this.y = -x;
                return this;
            }
        }, {
            key: 'left',
            value: function left() {
                var z = this.z;
                this.z = -this.x;
                this.x = -this.y;
                this.y = -z;
                return this;
            }
        }, {
            key: 'key',
            get: function get$$1() {
                return this.toString();
            }
        }]);
        return HexagonalTile;
    }(Integer3);
    HexagonalTile.directions = [[Axes6.NW, new HexagonalTile(1, -1, 0)], [Axes6.NE, new HexagonalTile(1, 0, -1)], [Axes6.N, new HexagonalTile(0, 1, -1)], [Axes6.SE, new HexagonalTile(-1, 1, 0)], [Axes6.SW, new HexagonalTile(-1, 0, 1)], [Axes6.S, new HexagonalTile(0, -1, 1)]];

    var TileType;
    (function (TileType) {
        TileType[TileType["Simple"] = 1] = "Simple";
        TileType[TileType["Variable"] = 2] = "Variable";
    })(TileType || (TileType = {}));

    // From http://www.redblobgames.com/grids/hexagons/
    // Copyright 2012 Red Blob Games <redblobgames@gmail.com>
    // License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
    // Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx
    /**
     * ![](../../examples/output/hexagonal-grid.svg)
     */
    var HexagonalGrid = function () {
        function HexagonalGrid(scale) {
            var orientation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var shape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : exports.Shape.Hexagonal;
            var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
            var y = arguments[4];
            classCallCheck(this, HexagonalGrid);

            this.scaleY = -1;
            this.angle = -30;
            this.tileTypes = TileType.Simple;
            this.scale = scale;
            this.radius = SQRT_3_2 * scale / SQRT_3_2 / 2;
            this.orientation = orientation;
            var yy = y || x;
            this.x = x;
            this.y = yy;
            this.shape = shape;
            if (shape === exports.Shape.Even && orientation === false) {
                this.toTile = HexagonalGrid.EVEN_Q_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_EVEN_Q;
                this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
            } else if (shape === exports.Shape.Even && orientation === true) {
                this.toTile = HexagonalGrid.EVEN_R_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_EVEN_R;
                this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
            } else if (shape === exports.Shape.Odd && orientation === false) {
                this.toTile = HexagonalGrid.ODD_Q_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_ODD_Q;
                this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
            } else if (shape === exports.Shape.Odd && orientation === true) {
                this.toTile = HexagonalGrid.ODD_R_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_ODD_R;
                this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
            } else if (shape === exports.Shape.Hexagonal) {
                // this.toTile = HexagonalGrid.EVEN_Q_TO_CUBE;
                // this.toPoint = HexagonalGrid.CUBE_TO_EVEN_Q;
                this.toTile = HexagonalGrid.TWO_AXIS_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_TWO_AXIS;
                this.tiles = HexagonalGrid.HEXAGONAL_SHAPE(x);
            } else if (shape === exports.Shape.Triangular) {
                this.toTile = HexagonalGrid.EVEN_Q_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_EVEN_Q;
                this.tiles = HexagonalGrid.TRIANGULAR_SHAPE(x);
            } else {
                // if (shape === Shape.Rhombus)
                this.toTile = HexagonalGrid.TWO_AXIS_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_TWO_AXIS;
                this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
            }
        }

        createClass(HexagonalGrid, [{
            key: 'bounds',
            value: function bounds$$1() {
                return bounds(this);
            }
        }, {
            key: 'vertices',
            value: function vertices(orientation, scale) {
                var points = [];
                var s = scale === undefined ? this.scale : scale;
                s /= SQRT_3_2;
                var o = orientation === undefined ? false : this.orientation;
                for (var i = 0; i < 6; i++) {
                    var angle = Math.PI * (i * 2 - (o ? 1 : 0)) * 2 / 12;
                    points.push(new Float2(s * Math.cos(angle) * 0.5, s * Math.sin(angle) * 0.5));
                }
                return points;
            }
        }, {
            key: 'center',
            value: function center(tile) {
                var s = void 0;
                var size = this.scale / SQRT_3_2 / 2;
                if (this.orientation) {
                    s = new Float2(SQRT_3 * tile.x + SQRT_3_2 * tile.z, tile.z * this.scaleY * 1.5);
                } else {
                    s = new Float2(tile.x * 1.5, (SQRT_3_2 * tile.x + SQRT_3 * tile.z) * this.scaleY);
                }
                return s.scale(size);
            }
        }, {
            key: 'position',
            value: function position(p) {
                var size = this.scale / 2;
                var pp = p.scale(1 / size);
                pp.y *= this.scaleY;
                var q = void 0;
                var r = void 0;
                if (this.orientation) {
                    q = SQRT_3_3 * pp.x + -1 / 3 * pp.y;
                    r = 2 / 3 * pp.y;
                } else {
                    q = 2 / 3 * pp.x;
                    r = -1 / 3 * pp.x + SQRT_3_3 * pp.y;
                }
                return new HexagonalTile(Math.round(q), Math.round(-q - r), Math.round(r));
            }
        }, {
            key: 'tile',
            value: function tile(x, y) {
                return this.toTile ? this.toTile(new Integer2(x, y)) : undefined;
            }
        }], [{
            key: 'TWO_AXIS_TO_CUBE',
            value: function TWO_AXIS_TO_CUBE(position) {
                return new HexagonalTile(position.x, -position.y - position.x, position.y);
            }
        }, {
            key: 'CUBE_TO_TWO_AXIS',
            value: function CUBE_TO_TWO_AXIS(tile) {
                return new Integer2(tile.x, tile.z);
            }
        }, {
            key: 'TWO_AXIS_TO_CUBE_XY',
            value: function TWO_AXIS_TO_CUBE_XY(position) {
                return new HexagonalTile(position.x, position.y, -position.x - position.y);
            }
        }, {
            key: 'CUBE_TO_TWO_AXIS_XY',
            value: function CUBE_TO_TWO_AXIS_XY(tile) {
                return new Integer2(tile.x, tile.y);
            }
        }, {
            key: 'TWO_AXIS_TO_CUBE_YZ',
            value: function TWO_AXIS_TO_CUBE_YZ(position) {
                return new HexagonalTile(-position.x - position.y, position.x, position.y);
            }
        }, {
            key: 'CUBE_TO_TWO_AXIS_YZ',
            value: function CUBE_TO_TWO_AXIS_YZ(tile) {
                return new Integer2(tile.y, tile.z);
            }
        }, {
            key: 'ODD_Q_TO_CUBE',
            value: function ODD_Q_TO_CUBE(position) {
                /* tslint:disable:no-bitwise */
                var x = position.x;
                var z = position.y - (position.x - (position.x & 1) >> 1);
                /* tslint:enable:no-bitwise */
                return new HexagonalTile(x, -x - z, z);
            }
        }, {
            key: 'CUBE_TO_ODD_Q',
            value: function CUBE_TO_ODD_Q(tile) {
                var x = tile.x;
                var z = tile.z;
                /* tslint:disable:no-bitwise */
                return new Integer2(x, z + (x - (x & 1) >> 1));
                /* tslint:enable:no-bitwise */
            }
        }, {
            key: 'EVEN_Q_TO_CUBE',
            value: function EVEN_Q_TO_CUBE(position) {
                /* tslint:disable:no-bitwise */
                var x = position.x;
                var z = position.y - (position.x + (position.x & 1) >> 1);
                /* tslint:enable:no-bitwise */
                return new HexagonalTile(x, -x - z, z);
            }
        }, {
            key: 'CUBE_TO_EVEN_Q',
            value: function CUBE_TO_EVEN_Q(tile) {
                var x = tile.x;
                var z = tile.z;
                /* tslint:disable:no-bitwise */
                return new Integer2(x, z + (x + (x & 1) >> 1));
                /* tslint:enable:no-bitwise */
            }
        }, {
            key: 'ODD_R_TO_CUBE',
            value: function ODD_R_TO_CUBE(position) {
                /* tslint:disable:no-bitwise */
                var z = position.y;
                var x = position.x - (position.y - (position.y & 1) >> 1);
                /* tslint:enable:no-bitwise */
                return new HexagonalTile(x, -x - z, z);
            }
        }, {
            key: 'CUBE_TO_ODD_R',
            value: function CUBE_TO_ODD_R(tile) {
                var x = tile.x;
                var z = tile.z;
                /* tslint:disable:no-bitwise */
                return new Integer2(x + (z - (z & 1) >> 1), z);
                /* tslint:enable:no-bitwise */
            }
        }, {
            key: 'EVEN_R_TO_CUBE',
            value: function EVEN_R_TO_CUBE(position) {
                /* tslint:disable:no-bitwise */
                var z = position.y;
                var x = position.x - (position.y + (position.y & 1) >> 1);
                /* tslint:enable:no-bitwise */
                return new HexagonalTile(x, -x - z, z);
            }
        }, {
            key: 'CUBE_TO_EVEN_R',
            value: function CUBE_TO_EVEN_R(tile) {
                var x = tile.x;
                var z = tile.z;
                /* tslint:disable:no-bitwise */
                return new Integer2(x + (z + (z & 1) >> 1), z);
                /* tslint:enable:no-bitwise */
            }
        }, {
            key: 'TRAPEZOIDAL_SHAPE',
            value: function TRAPEZOIDAL_SHAPE(minQ, maxQ, minR, maxR, toCube) {
                var hexes = [];
                for (var q = minQ; q < maxQ; q++) {
                    for (var r = minR; r < maxR; r++) {
                        hexes.push(toCube(new Integer2(q, r)));
                    }
                }
                return hexes;
            }
        }, {
            key: 'TRIANGULAR_SHAPE',
            value: function TRIANGULAR_SHAPE(size) {
                var hexes = [];
                for (var k = 0; k < size; k++) {
                    for (var i = 0; i < k + 1; i++) {
                        hexes.push(new HexagonalTile(i, -k, k - i));
                    }
                }
                return hexes;
            }
        }, {
            key: 'HEXAGONAL_SHAPE',
            value: function HEXAGONAL_SHAPE(size) {
                var hexes = [];
                for (var x = -size; x < size; x++) {
                    for (var y = -size; y < size; y++) {
                        var z = -x - y;
                        if (Math.abs(x) < size && Math.abs(y) < size && Math.abs(z) < size) {
                            hexes.push(new HexagonalTile(x, y, z));
                        }
                    }
                }
                return hexes;
            }
        }, {
            key: 'REGION',
            value: function REGION(xmin, xmax, ymin, ymax, zmin, zmax) {
                var results = [];
                for (var x = xmin; x <= xmax; x++) {
                    for (var y = Math.max(ymin, -x - zmax); y <= Math.min(ymax, -x - zmin); y++) {
                        var z = -x - y;
                        results.push(new HexagonalTile(x, y, z));
                    }
                }
                return results;
            }
        }]);
        return HexagonalGrid;
    }();
    HexagonalGrid.shapes = [exports.Shape.Hexagonal, exports.Shape.Rhombus, exports.Shape.Even, exports.Shape.Odd, exports.Shape.Triangular];

    /**
     * ![](../../examples/output/brick-grid.svg)
     */
    var BrickGrid = function (_HexagonalGrid) {
        inherits(BrickGrid, _HexagonalGrid);

        function BrickGrid(scale) {
            var orientation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var shape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : exports.Shape.Hexagonal;
            var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
            var y = arguments[4];
            classCallCheck(this, BrickGrid);

            var _this = possibleConstructorReturn(this, (BrickGrid.__proto__ || Object.getPrototypeOf(BrickGrid)).call(this, scale, orientation, shape, x, y));

            _this.angle = 0;
            _this.radius = SQRT_2_4 * scale;
            return _this;
        }

        createClass(BrickGrid, [{
            key: 'vertices',
            value: function vertices(orientation, scale) {
                var s = scale === undefined ? this.scale : scale;
                var points = [];
                for (var i = 0; i < 4; i++) {
                    var angle = Math.PI * (i * 2 - 1) * 2 / 8;
                    points.push(new Float2(s * Math.cos(angle) * 0.5, s * Math.sin(angle) * 0.5));
                }
                return points;
            }
        }, {
            key: 'center',
            value: function center(cube) {
                var s = void 0;
                var size = this.scale / 2;
                if (this.orientation) {
                    s = new Float2(SQRT_2 * cube.x + SQRT_2_2 * cube.z, SQRT_2 * cube.z * this.scaleY);
                } else {
                    s = new Float2(SQRT_2 * cube.x, (SQRT_2_2 * cube.x + SQRT_2 * cube.z) * this.scaleY);
                }
                return s.scale(size);
            }
        }]);
        return BrickGrid;
    }(HexagonalGrid);

    /**
     * ![](../../examples/output/triangular-tile.svg)
     */
    var TriangularTile = function (_Integer) {
        inherits(TriangularTile, _Integer);

        function TriangularTile() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            classCallCheck(this, TriangularTile);

            var _this = possibleConstructorReturn(this, (TriangularTile.__proto__ || Object.getPrototypeOf(TriangularTile)).call(this, x, y));

            _this.s = s;
            return _this;
        }

        createClass(TriangularTile, [{
            key: 'toString',
            value: function toString() {
                return this.value.toString();
            }
        }, {
            key: 'equals',
            value: function equals(p) {
                return this.s === p.s && get(TriangularTile.prototype.__proto__ || Object.getPrototypeOf(TriangularTile.prototype), 'equals', this).call(this, p);
            }
        }, {
            key: 'shift',
            value: function shift() {
                return TriangularTile.directions1[0][1];
            }
        }, {
            key: 'directions',
            value: function directions() {
                return this.s ? TriangularTile.directions2 : TriangularTile.directions1;
            }
        }, {
            key: 'opposite',
            value: function opposite(n) {
                return TriangularTile.opposites[this.s.toString()][n];
            }
        }, {
            key: 'add',
            value: function add(a) {
                var r = get(TriangularTile.prototype.__proto__ || Object.getPrototypeOf(TriangularTile.prototype), 'add', this).call(this, a);
                return new TriangularTile(r.x, r.y, a.s);
            }
        }, {
            key: 'scale',
            value: function scale(a) {
                var r = get(TriangularTile.prototype.__proto__ || Object.getPrototypeOf(TriangularTile.prototype), 'scale', this).call(this, a);
                return new TriangularTile(r.x, r.y);
            }
        }, {
            key: 'multiNeighbors',
            value: function multiNeighbors() {
                var results = [];
                for (var dir = 1; dir < 4; dir++) {
                    var d = TriangularTile.multiDirections[this.s.toString()][dir];
                    var t = this.s ? TriangularTile.directions2[d][1] : TriangularTile.directions1[d][1];
                    results.push([dir, this.add(t)]);
                    results.push([TriangularTile.multiOpposites[this.s.toString()][dir], this.add(t)]);
                }
                return results;
            }
        }, {
            key: 'neighbors',
            value: function neighbors() {
                var results = [];
                for (var dir = 0; dir < 3; dir++) {
                    results.push([TriangularTile.directions1[dir][0], this.add(this.s ? TriangularTile.directions2[dir][1] : TriangularTile.directions1[dir][1])]);
                }
                return results;
            }
        }, {
            key: 'key',
            get: function get$$1() {
                return this.toString();
            }
        }, {
            key: 'value',
            get: function get$$1() {
                return [this.x, this.y, this.s];
            }
        }]);
        return TriangularTile;
    }(Integer2);
    TriangularTile.directions1 = [[1, new TriangularTile(0, 0, true)], [2, new TriangularTile(-1, 0, true)], [3, new TriangularTile(0, -1, true)]];
    TriangularTile.directions2 = [[1, new TriangularTile(0, 1, false)], [2, new TriangularTile(0, 0, false)], [3, new TriangularTile(1, 0, false)]];
    TriangularTile.opposites = {
        false: {
            1: 3,
            2: 1,
            3: 2
        },
        true: {
            1: 2,
            2: 3,
            3: 1
        }
    };
    TriangularTile.multiOpposites = {
        false: {
            '-1': 2,
            '-2': 3,
            '-3': 1,
            1: -3,
            2: -1,
            3: -2
        },
        true: {
            '-1': 3,
            '-2': 1,
            '-3': 2,
            1: -2,
            2: -3,
            3: -1
        }
    };
    TriangularTile.multiDirections = {
        false: {
            1: 0,
            2: 2,
            3: 1
        },
        true: {
            1: 0,
            2: 2,
            3: 1
        }
    };

    /**
     * ![](../../examples/output/triangular-grid.svg)
     */
    var TriangularGrid = function () {
        function TriangularGrid(scale) {
            var orientation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var shape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : exports.Shape.Triangular;
            var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
            var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
            classCallCheck(this, TriangularGrid);

            this.scaleY = -1;
            this.angle = -60;
            this.tileTypes = TileType.Variable;
            this.scale = scale;
            this.radius = SQRT_3_6 * scale / SQRT_3_2;
            this.orientation = orientation;
            this.x = x;
            this.y = y;
            if (shape === exports.Shape.Rhombus) {
                this.tiles = this.rhombus();
                this.orientation = false;
            } else if (shape === exports.Shape.Hexagonal) {
                this.tiles = this.hexagonalShape(x);
                this.orientation = false;
            } else {
                this.tiles = this.triangle();
                this.orientation = false;
            }
            this.toPoint = function (tile) {
                return new Integer2(tile.x * 2 + (tile.s ? 1 : 0), tile.y);
            };
            this.toTile = function (position) {
                return new TriangularTile(position.x / 2 - position.x % 2, position.y);
            };
        }

        createClass(TriangularGrid, [{
            key: 'bounds',
            value: function bounds$$1() {
                return bounds(this);
            }
        }, {
            key: 'center',
            value: function center(tile) {
                var scale = this.scale / SQRT_3_2;
                return new Float2((tile.x * 2 + (tile.s ? 1 : 0) + tile.y) * scale / 2, scale * (tile.y * SQRT_3_2 + (tile.s ? 0 : -SQRT_3_6)) * this.scaleY);
            }
        }, {
            key: 'vertices',
            value: function vertices(orientation, scale) {
                var tileType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

                var s = scale === undefined ? this.scale : scale;
                s /= SQRT_3_2;
                if (this.scaleY > 0 ? tileType === 0 : tileType !== 0) {
                    return [new Float2(0, -s * SQRT_3_3), new Float2(-s / 2, s * SQRT_3_6), new Float2(s / 2, s * SQRT_3_6)];
                } else {
                    return [new Float2(0, s * (SQRT_3_6 + SQRT_3_6)), new Float2(-s / 2, -s * (SQRT_3_3 - SQRT_3_6)), new Float2(s / 2, -s * (SQRT_3_3 - SQRT_3_6))];
                }
            }
        }, {
            key: 'position',
            value: function position(p) {
                return new TriangularTile(Math.round(p.x), Math.round(p.y), false);
            }
        }, {
            key: 'getTileType',
            value: function getTileType(tile) {
                return tile.s ? 0 : 1;
            }
        }, {
            key: 'tile',
            value: function tile(x, y) {
                return new TriangularTile(Math.floor(x / 2), y, !!(x % 2));
            }
        }, {
            key: 'rhombus',
            value: function rhombus() {
                var results = [];
                for (var px = 0; px < this.x; px++) {
                    for (var py = 0; py < this.y; py++) {
                        results.push(new TriangularTile(px, py, false));
                        results.push(new TriangularTile(px, py, true));
                    }
                }
                return results;
            }
        }, {
            key: 'triangle',
            value: function triangle() {
                var results = [];
                for (var py = 0; py < this.x; py++) {
                    for (var px = 0; px < this.x - py; px++) {
                        results.push(new TriangularTile(px, py, false));
                        if (px < this.x - py - 1) {
                            results.push(new TriangularTile(px, py, true));
                        }
                    }
                }
                return results;
            }
        }, {
            key: 'hexagonalShape',
            value: function hexagonalShape(size) {
                var results = [];
                for (var x = -size; x < size; x++) {
                    for (var y = -size; y < size; y++) {
                        if (Math.abs(-x - y) <= size && x + y < size) {
                            results.push(new TriangularTile(x, y, false));
                        }
                        if (Math.abs(-x - y) - 1 <= size && x + y + 1 < size) {
                            results.push(new TriangularTile(x, y, true));
                        }
                    }
                }
                return results;
            }
        }]);
        return TriangularGrid;
    }();
    TriangularGrid.shapes = [exports.Shape.Hexagonal, exports.Shape.Rhombus, exports.Shape.Triangular];

    var Float3 = function () {
        function Float3(x, y, z) {
            classCallCheck(this, Float3);

            this.x = x;
            this.y = y;
            this.z = z;
        }

        createClass(Float3, [{
            key: 'equals',
            value: function equals(other) {
                return this.x === other.x && this.y === other.y && this.z === other.z;
            }
        }, {
            key: 'toString',
            value: function toString() {
                return this.value.toString();
            }
        }, {
            key: 'round',
            value: function round() {
                return Float3.ROUND(this);
            }
        }, {
            key: 'value',
            get: function get$$1() {
                return [this.x, this.y, this.z];
            }
        }], [{
            key: 'ROUND',
            value: function ROUND(h) {
                var rx = Math.round(h.x);
                var ry = Math.round(h.y);
                var rz = Math.round(h.z);
                var xDiff = Math.abs(rx - h.x);
                var yDiff = Math.abs(ry - h.y);
                var zDiff = Math.abs(rz - h.z);
                if (xDiff > yDiff && xDiff > zDiff) {
                    rx = -ry - rz;
                } else if (yDiff > zDiff) {
                    ry = -rx - rz;
                } else {
                    rz = -rx - ry;
                }
                return new Integer3(rx, ry, rz);
            }
        }, {
            key: 'LERP',
            value: function LERP(a, b, t) {
                return new Float3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
            }
        }, {
            key: 'LINE',
            value: function LINE(a, b) {
                var N = a.distance(b);
                var results = [];
                for (var i = 0; i < N + 1; i++) {
                    results.push(Float3.ROUND(Float3.LERP(a, b, 1 / Math.max(1, N) * i)));
                }
                return results;
            }
        }]);
        return Float3;
    }();

    /**
     * ![](../../examples/output/radial-tile.svg)
     * x: angle position
     * y: radius position
     * z: radius width
     * w: angular length
     */
    var RadialTile = function (_Integer) {
        inherits(RadialTile, _Integer);

        function RadialTile() {
            classCallCheck(this, RadialTile);

            var _this = possibleConstructorReturn(this, (RadialTile.__proto__ || Object.getPrototypeOf(RadialTile)).apply(this, arguments));

            _this.tiles = [];
            return _this;
        }

        createClass(RadialTile, [{
            key: 'shift',
            value: function shift() {
                return new RadialTile(-1, 1, 0);
            }
        }, {
            key: 'directions',
            value: function directions() {
                return RadialTile.directions;
            }
        }, {
            key: 'add',
            value: function add(a) {
                var length = this.z || a.z;
                var angle = this.x + a.x;
                angle = angle % length;
                angle = (angle + length) % length;
                return new RadialTile(angle, this.y + a.y, length);
            }
        }, {
            key: 'scale',
            value: function scale(a) {
                return new RadialTile(this.x, this.y * a, this.z);
            }
        }, {
            key: 'cubeLength',
            value: function cubeLength() {
                return Math.floor(Math.abs(this.y));
            }
        }, {
            key: 'neighbors',
            value: function neighbors() {
                var results = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = RadialTile.directions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var a = _step.value;

                        results.push([a[0], this.add(a[1])]);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return results;
            }
        }, {
            key: 'value',
            get: function get$$1() {
                return [this.x, this.y];
            }
        }, {
            key: 'key',
            get: function get$$1() {
                return this.toString();
            }
        }]);
        return RadialTile;
    }(Integer3);
    RadialTile.directions = [[Axes4.N, new RadialTile(0, -1, 0)], [Axes4.S, new RadialTile(0, 1, 0)], [Axes4.E, new RadialTile(1, 0, 0)], [Axes4.W, new RadialTile(-1, 0, 0)]];

    /**
     * ![](../../examples/output/Radial-grid.svg)
     */
    var RadialGrid = function () {
        function RadialGrid(scale) {
            var orientation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var shape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : exports.Shape.Even;
            var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
            var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

            var _this = this;

            var tile = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : RadialTile;
            var startY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
            classCallCheck(this, RadialGrid);

            this.scaleY = -1;
            this.angle = -0;
            this.tileTypes = TileType.Simple;
            this.irregular = true;
            this.scale = scale;
            this.radius = scale / 2;
            this.orientation = orientation;
            this.x = x;
            this.y = y;
            this.startY = startY;
            this.tileCtor = tile;
            var results = [];
            for (var px = 0; px < x; px++) {
                for (var py = startY; py < y; py++) {
                    results.push(new tile(px, py, x));
                }
            }
            this.tiles = results;
            this.toTile = function (p) {
                return new _this.tileCtor(p.x, p.y);
            };
            this.toPoint = function (p) {
                return new Integer2(p.x, p.y);
            };
        }

        createClass(RadialGrid, [{
            key: 'bounds',
            value: function bounds() {
                var r = this.scale * this.y;
                return new Rectangle(-r, r, -r, r);
                // return bounds(this);
            }
        }, {
            key: 'vertices',
            value: function vertices(orientation, scale, tileType, tile) {
                var t = tile;
                var points = [];
                var c = this.center(t);
                points.push(this.center(new Float3(t.x - 0.5, t.y - 0.5, t.z)));
                points.push(this.center(new Float3(t.x + 0.5, t.y - 0.5, t.z)));
                points.push(this.center(new Float3(t.x + 0.5, t.y + 0.5, t.z)));
                points.push(this.center(new Float3(t.x - 0.5, t.y + 0.5, t.z)));
                return points.map(function (p) {
                    return new Float2(p.x - c.x, p.y - c.y);
                });
            }
        }, {
            key: 'path',
            value: function path(tile) {
                var p = this.vertices(false, 0, 0, tile);
                var c = this.center(tile);
                var r1 = this.scale * tile.y;
                var r2 = this.scale * (tile.y + 1);
                return 'M ' + p[0].x + ' ' + p[0].y + ' A ' + r1 + ' ' + r1 + ' 0 0 0 ' + p[1].x + ' ' + p[1].y + ' ' + ('L ' + p[2].x + ' ' + p[2].y + ' A ' + r2 + ' ' + r2 + ' 0 0 1 ' + p[3].x + ' ' + p[3].y + ' Z');
            }
        }, {
            key: 'position',
            value: function position(p) {
                return new this.tileCtor(Math.round(p.x / this.scale), Math.round(p.y / this.scale * this.scaleY));
            }
        }, {
            key: 'tile',
            value: function tile(x, y) {
                return this.toTile(new Integer2(x, y));
            }
        }, {
            key: 'center',
            value: function center(tile) {
                var angle = void 0;
                if (this.orientation) {
                    angle = tile.x + 0.5;
                    angle = angle % tile.z;
                    angle = (angle + tile.z) % tile.z;
                    angle = angle * DEG_TO_RAD * (ANG / tile.z);
                } else {
                    angle = tile.x * DEG_TO_RAD * (ANG / tile.z);
                }
                return new Float2((tile.y + 0.5) * this.scale * Math.sin(angle), (tile.y + 0.5) * this.scale * Math.cos(angle));
            }
        }]);
        return RadialGrid;
    }();

    /**
     * ![](../../examples/output/rectangular-tile.svg)
     */
    var RectangularTile = function (_Integer) {
        inherits(RectangularTile, _Integer);

        function RectangularTile() {
            classCallCheck(this, RectangularTile);
            return possibleConstructorReturn(this, (RectangularTile.__proto__ || Object.getPrototypeOf(RectangularTile)).apply(this, arguments));
        }

        createClass(RectangularTile, [{
            key: 'shift',
            value: function shift() {
                return new RectangularTile(-1, 1);
            }
        }, {
            key: 'directions',
            value: function directions() {
                return RectangularTile.directions;
            }
        }, {
            key: 'add',
            value: function add(a) {
                var r = get(RectangularTile.prototype.__proto__ || Object.getPrototypeOf(RectangularTile.prototype), 'add', this).call(this, a);
                return new RectangularTile(r.x, r.y);
            }
        }, {
            key: 'scale',
            value: function scale(a) {
                var r = get(RectangularTile.prototype.__proto__ || Object.getPrototypeOf(RectangularTile.prototype), 'scale', this).call(this, a);
                return new RectangularTile(r.x, r.y);
            }
        }, {
            key: 'neighbors',
            value: function neighbors() {
                var results = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = RectangularTile.directions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var dir = _step.value;

                        results.push([dir[0], this.add(dir[1])]);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return results;
            }
        }, {
            key: 'key',
            get: function get$$1() {
                return this.toString();
            }
        }]);
        return RectangularTile;
    }(Integer2);
    RectangularTile.directions = [[Axes4.N, new RectangularTile(0, -1)], [Axes4.E, new RectangularTile(1, 0)], [Axes4.S, new RectangularTile(0, 1)], [Axes4.W, new RectangularTile(-1, 0)]];

    // TypeScript version of http://www.redblobgames.com/articles/grids/hexagons/
    // Copyright 2013 Red Blob Games <redblobgames@gmail.com>
    // License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
    /**
     * ![](../../examples/output/rectangular-grid.svg)
     */
    var RectangularGrid = function () {
        function RectangularGrid(scale) {
            var orientation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var shape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : exports.Shape.Even;
            var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
            var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

            var _this = this;

            var tile = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : RectangularTile;
            var startY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
            classCallCheck(this, RectangularGrid);

            this.scaleY = -1;
            this.angle = -45;
            this.tileTypes = TileType.Simple;
            this.scale = scale;
            this.radius = scale / 2;
            this.orientation = orientation;
            this.x = x;
            this.y = y;
            this.startY = y;
            this.tileCtor = tile;
            var results = [];
            for (var px = 0; px < x; px++) {
                for (var py = startY; py < y; py++) {
                    results.push(new tile(px, py));
                }
            }
            this.tiles = results;
            this.toTile = function (p) {
                return new _this.tileCtor(p.x, p.y);
            };
            this.toPoint = function (p) {
                return new Integer2(p.x, p.y);
            };
        }

        createClass(RectangularGrid, [{
            key: 'bounds',
            value: function bounds$$1() {
                return bounds(this);
            }
        }, {
            key: 'center',
            value: function center(tile) {
                if (this.orientation) {
                    return new Float2(tile.x * this.scale / SQRT_2 + tile.y * this.scale * this.scaleY / SQRT_2, tile.y * this.scale * this.scaleY / SQRT_2 - tile.x * this.scale / SQRT_2);
                } else {
                    return new Float2(tile.x * this.scale, tile.y * this.scale * this.scaleY);
                }
            }
        }, {
            key: 'vertices',
            value: function vertices(orientation, scale) {
                var points = [];
                var s = scale === undefined ? this.scale : scale;
                var o = orientation === undefined ? false : this.orientation;
                if (o) {
                    s *= SQRT_2;
                    points.push(new Float2(-s / 2, 0));
                    points.push(new Float2(0, -s / 2));
                    points.push(new Float2(s / 2, 0));
                    points.push(new Float2(0, s / 2));
                } else {
                    points.push(new Float2(-s / 2, -s / 2));
                    points.push(new Float2(-s / 2, s / 2));
                    points.push(new Float2(s / 2, s / 2));
                    points.push(new Float2(s / 2, -s / 2));
                }
                return points;
            }
        }, {
            key: 'position',
            value: function position(p) {
                return new this.tileCtor(Math.round(p.x / this.scale), Math.round(p.y / this.scale * this.scaleY));
            }
        }, {
            key: 'tile',
            value: function tile(x, y) {
                return this.toTile(new Integer2(x, y));
            }
        }]);
        return RectangularGrid;
    }();

    /**
     * ![](../../examples/output/radial-tile.svg)
     * x: angle position
     * y: radius position
     * z: angular length
     */
    var Radial8Tile = function (_Integer) {
        inherits(Radial8Tile, _Integer);

        function Radial8Tile() {
            classCallCheck(this, Radial8Tile);

            var _this = possibleConstructorReturn(this, (Radial8Tile.__proto__ || Object.getPrototypeOf(Radial8Tile)).apply(this, arguments));

            _this.tiles = [];
            return _this;
        }

        createClass(Radial8Tile, [{
            key: 'shift',
            value: function shift() {
                return new Radial8Tile(-1, 1, 0);
            }
        }, {
            key: 'directions',
            value: function directions() {
                return Radial8Tile.directions;
            }
        }, {
            key: 'add',
            value: function add(a) {
                var length = this.z || a.z;
                var angle = this.x + a.x;
                angle = angle % length;
                angle = (angle + length) % length;
                return new Radial8Tile(angle, this.y + a.y, length);
            }
        }, {
            key: 'scale',
            value: function scale(a) {
                return new Radial8Tile(this.x, this.y * a, this.z);
            }
        }, {
            key: 'cubeLength',
            value: function cubeLength() {
                return Math.floor(Math.abs(this.y));
            }
        }, {
            key: 'neighbors',
            value: function neighbors() {
                var results = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Radial8Tile.directions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var a = _step.value;

                        results.push([a[0], this.add(a[1])]);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return results;
            }
        }, {
            key: 'value',
            get: function get$$1() {
                return [this.x, this.y];
            }
        }, {
            key: 'key',
            get: function get$$1() {
                return this.toString();
            }
        }]);
        return Radial8Tile;
    }(Integer3);
    Radial8Tile.directions = [[Axes8.N, new Radial8Tile(0, -1, 0)], [Axes8.E, new Radial8Tile(1, 0, 0)], [Axes8.NW, new Radial8Tile(-1, -1, 0)], [Axes8.SW, new Radial8Tile(1, -1, 0)], [Axes8.S, new Radial8Tile(0, 1, 0)], [Axes8.W, new Radial8Tile(-1, 0, 0)], [Axes8.SE, new Radial8Tile(1, 1, 0)], [Axes8.NE, new Radial8Tile(-1, 1, 0)]];

    /**
     * ![](../../examples/output/rectangular-tile.svg)
     */
    var Rectangular8Tile = function (_Integer) {
        inherits(Rectangular8Tile, _Integer);

        function Rectangular8Tile() {
            classCallCheck(this, Rectangular8Tile);
            return possibleConstructorReturn(this, (Rectangular8Tile.__proto__ || Object.getPrototypeOf(Rectangular8Tile)).apply(this, arguments));
        }

        createClass(Rectangular8Tile, [{
            key: 'shift',
            value: function shift() {
                return new Rectangular8Tile(-1, 1);
            }
        }, {
            key: 'directions',
            value: function directions() {
                return Rectangular8Tile.directions;
            }
        }, {
            key: 'sides',
            value: function sides() {
                return Rectangular8Tile.sides;
            }
        }, {
            key: 'add',
            value: function add(a) {
                var r = get(Rectangular8Tile.prototype.__proto__ || Object.getPrototypeOf(Rectangular8Tile.prototype), 'add', this).call(this, a);
                return new Rectangular8Tile(r.x, r.y);
            }
        }, {
            key: 'scale',
            value: function scale(a) {
                var r = get(Rectangular8Tile.prototype.__proto__ || Object.getPrototypeOf(Rectangular8Tile.prototype), 'scale', this).call(this, a);
                return new Rectangular8Tile(r.x, r.y);
            }
        }, {
            key: 'neighbors',
            value: function neighbors() {
                var results = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Rectangular8Tile.directions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var dir = _step.value;

                        results.push([dir[0], this.add(dir[1])]);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return results;
            }
        }, {
            key: 'sideNeighbors',
            value: function sideNeighbors() {
                var results = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = RectangularTile.directions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var dir = _step2.value;

                        results.push([dir[0], this.add(dir[1])]);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return results;
            }
        }, {
            key: 'key',
            get: function get$$1() {
                return this.toString();
            }
        }]);
        return Rectangular8Tile;
    }(Integer2);
    Rectangular8Tile.directions = [[Axes8.N, new Rectangular8Tile(0, -1)], [Axes8.E, new Rectangular8Tile(1, 0)], [Axes8.NW, new Rectangular8Tile(-1, -1)], [Axes8.SW, new Rectangular8Tile(1, -1)], [Axes8.S, new Rectangular8Tile(0, 1)], [Axes8.W, new Rectangular8Tile(-1, 0)], [Axes8.SE, new Rectangular8Tile(1, 1)], [Axes8.NE, new Rectangular8Tile(-1, 1)]];
    Rectangular8Tile.sides = [Rectangular8Tile.directions[0], Rectangular8Tile.directions[1], Rectangular8Tile.directions[4], Rectangular8Tile.directions[5]];

    function instance(obj) {
        return new obj.constructor();
    }
    function enumerate(obj) {
        var result = {};
        var keys = Object.keys(obj);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                var value = parseInt(i, 10);
                if (value >= 0) {
                    result[obj[i]] = value;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return result;
    }
    function mapped(available, selection) {
        return selection.filter(function (t) {
            return available.has(t[1].key);
        }).map(function (t) {
            return [t[0], available.get(t[1].key)];
        });
    }
    function toMap(tiles) {
        return new Map(tiles.map(function (t) {
            return [t.key, t];
        }));
    }
    function toArray$1(m) {
        return Array.from(m.values());
    }
    function link(tilesMap) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = tilesMap.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var tile = _step2.value;

                tile.links = new Map();
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = (tile.multiNeighbors ? tile.multiNeighbors() : tile.neighbors())[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var n = _step3.value;

                        if (tilesMap.has(n[1].key)) {
                            tile.links.set(n[0], tilesMap.get(n[1].key));
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }

    // From http://www.redblobgames.com/grids/hexagons/
    // Copyright 2013 Red Blob Games <redblobgames@gmail.com>
    // License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
    // Original source: http://www.redblobgames.com/grids/hexagons/ui.js
    var Search = function () {
        function Search(start, maxMovement, maxMagnitude, blocked, available) {
            classCallCheck(this, Search);

            this.cost = {};
            this.previous = {};
            this.max = 0;
            var starts = start.value ? [start] : start;
            this.start = starts[0];
            var blockedMap = blocked ? toMap(blocked) : undefined;
            var availableMap = available ? toMap(available) : undefined;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = starts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var s = _step.value;

                    this.cost[s.key] = 0;
                    this.previous[s.key] = null;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var fringes = [starts];
            for (var k = 0; k < maxMovement && fringes[k].length > 0; k++) {
                fringes[k + 1] = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = fringes[k][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var tile = _step2.value;

                        var neighbors = tile.neighbors();
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = neighbors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var dir = _step3.value;

                                var neighbor = dir[1];
                                if (availableMap && !availableMap.has(neighbor.key)) {
                                    continue;
                                }
                                if (this.cost[neighbor.key] === undefined && (blockedMap && !blockedMap.has(neighbor.key) || !blocked) && neighbor.cubeLength() <= maxMagnitude) {
                                    this.cost[neighbor.key] = k + 1;
                                    this.max = Math.max(this.max, k + 1);
                                    this.previous[neighbor.key] = tile;
                                    fringes[k + 1].push(neighbor);
                                }
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }

        createClass(Search, [{
            key: 'path',
            value: function path(end) {
                var _this = this;

                var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                var ends = end.value ? [end] : end;
                var min = (max ? Math.max : Math.min).apply(null, ends.map(function (e) {
                    return _this.cost[e.key];
                }).filter(function (e) {
                    return e !== undefined;
                }));
                var path = [];
                var node = ends.find(function (e) {
                    return _this.cost[e.key] === min;
                }) || null;
                while (node) {
                    path.push(node);
                    node = node.equals(this.start) ? null : this.previous[node.key];
                }
                return path;
            }
        }]);
        return Search;
    }();

    function rotate(grid) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        grid.tiles.forEach(function (t) {
            var d = direction;
            while (d > 0) {
                t.right();
                d--;
            }
            while (d < 0) {
                t.left();
                d++;
            }
        });
    }
    function translate(grid, position) {
        grid.tiles = grid.tiles.map(function (t) {
            return grid.toTile ? grid.toTile(grid.toPoint(t).add(position)) : [];
        });
    }
    function min(grid) {
        var points = grid.tiles.map(function (t) {
            return grid.toPoint(t);
        });
        return new Integer2(Math.min.apply(null, points.map(function (p) {
            return p.x;
        })), Math.min.apply(null, points.map(function (p) {
            return p.y;
        })));
    }
    function normalize(grid) {
        var m = min(grid);
        m.x = -m.x;
        m.y = -m.y;
        grid.tiles = grid.tiles.map(function (t) {
            return grid.toTile ? grid.toTile(grid.toPoint(t).add(m)) : [];
        });
    }

    function circle(start, N) {
        return spiral(start, N, false);
    }
    function spiral(start, N) {
        var isSpiral = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var results = [];
        if (isSpiral) {
            results.push(start.add(instance(start)));
        }
        var neighbors = start.sideNeighbors ? start.sideNeighbors() : start.neighbors();
        var c = neighbors.length === 6 ? 1 : 2;
        for (var k = isSpiral ? 1 : N; k <= N; k++) {
            var H = start.shift().scale(k);
            for (var i = 0; i < neighbors.length; i++) {
                for (var j = 0; j < k * c; j++) {
                    results.push(H.add(start));
                    H = (H.sideNeighbors ? H.sideNeighbors() : H.neighbors())[i][1];
                }
            }
        }
        return results;
    }
    function intersect(a, b) {
        var results = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = a[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = b[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var j = _step2.value;

                        if (i.equals(j)) {
                            results.push(i);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return results;
    }
    function axes(a, axe) {
        var odd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var results = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = a[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var i = _step3.value;

                var v = i.value;
                var l = Math.abs(v[axe % v.length]) % 2 === 1;
                if (l === odd) {
                    results.push(i);
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return results;
    }
    function border(tiles) {
        var tileMap = toMap(tiles);
        return tiles.filter(function (t) {
            return mapped(tileMap, t.neighbors()).length < t.directions().length;
        });
    }
    function outline(tiles, available) {
        var map = new Map();
        var tileMap = toMap(tiles);
        var availableMap = available ? toMap(available) : undefined;
        tiles.forEach(function (t) {
            var n = new Map(mapped(tileMap, t.neighbors()));
            var d = new Map(t.directions());
            if (n.size < d.size) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = d[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _ref = _step4.value;

                        var _ref2 = slicedToArray(_ref, 2);

                        var k = _ref2[0];
                        var v = _ref2[1];

                        if (!n.has(k)) {
                            var w = t.add(v);
                            if (availableMap) {
                                map.set(w.key, availableMap.get(w.key));
                            } else {
                                map.set(w.key, w);
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
        });
        return Array.from(map.values());
    }
    function connections(tiles) {
        var c = [];
        var available = toMap(tiles);

        var _loop = function _loop(t) {
            var m = new Map(mapped(available, t.neighbors()));
            var s = Array.from(m.keys()).filter(function (k) {
                return k > 0 && !m.has(t.opposite ? t.opposite(k) : -k);
            });
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = s[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var k = _step6.value;

                    var l = [];
                    var i = t;
                    while (i) {
                        l.push(i);
                        i = new Map(mapped(available, i.neighbors())).get(k);
                    }
                    c.push(l);
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        };

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = tiles[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var t = _step5.value;

                _loop(t);
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        return c;
    }

    exports.BrickGrid = BrickGrid;
    exports.HexagonalGrid = HexagonalGrid;
    exports.TriangularGrid = TriangularGrid;
    exports.RadialGrid = RadialGrid;
    exports.RectangularGrid = RectangularGrid;
    exports.Position = Integer2;
    exports.HexagonalTile = HexagonalTile;
    exports.Radial8Tile = Radial8Tile;
    exports.RadialTile = RadialTile;
    exports.Rectangular8Tile = Rectangular8Tile;
    exports.RectangularTile = RectangularTile;
    exports.TriangularTile = TriangularTile;
    exports.Float2 = Float2;
    exports.Float3 = Float3;
    exports.Integer2 = Integer2;
    exports.Integer3 = Integer3;
    exports.Search = Search;
    exports.normalize = normalize;
    exports.translate = translate;
    exports.rotate = rotate;
    exports.enumerate = enumerate;
    exports.instance = instance;
    exports.toMap = toMap;
    exports.toArray = toArray$1;
    exports.link = link;
    exports.axes = axes;
    exports.intersect = intersect;
    exports.circle = circle;
    exports.spiral = spiral;
    exports.border = border;
    exports.outline = outline;
    exports.connections = connections;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gridy.js.map
