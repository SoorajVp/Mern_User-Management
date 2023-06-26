import React, { useEffect, useState } from 'react';
import axios  from '../../Api/ApiInstance';
import Modal from 'react-modal';

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


function EditModal({data, navigate, setUsers }) {

  const [user, setUser] = useState(data)

  const [id, setId] = useState(user?._id)
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [mobile, setMobile] = useState(user?.mobile)


  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(userData) {
    console.log(userData);
    setId(userData._id)
    setName(userData.name)
    setEmail(userData.email)
    setMobile(userData.mobile)
    setIsOpen(true);
  }

  const Submit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('/admin/update-user', { id, name, email, mobile })
        .then((response) => {
          if (response.data.success) {
            navigate('/admin');
            setIsOpen(false);
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const FetchAllUsers = async () => {
    await axios.get('/admin').then((response) => {
      console.log(response.data);
      setUsers(response.data.users)
      setFilteredData(response.data.users)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    FetchAllUsers();
  }, [modalIsOpen, navigate])


  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}

      <div className="flex justify-center justify-items-center" onClick={() => openModal(user)} >
        <svg class="h-5 w-5 text-blue-900" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
      </div>


      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}> </h2>

        <h2 className="text-sm"> EDIT USERS</h2>


        <form action="POST">
          <div>
            <label htmlFor="email" className="block mt-2 text-sm font-medium leading-6 text-gray-900">
              Full Name
            </label>
            <div className="m1">
              <input
                id="text"
                name="name"
                onChange={(e) => { setName(e.target.value) }}
                required
                value={name}
                className="block w-full rounded-md border-0 pl-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block mt-2 text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="m1">
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
                className="block w-full rounded-md border-0 pl-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block mt-2 text-sm font-medium leading-6 text-gray-900">
              Mobile Number
            </label>
            <div className="m1">
              <input
                id="mobile"
                name="mobile"
                type="tel"
                onChange={(e) => { setMobile(e.target.value) }}
                value={mobile}
                required
                className="block w-full rounded-md border-0 pl-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex">
            <button onClick={closeModal} className="flex w-full mt-2 justify-center rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1"
            >Discard</button>
            <button
              type="submit"
              className="flex w-full mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={Submit}
            >
              Save
            </button>
          </div>

        </form>
      </Modal>


    </div>
  );
}

export default EditModal;