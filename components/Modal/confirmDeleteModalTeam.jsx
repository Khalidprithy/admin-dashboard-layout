import axios from 'axios';

export default function ConfirmDeleteModalTeam({ team, uniqueId }) {
   const { id } = team;
   console.log('team data', team, id);

   function handleConfirmClick() {
      axios
         .delete(`http://localhost:5000/popular_team/${id}`)
         .then(response => {
            console.log('team item deleted successfully:', response.data);
         })
         .catch(error => {
            console.error('Error deleting team item:', error);
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
               <span className='font-semibold'>{team?.name}</span>?
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
