import axios from "axios";
import { useState } from "react"
import { useGlobalContext } from "./useGlobalContext";
import { ConnectionAPIPost } from "../functions/connection/connectionAPI";

export const useRequests = () => {
    const [loading, setLoading] = useState(false);
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

    return{
        loading,
        getRequest,
        postRequest,
    };
};