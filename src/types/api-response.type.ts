import { AxiosResponse } from "axios";

interface ResultDataType<T> {}

export interface ApiResponse<T> extends AxiosResponse<T> {}
