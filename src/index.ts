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
    g.setEdge({ v: output.split("output-")[1], w: input.split("input-")[1] })
  );

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
