const { SimpleSpanProcessor, BatchSpanProcessor } = require('@opentelemetry/tracing');

const getSimpleSpanProcessor = function (spanExporter) {
  return new SimpleSpanProcessor(spanExporter);
};

const getBatchSpanProcessor = function (spanExporter) {
  return new BatchSpanProcessor(spanExporter);
};

export { getSimpleSpanProcessor, getBatchSpanProcessor };