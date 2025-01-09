import { useEffect, useState } from 'react';
import { DataTableSkeleton } from '@/components/DataTableSkeleton';
import { aaplData } from '@/data/aaplData';
import { AaplDataType } from '@/types/aapl';
import { columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<AaplDataType[]> {
  // Fetch data from your API here and return it.
  return aaplData; // Simply returning fake data
}

// async function deleteData(id: string): Promise<AapleDataType[]> {
//   // Delete from api.
//   const index = aaplData.findIndex((value) => value.id === id)
//   aaplData.splice(index, 1)
//   return aaplData // Simply returning fake data
// }

export default function AaplPage() {
  const [data, setData] = useState<AaplDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        // Handle error
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    // Render a loading indicator or message
    // Replace with a skeleton later
    return (
      <div className="container mx-auto rounded-md">
        <DataTableSkeleton />
      </div>
    );
  }

  //  async function deleteRow(id:string) {
  //   console.log("delete this row")
  //     try {
  //       const result: AapleDataType[] = await deleteData(id);
  //       setData(result);
  //     } catch (error) {
  //       // Handle error
  //       console.error('Error deleting data:', error);
  //     }
  //   }

  return (
    <div className="container mx-auto rounded-md ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
