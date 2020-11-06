import type { DiagramSchema } from "beautiful-react-diagrams/@types/DiagramSchema";
import dagre from "dagre";
export declare function redistribute<P, T = unknown>(
  { nodes, links }: DiagramSchema<P>,
  graph?: dagre.graphlib.Graph<T>
): DiagramSchema<P>;
