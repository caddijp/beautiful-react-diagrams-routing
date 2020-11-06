"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
exports.redistribute = void 0;
var dagre_1 = __importDefault(require("dagre"));
var Graph = dagre_1["default"].graphlib.Graph;
var findNodeId = function (node, targetId, portKey) {
  return (
    node.id === targetId ||
    (node[portKey] || []).findIndex(function (i) {
      return i.id === targetId;
    }) >= 0
  );
};
function redistribute(_a, graph) {
  var nodes = _a.nodes,
    links = _a.links;
  var g = new Graph({});
  if (!graph) {
    g.setGraph({});
    g.setDefaultEdgeLabel(function () {
      return {};
    });
  } else {
    g = graph;
  }
  nodes.map(function (_a) {
    var id = _a.id,
      _b = _a.coordinates,
      x = _b[0],
      y = _b[1];
    return g.setNode(id, { width: 100, height: 100, x: x, y: y });
  });
  (links || []).forEach(function (_a) {
    var input = _a.input,
      output = _a.output;
    var edge = {
      v: nodes.find(function (v) {
        return findNodeId(v, input, "inputs");
      }).id,
      w: nodes.find(function (v) {
        return findNodeId(v, output, "outputs");
      }).id,
    };
    g.setEdge(edge);
  });
  dagre_1["default"].layout(g);
  return {
    nodes: g.nodes().map(function (id) {
      var node = g.node(id);
      var graphNode = nodes.find(function (n) {
        return n.id === id;
      });
      return __assign(__assign({ id: id }, graphNode), {
        coordinates: [
          node.x ||
            (graphNode === null || graphNode === void 0
              ? void 0
              : graphNode.coordinates[0]) ||
            0,
          node.y ||
            (graphNode === null || graphNode === void 0
              ? void 0
              : graphNode.coordinates[1]) ||
            0,
        ],
      });
    }),
    links: links,
  };
}
exports.redistribute = redistribute;
