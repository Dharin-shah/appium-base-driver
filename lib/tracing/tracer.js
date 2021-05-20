const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');

class TracerProvider {
  constructor () {
    this.provider = new BasicTracerProvider();
  }

  addSpanProcessor (spanProcessor) {
    this.provider.addSpanProcessor(spanProcessor);
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