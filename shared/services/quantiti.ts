import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants";
import { CountProduct } from "@prisma/client";

export const getAll = async (): Promise<CountProduct[]> => {
    return (await axiosInstance.get<CountProduct[]>(ApiRoutes.COUNT_PRODUCT)).data;
    
}