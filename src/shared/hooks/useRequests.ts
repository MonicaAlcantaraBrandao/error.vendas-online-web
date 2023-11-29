import axios from "axios";
import { useState } from "react"
import { useGlobalContext } from "./useGlobalContext";
import { ConnectionAPIPost } from "../functions/connection/connectionAPI";
import { URL_AUTH } from "../constants/urls";
import { ERROR_INVALID_PASSWORD } from "../constants/errorStatus";
import { useNavigate } from "react-router-dom";
import { ProductRoutesEnum } from "../../modules/product/routes";
import { setAuthorizationToken } from "../functions/connection/auth";
import { AuthType } from "../../modules/login/types/AuthType";

export const useRequests = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setNotification } = useGlobalContext()

    const getRequest = async (url: string) => {
        setLoading(true);

        const returnData = await axios({
            method: "get",
            url: url,
          })
          .then((result) => {
            return result.data
          })
          .catch(() => {
            alert('Erro');
        });

        setLoading(false);

        return returnData;
    };

    const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> => {
        setLoading(true);

        const returnData = await ConnectionAPIPost<T>(url, body)
          .then((result) => {
            setNotification('Entrando...', 'success', 'aguarde')
            return result;
          })
          .catch((error: Error) => {
            setNotification(error.message, 'error')
            return undefined;
        });

        setLoading(false);

        return returnData;
    };

    const authRequest = async (body: unknown): Promise<void> => {
        setLoading(true);

        await ConnectionAPIPost<AuthType>(URL_AUTH, body)
          .then((result) => {
            setNotification('Entrando...', 'success', 'aguarde')
            setAuthorizationToken(result.accessToken)
            navigate(ProductRoutesEnum.PRODUCT)
            return result;
          })
          .catch(() => {
            setNotification(ERROR_INVALID_PASSWORD, 'error')
            return undefined;
        });

        setLoading(false);

    };

    return{
        loading,
        getRequest,
        postRequest,
        authRequest,
    };
};