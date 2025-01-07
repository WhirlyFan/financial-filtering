import { useEffect, useState } from 'react';
import { SkeletonTableRow } from '@/components/skeleton-row';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IncomeStatementDataInterface } from '@/types';

export default function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Simulate a delay of 1 second before fetching the data
        setTimeout(async () => {
          // Fetch the dummy data from the JSON file
          const response = await fetch('/data.json'); // Assuming the file is in the public/api folder
          const result = await response.json();
          setData(result);
        }, 1500); // Delay of 1 second
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]">Date</TableHead>
            <TableHead className="min-w-[160px]">Revenue</TableHead>
            <TableHead className="min-w-[160px]">Net Income</TableHead>
            <TableHead className="min-w-[160px]">Gross Profit</TableHead>
            <TableHead className="min-w-[50px]">EPS</TableHead>
            <TableHead className="min-w-[160px]">Operating Income</TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <SkeletonTableRow />
        ) : (
          <TableBody>
            {data.map((row: IncomeStatementDataInterface, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(row.revenue)}
                </TableCell>
                <TableCell>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(row.netIncome)}
                </TableCell>
                <TableCell>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(row.grossProfit)}
                </TableCell>
                <TableCell>{row.eps.toFixed(2)}</TableCell>
                <TableCell>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(row.operatingIncome)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </>
  );
}
