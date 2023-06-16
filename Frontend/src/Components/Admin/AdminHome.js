import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./ModalDelete";
import EditModal from "./ModalEdit";

const Dashboard = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [FilteredData, setFilteredData] = useState(users)
  const [searchValue, setSearch] = useState()

  useEffect(() => {
    if (searchValue) {
      let result = users.filter(item => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.email.toLowerCase().includes(searchValue.toLowerCase())
      });
      setFilteredData(result)
    } else {
      setFilteredData(users)
    }
  }, [searchValue, users])

  useEffect(() => {
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin/login')
    } else {
      setFilteredData(users)
    }
  }, [])

  const Logout = () => {
    localStorage.removeItem('adminLoggedIn');
    location.href = '/admin/login';
  }



  const FetchAllUsers = async () => {
    await Axios.get('http://localhost:4000/admin/').then((response) => {
      setUsers(response.data.users)
      setFilteredData(response.data.users)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    FetchAllUsers();
  }, [ navigate])


  return (
    <>

      {/* //   NAVBAR CONTAINER   // */}
      <div className="bg-gray-800 h-16">
        <button className="bg-gray-100  hover:bg-gray-800 hover:text-white text-gray-800 font-bold py-1 px-4 mr-7 mt-4 rounded float-right " onClick={Logout}>
          Logout
        </button>
        <h2 className="text-2xl pl-8 pt-4  font-bold text-white leading-7 ">
          Admin Panel
        </h2>
      </div>

          {/* //  SEARCH CONTAINER   // */}
      <div className="flex justify-center mt-9" id="app-element">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="default-search" value={searchValue} onChange={(e) => setSearch(e.target.value)} class="block w-full p-4 pl-10  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search here..." />
          </div>
      </div>

      <div className="flex justify-center mt-9" id="app-element">

        <div className="overflow-x-auto ">

          <table className="border-collapse border border-gray-700 w-96">
            <thead className=" border-white  ">
              <tr>
                <th className="border bg-gray-600 text-sm text-white px-4 p-2">USER ID</th>
                <th className="border bg-gray-600 text-sm text-white px-4 p-2">NAME</th>
                <th className="border bg-gray-600 text-sm text-white px-4 p-2">EMAIL ADDRESS</th>
                <th className="border bg-gray-600 text-sm text-white px-4 p-2">MOBILE</th>
                <th className="border bg-gray-600 text-sm text-white px-4 p-2">EDIT</th>
                <th className="border bg-gray-600 text-sm text-white px-4 p-2">DELETE</th>
              </tr>
            </thead>
            <tbody>

              {/* //  USER TABLE LIST CONTAINER  // */}

              {FilteredData.map((item) =>
                <>
                  <tr className="border" >
                    <td className="text-sm p-2">{item?._id}</td>
                    <td className="text-sm p-2">{item?.name}</td>
                    <td className="text-sm p-2">{item?.email}</td>
                    <td className="text-sm p-2">{item?.mobile}</td>

                     {/* //  UPDATE MODAL  //  */}
                    <td className="text-sm p-2 ">
                      <EditModal data={item} navigate={navigate} setUsers={setUsers} key={item?._id} />
                    </td>

                    {/* //  DELETE MODAL  // */}
                    <td className="text-sm p-2">
                      <DeleteModal data={item?._id} setUsers={setUsers} key={item._id} />
                    </td>

                  </tr>
                </>
              )}

            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
