exports.generateMessage = text => ({text , createdAt : new Date().getTime()})

exports.generateLocationMessage = url => ({url, createdAt : new Date().getTime() })