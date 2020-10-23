import { Meta, Story } from "@storybook/react";
import Diagram, { useSchema } from "beautiful-react-diagrams";
import type { Link, Node } from "beautiful-react-diagrams/@types/DiagramSchema";
import "beautiful-react-diagrams/styles.css";
import React, { ComponentProps } from "react";
import { Factory } from "rosie";

const meta: Meta = {
  title: "Diagrams",
};

export default meta;

const nodes = new Factory<Node<unknown>>()
  .sequence("id", (i) => i.toString())
  .attr("coordinates", [0, 0])
  .attr("content", ["id"], (id) => <div>{id}</div>)
  .buildList(10);

const links: Link[] = [
  { input: "1", output: "2" },
  { input: "1", output: "3" },
  { input: "1", output: "4" },
];

const Template: Story<ComponentProps<typeof Diagram>> = ({
  schema: initialSchema,
}) => {
  const [schema, { onChange }] = useSchema(
    initialSchema || { nodes: [], links: [] }
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
