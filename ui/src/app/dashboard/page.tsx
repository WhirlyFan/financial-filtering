import DataTable from '@/components/data-table';

export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AAPL Financial Metrics</h1>
      <div className="overflow-x-auto rounded-lg shadow border">
        <DataTable />
      </div>
    </div>
  );
}
