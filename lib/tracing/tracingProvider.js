const { ConsoleSpanExporter, BatchSpanProcessor } = require('@opentelemetry/tracing');
const { NodeTracerProvider } = require('@opentelemetry/node');
const opentelemetry = require('@opentelemetry/api');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { NoopTracerProvider } = require('@opentelemetry/api');

//Delegate
class TracerProvider {
  constructor () {
    this.provider = new NodeTracerProvider();
    this.initializeTracer();
    //register core instrumentation tracer
    this.registerInstrumentation(new HttpInstrumentation());
    //register contrib instrumentation tracer
    this.registerInstrumentation(new ExpressInstrumentation());
  }

  static getNoopTracerProviderInstance () {
    return new NoopTracerProvider();
  }

  addSpanProcessor (spanProcessor) {
    this.provider.addSpanProcessor(spanProcessor);
  }

  setGlobalProvider () {
    opentelemetry.trace.setGlobalTracerProvider(this.provider);
  }

  registerInstrumentation (instrumentationInstance) {
    registerInstrumentations({
      instrumentation: [instrumentationInstance],
    });
  }

  shutdown () {
    this.provider.shutdown();
  }

  initializeTracer () {
    if (this.provider.getActiveSpanProcessor() === undefined) {
      const consoleExporter = new ConsoleSpanExporter();
      const spanProcessor = new BatchSpanProcessor(consoleExporter);
      this.addSpanProcessor(spanProcessor);
    }
    this.provider.register();
  }
}

const tracerProviderInstance = new TracerProvider();
export { tracerProviderInstance };