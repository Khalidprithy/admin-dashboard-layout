'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import ConfirmDeleteModalTeam from '@/components/Modal/confirmDeleteModalTeam';
import Layout from '@/components/layout/DashboardLayout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiFootball } from 'react-icons/bi';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';

export default function PopularTeams() {
   const [team, setTeam] = useState({});
   const [inputText, setInputText] = useState();
   const [searchResults, setSearchResults] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [showResults, setShowResults] = useState(false);
   const [popularTeams, setPopularTeams] = useState([]);

   const searchedTeams = searchResults?.result?.data;

   console.log('Added Popular Teams', popularTeams);

   const fetchedCountries = async () => {
      try {
         setIsLoading(true);
         const api_token = process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN;
         const formData = new FormData();
         formData.append('api_token', api_token);
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

   // Fetch popular teams
   useEffect(() => {
      const fetchPopularTeams = async () => {
         try {
            const response = await axios.post(
               'http://localhost:5000/popular_teams'
            );
            const data = response.data.data;
            console.log(data);
            setPopularTeams(data);
         } catch (error) {
            console.error('Error fetching popular teams:', error);
         }
      };

      fetchPopularTeams();
   }, []);

   const handleClick = team => {
      console.log(team);
      const teamData = { ...team, team_id: team.id };
      delete teamData.id;

      // console.log('New team', teamData);

      // Make the Axios POST request to create a new team
      axios
         .post('http://localhost:5000/popular_team', teamData)
         .then(response => {
            console.log('team created successfully:', response.data);
            // Perform any additional actions after successful creation
         })
         .catch(error => {
            console.error('Error creating team:', error);
            // Handle any error that occurred during the request
         });
   };

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

            <div className='bg-white rounded shadow p-4 mt-6 relative'>
               <h4 className='text-sm font-semibold text-gray-500 pb-2'>
                  Search Popular Teams
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
                           <BiFootball className='animate-spin text-5xl text-teal-500' />{' '}
                        </div>
                     ) : (
                        <ul className='divide-y'>
                           {searchedTeams?.map(team => (
                              <div
                                 className='flex items-center justify-between'
                                 key={team.id}
                              >
                                 <div className='flex items-center gap-2'>
                                    <img
                                       className='w-8'
                                       src={team.image_path}
                                       alt='team Image'
                                    />
                                    <li className='py-3 text-sm'>
                                       {team.name}
                                    </li>
                                 </div>
                                 <button className='btn btn-circle btn-sm bg-green-500 hover:bg-green-600'>
                                    <BsPlusCircleFill
                                       onClick={() => handleClick(team)}
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
                  Popular Team List
               </h4>
               <div className='flex flex-col gap-2 divide-y px-5'>
                  {popularTeams?.map(team => (
                     <div
                        key={team.id}
                        className='flex items-center justify-between py-2'
                     >
                        <div className='flex items-center gap-2'>
                           <img
                              className='w-8'
                              src={team.image_path}
                              alt='team Image'
                           />
                           <h4>{team.name}</h4>
                        </div>
                        <button
                           className='btn btn-circle btn-sm bg-red-500 hover:bg-red-600'
                           onClick={() => {
                              setTeam(team);
                              window.confirm_delete_modal.showModal();
                           }}
                        >
                           <FaTrashAlt className='text-white text-base hover:animate-pulse transition-all ease-linear duration-150' />
                        </button>
                     </div>
                  ))}
                  <ConfirmDeleteModalTeam
                     team={team}
                     uniqueId={'confirm_delete_modal'}
                  />
               </div>
            </div>
         </div>
      </Layout>
   );
}
