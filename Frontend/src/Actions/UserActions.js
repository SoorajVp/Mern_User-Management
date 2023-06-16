
import axios from "../Api/ApiInstance";
import { USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../Redux/Constants";



export const login = (email, password, setError, navigate) => (dispatch) => {



  const data = {
    email: email,
    password: password
  }
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    axios.post('/login', data).then((response) => {
      if (response.data.success) {
        console.log("this is login response----", response.data)
        localStorage.setItem("token", response.data?.token);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data?.data })
        // navigate('/');
        location.href = '/'
      } else {
        dispatch({ type: USER_LOGIN_FAILED })
        setError(response.data.message)
      }
    })
      .catch((err) => {
        dispatch({ type: USER_LOGIN_FAILED })
        console.log(err)

      })
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAILED })
    console.log(error)
  }
}

