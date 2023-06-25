'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function SearchCountry() {
   const [countries, setCountries] = useState([]);

   const fetchedCountries = async () => {
      const response = await axios
         .get('https://trial.mobiscroll.com/content/countries.json')
         .catch(err => console.log(err));
      const data = response.data;
      const countries = [];
      for (let i = 0; i < data.length; ++i) {
         const country = data[i];
         countries.push({ label: country.text, value: country.value });
      }
      setCountries(countries);
   };

   useEffect(() => {
      fetchedCountries();
   }, []);

   const options = countries;

   return (
      <div className='flex flex-col p-3'>
         <Select
            placeholder={
               <div className='text-sm text-black'>Block Country</div>
            }
            options={options}
            isMulti
         />
      </div>
   );
}
