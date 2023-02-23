import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
  async handle(context: RequestContext) {
    console.log(`Request arrived at: ${new Date().toLocaleTimeString()}`);
    const request = context.request;
    const headers = request.headers;

    console.log(`Referer: ${headers.referer}`);
    console.log(`User-Agent: ${headers['user-agent']}`);
    console.log(`IP: ${request.ip}`);

    try {
      await super.handle(context);
      console.log(`Response delivered at: ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      console.log(`Error occurred at: ${new Date().toLocaleTimeString()}`);
      throw error;
    }

    console.log({
      requestedBaseUrl: context.requestedBaseUrl,
      basePath: context.basePath,
    });
  }
}
