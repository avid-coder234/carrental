import { Table, Badge } from "@radix-ui/themes";
import dayjs from "dayjs";

export default function TransactionsTable({ rows = [] }) {
  return (
    <Table.Root variant="surface" size="2">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Customer</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Vehicle</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Period</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell align="right">Amount (₹)</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map((b) => (
          <Table.Row key={b._id}>
            <Table.Cell>{dayjs(b.createdAt).format("DD MMM YY")}</Table.Cell>
            <Table.Cell>{b.userId?.name || "—"}</Table.Cell>
            <Table.Cell>
              {b.vehicleId?.brand} {b.vehicleId?.model}
            </Table.Cell>
            <Table.Cell>
              {dayjs(b.startDate).format("DD MMM")} → {dayjs(b.endDate).format("DD MMM")}
            </Table.Cell>
            <Table.Cell align="right">{b.totalCost}</Table.Cell>
            <Table.Cell>
              {b.status === "confirmed" ? (
                <Badge color="green">Booked</Badge>
              ) : (
                <Badge color="amber">{b.status}</Badge>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
