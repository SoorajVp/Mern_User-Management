import axios from "../Api/ApiInstance";
import { ADMIN_LOGIN_SUCCESS } from "../Redux/Constants";


export const adminLogin = ( email, password, setError, navigate ) => async (dispatch) => {

    const data = {
        email: email,
        password: password
      }

      try {
        await axios.post('/admin/login', data).then((response) => {

          if(response.data.success) {
            dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: true })
            localStorage.setItem("adminLoggedIn", true );
            navigate('/admin');
          }else{
            setError(response.data.message)
          }

        })
        .catch((err) => {
            console.log(err)
            setError("Internal server error, please try again")
            
        })
      } catch (error) {
        setError("Internal server error, please try again")
      }
}
