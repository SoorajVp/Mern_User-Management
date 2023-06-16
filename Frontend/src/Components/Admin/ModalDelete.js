import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '30%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function DeleteModal({ data, setUsers }) {

  console.log("this is props ;;;;;;;;;;");

  const navigate = useNavigate('/');
  const userId = {
    data: data
  }

  const Submit = async () => {
    await Axios.post('http://localhost:4000/admin/remove-user', userId)
      .then((response) => {
        setIsOpen(false);
        navigate('/admin')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const FetchAllUsers = async () => {
    await Axios.get('http://localhost:4000/admin/').then((response) => {
      console.log(response.data);
      setUsers(response.data.users)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    FetchAllUsers();
  }, [modalIsOpen])

  return (



    <div>
      <div className="flex justify-center justify-items-center" onClick={openModal} >
        <svg class="h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <div className='flex justify-center justify-items-center'>
          <label htmlFor="email" className="block my-4 text-lg font-medium leading-6 text-gray-800">
            Are you sure to remove this user ?
          </label>

        </div>
        <div className="flex">
          <button onClick={closeModal} className="flex w-full mt-2 justify-center rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2"
          >Cancel</button>
          <button
            type="submit"
            className="flex w-full mt-2 justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={Submit}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}


export default DeleteModal;