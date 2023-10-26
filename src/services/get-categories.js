import axios from "axios";
import { setIsLoading } from "../store/action";

export async function getCategories(dispatch) {
  try {
    dispatch(setIsLoading(true)); // isLoading(true) qilib o'zgarmaydigan "setIsLoading" actionni dispatch qilamiz.
    
    const responseCategory = await axios.get("https://api.cake-bumer.uz/public/api/categories");
    const responseImage = await axios.get("https://api.cake-bumer.uz/api/images");
    const data = responseCategory.data;
    const image = responseImage.data
    const allData = {data, image}
    
    dispatch(setIsLoading(false)); // isLoading(false) qilib o'zgarmaydigan "setIsLoading" actionni dispatch qilamiz.

    return allData;
  } catch (error) {
    dispatch(setIsLoading(false)); // Xato yuzaga kelsa ham isLoading(false) qilib o'zgarmaydigan "setIsLoading" actionni dispatch qilamiz.
    throw error;
  }
}

