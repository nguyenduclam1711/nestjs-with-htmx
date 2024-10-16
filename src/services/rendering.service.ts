import { Injectable } from '@nestjs/common';
import { ReactElement } from 'react';
import * as ReactDOMServer from 'react-dom/server';

@Injectable()
export class RenderingService {
  render(reactEle: ReactElement): string {
    return ReactDOMServer.renderToString(reactEle);
  }
}
