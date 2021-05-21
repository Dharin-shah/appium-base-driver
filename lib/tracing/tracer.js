const api = require('@opentelemetry/api');
const { SpanStatusCode } = require('@opentelemetry/api');

class Tracer {

  constructor (tracerProviderInstance, name, options = {}) {
    this.tracingProvider = tracerProviderInstance;
    const { version } = options;
    this._tracer = api.trace.getTracer(name, version);
  }

  instrumentAsyncMethod (name, context = undefined, spanOptions = undefined, fn) {
    const spannerFunction = async (...args) => {
      const span = this._tracer.startSpan(name, spanOptions, context);
      try {
        let ret = await fn.call(args);
        span.end();
        return ret;
      } catch (error) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message
        });
        throw error;
      }
    };
    return spannerFunction;
  }

  instrumentMethod (name, context = undefined, spanOptions = undefined, fn) {
    const spannerFunction = (...args) => {
      const span = this._tracer.startSpan(name, spanOptions, context);
      try {
        let ret = fn.call(args);
        span.end();
        return ret;
      } catch (error) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message
        });
        throw error;
      }
    };
    return spannerFunction;
  }
}

export { Tracer };

