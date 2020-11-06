import type {
  DiagramSchema,
  Node,
} from "beautiful-react-diagrams/@types/DiagramSchema";
import dagre from "dagre";

const { Graph } = dagre.graphlib;

const findNodeId = <P>(
  node: Node<P>,
  targetId: string,
  portKey: "inputs" | "outputs"
) =>
  node.id === targetId ||
  (node[portKey] || []).findIndex((i) => i.id === targetId) >= 0;

export function redistribute<P, T = unknown>(
  { nodes, links }: DiagramSchema<P>,
  graph?: dagre.graphlib.Graph<T>
): DiagramSchema<P> {
  let g = new Graph({});
  if (!graph) {
    g.setGraph({});
    g.setDefaultEdgeLabel(() => ({}));
  } else {
    g = graph;
  }

  nodes.map(({ id, coordinates: [x, y] }) =>
    g.setNode(id, { width: 100, height: 100, x, y })
  );

  (links || []).forEach(({ input, output }) => {
    const edge = {
      v: nodes.find((v) => findNodeId(v, input, "inputs"))!.id,
      w: nodes.find((v) => findNodeId(v, output, "outputs"))!.id,
    };

    g.setEdge(edge);
  });

  dagre.layout(g);

  return {
    nodes: g.nodes().map((id) => {
      const node = g.node(id);
      const graphNode = nodes.find((n) => n.id === id);
      return {
        id,
        ...graphNode,
        coordinates: [
          node.x || graphNode?.coordinates[0] || 0,
          node.y || graphNode?.coordinates[1] || 0,
        ],
      };
    }),
    links,
  };
}
