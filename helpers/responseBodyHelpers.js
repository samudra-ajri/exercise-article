const responseBody = (res, content, message, statusCode=200) => {
    return res.status(statusCode).json({
        code: statusCode,
        content: content,
        totalItems: Array.isArray(content) ? content.length : 1,
        message: message
    })
}

const responseBodyList = (res, req, content, message, statusCode=200) => {
    const page = req.query.page
    const size = req.query.size
    const show = content.rows.length
    const totalData = content.count
    const totalPage = Math.floor((totalData + (size * 1) - 1) / size)
    const showFrom = show == 0 ? 0 : (page * size) - size + 1
    const showTo = show == 0 ? 0 : show + showFrom - 1
    
    return res.status(statusCode).json({
        code: statusCode,
        content: content.rows,
        meta: {
            page,
            size,
            show,
            showFrom,
            showTo,
            totalPage,
            totalData
        },
        message: message
    })
}

export { responseBody, responseBodyList }