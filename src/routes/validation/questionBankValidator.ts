
export const createQuestionBankSchema = {
    $id: 'createQuestionBankSchema',
    type: 'object',
    properties: {
        title: {
            type: 'string'
        },
        createdBy: {
            type: 'string'
        },
    },
    required: ['title', 'created_by']
};

export const getQuestionBankSchema = {
    $id: 'getQuestionBankSchema',
    type: 'object',
    properties: {
        questionBankId: {
            type: 'string',
            format: 'uuid'
        },
    },
    required: ['questionBankId']
};


