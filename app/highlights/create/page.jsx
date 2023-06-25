'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import AddButton from '@/components/Button/AddButton';
import Input from '@/components/Input/InputCom';
import Select from '@/components/Input/Select';
import TextArea from '@/components/Input/Textarea';
import UploadFile from '@/components/Input/UploadFile';
import Layout from '@/components/layout/DashboardLayout';
import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';

export default function CreateHighlights() {
   const [videoTypes, setVideoTypes] = useState('');
   const [thumbnailsType, setThumbnailsType] = useState('');
   console.log(videoTypes);

   const statusType = [
      { id: 1, name: 'Active' },
      { id: 2, name: 'In-Active' }
   ];

   const handleVideoType = e => {
      setVideoTypes(e.target.value);
   };

   const handleThumbnailType = e => {
      setThumbnailsType(e.target.value);
   };

   return (
      <Layout>
         <div className='flex items-center gap-2 divide-x mb-5 lg:mb-0'>
            <h4 className='text-lg font-semibold px-2'> Add Highlights</h4>
            <Breadcumbs
               srcIcon={AiOutlineHome}
               rootLabel='Highlights'
               currentLabel='Create'
            />
         </div>

         {/* Create highlight from */}

         <div className='bg-white shadow rounded p-4 mt-6'>
            <h4 className='text-lg font-semibold text-gray-600'>
               Match Information
            </h4>
            <div className='flex flex-col gap-5 mt-5'>
               <Input label={'Title'}></Input>
               <TextArea label={'Short Description'} />
               <div className='flex gap-5'>
                  <select
                     onChange={e => handleVideoType(e)}
                     className='select w-full rounded-md border-1 border-gray-300  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:outline-0 disabled:border-0 bg-white shadow-sm disabled:bg-blue-gray-50'
                  >
                     <option value='none' disabled selected>
                        Video Type
                     </option>
                     <option value='sportMonk'>SportMonk</option>
                     <option value='youtube'>Youtube</option>
                  </select>
                  {videoTypes === 'sportMonk' && (
                     <Input label={'Fixture ID'}></Input>
                  )}
                  {videoTypes === 'youtube' && (
                     <Input label={'Youtube Url'}></Input>
                  )}
               </div>
               <select
                  onChange={e => handleThumbnailType(e)}
                  className='select w-full rounded-md border-1 border-gray-300  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:outline-0 disabled:border-0 bg-white shadow-sm disabled:bg-blue-gray-50'
               >
                  <option value='none' disabled selected>
                     Thumbnail Type
                  </option>
                  <option value='url'>Url</option>
                  <option value='upload'>Upload</option>
               </select>

               {thumbnailsType === 'url' && (
                  <Input label={'Thumbnail Url'}></Input>
               )}

               {thumbnailsType === 'upload' && <UploadFile></UploadFile>}
               <Select label={'Status'} option={statusType} />
            </div>
            <div className='flex items-center justify-end gap-2 pt-4'>
               <button>Cancel</button>
               <AddButton label={'Create'} />
            </div>
         </div>
      </Layout>
   );
}
