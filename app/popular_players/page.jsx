import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import Layout from '@/components/layout/DashboardLayout';
import { FaTrashAlt } from 'react-icons/fa';

export default function PopularPlayers() {
   const entities = [
      { id: 1, name: 'Man city' },
      { id: 2, name: 'Arsenal' },
      { id: 3, name: 'Man city' },
      { id: 4, name: 'Juv' }
   ];
   return (
      <Layout>
         <div>
            <div className='flex items-center gap-2 divide-x mb-5 lg:mb-0'>
               <h4 className='text-lg font-semibold px-2'> Teams</h4>
               <Breadcumbs
                  srcIcon={AiOutlineHome}
                  rootLabel='Popular Teams'
                  //   currentLabel='Create'
               />
            </div>

            <div className='bg-white rounded shadow p-4 mt-6'>
               <h4 className='text-sm font-semibold text-gray-500 pb-2'>
                  Search Popular Teams
               </h4>
               <SearchInput label={'Search'} />
               <h6 className='text-sm text-gray-500 pt-2'>
                  Enter at least 3 letter
               </h6>
            </div>

            <div className='bg-white rounded shadow p-4 mt-5'>
               <h4 className='text-lg font-semibold text-gray-600 p-2'>
                  Popular Team List
               </h4>
               <div className='flex flex-col gap-2 divide-y px-5'>
                  {entities.map(team => (
                     <div className='flex items-center justify-between py-2'>
                        <div>
                           <h4>{team.name}</h4>
                        </div>
                        <button className='btn btn-circle btn-sm bg-red-500 hover:bg-red-600'>
                           <FaTrashAlt className='text-white' />
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </Layout>
   );
}
