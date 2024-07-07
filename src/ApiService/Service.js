import AxiosInstance from "../AxiosInstance/AxiosInstance";
import AxiosInstanceNoToken from "../AxiosInstance/AxiosInstanceNoToken";
import TokenAxiosIntance from "../AxiosInstance/TokenAxiosIntance";
export const CustomFecthDataAxios = async (Url, body) => {
  try {
    const responce = await AxiosInstance.post(Url, JSON.stringify(body)).then(
      (resp) => resp
    );
    return responce.data;
  } catch (error) {
    return error.response;
  }
};
export const CategoryGetAllApi = async () => {
  try {
    const Url = "product/getall_category";
    const responce = await AxiosInstanceNoToken.post(Url).then((resp) => resp);
    return responce.data.data;
  } catch (error) {
    return error.responce;
  }
};
export const CategoryGetApi = async (body) => {
  try {
    const Url = "product/getSingle_category";
    const responce = await AxiosInstanceNoToken.post(Url, body).then(
      (resp) => resp
    );
    return responce.data;
  } catch (error) {
    return error.responce;
  }
};
export const CategoryInsertUpdateApi = async (body) => {
  try {
    const Url = "product/insertupdate_category";
    const responce = await TokenAxiosIntance.post(Url, body).then(
      (resp) => resp
    );
    return responce.data;
  } catch (error) {
    return error.responce;
  }
};
export const DeleteApi = async (body) => {
  try {
    const Url = "product/delete_category";
    const responce = await TokenAxiosIntance.post(Url, body).then(
      (resp) => resp
    );
    return responce.data;
  } catch (error) {
    return error.responce;
  }
};

///Product
export const ProductGetAllApi = async () => {
  try {
    const Url = "product/getall_products";
    const responce = await AxiosInstanceNoToken.post(Url).then((resp) => resp);
    return responce.data.data;
  } catch (error) {
    return error.responce;
  }
};
///Product
export const ProductGetAllFilterApi = async (data) => {
  try {
    const Url = "product/filterCatwise_product";
    const responce = await AxiosInstanceNoToken.post(Url,data).then((resp) => resp);
    return responce.data.data;
  } catch (error) {
    return error.responce;
  }
};
export const DeleteProductApi = async (body) => {
  try {
    const URL = "product/delete_product";
    const responce = await TokenAxiosIntance.post(URL, body).then((res) => res);
    return responce.data;
  } catch (error) {
    return error.responce;
  }
};
export const ProductInsertUpdateApi = async (formdata) => {
  try {
    const Url = "product/updateinsert_product";
    const responce = await TokenAxiosIntance.post(Url, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((resp) => resp);
    return responce.data;
  } catch (error) {
    return error.responce;
  }
};
export const SingleProductApi = async (body) => {
  try {
    const URL = "product/single_product";
    const responce = await AxiosInstanceNoToken.post(URL, body).then((res) => res);
    return responce.data;
  } catch (error) {
    return error.responce;
  }
};
export const SimilerProductApi = async (body) => {
  try {
    const URL = "product/similer_product";
    const responce = await AxiosInstanceNoToken.post(URL, body).then((res) => res);
    return responce.data;
  } catch (error) {
    return error.responce;
  }
};

export const AddOrder=async (body)=>{
  try {
    const URL = "order/add_order";
    const responce = await TokenAxiosIntance.post(URL, body).then((res) => res);
    return responce.data;
  } catch (error) {
    return error?.response?.data;
  }
}
export const GetCountDetilsApi=async ()=>{
  try {
    const URL = "order/find_order_count";
    const responce = await TokenAxiosIntance.get(URL).then((res) => res);
    return responce.data;
  } catch (error) {
    return error?.response?.data;
  }
}
export const GetAllOrderDetailsApi=async (body)=>{
  try {
    const URL = "order/get_orderdetails";
    const responce = await TokenAxiosIntance.post(URL, body).then((res) => res);
    return responce.data;
  } catch (error) {
    return error?.response?.data;
  }
}
export const UpdateOrderDetailsApi=async (body)=>{
  try {
    const URL = "order/update_delivery_status";
    const responce = await TokenAxiosIntance.post(URL, body).then((res) => res);
    return responce.data;
  } catch (error) {
    return error?.response?.data;
  }
}
export const UserOrdersApi=async (body)=>{
  try {
    const URL = "order/user_order_details";
    const responce = await TokenAxiosIntance.post(URL, body).then((res) => res);
    return responce.data;
  } catch (error) {
    return error?.response?.data;
  }
}