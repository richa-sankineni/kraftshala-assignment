
function formatDate(date) {
  return new Date(date).toISOString();
}

function parseDate(dateString) {
  return new Date(dateString);
}

function createResponse(statusCode, message, data = null) {
  return {
    status: statusCode,
    message,
    data,
  };
}

module.exports = { formatDate, parseDate, createResponse };
