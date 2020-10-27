import { Meta, Story } from "@storybook/react";
import Diagram, { useSchema } from "beautiful-react-diagrams";
import type { Link, Node } from "beautiful-react-diagrams/@types/DiagramSchema";
import "beautiful-react-diagrams/styles.css";
import React, { ComponentProps } from "react";
import { Factory } from "rosie";
import { redistribute } from ".";

const meta: Meta = {
  title: "Diagrams",
};

export default meta;

const nodes = new Factory<Node<unknown>>()
  .sequence("id", (i) => i.toString())
  .attr("coordinates", [0, 0])
  .attr("content", ["id"], (id) => <div>{id}</div>)
  .attr("inputs", ["id"], (id) => [{ id: `input-${id}` }])
  .buildList(10);

const links: Link[] = [
  { input: "input-1", output: "2" },
  { input: "input-1", output: "3" },
  { input: "input-2", output: "3" },
  { input: "input-1", output: "4" },
  { input: "input-4", output: "10" },
  { input: "8", output: "9" },
  { input: "7", output: "8" },
  { input: "9", output: "7" },
  { input: "6", output: "3" },
  { input: "9", output: "3" },
];

const Template: Story<ComponentProps<typeof Diagram>> = ({
  schema: initialSchema,
}) => {
  const [schema, { onChange }] = useSchema(
    redistribute(initialSchema || { nodes: [], links: [] })
  );

  return (
    <div style={{ height: "200rem" }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export const ReRoutingDiagram = Template.bind({});

ReRoutingDiagram.args = {
  schema: {
    nodes,
    links,
  },
};
