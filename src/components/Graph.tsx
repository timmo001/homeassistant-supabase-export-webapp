import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { GraphValue } from "@/types/graph";

export default function Graph({
  values,
}: {
  values: Array<GraphValue>;
}): JSX.Element {
  return (
    <LineChart
      width={1200}
      height={400}
      data={values}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}
