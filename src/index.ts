import type { DiagramSchema } from "beautiful-react-diagrams/@types/DiagramSchema";
import dagre from "dagre";

const { Graph } = dagre.graphlib;

const g = new Graph({});

export function redistribute<P>({
  nodes,
  links,
}: DiagramSchema<P>): DiagramSchema<P> {
  g.setGraph({});
  g.setDefaultEdgeLabel(function () {
    return {};
  });

  nodes.map(({ id, coordinates: [x, y] }) => {
    g.setNode(id, { width: 10, height: 10, x, y });
  });

  dagre.layout(g);

  return {
    nodes: g.nodes().map((id) => {
      const { x, y } = g.node(id);
      return {
        id,
        ...nodes.find((node) => node.id === id),
        coordinates: [x, y],
      };
    }),
    links,
  };
}
