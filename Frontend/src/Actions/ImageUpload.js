import axios from "../Api/ApiInstance";
import { IMAGE_UPLOAD } from "../Redux/Constants";


export const profilePhoto = (profilePic) => async (dispatch) => {

    try {
        console.log("This is log from action page - - -", profilePic)

        const formData = new FormData();
        formData.append('image', profilePic);
        console.log(formData);

        const response = await axios.post('/update-profile-photo', formData);
        console.log(response.data);
        dispatch({ type: IMAGE_UPLOAD, payload: response.data });
        
    } catch (error) {
        console.log("dispaatch erroooorrr")
    }

}