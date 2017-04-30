export const addCardAccount = card =>
({
  type: 'ADD_CARD',
  payload: {
    card
  }
})

export const onAddCardAccountSuccess = res =>
({
  type: 'ADD_CARD_SUCCESS',
  payload: {
    card: res.body.card
  }
})

export const addBankAccount = bank =>
({
  type: 'ADD_BANK',
  payload: {
    bank
  }
})

export const onAddBankAccountSuccess = res =>
({
  type: 'ADD_BANK_SUCCESS',
  payload: {
    bank: res.body.bank
  }
})
