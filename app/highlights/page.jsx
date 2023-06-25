import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import AddButton from '@/components/Button/AddButton';
import Layout from '@/components/layout/DashboardLayout';
import MyTable from '@/components/table/Table';
import { AiOutlineHome } from 'react-icons/ai';

export default function Highlights() {
   const columns = ['Id', 'Title', 'Video Type', 'Status', 'Action'];
   const highlightData = [
      {
         id: 1,
         name: 'Arsene Wenger Joins The Premier League Hall Of Fame',
         video_type: 'sportmonk',
         status: true
      },
      {
         id: 2,
         name: 'Arsene Wenger Joins The Premier League Hall Of Fame',
         video_type: 'sportmonk',
         status: true
      },
      {
         id: 3,
         name: 'Arsene Wenger Joins The Premier League Hall Of Fame',
         video_type: 'sportmonk',
         status: true
      },
      {
         id: 4,
         name: 'Arsene Wenger Joins The Premier League Hall Of Fame',
         video_type: 'sportmonk',
         status: true
      },
      {
         id: 5,
         name: 'Arsene Wenger Joins The Premier League Hall Of Fame',
         video_type: 'sportmonk',
         status: true
      },
      {
         id: 6,
         name: 'Arsene Wenger Joins The Premier League Hall Of Fame',
         video_type: 'sportmonk',
         status: true
      }
   ];
   return (
      <Layout>
         <div className='flex flex-col lg:flex-row items-center justify-between pt-4'>
            <div className='flex items-center gap-2 divide-x mb-5 lg:mb-0'>
               <h4 className='text-lg font-semibold px-2'>Highlights List</h4>

               <Breadcumbs
                  srcIcon={AiOutlineHome}
                  rootLabel='Highlights'
                  //   currentLabel='Highlights'
               />
            </div>
            <AddButton label={'Add New'}></AddButton>
         </div>

         <MyTable columns={columns} entities={highlightData}></MyTable>
      </Layout>
   );
}
