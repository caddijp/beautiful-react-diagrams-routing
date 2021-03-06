import { Meta } from "@storybook/react";
import Diagram, { useSchema } from "beautiful-react-diagrams";
import type { Link, Node } from "beautiful-react-diagrams/@types/DiagramSchema";
import "beautiful-react-diagrams/styles.css";
import * as dagre from "dagre";
import React from "react";
import { Factory } from "rosie";
import { redistribute } from ".";

const meta: Meta = {
  title: "Diagrams",
};

export default meta;

const nodes = new Factory<Node<unknown>>()
  .sequence("id", (i) => i.toString())
  .attr("coordinates", [0, 0])
  .attr("content", ["id"], (id) => <div>id: {id}</div>)
  .attr("inputs", ["id"], (id) => [{ id: `input-${id}` }])
  .attr("outputs", ["id"], (id) => [{ id: `output-${id}` }])
  .buildList(10);

const links: Link[] = [
  { input: "input-1", output: "output-2" },
  { input: "input-1", output: "output-3" },
  { input: "input-1", output: "output-4" },
  { input: "input-2", output: "output-3" },
  { input: "input-2", output: "output-7" },
  { input: "input-4", output: "output-10" },
  { input: "input-6", output: "output-3" },
  { input: "input-7", output: "output-8" },
  { input: "input-8", output: "output-9" },
  { input: "input-9", output: "output-8" },
  { input: "input-9", output: "output-3" },
  { input: "input-9", output: "output-7" },
];

export const DefaultRoutingDiagram = (): JSX.Element => {
  const [schema, { onChange }] = useSchema(redistribute({ nodes, links }));

  return (
    <div style={{ height: "200rem" }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export const RLRoutingDiagram = (): JSX.Element => {
  const graph = new dagre.graphlib.Graph({});
  graph.setGraph({
    rankdir: "RL",
  });
  graph.setDefaultEdgeLabel(() => ({}));
  const [schema, { onChange }] = useSchema(
    redistribute({ nodes, links }, graph)
  );

  return (
    <div style={{ height: "200rem" }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};
