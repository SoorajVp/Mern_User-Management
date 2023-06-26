import axios from "../Api/ApiInstance";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profilePhoto } from "../Actions/ImageUpload";


export default function Profile() {

  const navigate = useNavigate();
  useEffect(() => {
    fetchProfileData();
  }, [])

  const dispatch = useDispatch();
  let imageUpload = useSelector((state) => state.imageUpload);
  const { userInfo } = imageUpload;

  const fetchProfileData = async () => {
    try {
      const response = await axios.get( '/profile' );
      if (response.data.success) {
        setId(response.data.data._id)
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setMobile(response.data.data.mobile);
        setImage(response.data.data.profilePic);
        setProfileName(response.data.data?.name)
      } else {
        navigate('/login')
      }
    } catch (error) {
      console.error("Profile axios error ----",error);
    }
  }

  const [Id, setId] = useState(userInfo?.name);
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email)
  const [mobile, setMobile] = useState(userInfo?.mobile)
  const [image, setImage] = useState(userInfo?.profilePic)
  const [edit, setEdit] = useState(false)

  const [profileName, setProfileName] = useState(userInfo?.name)
  

  const handleFileChange = async (event) => {
    let profilePic = event.target.files[0];
    dispatch(profilePhoto( profilePic ))
  }

  const HandleSumit = async(e) => {
    e.preventDefault();
    const data = {
      _id: Id,
      name: name,
      email: email,
      mobile: mobile,
    }

    try {
      await axios.patch("/update-profile", data).then((response) => {
        if (response.data.success) {
          setEdit(false)
          setProfileName(response.data.data)
          navigate('/profile');
        } else {
          console.log(response.data.message)
        }
      })
    } catch (error) {
      console.log("this is error :" + error)
    }
  }

  return (
    <div className="bg-white py-20 sm:py-12">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl  ">
          <div className="flex justify-center items-center">
            <img src={image} className=" rounded-full w-48" alt="" />
          </div>

          <div className="flex justify-center items-center">
            <input type="file" name="image" className="w-24 mt-3" onChange={handleFileChange} />
          </div>
          <div className="flex justify-center items-center">
            <h3 className="text-sm font-bold tracking-tight text-gray-900 sm:text-2xl pt-2 " > {profileName} </h3><br />
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h3 className="text-sm font-bold pt-2 pr-2 cursor-pointer text-blue-700 float-right" onClick={() => setEdit(!edit)}>Edit</h3>
          <h2 className="text-base font-semibold leading-7 text-gray-900 ">Personal Information</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!edit}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!edit}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={!edit}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              { edit && <div className="mt-1">
                <input
                  type="submit"
                  name="name"
                  id="name"
                  value="Save changes"
                  onClick={HandleSumit}
                  className="block w-full cursor-pointer rounded-md border-0 py-1.5 pl-2 text-gray-100 bg-slate-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}