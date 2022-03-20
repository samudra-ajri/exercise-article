const responseBody = (res, content, message, statusCode=200) => {
    return res.status(statusCode).json({
        code: statusCode,
        content: content,
        totalItems: Array.isArray(content) ? content.length : 1,
        message: message
    })
}

export { responseBody }