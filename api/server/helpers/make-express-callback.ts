import { Request, Response } from 'express';

export function MakeExpressCallback(controller: any) {
  return (req: Request, res: Response) => {
    const httpReq = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      currentUser: req.currentUser,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };

    return controller(httpReq, res);
  };
}
