import db from "../config/db";
import { QuestionBank } from "../models/questionBank";
import { QuestionBankRepository } from "../repository/questionBankRepository";
import { errorResponse } from "../common/dto/apiResponse";

const questionBankRepository = new QuestionBankRepository(db);

const createQuestionBank = async (title: string, createdBy: string): Promise<QuestionBank> => {
 
    const questionBank: QuestionBank = { title: title, created_by: createdBy }

    const createdQuestionBank: QuestionBank = await questionBankRepository.save(questionBank)

    return createdQuestionBank;
}

const getQuestionBank = async (questionBankId: string): Promise<QuestionBank | undefined> => {

    const foundQuestionBank: QuestionBank | undefined = await questionBankRepository.findById(questionBankId);
    
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