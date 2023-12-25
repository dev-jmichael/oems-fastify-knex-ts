import db from "../config/db";
import { QuestionBank } from "../models/questionBank";
import { QuestionBankRepository } from "../repository/questionBankRepository";
import { errorResponse } from "../common/dto/apiResponse";

const questionBankRepository = new QuestionBankRepository(db);

const createQuestionBank = async (title: string, createdBy: string) => {
 
    const questionBank: QuestionBank = { title: title, created_by: createdBy }

    const createdQuestionBank = await questionBankRepository.save(questionBank)

    return createdQuestionBank;
}

const getQuestionBank = async (questionBankId: string) => {

    const foundQuestionBank = await questionBankRepository.findById(questionBankId)
    
    if (!foundQuestionBank) {
        throw errorResponse(
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