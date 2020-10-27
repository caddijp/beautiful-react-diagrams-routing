import type { DiagramSchema } from "beautiful-react-diagrams/@types/DiagramSchema";
import dagre from "dagre";

const { Graph } = dagre.graphlib;

const g = new Graph({});

export function redistribute<P>({
  nodes,
  links,
}: DiagramSchema<P>): DiagramSchema<P> {
  g.setGraph({});
  g.setDefaultEdgeLabel(() => ({}));

  nodes.map(({ id, coordinates: [x, y] }) =>
    g.setNode(id, { width: 100, height: 100, x, y })
  );

  links?.map(({ input, output }) =>
    g.setEdge({
      v: input,
      w: output,
    })
  );

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
