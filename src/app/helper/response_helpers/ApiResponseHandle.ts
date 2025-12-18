import { Response } from 'express'; // Assuming 'express' is used for Response type

interface ResultWithData {
  status: boolean;
  data: any; // Adjust as per your data structure
  message?: string;
}

interface ErrorResponse {
  status: false;
  error: any; // Adjust as per your error structure
}

interface MessageResponse {
  status: boolean;
  data: any; // Adjust as per your data structure
  message: string;
}

interface PaginationResponse {
  status: boolean;
  data: any[]; // Adjust as per your data structure
  count: number;
  pages: number;
  message: string;
  basePath: string;
}

export default {
  getExistsResult(result: any, res: Response): void {
    res.status(200).json({ status: false, error: result } as ErrorResponse);
  },

  getSuccessResult(result: any, res: Response): void {
    const jsonmessage: ResultWithData = result && result.message
      ? { status: true, data: result.data, message: result.message }
      : { status: true, data: result };
    res.status(200).json(jsonmessage);
  },

  getMessageResult(response: any, message: string, res: Response): void {
    if (response?.length === 1) {
      res.status(200).json({ status: true, data: response, message });
    } else {
      res.status(200).json({ status: true, data: response, message });
    }
  },

  getNotExistsResult(response: any, res: Response): void {
    res.status(404).json({ status: false, message: response });
  },

  getBadRequestResult(result: any, res: Response): void {
    res.status(400).json({ status: false, message: 'Bad request found' });
  },

  getNotFoundmessage(message: string, res: Response): void {
    res.status(404).json({ status: false, message });
  },

  getErrorResult(errResp: any, res: Response): void {
    const errMsg = errResp.message ? errResp.message : errResp;
    res.status(200).json({ status: false, error: { message: errMsg } });
  },

  getMessageResultPagination(response: PaginationResponse, message: string, res: Response): void {
    res.status(200).json({ status: true, data: response.data, count: response.count, pages: response.pages, message, basePath: response.basePath });
  },

  serverError(errResp: any, res: Response): void {
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};
