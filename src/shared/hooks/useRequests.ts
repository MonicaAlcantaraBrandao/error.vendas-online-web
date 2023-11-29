import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";
import ConnectionAPI, {
  ConnectionAPIPost,
  MethodType,
} from "../functions/connection/connectionAPI";
import { URL_AUTH } from "../constants/urls";
import { ERROR_INVALID_PASSWORD } from "../constants/errorStatus";
import { useNavigate } from "react-router-dom";
import { ProductRoutesEnum } from "../../modules/product/routes";
import { setAuthorizationToken } from "../functions/connection/auth";
import { AuthType } from "../../modules/login/types/AuthType";

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setNotification, setUser } = useGlobalContext();

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown
  ): Promise<T | undefined> => {
    setLoading(true);

    const returnObject: T | undefined = await ConnectionAPI.connect<T>(
      url,
      method,
      body
    )
      .then((result) => {
        if (saveGlobal) {
          saveGlobal(result);
        }
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, "error");
        return undefined;
      });
    setLoading(false);

    return returnObject;
  };

  const postRequest = async <T>(
    url: string,
    body: unknown
  ): Promise<T | undefined> => {
    setLoading(true);

    const returnData = await ConnectionAPIPost<T>(url, body)
      .then((result) => {
        setNotification("Entrando...", "success", "aguarde");
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, "error");
        return undefined;
      });

    setLoading(false);

    return returnData;
  };

  const authRequest = async (body: unknown): Promise<void> => {
    setLoading(true);

    await ConnectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        navigate(ProductRoutesEnum.PRODUCT);
        return result;
      })
      .catch(() => {
        setNotification(ERROR_INVALID_PASSWORD, "error");
        return undefined;
      });

    setLoading(false);
  };

  return {
    loading,
    request,
    postRequest,
    authRequest,
  };
};
