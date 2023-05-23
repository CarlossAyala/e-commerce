import { Link } from 'react-router-dom';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';

const CardReport = () => {
  return (
    <div className='flex flex-col rounded-md border bg-white shadow-sm dark:border-gray-800 dark:bg-slate-900'>
      <div className='flex justify-between gap-x-3 p-4 md:p-5'>
        <div>
          <p className='text-xs uppercase tracking-wide text-gray-500'>
            Total users
          </p>
          <div className='mt-1'>
            <h3 className='text-xl font-medium text-gray-800 dark:text-gray-200 sm:text-2xl'>
              72,540
            </h3>
          </div>
        </div>
      </div>

      <Link
        to='#'
        className='inline-flex items-center justify-between rounded-b-xl border-t border-gray-200 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 md:px-5'
      >
        View reports
        <svg
          className='h-2.5 w-2.5'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
        >
          <path
            d='M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      </Link>
    </div>
  );
};

const rowData = [
  {
    id: '1',
    product: 'a',
    question: 'Load Balancer 3',
    status: 'HTTP',
    created_at: 3000,
    actions: 'Round robin',
  },
  {
    id: '2',
    product: 'b',
    question: 'Load Balancer 1',
    status: 'HTTP',
    created_at: 443,
    actions: 'Round robin',
  },
  {
    id: '3',
    product: 'c',
    question: 'Load Balancer 2',
    status: 'HTTP',
    created_at: 80,
    actions: 'DNS delegation',
  },
  {
    id: '4',
    product: 'd',
    question: 'Load Balancer 6',
    status: 'HTTP',
    created_at: 3000,
    actions: 'Round robin',
  },
  {
    id: '5',
    product: 'e',
    question: 'Load Balancer 4',
    status: 'HTTP',
    created_at: 443,
    actions: 'Round robin',
  },
  {
    id: '6',
    product: 'f',
    question: 'Load Balancer 5',
    status: 'HTTP',
    created_at: 80,
    actions: 'DNS delegation',
  },
];

const headerData = [
  {
    key: 'product',
    header: 'Product',
  },
  {
    key: 'question',
    header: 'Question',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'created_at',
    header: 'Posted at',
  },
  {
    key: 'actions',
    header: 'Accions',
  },
];

const Dashboard = () => {
  return (
    <main className='overflow-auto bg-gray-200'>
      <section className='border-b border-gray-200 bg-white px-4 pb-4 pt-3'>
        <h1 className='text-3xl leading-none'>Dashboard</h1>
      </section>

      <section className='px-4 py-2'>
        <h2 className='mb-1 text-xl'>Rendimientos</h2>
        <div className='grid grid-cols-2 gap-2 sm:gap-6 lg:grid-cols-4'>
          <CardReport />
          <CardReport />
          <CardReport />
          <CardReport />
        </div>
      </section>

      <section className='px-4 py-2'>
        <DataTable rows={rowData} headers={headerData}>
          {({ rows, headers, getHeaderProps, getTableProps }) => (
            <TableContainer title='Preguntas'>
              <Table {...getTableProps()} size='md'>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.key}
                        {...getHeaderProps({ header })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      </section>

      <section className='px-4 py-2'>
        <DataTable rows={rowData} headers={headerData}>
          {({ rows, headers, getHeaderProps, getTableProps }) => (
            <TableContainer title='Publicaciones'>
              <Table {...getTableProps()} size='md'>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.key}
                        {...getHeaderProps({ header })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      </section>

      <section className='px-4 py-2'>
        <DataTable rows={rowData} headers={headerData}>
          {({ rows, headers, getHeaderProps, getTableProps }) => (
            <TableContainer title='Ventas'>
              <Table {...getTableProps()} size='md'>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.key}
                        {...getHeaderProps({ header })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      </section>
    </main>
  );
};

export default Dashboard;
