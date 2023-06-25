'use client';

import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Select from '../Input/Select';
import { selectPageOptions } from '../helper/selectOptions';

const MyTable = ({ entities, columns }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const [entitiesPerPage, setEntitiesPerPage] = useState(5);
   const [search, setSearch] = useState('');

   console.log(entitiesPerPage);

   // Logic for displaying current entities
   const indexOfLastEntity = currentPage * entitiesPerPage;
   const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;
   const currentEntities = entities.slice(
      indexOfFirstEntity,
      indexOfLastEntity
   );

   const searchEntities = currentEntities.filter(entity =>
      entity.name.toLowerCase().includes(search.toLowerCase())
   );

   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(entities.length / entitiesPerPage); i++) {
      pageNumbers.push(i);
   }

   const handleClick = event => {
      setCurrentPage(Number(event.target.id));
   };

   const handleEntitiesPerPageChange = event => {
      console.log(event.target.value);
      setEntitiesPerPage(event.target.value.name);
   };

   return (
      <div className='mx-auto w-full pt-6 px-4'>
         <div className='flex flex-col gap-2 bg-gray-100 px-12 py-8'>
            {/* Search Input */}

            <div className='flex items-center justify-between'>
               <div className='w-48 flex items-center gap-2'>
                  <h4>Show </h4>
                  <Select
                     label={entitiesPerPage}
                     option={selectPageOptions}
                     onClick={handleEntitiesPerPageChange}
                  />
                  <h4>Entities </h4>
               </div>
               <div className='w-1/2'>
                  <div className='relative h-11 w-full min-w-[200px]'>
                     <input
                        className='peer h-full w-full rounded-md border-0 shadow-sm border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                        placeholder=' '
                        type='text'
                        onChange={e => setSearch(e.target.value)}
                     />
                     <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Search
                     </label>
                     <button
                        className='absolute top-0 right-0 bottom-0 z-[2] rounded-r border-l-2 border-l-gray-200 peer-focus:border-l-cyan-500 hover:bg-cyan-500 focus:bg-cyan-500 focus:text-white px-4 py-2 text-xs font-medium uppercase text-gray-500 peer-focus:text-cyan-500 transition duration-150 ease-in-out hover:text-white hover:bg-opacity-1 focus:outline-none focus:ring-0'
                        type='button'
                        id='button-addon3'
                        data-te-ripple-init
                     >
                        <BsSearch size={24} />
                     </button>
                  </div>
               </div>
            </div>

            <div className='w-full bg-white shadow overflow-scroll border-b sm:rounded-lg mt-6'>
               <table className='w-full min-w-max table-auto text-left'>
                  <thead>
                     <tr>
                        {columns.map(column => (
                           <th
                              key={column.id}
                              className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
                           >
                              {column}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {searchEntities.map(entity => (
                        <tr key={entity.id}>
                           <td className='p-4 border-b border-blue-gray-50'>
                              {entity.id}
                           </td>
                           <td className='p-4 border-b border-blue-gray-50'>
                              {entity.name}
                           </td>
                           <td className='p-4 border-b border-blue-gray-50'>
                              {entity.email}
                           </td>
                           <td className='p-4 border-b border-blue-gray-50'>
                              {entity.phone}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className='mt-4 flex justify-end'>
               <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={`  ${
                     currentPage != 1
                        ? 'btn btn-sm btn-primary rounded text-white'
                        : 'btn btn-sm btn-disabled rounded'
                  }`}
               >
                  Previous
               </button>

               {pageNumbers.map(num => (
                  <button
                     key={num}
                     id={num}
                     onClick={handleClick}
                     className={`
                     ${
                        num === currentPage
                           ? 'mx-1 px-4 py-1 border shadow rounded-md bg-sky-600 text-white text-sm transition duration-500'
                           : 'text-gray-700 rounded-md text-sm px-4 py-1 hover:bg-gray-100  transition duration-300'
                     }
                     `}
                  >
                     {num}
                  </button>
               ))}

               <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className={`  ${
                     currentPage != pageNumbers.length
                        ? 'btn btn-sm btn-primary rounded text-white'
                        : 'btn btn-sm btn-disabled rounded'
                  }`}
               >
                  Next
               </button>
            </div>
         </div>
      </div>
   );
};

export default MyTable;
