import db from "../config/db";
import { QuestionBank } from "../models/questionBank";
import { QuestionBankRepository } from "../repository/questionBankRepository";

const questionBankRepository = new QuestionBankRepository(db);

const createQuestionBank = async (title: string, createdBy: string) => {
 
    const questionBank: QuestionBank = { title: title, created_by: createdBy }

    const createdQuestionBank = await questionBankRepository.save(questionBank)

    return createdQuestionBank;
}

const getQuestionBank = async (questionBankId: string) => {

    const foundQuestionBank = await questionBankRepository.findById(questionBankId)
    
    if (!foundQuestionBank) {
        throw { 
            statusCode: 404, 
            error: 'Resource Not Found', 
            message: 'The requested resource does not exist.', 
            errorCode: 'RESOURCE_NOT_FOUND' 
        }
    }
    
    return foundQuestionBank;
}

export default {
    createQuestionBank,
    getQuestionBank
}