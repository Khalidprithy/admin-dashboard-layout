import axios from 'axios';

export default function ConfirmDeleteModalPlayer({ player, uniqueId }) {
   const { id } = player;
   console.log('player data', player, id);

   function handleConfirmClick() {
      axios
         .delete(`http://localhost:5000/popular_player/${id}`)
         .then(response => {
            console.log('player item deleted successfully:', response.data);
         })
         .catch(error => {
            console.error('Error deleting player item:', error);
         });
      console.log('Confirm button clicked');
   }

   return (
      <dialog
         id={`${uniqueId}`}
         className='modal modal-bottom sm:modal-middle backdrop-blur-sm'
      >
         <form
            method='dialog'
            className='relative bg-white p-4 rounded-md shadow-sm hover:shadow-lg'
         >
            <button className='btn btn-xs text-white border-0 btn-circle bg-red-500 btn-ghost absolute right-2 top-2'>
               ✕
            </button>
            <h3 className='font-bold text-lg text-center'>Confirm delete</h3>
            <p className='py-4'>
               Are you sure you want to delete{' '}
               <span className='font-semibold'>{player?.name}</span>?
            </p>
            <div className='modal-action'>
               {/* if there is a button in form, it will close the modal */}
               <button className='btn btn-sm rounded btn-primary'>
                  Cancel
               </button>
               <button
                  className='btn btn-sm rounded btn-error'
                  onClick={handleConfirmClick}
               >
                  Confirm
               </button>
            </div>
         </form>
      </dialog>
   );
}
