'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import ConfirmDeleteModal from '@/components/Modal/confirmDeleteModal';
import Layout from '@/components/layout/DashboardLayout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillTrophy, AiOutlineHome } from 'react-icons/ai';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';

export default function PopularCompetitions() {
   const [league, setLeague] = useState({});
   const [inputText, setInputText] = useState();
   const [searchResults, setSearchResults] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [showResults, setShowResults] = useState(false);
   const [popularLeagues, setPopularLeagues] = useState([]);

   // console.log('Popular Leagues', popularLeagues);

   const searchedCompetitions = searchResults?.result?.data;

   // console.log('Searched leagues', searchedCompetitions);
   const searchLeagues = async () => {
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
      // console.log('Search input');
      const input = e.target.value;
      setInputText(input);
      if (input.length >= 3) {
         setShowResults(true);
         searchLeagues();
      } else {
         setSearchResults([]);
         setShowResults(false);
      }
   };

   // Fetch popular leagues
   useEffect(() => {
      const fetchPopularLeagues = async () => {
         try {
            const response = await axios.post(
               'http://localhost:5000/popular_leagues'
            );
            const data = response.data.data;
            console.log(data);
            setPopularLeagues(data);
         } catch (error) {
            console.error('Error fetching popular leagues:', error);
         }
      };

      fetchPopularLeagues();
   }, []);

   const handleClick = league => {
      console.log(league);
      const leagueData = { ...league, league_id: league.id };
      delete leagueData.id;

      // console.log('New League', leagueData);

      // Make the Axios POST request to create a new league
      axios
         .post('http://localhost:5000/popular_league', leagueData)
         .then(response => {
            console.log('League created successfully:', response.data);
            // Perform any additional actions after successful creation
         })
         .catch(error => {
            console.error('Error creating league:', error);
            // Handle any error that occurred during the request
         });
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
                           {!searchedCompetitions && (
                              <div className='text-center py-5 font-medium text-gray-700'>
                                 No league found 😭
                              </div>
                           )}
                           {searchedCompetitions?.map(league => (
                              <div
                                 className='flex items-center justify-between'
                                 key={league.id}
                              >
                                 <div className='flex items-center gap-2'>
                                    <img
                                       className='w-8'
                                       src={league.image_path}
                                       alt='league Image'
                                    />
                                    <li className='py-3 text-sm'>
                                       {league.name}
                                    </li>
                                 </div>
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
                  {popularLeagues?.map(league => (
                     <div
                        key={league.id}
                        className='flex items-center justify-between py-2'
                     >
                        <div className='flex items-center gap-2'>
                           <img
                              className='w-8'
                              src={league.image_path}
                              alt='league Image'
                           />
                           <h4>{league.name}</h4>
                        </div>
                        <button
                           className='btn btn-circle btn-sm bg-red-500 hover:bg-red-600'
                           onClick={() => {
                              setLeague(league);
                              window.confirm_delete_modal.showModal();
                           }}
                        >
                           <FaTrashAlt className='text-white text-base hover:animate-pulse transition-all ease-linear duration-150' />
                        </button>
                     </div>
                  ))}
                  <ConfirmDeleteModal
                     league={league}
                     uniqueId={'confirm_delete_modal'}
                  />
               </div>
            </div>
         </div>
      </Layout>
   );
}
