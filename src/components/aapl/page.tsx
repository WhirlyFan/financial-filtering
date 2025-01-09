import { useEffect, useState } from 'react';
import { DataTableSkeleton } from '@/components/DataTableSkeleton';
import { Button } from '@/components/ui/button';
import { aaplData } from '@/data/aaplData';
import { AaplDataType } from '@/types/aapl';
import { columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<AaplDataType[]> {
  const apiKey = import.meta.env.VITE_FMP_API_KEY;
  console.log(apiKey);
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${apiKey}`
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
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
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDummyData = () => {
    setData(aaplData);
  };

  const clearData = () => {
    setData([]);
  };

  const refetchData = async () => {
    setLoading(true);
    try {
      const result = await getData();
      setData(result);
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="flex justify-center space-x-4">
        <Button onClick={handleDummyData}>Use Dummy Data</Button>
        <Button onClick={clearData}>Clear Data</Button>
        <Button onClick={refetchData}>Refetch Data</Button>
      </div>
    </div>
  );
}
