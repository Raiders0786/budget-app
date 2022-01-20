import React, { useContext} from 'react';
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext =  React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"
export function useBudgets(){
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({children}) =>{
    const [budgets,setBudget] = useLocalStorage("budgets",[])
    const [expenses,setExpenses] = useLocalStorage("expenses",[])

    function getBudgetExpense(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    function addExpense({description, amount, budgetId}){
        setExpenses(prevExpense =>{
            return [...prevExpense,{id:uuidV4,description,amount,budgetId}]
        })
    }
    function addBudget({name, max}){
        setBudget((preveBudget)=>{
            if(preveBudget.find(budget => budget.name === name)){
                return preveBudget
            }
            return [...preveBudget,{id: uuidV4,name,max}]
        })
    }
    function deleteBudget({id}){
        // TODO: Deal with expenses
       setBudget(preveBudgets=>{
           return preveBudgets.filter(budget => budget.id !== id)
       })
    }
    function deleteExpense({id}){
        setExpenses(prevExpenses =>{
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }
    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpense,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
    }}>{children}</BudgetsContext.Provider>
}