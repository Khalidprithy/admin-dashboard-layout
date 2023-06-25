import Input from '../Input/InputCom';
import SearchCountry from '../Input/SearchCountry';
import TextArea from '../Input/Textarea';

export default function IosSettings() {
   return (
      <div>
         <div>
            <h4 className='text-lg text-gray-600 py-4'>General Settings</h4>
            <div className='border border-gray-200 rounded p-2'>
               <Input label={'Privacy Policy'} />
               <Input label={'Terms and Conditions'} />
               <Input label={'App Share Link'} />
               <select className='select w-full mt-3 rounded-md border-1 border-gray-100  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:outline-0 disabled:border-0 bg-white shadow-sm disabled:bg-blue-gray-50'>
                  <option disabled selected>
                     App Default Page
                  </option>
                  <option value='live'>Live</option>
                  <option value='home'>Home</option>
               </select>
            </div>
         </div>

         <div>
            <h4 className='text-lg text-gray-600 py-4'>Live Control</h4>
            <div className='border border-gray-200 rounded p-2'>
               <select className='select w-full mt-3 rounded-md border-1 border-gray-100  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:outline-0 disabled:border-0 bg-white shadow-sm disabled:bg-blue-gray-50'>
                  <option disabled selected>
                     App Publish Control
                  </option>
                  <option value='live'>Live</option>
                  <option value='home'>Home</option>
               </select>
               <Input label={'Hide Live by Version Code'} type={'Number'} />
            </div>
         </div>

         <div>
            <h4 className='text-lg text-gray-600 py-4'>Ads Settings</h4>
            <div className='flex gap-2 border border-gray-200 rounded p-2'>
               <select className='select w-full mt-3 rounded-md border-1 border-gray-100  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:outline-0 disabled:border-0 bg-white shadow-sm disabled:bg-blue-gray-50'>
                  <option disabled selected>
                     Ads Type
                  </option>
                  <option value='Google'>Google</option>
                  <option value='Pagol'>Pagol</option>
               </select>
               <select className='select w-full mt-3 rounded-md border-1 border-gray-100  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:outline-0 disabled:border-0 bg-white shadow-sm disabled:bg-blue-gray-50'>
                  <option disabled selected>
                     Click Control
                  </option>
                  <option value='off'>Off</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
               </select>
            </div>
         </div>

         <div>
            <h4 className='text-lg text-gray-600 py-4'>Google</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 border border-gray-200 rounded p-2'>
               <div>
                  <Input label={'App Id'} />
                  <Input label={'App Open Ads'} />
                  <Input label={'Interstitial Ads'} />
                  <Input label={'Banner Ads'} />
               </div>
               <div>
                  <Input label={'Native Ads'} />
                  <Input label={'Rewarded Ads'} />
                  <Input label={'Adaptive Interstitial Ads'} />
               </div>
            </div>
         </div>

         <div>
            <h4 className='text-lg text-gray-600 py-4'>Version Control</h4>
            <div className='border border-gray-200 rounded p-2'>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                  <Input label={'Version Name'} />
                  <SearchCountry />
               </div>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                  <Input label={'Version Code'} type={'Number'} />
                  <select className='select w-full mt-3 rounded-md border-1 border-gray-100  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:outline-0 disabled:border-0 bg-white shadow-sm disabled:bg-blue-gray-50'>
                     <option disabled selected>
                        Force Update
                     </option>
                     <option value='no'>NO</option>
                     <option value='yes'>YES</option>
                  </select>
               </div>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-4'>
                  <Input label={'App Url'} />
                  <Input label={'Button Text'} />
               </div>
               <TextArea label={'Description'} />
            </div>
         </div>
      </div>
   );
}
