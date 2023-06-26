'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import SearchInput from '@/components/Input/Search';
import Layout from '@/components/layout/DashboardLayout';
import axios from 'axios';
import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';

export default function PopularTeams() {
   const [inputText, setInputText] = useState();
   const [searchResults, setSearchResults] = useState([]);

   const [countries, setCountries] = useState([]);

   const fetchedCountries = async () => {
      try {
         const api_key = process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN;
         const formData = new FormData();
         formData.append('api_key', api_key);

         const response = await axios.post(
            `http://localhost:5000/teams/search/${inputText}`,
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
            }
         );

         const data = response.data;
         setSearchResults(data);
      } catch (error) {
         console.log(error);
      }
   };

   const handleChange = e => {
      const input = e.target.value;
      setInputText(input);

      if (input.length >= 3) {
         fetchedCountries();
      } else {
         setSearchResults([]);
      }
   };

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
               <SearchInput label={'Search'} onChange={handleChange} />
               <h6 className='text-sm text-gray-500 pt-2'>
                  Enter at least 3 letter
               </h6>
            </div>

            <div className='bg-white rounded shadow p-4 mt-5'>
               <h4 className='text-lg font-semibold text-gray-600 p-2'>
                  Popular Team List
               </h4>
            </div>

            {searchResults.length > 0 && (
               <div className='bg-white rounded shadow p-4 mt-5'>
                  <h4 className='text-lg font-semibold text-gray-600 p-2'>
                     Search Results
                  </h4>
                  <ul>
                     {searchResults.map(result => (
                        <li key={result.id}>{result.name}</li>
                     ))}
                  </ul>
               </div>
            )}
         </div>
      </Layout>
   );
}
