import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import type { GraphValue } from "@/types/graph";

export default function Graph({
  values,
}: {
  values: Array<GraphValue>
}): JSX.Element {

  return (
    <LineChart
      width={600}
      height={300}
      data={values}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
    </LineChart>
  );
}
