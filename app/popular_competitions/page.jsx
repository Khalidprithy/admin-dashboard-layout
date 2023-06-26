'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import Layout from '@/components/layout/DashboardLayout';
import axios from 'axios';
import { useState } from 'react';
import { AiFillTrophy, AiOutlineHome } from 'react-icons/ai';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';

export default function PopularCompetitions() {
   const [inputText, setInputText] = useState();
   const [searchResults, setSearchResults] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [showResults, setShowResults] = useState(false);

   const searchedCompetitions = searchResults?.result?.data;

   console.log('Searched player', searchedCompetitions);
   const fetchedCountries = async () => {
      try {
         setIsLoading(true);
         const api_token = process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN;
         const formData = new FormData();
         formData.append('api_token', api_token);
         const response = await axios.post(
            `http://localhost:5000/leagues/search/${inputText}`,
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
            }
         );
         const data = response.data;
         setSearchResults(data);
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   const handleChange = e => {
      console.log('here');
      const input = e.target.value;
      setInputText(input);
      if (input.length >= 3) {
         setShowResults(true);
         fetchedCountries();
      } else {
         setSearchResults([]);
         setShowResults(false);
      }
   };

   const entities = [
      { id: 1, name: 'Neynei Keo Nei' },
      { id: 2, name: 'Leo mejut' },
      { id: 3, name: 'CR 67' },
      { id: 4, name: 'R 900' }
   ];

   const handleClick = league => {
      console.log(league);
      const leagueData = { league_id: league.id, ...league };
      console.log('New League', leagueData);
   };

   return (
      <Layout>
         <div>
            <div className='flex items-center gap-2 divide-x mb-5 lg:mb-0'>
               <h4 className='text-lg font-semibold px-2'> Leagues</h4>
               <Breadcumbs
                  srcIcon={AiOutlineHome}
                  rootLabel='Popular leagues'
                  //   currentLabel='Create'
               />
            </div>

            <div className='bg-white rounded shadow p-4 mt-6 relative'>
               <h4 className='text-sm font-semibold text-gray-500 pb-2'>
                  Search Popular leagues
               </h4>
               {/* <input className='input' type='text' onChange={handleChange} /> */}
               <input
                  type='text'
                  placeholder='Search here'
                  onChange={handleChange}
                  className='input input-bordered input-sm rounded w-full max-w-xs'
               />
               {/* <SearchInput label={'Search'}  /> */}
               <h6 className='text-sm text-gray-500 pt-2'>
                  Enter at least 3 letter
               </h6>
               {showResults && (
                  <div className='absolute top-20 backdrop-blur-sm bg-white/30 border border-gray-300 rounded shadow p-2 mt-5 min-w-[350px] max-w-[400px] max-h-[400px] overflow-auto'>
                     {isLoading ? (
                        <div className='flex justify-center py-10'>
                           {' '}
                           <AiFillTrophy className='animate-ping text-5xl text-teal-500' />{' '}
                        </div>
                     ) : (
                        <ul className='divide-y'>
                           {searchedCompetitions?.map(league => (
                              <div
                                 className='flex items-center justify-between'
                                 key={league.id}
                              >
                                 <li className='py-3 text-sm'>{league.name}</li>
                                 <button className='btn btn-circle btn-sm bg-green-500 hover:bg-green-600'>
                                    <BsPlusCircleFill
                                       onClick={() => handleClick(league)}
                                       className='text-white text-lg hover:text-xl transition-all ease-linear duration-150'
                                    />
                                 </button>
                              </div>
                           ))}
                        </ul>
                     )}
                  </div>
               )}
            </div>

            <div className='bg-white rounded shadow p-4 mt-5'>
               <h4 className='text-lg font-semibold text-gray-600 p-2'>
                  Popular Leagues List
               </h4>
               <div className='flex flex-col gap-2 divide-y px-5'>
                  {entities.map(league => (
                     <div
                        key={league.id}
                        className='flex items-center justify-between py-2'
                     >
                        <div>
                           <h4>{league.name}</h4>
                        </div>
                        <button className='btn btn-circle btn-sm bg-red-500 hover:bg-red-600'>
                           <FaTrashAlt className='text-white text-base hover:animate-pulse transition-all ease-linear duration-150' />
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </Layout>
   );
}
