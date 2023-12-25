import db from "../config/db";
import { QuestionBank } from "../models/questionBank";
import { QuestionBankRepository } from "../repository/questionBankRepository";
import { error } from "../common/dto/apiResponse";
import { CreateQuestionBankRequest } from "../dto/createQuestionBankRequest";

const questionBankRepository = new QuestionBankRepository(db);

const createQuestionBank = async (questionBankRequest: CreateQuestionBankRequest): Promise<QuestionBank> => {
    const questionBank: Omit<QuestionBank, 'question_bank_id'> = { ...questionBankRequest }

    const createdQuestionBank = await questionBankRepository.save(questionBank)

    return createdQuestionBank;
}

const getQuestionBank = async (questionBankId: string): Promise<QuestionBank> => {
    const foundQuestionBank = await questionBankRepository.findById(questionBankId);
    
    if (!foundQuestionBank) {
        throw error(
            404, 
            'Resource Not Found', 
            'The requested resource does not exist.', 
            'RESOURCE_NOT_FOUND'
        );
    }
    
    return foundQuestionBank;
}

export default {
    createQuestionBank,
    getQuestionBank
}