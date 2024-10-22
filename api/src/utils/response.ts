import { Response } from "express";

interface SuccessPayload {
    data: any;
    statusCode: number;
    message?: string;
    total?: number;
}

interface ErrorPayload {
    statusCode: number;
    message?: string;
    errors?: any;
}

export const successResponse = async (res: Response, payload: SuccessPayload) => {
    let { data, statusCode, message = 'Success', total } = payload;

    const response = {
        data,
        statusCode,
        message,
        status: "success",
        ...(total !== undefined && { total }),
    };

    return res.status(statusCode).send(response);
}


export const errorResponse = async (res: Response, payload: ErrorPayload) => {
    let { statusCode, message } = payload;
    return res
        .status(statusCode)
        .send({ status: "failure", statusCode, message, payload: [] });
}