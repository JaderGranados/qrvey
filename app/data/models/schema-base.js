const schemaBase = {
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}

module.exports = schemaBase;