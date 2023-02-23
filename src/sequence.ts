import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
  async handle(context: RequestContext) {
    console.log(`Request arrived at: ${new Date().toLocaleTimeString()}`);
    const {request} = context;
    const headers = request.headers;

    // log the following details for each request - referer, user-agent and ip
    console.log(`Referer: ${headers.referer}`);
    console.log(`User-Agent: ${headers['user-agent']}`);
    console.log(`IP: ${request.ip}`);

    try {
      await super.handle(context);
    } catch (error) {
      console.log(`Error occurred at: ${new Date().toLocaleTimeString()}`);
      throw error;
    } finally {
      console.log(`Response delivered at: ${new Date().toLocaleTimeString()}`);
    }
  }
}
