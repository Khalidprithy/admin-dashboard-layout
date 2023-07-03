'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import ConfirmDeleteModalPlayer from '@/components/Modal/confirmDeleteModalPlayer';
import Layout from '@/components/layout/DashboardLayout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { GiSoccerKick } from 'react-icons/gi';

export default function PopularPlayers() {
   const [player, setPlayer] = useState({});
   const [inputText, setInputText] = useState();
   const [searchResults, setSearchResults] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [showResults, setShowResults] = useState(false);
   const [popularPlayers, setPopularPlayers] = useState([]);

   const searchedPlayers = searchResults?.result?.data;

   console.log('Searched player', searchedPlayers);
   const fetchedCountries = async () => {
      try {
         setIsLoading(true);
         const api_token = process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN;
         const formData = new FormData();
         formData.append('api_token', api_token);
         const response = await axios.post(
            `http://localhost:5000/players/search/${inputText}`,
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

   // Fetch popular players
   useEffect(() => {
      const fetchPopularPlayers = async () => {
         try {
            const response = await axios.post(
               'http://localhost:5000/popular_players'
            );
            const data = response.data.data;
            console.log(data);
            setPopularPlayers(data);
         } catch (error) {
            console.error('Error fetching popular players:', error);
         }
      };

      fetchPopularPlayers();
   }, []);

   const handleClick = player => {
      console.log(player);
      const playerData = { ...player, player_id: player.id };
      delete playerData.id;

      // console.log('New player', playerData);

      // Make the Axios POST request to create a new player
      axios
         .post('http://localhost:5000/popular_player', playerData)
         .then(response => {
            console.log('player created successfully:', response.data);
            // Perform any additional actions after successful creation
         })
         .catch(error => {
            console.error('Error creating player:', error);
            // Handle any error that occurred during the request
         });
   };

   return (
      <Layout>
         <div>
            <div className='flex items-center gap-2 divide-x mb-5 lg:mb-0'>
               <h4 className='text-lg font-semibold px-2'> Players</h4>
               <Breadcumbs
                  srcIcon={AiOutlineHome}
                  rootLabel='Popular players'
                  //   currentLabel='Create'
               />
            </div>

            <div className='bg-white rounded shadow p-4 mt-6 relative'>
               <h4 className='text-sm font-semibold text-gray-500 pb-2'>
                  Search Popular players
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
                           <GiSoccerKick className='animate-bounce text-5xl text-teal-500' />{' '}
                        </div>
                     ) : (
                        <ul className='divide-y'>
                           {searchedPlayers?.map(player => (
                              <div
                                 className='flex items-center justify-between'
                                 key={player.id}
                              >
                                 <div className='flex items-center gap-2'>
                                    <img
                                       className='w-8'
                                       src={player.image_path}
                                       alt='player Image'
                                    />
                                    <li className='py-3 text-sm'>
                                       {player.name}
                                    </li>
                                 </div>
                                 <button className='btn btn-circle btn-sm bg-green-500 hover:bg-green-600'>
                                    <BsPlusCircleFill
                                       onClick={() => handleClick(player)}
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
                  Popular player List
               </h4>
               <div className='flex flex-col gap-2 divide-y px-5'>
                  {popularPlayers?.map(player => (
                     <div
                        key={player.id}
                        className='flex items-center justify-between py-2'
                     >
                        <div className='flex items-center gap-2'>
                           <img
                              className='w-8'
                              src={player.image_path}
                              alt='player Image'
                           />
                           <h4>{player.name}</h4>
                        </div>
                        <button
                           className='btn btn-circle btn-sm bg-red-500 hover:bg-red-600'
                           onClick={() => {
                              setPlayer(player);
                              window.confirm_delete_modal.showModal();
                           }}
                        >
                           <FaTrashAlt className='text-white text-base hover:animate-pulse transition-all ease-linear duration-150' />
                        </button>
                     </div>
                  ))}
                  <ConfirmDeleteModalPlayer
                     player={player}
                     uniqueId={'confirm_delete_modal'}
                  />
               </div>
            </div>
         </div>
      </Layout>
   );
}
