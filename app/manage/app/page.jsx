'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import AddButton from '@/components/Button/AddButton';
import AndroidSettings from '@/components/Forms/AndroidSettings';
import IosSettings from '@/components/Forms/IosSettings';
import Input from '@/components/Input/InputCom';
import Select from '@/components/Input/Select';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useState } from 'react';
import { AiFillAndroid, AiFillApple, AiOutlineHome } from 'react-icons/ai';

export default function ManageApp() {
   const [tabs, setTabs] = useState(1);

   const NotificationOptions = [
      { id: 1, name: 'FCM' },
      { id: 2, name: 'OneSingle' }
   ];

   return (
      <DashboardLayout>
         {' '}
         <div className='m-2'>
            <div className='flex items-center gap-2 divide-x mb-5 lg:mb-0'>
               <h4 className='text-lg font-semibold px-2'> Manage App</h4>
               <Breadcumbs
                  srcIcon={AiOutlineHome}
                  rootLabel='Manage App'
                  //   currentLabel='Create'
               />
            </div>
            <div className='bg-white rounded shadow p-5'>
               <Select
                  label={'Notification Type'}
                  option={NotificationOptions}
               />
               <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2'>
                  <Input label={'Firebase Server Key'} />
                  <Input label={'Firebase Topics'} />
               </div>

               <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2'>
                  <Input label={'Sports Api based URL'} />
                  <Input label={'Sports Api Key'} />
               </div>
            </div>
         </div>
         {/* Tabs */}
         <div className='bg-white rounded shadow m-2 p-5'>
            <div className='flex items-center justify-center gap-4'>
               <button
                  onClick={e => {
                     e.preventDefault();
                     setTabs(1);
                  }}
                  className={`btn btn-sm btn-primary rounded ${
                     tabs === 1 ? 'btn-primary' : 'btn-primary btn-outline'
                  }`}
               >
                  <AiFillAndroid />
                  Android
               </button>
               <button
                  onClick={e => {
                     e.preventDefault();
                     setTabs(2);
                  }}
                  className={`btn btn-sm btn-primary rounded ${
                     tabs === 2 ? 'btn-primary' : 'btn-primary btn-outline'
                  }`}
               >
                  <AiFillApple />
                  Ios
               </button>
            </div>
            <div>
               <div className=''>
                  <div className={tabs === 1 ? 'block' : 'hidden'} id='link1'>
                     <AndroidSettings />
                  </div>
                  <div className={tabs === 2 ? 'block' : 'hidden'} id='link2'>
                     <IosSettings />
                  </div>
               </div>
            </div>

            <div className='flex items-center justify-end gap-2 pt-4'>
               {/* <Button label={'cancel'} bgColor={'orange'} /> */}
               <button>Cancel</button>
               <AddButton label={'Save'} />
            </div>
         </div>
      </DashboardLayout>
   );
}
