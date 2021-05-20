const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
const opentelemetry = require('@opentelemetry/api');

class TracerProvider {
  constructor () {
    this.provider = new BasicTracerProvider();
  }

  addSpanProcessor (spanProcessor) {
    this.provider.addSpanProcessor(spanProcessor);
  }

  setGlobalProvider () {
    opentelemetry.trace.setGlobalTracerProvider(this.provider);
  }

  shutdown () {
    this.provider.shutdown();
  }

  initializeTracer () {
    if (this.provider.getActiveSpanProcessor() === undefined) {
      const consoleExporter = new ConsoleSpanExporter();
      const spanProcessor = new SimpleSpanProcessor(consoleExporter);
      this.addSpanProcessor(spanProcessor);
    }
    this.provider.register();
  }
}

export { TracerProvider };