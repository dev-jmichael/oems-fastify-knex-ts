import { CreateQuestionBankRequest } from "../dto/request/createQuestionBankRequest"

export interface QuestionBank {
    question_bank_id: string,
    title: string,
    created_by: string,
    created_at: Date
}

export const toEntity = (questionBankRequest: CreateQuestionBankRequest) => {
    return {
        title: questionBankRequest.title,
        created_by: questionBankRequest.createdBy
    }
}

export const toDto = (questionBankEntity: QuestionBank) => {
    return {
        questionBankId: questionBankEntity.question_bank_id,
        title: questionBankEntity.title,
        createdBy: questionBankEntity.created_by
    }
}