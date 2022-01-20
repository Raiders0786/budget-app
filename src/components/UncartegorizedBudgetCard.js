
import React from 'react';
import BudgetCard from "../components/BudgetCard"
import { UNCATEGORIZED_BUDGET_ID , useBudgets} from '../contexts/BudgetContent';

export default function UncartegorizedBudgetCard(props) {
    const {getBudgetExpense} = useBudgets()
    const amount = getBudgetExpense(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0
      )
        if (amount === 0) return null
  return (
      <BudgetCard amount={amount} gray name="Uncategorized" {...props}/>
  )
}
